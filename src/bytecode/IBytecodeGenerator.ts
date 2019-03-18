import Op from "./Op";
import DataSourceRegister from "./DataSourceRegister";

export default interface IBytecodeGenerator {
    pushOp(op: Op): void;
    requestRegister(): DataSourceRegister;
}