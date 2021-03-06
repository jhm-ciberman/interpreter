import Type from "./Type";

export default class SymbolElement {
	public readonly name: string;
	public readonly type: Type;

	constructor(name: string, type: Type) {
		this.name = name;
		this.type = type;
	}
}