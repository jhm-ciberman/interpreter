import Type from "./Type";
import SymbolTable from "./SymbolTable";
import SymbolElement from "./SymbolElement";

export default class Scope {
	
	public readonly parent: Scope | null;

	private _names: SymbolTable<string, SymbolElement>;

	private _types: SymbolTable<string, Type>;

	private _temp: SymbolTable<number, Type>;

	private _tempCount: number = 0;

	constructor(parent: Scope | null = null) {
		this.parent = parent;
		this._temp = new SymbolTable();
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

	public lookupName(name: string): SymbolElement | undefined {
		return this._names.lookup(name, true);
	}

	public lookupType(name: string): Type | undefined {
		return this._types.lookup(name, true);
	}

	public lookupTemp(name: string): Type | undefined {
		return this._types.lookup(name, false);
	}
	
	public declareName(name: string, type: Type) {
		const symbol = new SymbolElement(name, type);
		this._names.insert(name, symbol);
		return symbol;
	}

	public declareType(name: string): Type {
		const type = new Type(name);
		this._types.insert(name, type);
		return type;
	}

	public declareTemp(type: Type) {
		const symbol = new SymbolElement("T" + this._tempCount, type);
		this._temp.insert(this._tempCount, symbol);
		this._tempCount++;
		return symbol;
	}
}