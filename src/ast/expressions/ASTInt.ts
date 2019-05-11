import ASTExpression from "./ASTExpression";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

export default class ASTInt extends ASTExpression {
	
	public readonly value: number;

	constructor(value: string) {
		super();
		this.value = parseInt(value);
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitInt(this);
	}

	public resolveValue(evaluator: INodeInterpreter): any {
		return evaluator.visitInt(this);
	}
}