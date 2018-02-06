import { TokenType } from "../lexer/TokenType";
import Token from "../lexer/Token";

export default class SyntaxError extends Error {

	public readonly line: number;
	public readonly col: number;
	constructor(current: Token, expected:TokenType[] = []) {
		super();
		this.line = current.line;
		this.col = current.col;

		this.message = `Invalid token: ${current.toString()} at line ${this.line}, col ${this.col}. `;
		if (expected.length > 0) {
			this.message += `Expected: ${expected.join(", ")}.`;
		}
		
	}

	public toString() {
		return this.message;
	}

	public inspect() {
		let str = this.message;
		str += "\n\n";
		str += this.stack;
		return str;
	}
}