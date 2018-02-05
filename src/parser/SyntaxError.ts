import { TokenType } from "../Lexer/TokenType";
import Token from "../Lexer/Token";

export default class SyntaxError extends Error {
	private readonly _expected: TokenType[];

	private readonly _current: Token;

	constructor(current: Token, expected:TokenType[]) {
		super();
		this._current = current;
		this._expected = expected;
		this.message = `Invalid token: ${this._current.toString()}. Expected: ${this._expected.join(", ")}.`;
	}
}