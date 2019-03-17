import ASTExpression from "../ast/expressions/ASTExpression";
import TokenType from "../lexer/TokenType";
import ASTUnaryOp from "../ast/expressions/ASTUnaryOp";
import UnaryOpType from "../ast/expressions/UnaryOpType";
import ASTInt from "../ast/expressions/ASTInt";
import BinOpType from "../ast/expressions/ComparationType";
import TokenStream from "./TokenStream";
import SyntaxError from "./SyntaxError";
import ASTAssign from "../ast/expressions/ASTAssign";
import ASTVar from "../ast/expressions/ASTVar";
import ASTComparation from "../ast/expressions/binop/ASTComparation";
import ASTAddition from "../ast/expressions/binop/ASTAddition";
import ASTSubstraction from "../ast/expressions/binop/ASTSubstraction";
import ASTMultiplication from "../ast/expressions/binop/ASTMultiplication";
import ASTDivision from "../ast/expressions/binop/ASTDivision";
import ASTFloat from "../ast/expressions/ASTFloat";

export default class ExpresionParser {

    private readonly _stream: TokenStream;

    constructor(stream: TokenStream) {
        this._stream = stream;
    }

    /**
	 * expr
	 * 		: additiveExpression
     *      ;
	 */
	public expr() {
		return this._equalityExpression();
    }

    /**
	 * variableExpression
	 * 		: ID ( ASSIGN expr )?
	 * 		;
	 */
	private _variableExpresion(): ASTExpression {
        const token = this._stream.expect(TokenType.ID);
        const variable = new ASTVar(token);
        
		if (this._stream.accept(TokenType.ASSIGN)) {
			return new ASTAssign(variable, this.expr());
		}
		return variable;
	}

	/**
	 * number
	 * 		: DOT INTEGER
	 * 		| INTEGER ( DOT INTEGER? )?
	 */
	private _number(): ASTExpression {
		switch (this._stream.current.type) {
			case TokenType.DOT:
				this._stream.expect(TokenType.DOT);
				const fractional = this._stream.expect(TokenType.INTEGER);
				return new ASTFloat("0", fractional.value);

			case TokenType.INTEGER:
				const integer = this._stream.expect(TokenType.INTEGER);
				if (this._stream.accept(TokenType.DOT)) {
					if (this._stream.current.type === TokenType.INTEGER) {
						const fractional = this._stream.expect(TokenType.INTEGER);
						return new ASTFloat(integer.value, fractional.value);
					} else {
						return new ASTFloat(integer.value, "0");
					}
				} else {
					return new ASTInt(integer.value);
				}

			default:
				throw new SyntaxError(this._stream.current, [
					TokenType.DOT,
					TokenType.INTEGER,
				]);
		}
	}

	/**
	 * factor 
	 * 		: PLUS factor 
	 * 		| MINUS factor
	 * 		| number 
	 * 		| LPAREN expr RPAREN
	 * 		| variableExpresion
	 * 		;
	 */
	private _factor(): ASTExpression {
		switch (this._stream.current.type) {
			case TokenType.PLUS:
				this._stream.expect(TokenType.PLUS);
				return new ASTUnaryOp(UnaryOpType.PLUS, this.expr());

			case TokenType.MINUS:
				this._stream.expect(TokenType.MINUS);
				return new ASTUnaryOp(UnaryOpType.MINUS, this.expr());

			case TokenType.INTEGER:
			case TokenType.DOT:
				return this._number();

			case TokenType.LPAREN:
				this._stream.expect(TokenType.LPAREN);
				const expr = this.expr();
				this._stream.expect(TokenType.RPAREN);
				return expr;

			case TokenType.ID:
				return this._variableExpresion();

			default:
				throw new SyntaxError(this._stream.current, [
					TokenType.PLUS,
					TokenType.MINUS,
					TokenType.INTEGER,
					TokenType.LPAREN,
					TokenType.ID
				]);
		}
	}

	/**
	 * multiplicativeExpression
	 * 		: factor ((MUL | DIV) factor)*
	 * 		;
	 */
	private _multiplicativeExpression(): ASTExpression {
		let node = this._factor();
		while (true) {
			if (this._stream.accept(TokenType.MULTIPLY)) {
				node = new ASTMultiplication(node, this._factor());
			} else if (this._stream.accept(TokenType.DIVISION)) {
				node = new ASTDivision(node, this._factor());
			} else {
				break;
			}
		}
		return node;
	}

	/**
	 * additiveExpression
	 * 		: multiplicativeExpression ((PLUS | MINUS) multiplicativeExpression)*
	 * 		;
	 */
	private _additiveExpression(): ASTExpression {
		let node = this._multiplicativeExpression();
		while (true) {
			if (this._stream.accept(TokenType.PLUS)) {
				node = new ASTAddition(node, this._multiplicativeExpression());
			} else if (this._stream.accept(TokenType.MINUS)) {
				node = new ASTSubstraction(node, this._multiplicativeExpression());
			} else {
				break;
			}
		}
		return node;
	}

	/**
	 * relationalExpression
	 * 		: additiveExpression ((LT | GT | LTEQ | GTEQ) additiveExpression)*
	 * 		;
	 */
	private _relationalExpression(): ASTExpression {
		let node = this._additiveExpression();
		while (true) {
			if (this._stream.accept(TokenType.LT)) {
				node = new ASTComparation(node, BinOpType.LT, this._additiveExpression());
			} else if (this._stream.accept(TokenType.GT)) {
				node = new ASTComparation(node, BinOpType.GT, this._additiveExpression());
			} else if (this._stream.accept(TokenType.LTEQ)) {
				node = new ASTComparation(node, BinOpType.LTEQ, this._additiveExpression());
			} else if (this._stream.accept(TokenType.GTEQ)) {
				node = new ASTComparation(node, BinOpType.GTEQ, this._additiveExpression());
			} else {
				break;
			}
		}
		return node;
	}

	/**
	 * additiveExpression
	 * 		: relationalExpression ((EQ | NOTEQ) relationalExpression)*
	 * 		;
	 */
	private _equalityExpression(): ASTExpression {
		let node = this._relationalExpression();
		while (true) {
			if (this._stream.accept(TokenType.EQ)) {
				node = new ASTComparation(node, BinOpType.EQ, this._relationalExpression());
			} else if (this._stream.accept(TokenType.NOTEQ)) {
				node = new ASTComparation(node, BinOpType.NOTEQ, this._relationalExpression());
			} else {
				break;
			}
		}
		return node;
	}

}