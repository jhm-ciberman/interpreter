import SymbolElement from "../symbols/SymbolElement";
import RegisterDescriptor from "./RegisterDescriptor";

export default class AddressDescriptor {

    private _locations: RegisterDescriptor[] = [];

    private _symbol: SymbolElement;

    constructor(symbol: SymbolElement) {
        this._symbol = symbol;
    }

    addRegister(reg: RegisterDescriptor): void {   
        this._locations.push(reg);
    }

    getFirstRegister(): RegisterDescriptor {
        return this._locations[0];
    }
}