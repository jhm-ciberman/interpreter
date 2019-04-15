import ASTBinOp from "./ASTBinOp";
import INodeVisitor from "../../../INodeVisitor";
import INodeInterpreter from "../../../output/interpreter/INodeInterpreter";

export default class ASTMultiplication extends ASTBinOp {
	public accept(visitor: INodeVisitor): void {
		visitor.visitMultiplication(this);
	}

    public resolveValue(evaluator: INodeInterpreter): any {
        return evaluator.visitMultiplication(this);
    }

    public toBytecode(generator: INodeVisitor): void {
        generator.visitMultiplication(this);
    }
}