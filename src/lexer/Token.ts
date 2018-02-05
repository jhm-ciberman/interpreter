import { TokenType } from "./TokenType";

export default class Token {

	public readonly type: TokenType;

	public readonly value: string;

	public constructor(type: TokenType, value?: string) {
		this.type = type;
		this.value = value ? value : "";
	}

	public toString() {
		return `Token{${this.type},${this.value}}`
	}
}