import SymbolElement from "../../../symbols/SymbolElement";
import Op from "../Op";

export default abstract class OpBinOp extends Op {
    public left: SymbolElement;
    public operand1: SymbolElement;
    public operand2: SymbolElement;

    constructor(left: SymbolElement, operand1: SymbolElement, operand2: SymbolElement) {
        super();
        this.left = left;
        this.operand1 = operand1;
        this.operand2 = operand2;
    }
}