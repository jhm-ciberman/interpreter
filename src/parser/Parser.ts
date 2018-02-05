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

export default class Parser {

	private readonly _lexer: Lexer;

	private _currentToken: Token;

	constructor(lexer: Lexer) {
		this._lexer = lexer;
		this._currentToken = this._lexer.getNextToken();
	}

	/**
	 * Parses the Token stream into an abstract syntaxt tree
	 */
	public parse(): AST {
		return this._expr();
	}

	/**
	 * Consume the current token
	 * @param type The expected token type
	 */
	private _eat(type: TokenType): Token {
		if (this._currentToken.type == type) {
			const t = this._currentToken;
			this._currentToken = this._lexer.getNextToken();
			return t;
		} else {
			throw new SyntaxError(this._currentToken, [type]);
		}
	}

	/**
	 * factor : (PLUS | MINUS) factor | INTEGER | LPAREN expr RPAREN
	 */
	private _factor(): AST {
		switch (this._currentToken.type) {
			case TokenType.PLUS:
				return new ASTUnaryPlus(this._eat(TokenType.PLUS), this._expr());
			case TokenType.MINUS:
				return new ASTUnaryMinus(this._eat(TokenType.MINUS), this._expr());
			case TokenType.INTEGER: 
				return new ASTInt(this._eat(TokenType.INTEGER));
			case TokenType.LPARENT:
				this._eat(TokenType.LPARENT);
				const expr = this._expr();
				this._eat(TokenType.RPARENT);
				return expr;
			default:
				throw new SyntaxError(this._currentToken, [TokenType.INTEGER]);
		}
	}

	/**
	 * term : factor ((MUL | DIV) factor)*
	 */
	private _term(): AST {
		let node = this._factor();
		for (;;) {
			switch (this._currentToken.type) {
				case TokenType.MULTIPLY:
					node = new ASTMultiplication(node, this._eat(TokenType.MULTIPLY), this._factor());
					continue;
				case TokenType.DIVISION:
					node = new ASTDivision(node, this._eat(TokenType.DIVISION), this._factor());
					continue;
			}
			break;
		}
		return node;
	}

	/**
	 * expr : term ((PLUS | MINUS) term)*
	 */
	private _expr(): AST {
		let node = this._term();
		for (;;) {
			switch (this._currentToken.type) {
				case TokenType.PLUS:
					node = new ASTAddition(node, this._eat(TokenType.PLUS), this._term());
					continue;
				case TokenType.MINUS:
					node = new ASTSubstraction(node, this._eat(TokenType.MINUS), this._term());
					continue;
			}
			break;
		}
		return node;
	}
}