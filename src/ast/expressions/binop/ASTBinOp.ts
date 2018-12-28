import ASTExpression from "../ASTExpression";
import BinOpType from "../BinOpType";
import IASTLogger from "../../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../../semantic/ISemanticAnalyzer";
import Type from "../../../semantic/Type";
import IInterpreter from "../../../output/interpreter/IInterpreter";

export default abstract class ASTBinOp extends ASTExpression {
	
	public readonly left: ASTExpression;

	public readonly right: ASTExpression;

	constructor(left: ASTExpression, right: ASTExpression) {
		super();
		this.left = left;
		this.right = right;
	}

	public log(logger: IASTLogger): void {
		logger.printNode(this, " [" + this._operationName() + "]");
		logger.printLine("Left: ");
		logger.visit(this.left);
		logger.printLine("Right: ");
		logger.visit(this.right);
	}

	protected abstract _operationName(): string;

	

	public resolveType(analizer: ISemanticAnalyzer): Type {
		var leftType = this.left.resolveType(analizer);
		var rightType = this.right.resolveType(analizer);

		if (leftType === analizer.TYPE_FLOAT || rightType === analizer.TYPE_FLOAT) {
			return analizer.TYPE_FLOAT;
		}
		return analizer.TYPE_INT;
	}

	
}