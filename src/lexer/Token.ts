import { TokenType } from "./TokenType";

export default class Token {

	public readonly type: TokenType;

	public readonly value: string;

	public readonly line: number;
	public readonly col: number;


	public constructor(line: number, col: number, type: TokenType, value?: string) {
		this.line = line;
		this.col = col;
		this.type = type;
		this.value = value ? value : "";
	}

	public toString() {
		return `Token{${this.type},${this.value}}`
	}
}