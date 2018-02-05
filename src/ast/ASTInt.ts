import AST from "./AST";
import Token from "../Lexer/Token";

export default class ASTInt extends AST {
	
	public value: number;

	constructor(token: Token) {
		super(token);
		this.value = parseInt(this.token.value);
	}

	public eval(): number {
		return this.value;
	}

	public log(level: number): string {
		return "  ".repeat(level) + this.constructor.name + "(" + this.token.type + ") = " + this.value + "\n";
	};
}