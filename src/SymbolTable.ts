export default class SymbolTable<V> {

	private readonly _parent: SymbolTable<V> | null;

	private readonly _symbols: Map<string, V> = new Map();

	constructor(parent: SymbolTable<V> | null = null) {
		this._parent = parent;
	}

	public lookup(name: string, recursive = false): V | undefined {
		const s = this._symbols.get(name);
		if (s !== undefined) {
			return s;
		} else {
			if (recursive && this._parent) {
				return this._parent.lookup(name, recursive);
			} else {
				throw new Error(`Undefined symbol "${name}"`);
			}
		}
	}

	public insert(name: string, value: V): void {
		this._symbols.set(name, value);
	}
	
}