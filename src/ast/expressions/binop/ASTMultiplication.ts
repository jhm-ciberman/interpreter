import ASTBinOp from "./ASTBinOp";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import Op from "../../../bytecode/Op";
import INodeVisitor from "../../../INodeVisitor";
import INodeInterpreter from "../../../output/interpreter/INodeInterpreter";

export default class ASTMultiplication extends ASTBinOp {
	public accept(visitor: INodeVisitor): void {
		visitor.visitMultiplication(this);
	}

    public resolveValue(evaluator: INodeInterpreter): any {
        return evaluator.visitMultiplication(this);
    }

    public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in multiplications");
	}
}