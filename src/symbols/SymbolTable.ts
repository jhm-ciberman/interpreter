export default class SymbolTable<K, V> {

	private readonly _parent: SymbolTable<K, V> | null;

	private readonly _symbols: Map<K, V> = new Map();

	constructor(parent: SymbolTable<K, V> | null = null) {
		this._parent = parent;
	}

	public lookup(name: K, recursive = false): V | undefined {
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

	public insert(name: K, value: V): void {
		this._symbols.set(name, value);
	}
	
}