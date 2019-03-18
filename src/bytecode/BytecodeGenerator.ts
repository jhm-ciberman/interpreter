import IBytecodeGenerator from "./IBytecodeGenerator";
import Op from "./Op";
import ASTStatement from "../ast/statements/ASTStatement";
import DataSourceRegister from "./DataSourceRegister";
import DataSourceValue from "./DataSourceValue";

export default class BytecodeGenerator implements IBytecodeGenerator {
    
    private _operations: Op[] = [];

    private _registers: DataSourceRegister[] = [];

    constructor(regCount: number) {
        for (let i = 0; i < regCount; i++) {
            this._registers[i] = new DataSourceRegister(i);
        }
        this._registers = this._registers.reverse();
    }

    public generate(node: ASTStatement): Op[] {
        this._operations = [];
        node.toBytecode(this);
        return this._operations;
    }
    
    public pushOp(op: Op): void {
        this._operations.push(op);
    }

    public requestRegister(): DataSourceRegister {
        const reg = this._registers.pop();
        if (!reg) {
            throw new Error("No registers available");
        }
        return reg;
    }

    public freeRegister(reg: DataSourceRegister) {
        this._registers.push(reg);
    }
}