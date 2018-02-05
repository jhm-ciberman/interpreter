import ASTBinOp from "./ASTBinOp";
import AST from "../AST";
import Token from "../../Lexer/Token";

export default class ASTAddition extends ASTBinOp {

	public eval(): number {
		return this.left.eval() + this.right.eval();
	}
}