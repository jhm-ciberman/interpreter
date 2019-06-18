import Op from "./Op";
import IIntRepVisitor from "../../assambly/IIntRepVisitor";
import SymbolElement from "../../symbols/SymbolElement";

export default class OpRet extends Op {
    public symbol: SymbolElement | undefined;

    constructor(symbol: SymbolElement | undefined) {
        super();
        this.symbol = symbol;
    }

    public accept(visitor: IIntRepVisitor): void {
        visitor.visitRet(this);
    }

    public toString(): string {
        if (this.symbol) {
            return "ret " + this.symbol.name + ";"; 
        } else {
            return "ret;"
        }
    }
}