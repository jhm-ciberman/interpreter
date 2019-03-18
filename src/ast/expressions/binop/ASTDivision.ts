import ASTBinOp from "./ASTBinOp";
import IInterpreter from "../../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import Op from "../../../bytecode/Op";
import OpExpr from "../../../bytecode/OpExpr";

export default class ASTDivision extends ASTBinOp {
    protected _operationName(): string {
        return "DIVISION";
    }

    public evaluate(interpreter: IInterpreter): any {
        return this.left.evaluate(interpreter) / this.right.evaluate(interpreter);
    }

    public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in divisions");
	}
}