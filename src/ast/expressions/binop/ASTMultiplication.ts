import ASTBinOp from "./ASTBinOp";
import IInterpreter from "../../../output/interpreter/IInterpreter";

export default class ASTMultiplication extends ASTBinOp {
    protected _operationName(): string {
        return "MULTIPLICATION";
    }

    public evaluate(interpreter: IInterpreter): any {
        return this.left.evaluate(interpreter) * this.right.evaluate(interpreter);
    }
}