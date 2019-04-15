import ASTBinOp from "./ASTBinOp";
import INodeVisitor from "../../../INodeVisitor";
import INodeInterpreter from "../../../output/interpreter/INodeInterpreter";

export default class ASTDivision extends ASTBinOp {
	public accept(visitor: INodeVisitor): void {
		visitor.visitDivision(this);
	}

    public resolveValue(evaluator: INodeInterpreter): any {
        return evaluator.visitDivision(this);
    }

    public toBytecode(generator: INodeVisitor): void {
        generator.visitDivision(this);
    }
}