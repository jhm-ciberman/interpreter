import { TokenType } from "./TokenType";

export default class Token {

	public type: TokenType;

	public value: any;

	public constructor(type: TokenType, value: any) {
		this.type = type;
		this.value = value;
	}

	public toString() {
		return `Token{${this.type},${this.value}}`
	}
}