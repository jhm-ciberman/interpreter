import IDataSource from "./IDataSource";

export default class DataSourceRegister implements IDataSource {
    public index: number;
    constructor(registerIndex: number) {
        this.index = registerIndex;
    }
}