import SymbolTable from "./SymbolTable";

export default class Context {

	public readonly parent: Context | null;

	private _vars: SymbolTable<any> = new SymbolTable();

	constructor(parent: Context | null = null) {
		this.parent = parent;
	}

	public lookupVar<T>(name: string): T {
		return this._vars.lookup(name, true);
	}

	public insertVar<T>(name: string, value: T): T {
		this._vars.insert(name, value);
		return value;
	}

}