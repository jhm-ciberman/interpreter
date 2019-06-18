import SymbolElement from "../symbols/SymbolElement";

export default class RegisterDescriptor {
    
    public readonly name: string;
    
    public content: SymbolElement | undefined = undefined;

    constructor(name: string) {
        this.name = name;
    }
}