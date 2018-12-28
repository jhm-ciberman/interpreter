import Type from "./Type";
import SymbolTable from "../SymbolTable";
import Symbol from "./Symbol";

export default class Scope {
	
	public readonly parent: Scope | null;

	private _names: SymbolTable<Symbol>;

	private _types: SymbolTable<Type>;

	constructor(parent: Scope | null = null) {
		this.parent = parent;
		if (this.parent) {
			this._names = new SymbolTable(this.parent._names);
			this._types = new SymbolTable(this.parent._types);
		} else {
			this._names = new SymbolTable();
			this._types = new SymbolTable();
		}
	}

	public createSubscope(): Scope {
		return new Scope(this);
	}

	public lookupName(name: string): Symbol | undefined {
		return this._names.lookup(name);
	}
	public lookupType(name: string): Type | undefined {
		return this._types.lookup(name);
	}
	
	public declareName(name: string, type: Type) {
		const symbol = new Symbol(name, type);
		this._names.insert(name, symbol);
		return symbol;
	}
	public declareType(name: string): Type {
		const type = new Type(name);
		this._types.insert(name, type);
		return type;
	}


}