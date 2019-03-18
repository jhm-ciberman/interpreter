import Op from "./Op";
import IDataSource from "./IDataSource";
import OpExpr from "./OpExpr";

export default class OpMov extends OpExpr {
    public source: IDataSource;
    constructor(dest: IDataSource, source: IDataSource) {
        super(dest);
        this.source = source;
    }
}