import ASTBinOp from "./ASTBinOp";
import INodeVisitor from "../../../INodeVisitor";
import INodeInterpreter from "../../../output/interpreter/INodeInterpreter";

export default class ASTAddition extends ASTBinOp {

	public accept(visitor: INodeVisitor): void {
		visitor.visitAddition(this);
	}

    public resolveValue(evaluator: INodeInterpreter): any {
        return evaluator.visitAddition(this);
    }

    public toBytecode(generator: INodeVisitor): void {
        generator.visitAddition(this);
    }
}