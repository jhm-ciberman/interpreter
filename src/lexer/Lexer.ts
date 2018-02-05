import Token from "./Token";
import TokenType from "./TokenType";
import Char from "./Char";

export default class Lexer {

	private _currentChar: string;

	private _pos: number;

	private readonly _text: string;

	constructor(text: string) {
		this._pos = 0;
		this._text = text;
		this._currentChar = this._text[this._pos];
	}

	/**
	 * Lexical analyzer (also known as scanner or tokenizer)
	 * This method is responsible for breaking a sentence
	 * apart into tokens.
	 */
	public getNextToken(): Token {
		// Skip whitespace
		while (this._currentChar !== '' && Char.isWhitespace(this._currentChar)) {
			this._advance();
		}

		const c = this._currentChar;
		if (Char.isDigit(c)) {
			return new Token(TokenType.INTEGER, this._integer());
		} else {
			let t: Token;
			switch (c) {
				case "+": t = new Token(TokenType.PLUS, c); break;
				case "-": t = new Token(TokenType.MINUS, c); break;
				case "*": t = new Token(TokenType.MULTIPLY, c); break;
				case "/": t = new Token(TokenType.DIVISION, c); break;
				case "(": t = new Token(TokenType.LPARENT, c); break;
				case ")": t = new Token(TokenType.RPARENT, c); break;
				case "": t = new Token(TokenType.EOF, c); break;
				default:
					throw new Error(`Invalid character "${ c }" at position ${ this._pos }`);
			}
			this._advance();
			return t;
		}
	}

	/**
	 * Advance the 'pos' pointer and set the 'current_char' variable.
	 */
	private _advance(): void {
		this._pos++;
		if (this._pos > this._text.length - 1) {
			this._currentChar = "";
		} else {
			this._currentChar = this._text[this._pos]
		}
	}

	/**
	 * Return a (multidigit) integer consumed from the input as a string.
	 */
	private _integer(): string {
		let result = '';
		while (this._currentChar !== "" && Char.isDigit(this._currentChar)) {
			result += this._currentChar;
			this._advance();
		}
		return result;
	}
}