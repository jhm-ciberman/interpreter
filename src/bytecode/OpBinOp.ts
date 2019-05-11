import Symbol from "../semantic/Symbol";
import Op from "./Op";

export default class OpBinOp extends Op {
    public left: Symbol;
    public opType: string;
    public operand1: Symbol;
    public operand2: Symbol;

    constructor(left: Symbol, opType: string, operand1: Symbol, operand2: Symbol) {
        super();
        this.left = left;
        this.opType = opType;
        this.operand1 = operand1;
        this.operand2 = operand2;
    }

    public toString(): string {
        return this.left.name + " = " + this.operand1.name + " " + this.opType + " " + this.operand2.name + ";"; 
    }
}