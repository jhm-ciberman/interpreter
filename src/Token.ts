import { TokenType } from "./TokenType";

export default class Token {

	public type: TokenType;

	public constructor(type: TokenType) {
		this.type = type;
	}
}