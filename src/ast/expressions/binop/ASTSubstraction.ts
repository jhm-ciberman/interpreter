import ASTBinOp from "./ASTBinOp";
import INodeVisitor from "../../../INodeVisitor";
import INodeInterpreter from "../../../output/interpreter/INodeInterpreter";

export default class ASTSubstraction extends ASTBinOp {
	public accept(visitor: INodeVisitor): void {
		visitor.visitSubstraction(this);
	}

    public resolveValue(evaluator: INodeInterpreter): any {
        return evaluator.visitSubstraction(this);
    }

	public toBytecode(generator: INodeVisitor): void {
        generator.visitSubstraction(this);
    }
}