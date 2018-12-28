import ASTExpression from "./ASTExpression";
import UnaryOpType from "./UnaryOpType";
import IASTLogger from "../../output/ast/IASTLogger";

export default class ASTUnaryOp extends ASTExpression {

	public readonly expr: ASTExpression;

	public readonly type: UnaryOpType;

	constructor(type: UnaryOpType, expr: ASTExpression) {
		super();
		this.type = type;
		this.expr = expr;
	}

	public log(logger: IASTLogger): void {
		logger.printNode(this);
		logger.visit(this.expr);
	}
}

