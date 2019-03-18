import ASTBinOp from "./ASTBinOp";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import OpBinOp from "../../../bytecode/OpBinOp";
import Op from "../../../bytecode/Op";
import INodeVisitor from "../../../INodeVisitor";
import INodeInterpreter from "../../../output/interpreter/INodeInterpreter";

export default class ASTAddition extends ASTBinOp {

	public accept(visitor: INodeVisitor): void {
		visitor.visitAddition(this);
	}

    public resolveValue(evaluator: INodeInterpreter): any {
        return evaluator.visitAddition(this);
    }

    public toBytecode(generator: IBytecodeGenerator): Op {
        const left = this.left.toBytecode(generator);
        const right = this.right.toBytecode(generator);
		return new OpBinOp("ADD", left, right);
	}
}