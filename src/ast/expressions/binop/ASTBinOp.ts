import ASTExpression from "../ASTExpression";
import ISemanticAnalyzer from "../../../semantic/ISemanticAnalyzer";
import Type from "../../../semantic/Type";

export default abstract class ASTBinOp extends ASTExpression {
	
	public readonly left: ASTExpression;

	public readonly right: ASTExpression;

	constructor(left: ASTExpression, right: ASTExpression) {
		super();
		this.left = left;
		this.right = right;
	}

	public resolveType(analizer: ISemanticAnalyzer): Type {
		var leftType = this.left.resolveType(analizer);
		var rightType = this.right.resolveType(analizer);

		if (leftType === analizer.TYPE_FLOAT || rightType === analizer.TYPE_FLOAT) {
			return analizer.TYPE_FLOAT;
		}
		return analizer.TYPE_INT;
	}
}