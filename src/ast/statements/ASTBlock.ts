import ASTStatement from "./ASTStatement";
import IASTLogger from "../../output/ast/IASTLogger";

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

	public log(logger: IASTLogger): void {
		for (const child of this.children) {
			logger.visit(child);
		}
	}
}