import ASTExpression from "./ASTExpression";
import UnaryOpType from "./UnaryOpType";
import Type from "../../semantic/Type";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

export default class ASTUnaryOp extends ASTExpression {

	public readonly expr: ASTExpression;

	public readonly comparationType: UnaryOpType;

	constructor(type: UnaryOpType, expr: ASTExpression) {
		super();
		this.comparationType = type;
		this.expr = expr;
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitUnaryOp(this);
	}

	public resolveValue(evaluator: INodeInterpreter): any {
		return evaluator.visitUnaryOp(this);
	}

	public toBytecode(generator: INodeVisitor): void {
        return generator.visitUnaryOp(this);
    }
}

