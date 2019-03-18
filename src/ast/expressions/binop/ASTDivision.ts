import ASTBinOp from "./ASTBinOp";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import Op from "../../../bytecode/Op";
import OpExpr from "../../../bytecode/OpExpr";
import INodeVisitor from "../../../INodeVisitor";
import INodeInterpreter from "../../../output/interpreter/INodeInterpreter";

export default class ASTDivision extends ASTBinOp {
	public accept(visitor: INodeVisitor): void {
		visitor.visitDivision(this);
	}

    public evaluate(evaluator: INodeInterpreter): any {
        return evaluator.visitDivision(this);
    }

    public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in divisions");
	}
}