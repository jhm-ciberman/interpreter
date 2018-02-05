import ASTUnaryOp from "./ASTUnaryOp";

export default class ASTUnaryMinus extends ASTUnaryOp {
	public eval() {
		return -this.expr.eval();
	}
}