import ASTExpression from "./ASTExpression";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

export default class ASTFloat extends ASTExpression {
	
	public readonly value: number;

	constructor(integer: string, real: string) {
		super();
		this.value = parseFloat(integer + "." + real);
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitFloat(this);
	}

	public resolveValue(evaluator: INodeInterpreter): any {
		return evaluator.visitFloat(this);
	}

	public toBytecode(generator: INodeVisitor): void {
        return generator.visitFloat(this);
    }
}