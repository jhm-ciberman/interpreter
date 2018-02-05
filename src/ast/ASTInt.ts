import AST from "./AST";
import Token from "../Lexer/Token";

export default class ASTInt extends AST {
	
	public value: number;

	constructor(value: string) {
		super();
		this.value = parseInt(value);
	}

	public eval(): number {
		return this.value;
	}

	public log(level: number): string {
		return super.log(level).replace("\n", " = " + this.value + "\n");
	};
}