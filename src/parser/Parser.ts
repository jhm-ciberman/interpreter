import TokenType from "../lexer/TokenType";

import SyntaxError from "./SyntaxError";
import ASTExpression from "../ast/expressions/ASTExpression";
import ASTVarDec from "../ast/statements/ASTVarDec";
import ASTVar from "../ast/expressions/ASTVar";
import ASTStatement from "../ast/statements/ASTStatement";
import ASTBlock from "../ast/statements/ASTBlock";
import ASTIf from "../ast/statements/ASTIf";
import ASTType from "../ast/ASTType";
import ASTWhile from "../ast/statements/ASTWhile";
import TokenStream from "./TokenStream";
import ExpresionParser from "./ExpresionParser";

export default class Parser {

	private _stream: TokenStream;

	private _expresionParser: ExpresionParser;

	public constructor(stream: TokenStream) {
		this._stream = stream;
		this._expresionParser = new ExpresionParser(stream);
	}

	/**
	 * Parses the Token stream into an abstract syntax tree
	 */
	public parse(): ASTBlock {
		return this._program();
	}

	private _expr() {
		return this._expresionParser.expr();
	}

	/**
	 * varDeclaration
	 * 		: VAR variableName ( COLON ID )? ( ASSIGN expr )?
	 */
	private _varDeclaration(): ASTVarDec {
		this._stream.expect(TokenType.VAR);
		
		const name = new ASTVar(this._stream.expect(TokenType.ID));

		let type = null, value = null;
		if (this._stream.accept(TokenType.COLON)) {
			const token = this._stream.expect(TokenType.ID);
			type = new ASTType(token.value);
		}
		if (this._stream.accept(TokenType.ASSIGN)) {
			value = this._expr();
		}
		return new ASTVarDec(name, type, value);
	}


	/**
	 * block 
	 * 		: LBRACE (statement)* RBRACE
	 		;
	 */
	private _block(): ASTBlock {
		const arr: ASTExpression[] = [];
		this._stream.expect(TokenType.LBRACE);
		while (!this._stream.accept(TokenType.RBRACE)) {
			const s = this._statement();
			if (s) {
				arr.push(s);
			}
		}
		return new ASTBlock(arr);
	}


	/**
	 * statement
	 * 		: SEMI
	 * 		| block
	 * 		| varDeclaration
	 * 		| ifStatement
	 * 		| expr SEMI
	 * 		;
	 */
	private _statement(): ASTStatement | null {
		let value;
		if (this._stream.accept(TokenType.SEMI)) {
			return null;
		}
		switch (this._stream.current.type) {
			case TokenType.LBRACE:
				return this._block();
			case TokenType.VAR:
				return this._varDeclaration();
			case TokenType.IF:
				return this._ifStatement();	
			case TokenType.WHILE:
				return this._whileStatement();
			default:
				const value = this._expr();
				this._stream.expect(TokenType.SEMI);
				return value;
		}
	}

	/**
	 * ifStatement
	 * 		: IF LPAREN expr RPAREN statement (ELSE statement)?
	 */
	private _ifStatement() {
		this._stream.expect(TokenType.IF);
		this._stream.expect(TokenType.LPAREN);
		const expr = this._expr();
		this._stream.expect(TokenType.RPAREN);
		const statement = this._statement();
		if (statement === null) {
			throw new SyntaxError(this._stream.prev);
		}
		let statementElse = null;
		if (this._stream.accept(TokenType.ELSE)) {
			statementElse = this._statement();
		}
		return new ASTIf(expr, statement, statementElse);
	}

	/**
	 * whileStatement
	 * 		: WHILE LPAREN expr RPAREN statement
	 */
	private _whileStatement() {
		this._stream.expect(TokenType.WHILE);
		this._stream.expect(TokenType.LPAREN);
		const expr = this._expr();
		this._stream.expect(TokenType.RPAREN);
		const statement = this._statement();
		if (statement === null) {
			throw new SyntaxError(this._stream.prev);
		}
		return new ASTWhile(expr, statement);
	}

	/**
	 * program 
	 * 		: (statement)* EOF
	 * 		;
	 */
	private _program(): ASTBlock {
		const arr: ASTStatement[] = [];
		while (!this._stream.accept(TokenType.EOF)) {
			const s = this._statement();
			if (s) {
				arr.push(s);
			}
		}
		return new ASTBlock(arr);
	}

}