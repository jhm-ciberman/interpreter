import ASTUnaryOp from "./ASTUnaryOp";

export default class ASTUnaryPlus extends ASTUnaryOp {
	public visit() {
		return +this.expr.visit();
	}
}