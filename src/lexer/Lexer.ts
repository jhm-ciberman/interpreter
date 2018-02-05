import Token from "./Token";
import TokenType from "./TokenType";
import Char from "./Char";

export default class Lexer {

	/**
	 * Current char
	 */
	private _cc: string;

	private _pos: number;

	private readonly _text: string;

	private _tokenMap: Map<string, Token> = new Map();

	constructor(text: string) {
		this._pos = -1;
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
	}

	/**
	 * Lexical analyzer (also known as scanner or tokenizer)
	 * This method is responsible for breaking a sentence
	 * apart into tokens.
	 */
	public getNextToken(): Token {
		if (this._cc == "") {
			return new Token(TokenType.EOF);
		}
		// Skip whitespace and comments 
		this._skipCommentsAndWhitespace();

		const c = this._cc;
		if (Char.isDigit(c)) {
			return new Token(TokenType.INTEGER, this._integer());
		} else {
			let t: Token;
			if (this._tokenMap.has(c)) {
				this._advance();
				return this._tokenMap.get(c) as Token;
			} else {
				throw new Error(`Invalid character "${ c }" at position ${ this._pos }`);
			}
		}
	}

	/**
	 * Advance the 'pos' pointer and set the 'current_char' variable.
	 */
	private _advance(): string {
		this._pos++;
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
	private _integer(): string {
		let result = '';
		while (this._cc !== '' && Char.isDigit(this._cc)) {
			result += this._cc;
			this._advance();
		}
		return result;
	}

	/**
	 * Skips all comments and whitespace characters
	 */
	private _skipCommentsAndWhitespace() {
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
	private _skipMultilineComment() {
		do {
			this._advance();
		} while (this._cc !== '' && this._cc !== '*' && this._peek() !== '/')
		this._advance();
		this._advance();
	}

	/**
	 * Skips a detected double slash comment.
	 */
	private _skipDoubleSlashComment() {
		do {
			this._advance();
		} while (this._cc !== '\n' && this._cc !== '')
		this._advance();
	}
}