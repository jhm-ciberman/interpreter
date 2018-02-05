import AST from "../AST";
import ASTInt from "../ASTInt";
import Token from "../../Lexer/Token";
import { TokenType } from "../../Lexer/TokenType";

export default abstract class ASTUnaryOp extends AST {

	public expr: AST;

	constructor(expr: AST) {
		super();
		this.expr = expr;
	}

	public log(level: number): string {
		return super.log(level) + this.expr.log(level + 1);
	}

}