import AST from "./AST";

export default class ASTCompound extends AST {

	private readonly _childs: AST[];

	constructor(childs: AST[]) {
		super()
		this._childs = childs;
	}

	public eval() {
		let r: any;
		for (const child of this._childs) {
			r = child.eval();
		}
		return r;
	}

	public log(level: number) {
		let str = super.log(level);
		for (const child of this._childs) {
			str += child.log(level + 1);
		}
		return str;
	}

}