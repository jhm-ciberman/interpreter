import Lexer from "../lexer/Lexer";
import Token from "../Lexer/Token";
import TokenType from "../Lexer/TokenType";

import SyntaxError from "./SyntaxError";

import AST from "../ast/AST";
import ASTInt from "../ast/ASTInt";

import ASTBinOp from "../ast/binop/ASTBinOp";
import ASTDivision from "../ast/binop/ASTDivision";
import ASTAddition from "../ast/binop/ASTAddition";
import ASTSubstraction from "../ast/binop/ASTSubstraction";
import ASTMultiplication from "../ast/binop/ASTMultiplication";
import ASTUnaryPlus from "../ast/unaryop/ASTUnaryPlus";
import ASTUnaryMinus from "../ast/unaryop/ASTUnaryMinus";
import ASTCompound from "../ast/ASTCompound";

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
	}

	/**
	 * Parses the Token stream into an abstract syntaxt tree
	 */
	public parse(): AST | null {
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
	 * 		;
	 */
	private _factor(): AST {
		if (this._accept(TokenType.PLUS)) {
			return new ASTUnaryPlus(this._expr());
		} else if (this._accept(TokenType.MINUS)) {
			return new ASTUnaryMinus(this._expr());
		} else if (this._accept(TokenType.INTEGER)) {
			return new ASTInt(this._prev.value);
		} else if (this._accept(TokenType.LPAREN)) {
			const expr = this._expr();
			this._expect(TokenType.RPAREN);
			return expr;
		} else {
			throw new SyntaxError(this._t, [
				TokenType.PLUS,
				TokenType.MINUS,
				TokenType.INTEGER,
				TokenType.LPAREN,
			]);
		}
	}

	/**
	 * term 
	 * 		: factor ((MUL | DIV) factor)*
	 * 		:
	 */
	private _term(): AST {
		let node = this._factor();
		while (true) {
			if (this._accept(TokenType.MULTIPLY)) {
				node = new ASTMultiplication(node, this._factor());
			} else if (this._accept(TokenType.DIVISION)) {
				node = new ASTDivision(node, this._factor());
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
	private _expr(): AST {
		let node = this._term();
		while (true) {
			if (this._accept(TokenType.PLUS)) {
				node = new ASTAddition(node, this._term());
			} else if (this._accept(TokenType.MINUS)) {
				node = new ASTSubstraction(node, this._term());
			} else {
				break;
			}
		}
		return node;
	}

	/**
	 * block 
	 * 		: LBRACE (statement)* RBRACE
	 		;
	 */
	private _block(): ASTCompound {
		const arr: AST[] = [];
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
	 * 		: block
	 * 		| expr
	 */
	private _statement(): AST | null {
		if (this._accept(TokenType.SEMI) || this._accept(TokenType.EOL)) {
			return null;
		} else if (this._t.type == TokenType.LBRACE) {
			return this._block();
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
		const arr: AST[] = [];
		while (!this._accept(TokenType.EOF)) {
			const s = this._statement();
			if (s) {
				arr.push(s);
			}
		}
		return new ASTCompound(arr);
	}

}