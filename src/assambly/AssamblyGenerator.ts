import IIntRepVisitor from "./IIntRepVisitor";
import OpAdd from "../intrep/op/binop/OpAdd";
import OpAssignInt from "../intrep/op/OpAssignInt";
import RegisterDescriptor from "./RegisterDescriptor";
import SymbolElement from "../symbols/SymbolElement";
import AddressDescriptor from "./AddressDescriptor";
import OpRet from "../intrep/op/OpRet";

export default class AssamblyGenerator implements IIntRepVisitor {

    private _ops: string[] = [];

    private _registers: RegisterDescriptor[] = [];

    private _addressMap: Map<SymbolElement, AddressDescriptor> = new Map();

    constructor() {
        this._registers.push(new RegisterDescriptor('eax'));
        this._registers.push(new RegisterDescriptor('ebx'));
        this._registers.push(new RegisterDescriptor('ecx'));
        this._registers.push(new RegisterDescriptor('edx'));
    }

    public get opStringList(): string[] {
        return this._ops;
    }

    private _getReg(variable: SymbolElement): RegisterDescriptor {
        const address = this._addressMap.get(variable);
        if (!address) {
            throw Error("The variable " + variable.name + " is not declared");
        }

        if (address.getFirstRegister()) {
            return address.getFirstRegister();
        }
        throw Error("The variable " + variable.name + " is not in registers");
    }

    private _store(variable: SymbolElement): RegisterDescriptor {
        const reg = this._registers.pop();
        if (!reg) {
            throw Error("No available registers");
        }
        const d = new AddressDescriptor(variable);
        d.addRegister(reg);
        this._addressMap.set(variable, d);
        return reg;
    }

    public visitAdd(op: OpAdd): void {
        const reg = this._store(op.left);
        const reg1 = this._getReg(op.operand1);
        const reg2 = this._getReg(op.operand2);
        this._ops.push("mov " + reg.name + ", " + reg1.name);
        this._ops.push("add " + reg.name + ", " + reg2.name);
    }
    
    public visitSubstract(op: OpAdd): void {
        const reg = this._store(op.left);
        const reg1 = this._getReg(op.operand1);
        const reg2 = this._getReg(op.operand2);
        this._ops.push("mov " + reg.name + ", " + reg1.name);
        this._ops.push("sub " + reg.name + ", " + reg2.name);
    }
    
    public visitAssignInt(op: OpAssignInt): void {
        const reg = this._store(op.left);
        this._ops.push("mov " + reg.name + ", " + op.value);
    }
    
    public visitRet(op: OpRet): void {
        if (op.symbol) {
            const reg = this._getReg(op.symbol);
            this._ops.push("mov eax, " + reg.name);
        }
    }
}