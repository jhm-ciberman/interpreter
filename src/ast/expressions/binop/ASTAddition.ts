import ASTBinOp from "./ASTBinOp";
import IInterpreter from "../../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import OpBinOp from "../../../bytecode/OpBinOp";
import Op from "../../../bytecode/Op";
import INodeVisitor from "../../../INodeVisitor";

export default class ASTAddition extends ASTBinOp {

	public accept(visitor: INodeVisitor): void {
		visitor.visitAddition(this);
	}

    public evaluate(interpreter: IInterpreter): any {
        return this.left.evaluate(interpreter) + this.right.evaluate(interpreter);
    }

    public toBytecode(generator: IBytecodeGenerator): Op {
        const left = this.left.toBytecode(generator);
        const right = this.right.toBytecode(generator);
		return new OpBinOp("ADD", left, right);
	}
}