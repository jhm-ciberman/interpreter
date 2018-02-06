import Type from "./Type";
import SymbolTable from "../SymbolTable";

export default class Scope {
	
	public readonly parent: Scope | null;

	private _symbols: SymbolTable<Symbol> = new SymbolTable();

	private _types: SymbolTable<Type> = new SymbolTable();

	constructor(parent: Scope | null = null) {
		this.parent = parent;
	}

	public createSubscope(): Scope {
		return new Scope(this);
	}


}