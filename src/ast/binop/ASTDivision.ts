import ASTBinOp from "./ASTBinOp";
import AST from "../AST";
import Token from "../../Lexer/Token";

export default class ASTDivision extends ASTBinOp {

	public visit(): number {
		return this.left.visit() / this.right.visit();
	}
}