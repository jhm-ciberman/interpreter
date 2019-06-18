import SymbolElement from "../symbols/SymbolElement";
import RegisterDescriptor from "./RegisterDescriptor";
import AddressDescriptor from "./AddressDescriptor";

export default class AddressManager {

    private _registers: RegisterDescriptor[] = [];

    private _addressMap: Map<SymbolElement, AddressDescriptor> = new Map();

    constructor() {
        const regNames = ['eax', 'ebx', 'ecx', 'edx'];

        this._registers = regNames.map(name => new RegisterDescriptor(name));
    }

    public getReg(variable: SymbolElement): RegisterDescriptor {
        const address = this._addressMap.get(variable);
        if (!address) {
            throw Error("The variable " + variable.name + " is not declared");
        }

        if (address.getFirstRegister()) {
            return address.getFirstRegister();
        }
        throw Error("The variable " + variable.name + " is not in registers");
    }

    public store(variable: SymbolElement): RegisterDescriptor {
        const reg = this._registers.pop();
        if (!reg) {
            throw Error("No available registers to store variable " + variable.name);
        }
        const d = new AddressDescriptor(variable);
        d.addRegister(reg);
        this._addressMap.set(variable, d);
        return reg;
    }
}