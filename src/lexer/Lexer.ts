import Token from "./Token";
import TokenType from "./TokenType";
import Char from "./Char";

export default class Lexer {

	/**
	 * Current char
	 */
	private _cc: string;

	private _pos: number;
	private _line: number; 
	private _col: number; 

	private readonly _text: string;

	private _tokenMap: Map<string, Token> = new Map();

	private _reservedKeywords: Map<string, Token> = new Map();

	constructor(text: string) {
		this._cc = '';
		this._pos = -1;
		this._line = 1;
		this._col = 1;
		this._text = text;
		this._advance();

		this._tokenMap
			.set("\n", new Token(TokenType.EOL))
			.set(";", new Token(TokenType.SEMI))
			.set("+", new Token(TokenType.PLUS))
			.set("-", new Token(TokenType.MINUS))
			.set("*", new Token(TokenType.MULTIPLY))
			.set("/", new Token(TokenType.DIVISION))
			.set("(", new Token(TokenType.LPAREN))
			.set(")", new Token(TokenType.RPAREN))
			.set("{", new Token(TokenType.LBRACE))
			.set("}", new Token(TokenType.RBRACE))
			.set("=", new Token(TokenType.EQUAL));

		this._reservedKeywords
			.set("var", new Token(TokenType.VAR))
			.set("if", new Token(TokenType.IF));
	}

	/**
	 * Lexical analyzer (also known as scanner or tokenizer)
	 * This method is responsible for breaking a sentence
	 * apart into tokens.
	 */
	public getNextToken(): Token {
		// Skip whitespace and comments 
		this._skipCommentsAndWhitespace();

		if (this._cc == '') {
			return new Token(TokenType.EOF);
		}

		if (Char.isDigit(this._cc)) {
			return this._integer();
		}
		if (Char.isAlpha(this._cc)) {
			return this._id();
		}

		let t: Token;
		const token = this._tokenMap.get(this._cc);
		if (token) {
			this._advance();
			return token as Token;
		} else {
			throw new Error(`Invalid character "${ this._cc }" at line ${ this._line } col ${ this._col }`);
		}
	}

	/**
	 * Advance the 'pos' pointer and set the 'current_char' variable.
	 */
	private _advance(): string {
		if (this._cc === '\n') {
			this._line++;
			this._col = 0;
		}
		this._pos++;
		this._col++;
		this._cc = (this._pos > this._text.length - 1) ? "" : this._text[this._pos];		
		return this._cc;
	}

	/**
	 * return the next character from the text buffer without incrementing the current position
	 */
	private _peek(n = 1): string {
		return (this._pos + n > this._text.length - 1) ? "" : this._text[this._pos + n];
	}

	/**
	 * Return a (multidigit) integer consumed from the input as a string.
	 */
	private _integer(): Token {
		let result = '';
		while (this._cc !== '' && Char.isDigit(this._cc)) {
			result += this._cc;
			this._advance();
		}
		return new Token(TokenType.INTEGER, result);
	}

	/**
	 * Skips all comments and whitespace characters
	 */
	private _skipCommentsAndWhitespace(): void {
		while (this._cc !== '' && Char.isWhitespace(this._cc)) {
			this._advance();
		}
		if (this._cc == "/") {
			switch (this._peek()) {
				case '/':
					this._advance();
					this._skipDoubleSlashComment();
					this._skipCommentsAndWhitespace();
					break;
				case '*':
					this._advance();
					this._skipMultilineComment()
					this._skipCommentsAndWhitespace();
					break;
			}
		}
	}

	/**
	 * Skips a detected multiline comment.
	 */
	private _skipMultilineComment(): void {
		do {
			this._advance();
		} while (this._cc !== '' && this._cc !== '*' && this._peek() !== '/')
		this._advance();
		this._advance();
	}

	/**
	 * Skips a detected double slash comment.
	 */
	private _skipDoubleSlashComment(): void {
		do {
			this._advance();
		} while (this._cc !== '\n' && this._cc !== '')
		this._advance();
	}

	/**
	 * Handle identifiers and reserved keywords
	 */
	private _id(): Token {
		let result = '';
		while (this._cc !== '' && Char.isAlphaNumeric(this._cc)) {
			result += this._cc;
			this._advance();
		}
		const token = this._reservedKeywords.get(result);
		return (token === undefined) ? new Token(TokenType.ID, result) : token;
	}
	
}