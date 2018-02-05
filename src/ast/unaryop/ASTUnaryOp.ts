import AST from "../AST";
import ASTInt from "../ASTInt";
import Token from "../../Lexer/Token";
import { TokenType } from "../../Lexer/TokenType";

export default abstract class ASTBinOp extends AST {

	public expr: AST;

	constructor(op: Token, expr: AST) {
		super(op);
		this.expr = expr;
	}

	public log(level: number): string {
		return super.log(level) + this.expr.log(level + 1);
	}

}