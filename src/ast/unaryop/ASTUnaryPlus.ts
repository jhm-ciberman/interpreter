import ASTUnaryOp from "./ASTUnaryOp";

export default class ASTUnaryPlus extends ASTUnaryOp {
	public eval() {
		return +this.expr.eval();
	}
}