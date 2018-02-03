import Token from "./Token";
import TokenType from "./TokenType";

export default class Interpreter {

	public text: string;

	public pos: number = 0;

	public currentToken: Token;

	constructor(text: string) {
		this.text = text;
	}

	public getNextToken() {
		let text = this.text

		if (this.pos > this.text.length - 1) {
			return new Token(TokenType.EOF, null);
		}
			

		const char = text[this.pos];

		if (this._isDigit(char)) {
			const token = new Token(TokenType.INTEGER, parseInt(char));
			this.pos += 1;
			return token;
		}
			
		if (char == '+') {
			const token = new Token(TokenType.PLUS, char)
			this.pos += 1
			return token;
		}
			
		throw new Error(`Invalid character at position ${this.pos}`);
	}

	public eat(type: TokenType) {
		if (this.currentToken.type == type) {
			this.currentToken = this.getNextToken();
		} else {
			throw new Error(`Invalid token: ${ this.currentToken.toString() }. Expected: ${ type }.`)
		}
	}

	public expr() {
		// expr -> INTEGER PLUS INTEGER
		this.currentToken = this.getNextToken();

		const left = this.currentToken;
		this.eat(TokenType.INTEGER);

		const op = this.currentToken;
		this.eat(TokenType.PLUS);

		const right = this.currentToken;
		this.eat(TokenType.INTEGER);

		const result = left.value + right.value;
		return result;
	}



	private _isDigit(char: string) {
		return (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(char) !== -1);
	}

}