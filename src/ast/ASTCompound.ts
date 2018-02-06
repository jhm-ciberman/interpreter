import ASTStatement from "./statements/ASTStatement";

export default class ASTCompound {

	private readonly _children: ASTStatement[];

	constructor(children: ASTStatement[]) {
		this._children = children;
	}

	/**
	 * Iterator function
	 */
	public get children() {
		return this._children[Symbol.iterator]();
	}

}