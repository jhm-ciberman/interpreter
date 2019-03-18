import ASTBinOp from "./ASTBinOp";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import Op from "../../../bytecode/Op";
import INodeVisitor from "../../../INodeVisitor";
import INodeInterpreter from "../../../output/interpreter/INodeInterpreter";

export default class ASTSubstraction extends ASTBinOp {
	public accept(visitor: INodeVisitor): void {
		visitor.visitSubstraction(this);
	}

    public resolveValue(evaluator: INodeInterpreter): any {
        return evaluator.visitSubstraction(this);
    }

    public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in substractions");
	}
}