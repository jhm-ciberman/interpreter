import ASTBinOp from "./ASTBinOp";
import IInterpreter from "../../../output/interpreter/IInterpreter";

export default class ASTAddition extends ASTBinOp {

    protected _operationName(): string {
        return "ADDITION";
    }

    public evaluate(interpreter: IInterpreter): any {
        return this.left.evaluate(interpreter) + this.right.evaluate(interpreter);
    }
}