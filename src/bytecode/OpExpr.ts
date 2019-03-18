import Op from "./Op";
import IDataSource from "./IDataSource";

export default class OpExpr extends Op {
    public reg: IDataSource;

    constructor(reg: IDataSource) {
        super();
        this.reg = reg;
    }
}