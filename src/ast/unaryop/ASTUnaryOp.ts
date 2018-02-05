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
		let str = super.log(level);
		str += this.expr.log(level + 1);
		return str;
	}

}