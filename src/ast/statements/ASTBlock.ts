import ASTStatement from "./ASTStatement";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

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

	public accept(visitor: INodeVisitor): void {
		visitor.visitBlock(this);
	}

	public execute(visitor: INodeInterpreter): any {
		return visitor.visitBlock(this);
	}

	public toBytecode(generator: INodeVisitor): void {
        generator.visitBlock(this);
    }
}