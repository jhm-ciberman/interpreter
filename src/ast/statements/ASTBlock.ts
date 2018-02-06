import ASTStatement from "./ASTStatement";

export default class ASTBlock extends ASTStatement {

	private readonly _children: ASTStatement[];

	constructor(children: ASTStatement[]) {
		super();
		this._children = children;
	}

	/**
	 * Iterator function
	 */
	public get children() {
		return this._children[Symbol.iterator]();
	}

}