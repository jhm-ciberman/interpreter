import IIntRepVisitor from "./IIntRepVisitor";
import OpAdd from "../intrep/op/binop/OpAdd";
import OpAssignInt from "../intrep/op/OpAssignInt";
import RegisterDescriptor from "./RegisterDescriptor";
import SymbolElement from "../symbols/SymbolElement";
import AddressDescriptor from "./AddressDescriptor";
import OpRet from "../intrep/op/OpRet";
import AddressManager from "./AddressManager";

export default class AssamblyGenerator implements IIntRepVisitor {

    private _ops: string[] = [];

    private _am: AddressManager = new AddressManager();

    public get opStringList(): string[] {
        return this._ops;
    }

    public visitAdd(op: OpAdd): void {
        const reg = this._am.store(op.left);
        const reg1 = this._am.getReg(op.operand1);
        const reg2 = this._am.getReg(op.operand2);
        this._ops.push("mov " + reg.name + ", " + reg1.name);
        this._ops.push("add " + reg.name + ", " + reg2.name);
    }
    
    public visitSubstract(op: OpAdd): void {
        const reg = this._am.store(op.left);
        const reg1 = this._am.getReg(op.operand1);
        const reg2 = this._am.getReg(op.operand2);
        this._ops.push("mov " + reg.name + ", " + reg1.name);
        this._ops.push("sub " + reg.name + ", " + reg2.name);
    }
    
    public visitAssignInt(op: OpAssignInt): void {
        const reg = this._am.store(op.left);
        this._ops.push("mov " + reg.name + ", " + op.value);
    }
    
    public visitRet(op: OpRet): void {
        if (op.symbol) {
            const reg = this._am.getReg(op.symbol);
            this._ops.push("mov eax, " + reg.name);
        }
    }
}