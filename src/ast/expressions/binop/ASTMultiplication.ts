import ASTBinOp from "./ASTBinOp";
import IInterpreter from "../../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import Op from "../../../bytecode/Op";
import OpExpr from "../../../bytecode/OpExpr";
import INodeVisitor from "../../../INodeVisitor";

export default class ASTMultiplication extends ASTBinOp {
	public accept(visitor: INodeVisitor): void {
		visitor.visitMultiplication(this);
	}

    public evaluate(interpreter: IInterpreter): any {
        return this.left.evaluate(interpreter) * this.right.evaluate(interpreter);
    }

    public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in multiplications");
	}
}