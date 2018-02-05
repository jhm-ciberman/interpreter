import ASTUnaryOp from "./ASTUnaryOp";

export default class ASTUnaryMinus extends ASTUnaryOp {
	public visit() {
		return -this.expr.visit();
	}
}