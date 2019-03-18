import IDataSource from "./IDataSource";

export default class DataSourceValue implements IDataSource {
    public value: number;
    constructor(value: number) {
        this.value = value;
    }
}