import ASTExpression from "./ASTExpression";
import UnaryOpType from "./UnaryOpType";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";

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

	public resolveType(analizer: ISemanticAnalyzer): Type {
		return this.expr.resolveType(analizer);
	}

	public evaluate(interpreter: IInterpreter): any {
		if (this.type === UnaryOpType.MINUS) {
			return -this.expr.evaluate(interpreter);
		} else if (this.type === UnaryOpType.PLUS) {
			return +this.expr.evaluate(interpreter);
		}
		return undefined;
	}
}

