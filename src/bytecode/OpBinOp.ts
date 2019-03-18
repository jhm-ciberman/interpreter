import Op from "./Op";
import IDataSource from "./IDataSource";
import OpExpr from "./OpExpr";

export default class OpBinOp extends OpExpr {
    public type: string;
    public source: IDataSource;

    constructor(type: string, dest: IDataSource, source: IDataSource) {
        super(dest);
        this.type = type;
        this.source = source;
    }
}