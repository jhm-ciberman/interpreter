import Symbol from "../semantic/Symbol";
import SymbolTable from "../SymbolTable";

export default class Context {

	public readonly parent: Context | null;

	private _vars: SymbolTable<any> = new SymbolTable();

	constructor(parent: Context | null = null) {
		this.parent = parent;
	}

	public lookupVar<T>(name: string): T {
		console.log("LOOKUP: ", name);
		return this._vars.lookup(name, true);
	}

	public insertVar<T>(name: string, value: T): void {
		console.log("INSERT: ", name, value);
		return this._vars.insert(name, value);
	}

}