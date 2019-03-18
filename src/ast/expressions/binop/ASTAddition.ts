import ASTBinOp from "./ASTBinOp";
import IInterpreter from "../../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import OpBinOp from "../../../bytecode/OpBinOp";
import Op from "../../../bytecode/Op";

export default class ASTAddition extends ASTBinOp {

    protected _operationName(): string {
        return "ADDITION";
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