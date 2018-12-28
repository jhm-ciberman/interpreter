import ASTBinOp from "./ASTBinOp";
import IInterpreter from "../../../output/interpreter/IInterpreter";

export default class ASTSubstraction extends ASTBinOp {
    protected _operationName(): string {
        return "SUBSTRACTION";
    }

    public evaluate(interpreter: IInterpreter): any {
        return this.left.evaluate(interpreter) - this.right.evaluate(interpreter);
    }
}