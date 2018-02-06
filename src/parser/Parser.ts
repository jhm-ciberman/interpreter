import Lexer from "../lexer/Lexer";
import Token from "../lexer/Token";
import TokenType from "../lexer/TokenType";

import SyntaxError from "./SyntaxError";
import ASTCompound from "../ast/ASTCompound";
import ASTUnaryOp from "../ast/expressions/ASTUnaryOp";
import UnaryOpType from "../ast/expressions/UnaryOpType";
import ASTInt from "../ast/expressions/ASTInt";
import ASTExpression from "../ast/expressions/ASTExpression";
import ASTBinOp from "../ast/expressions/ASTBinOp";
import BinOpType from "../ast/expressions/BinOpType";
import ASTVarDec from "../ast/ASTVarDec";
import ASTVar from "../ast/expressions/ASTVar";
import ASTStatement from "../ast/statements/ASTStatement";
import ASTAssign from "../ast/expressions/ASTAssign";


export default class Parser {

	private readonly _lexer: Lexer;

	/**
	 * current token
	 */
	private _t: Token;

	/**
	 * The last token
	 */
	private _prev: Token;

	/**
	 * Parser class
	 * @param lexer The lexer
	 */
	constructor(lexer: Lexer) {
		this._lexer = lexer;
		this._t = this._lexer.getNextToken();
		
		this._prev = this._t;
	}

	/**
	 * Parses the Token stream into an abstract syntaxt tree
	 */
	public parse(): ASTCompound {
		return this._program();
	}

	/**
	 * Consume the current token
	 * @param type The expected token type
	 */
	private _expect(type: TokenType): void {
		if (!this._accept(type)) {
			throw new SyntaxError(this._t, [type]);
		}
	}

	/**
	 * If the current token is the token type, consumes it and return ture. If not, returns false.
	 * @param type The expected token type
	 */
	private _accept(type: TokenType): boolean {
		if (this._t.type == type) {
			this._prev = this._t;
			this._t = this._lexer.getNextToken();
			return true;
		}
		return false;
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
		if (this._accept(TokenType.PLUS)) {
			return new ASTUnaryOp(UnaryOpType.PLUS, this._expr());
		} else if (this._accept(TokenType.MINUS)) {
			return new ASTUnaryOp(UnaryOpType.MINUS, this._expr());
		} else if (this._accept(TokenType.INTEGER)) {
			return new ASTInt(this._prev.value);
		} else if (this._accept(TokenType.LPAREN)) {
			const expr = this._expr();
			this._expect(TokenType.RPAREN);
			return expr;
		} else if (this._t.type === TokenType.ID) {
			return this._variableExpresion();
		} else {
			throw new SyntaxError(this._t, [
				TokenType.PLUS,
				TokenType.MINUS,
				TokenType.INTEGER,
				TokenType.LPAREN,
				TokenType.ID
			]);
		}
	}

	/**
	 * term 
	 * 		: factor ((MUL | DIV) factor)*
	 * 		:
	 */
	private _term(): ASTExpression {
		let node = this._factor();
		while (true) {
			if (this._accept(TokenType.MULTIPLY)) {
				node = new ASTBinOp(node, BinOpType.MULTIPLICATION, this._factor());
			} else if (this._accept(TokenType.DIVISION)) {
				node = new ASTBinOp(node, BinOpType.DIVISION, this._factor());
			} else {
				break;
			}
		}
		return node;
	}

	/**
	 * expr
	 * 		: term ((PLUS | MINUS) term)*
	 * 		;
	 */
	private _expr(): ASTExpression {
		let node = this._term();
		while (true) {
			if (this._accept(TokenType.PLUS)) {
				node = new ASTBinOp(node, BinOpType.ADDITION, this._term());
			} else if (this._accept(TokenType.MINUS)) {
				node = new ASTBinOp(node, BinOpType.SUBSTRACTION, this._term());
			} else {
				break;
			}
		}
		return node;
	}

	/**
	 * varDeclaration
	 * 		: VAR var
	 */
	private _varDeclaration(): ASTVarDec {
		this._expect(TokenType.VAR);
		return new ASTVarDec(this._variableName());
	}


	/**
	 * variableExpression
	 * 		: variableName ( EQUAL expr )?
	 * 		;
	 */
	private _variableExpresion(): ASTExpression {
		const variable = this._variableName()
		if (this._accept(TokenType.EQUAL)) {
			return new ASTAssign(variable, this._expr());
		}
		return variable;
	}

	/**
	 * variableName:
	 * 		ID
	 * 		;
	 */
	private _variableName(): ASTVar {
		this._expect(TokenType.ID);
		return new ASTVar(this._prev);
	}

	/**
	 * block 
	 * 		: LBRACE (statement)* RBRACE
	 		;
	 */
	private _block(): ASTCompound {
		const arr: ASTExpression[] = [];
		this._expect(TokenType.LBRACE);
		while (!this._accept(TokenType.RBRACE)) {
			const s = this._statement();
			if (s) {
				arr.push(s);
			}
		}
		return new ASTCompound(arr);
	}

	/**
	 * statement
	 * 		: (SEMI | EOL)
	 * 		| block
	 * 		| varDeclaration
	 * 		| expr
	 * 		;
	 */
	private _statement(): ASTStatement | null {
		if (this._accept(TokenType.SEMI) || this._accept(TokenType.EOL)) {
			return null;
		} else if (this._t.type === TokenType.LBRACE) {
			return this._block();
		} else if (this._t.type === TokenType.VAR) {
			return this._varDeclaration();
		} else {
			return this._expr();
		}
	}

	/**
	 * program 
	 * 		: (statement)* EOF
	 * 		;
	 */
	private _program(): ASTCompound {
		const arr: ASTStatement[] = [];
		while (!this._accept(TokenType.EOF)) {
			const s = this._statement();
			if (s) {
				arr.push(s);
			}
		}
		return new ASTCompound(arr);
	}

}