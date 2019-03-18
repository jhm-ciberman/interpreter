import ASTBinOp from "./ASTBinOp";
import IInterpreter from "../../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import Op from "../../../bytecode/Op";
import INodeVisitor from "../../../INodeVisitor";

export default class ASTSubstraction extends ASTBinOp {
	public accept(visitor: INodeVisitor): void {
		visitor.visitSubstraction(this);
	}

    public evaluate(interpreter: IInterpreter): any {
        return this.left.evaluate(interpreter) - this.right.evaluate(interpreter);
    }

    public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in substractions");
	}
}