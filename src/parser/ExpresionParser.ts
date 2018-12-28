import ASTExpression from "../ast/expressions/ASTExpression";
import TokenType from "../lexer/TokenType";
import ASTUnaryOp from "../ast/expressions/ASTUnaryOp";
import UnaryOpType from "../ast/expressions/UnaryOpType";
import ASTInt from "../ast/expressions/ASTInt";
import ASTBinOp from "../ast/expressions/ASTBinOp";
import BinOpType from "../ast/expressions/BinOpType";
import TokenStream from "./TokenStream";
import SyntaxError from "./SyntaxError";
import ASTAssign from "../ast/expressions/ASTAssign";
import ASTVar from "../ast/expressions/ASTVar";

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
	 * factor 
	 * 		: PLUS factor 
	 * 		| MINUS factor
	 * 		| INTEGER 
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
				this._stream.expect(TokenType.INTEGER);
				return new ASTInt(this._stream.prev.value);

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
				node = new ASTBinOp(node, BinOpType.MULTIPLICATION, this._factor());
			} else if (this._stream.accept(TokenType.DIVISION)) {
				node = new ASTBinOp(node, BinOpType.DIVISION, this._factor());
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
				node = new ASTBinOp(node, BinOpType.ADDITION, this._multiplicativeExpression());
			} else if (this._stream.accept(TokenType.MINUS)) {
				node = new ASTBinOp(node, BinOpType.SUBSTRACTION, this._multiplicativeExpression());
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
				node = new ASTBinOp(node, BinOpType.LT, this._additiveExpression());
			} else if (this._stream.accept(TokenType.GT)) {
				node = new ASTBinOp(node, BinOpType.GT, this._additiveExpression());
			} else if (this._stream.accept(TokenType.LTEQ)) {
				node = new ASTBinOp(node, BinOpType.LTEQ, this._additiveExpression());
			} else if (this._stream.accept(TokenType.GTEQ)) {
				node = new ASTBinOp(node, BinOpType.GTEQ, this._additiveExpression());
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
				node = new ASTBinOp(node, BinOpType.EQ, this._relationalExpression());
			} else if (this._stream.accept(TokenType.NOTEQ)) {
				node = new ASTBinOp(node, BinOpType.NOTEQ, this._relationalExpression());
			} else {
				break;
			}
		}
		return node;
	}

}