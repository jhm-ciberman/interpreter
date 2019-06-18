import SymbolElement from "../../symbols/SymbolElement";
import Op from "./Op";
import IIntRepVisitor from "../../assambly/IIntRepVisitor";

export default class OpAssignInt extends Op {

    public left: SymbolElement;

    public value: number;

    constructor(left: SymbolElement, value: number) {
        super();
        this.left = left;
        this.value = value;
    }

    public accept(visitor: IIntRepVisitor): void {
        visitor.visitAssignInt(this);
    }

    public toString(): string {
        return this.left.name + " = " + this.value + ";"; 
    }
}