import ASTExpression from "../ASTExpression";

export default abstract class ASTBinOp extends ASTExpression {
	
	public readonly left: ASTExpression;

	public readonly right: ASTExpression;

	constructor(left: ASTExpression, right: ASTExpression) {
		super();
		this.left = left;
		this.right = right;
	}
}