import ASTExpression from "../ASTExpression";
import INodeAnalyzer from "../../../semantic/INodeAnalyzer";
import Type from "../../../semantic/Type";
import INodeVisitor from "../../../INodeVisitor";

export default abstract class ASTBinOp extends ASTExpression {
	
	public readonly left: ASTExpression;

	public readonly right: ASTExpression;

	constructor(left: ASTExpression, right: ASTExpression) {
		super();
		this.left = left;
		this.right = right;
	}

	public resolveType(analyzer: INodeAnalyzer): Type {
		return analyzer.visitBinOp(this);
	}

}