import ASTBinOp from "./ASTBinOp";
import IInterpreter from "../../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import Op from "../../../bytecode/Op";

export default class ASTSubstraction extends ASTBinOp {
    protected _operationName(): string {
        return "SUBSTRACTION";
    }

    public evaluate(interpreter: IInterpreter): any {
        return this.left.evaluate(interpreter) - this.right.evaluate(interpreter);
    }

    public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in substractions");
	}
}