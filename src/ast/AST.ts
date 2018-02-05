import Token from "../Lexer/Token";

export default abstract class AST {

	public abstract eval(): any;

	public log(level: number): string {
		return "  ".repeat(level) + this.constructor.name + "\n";
	};
}