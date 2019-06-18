import OpBinOp from "./OpBinOp";
import IIntRepVisitor from "../../../assambly/IIntRepVisitor";

export default class OpSubstract extends OpBinOp {
    public accept(visitor: IIntRepVisitor): void {
        visitor.visitSubstract(this);
    }

    public toString(): string {
        return this.left.name + " = " + this.operand1.name + " - " + this.operand2.name + ";"; 
    }
}