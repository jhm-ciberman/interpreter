import Token from "../Lexer/Token";

export default abstract class AST {
	protected readonly token: Token;

	public constructor(token: Token) {
		this.token = token;
	}

	public abstract visit(): any;

	public log(level: number): string {
		return "  ".repeat(level) + this.constructor.name + "(" + this.token.type + ") \n";
	};
}