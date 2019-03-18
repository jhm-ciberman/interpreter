import ASTStatement from "./ASTStatement";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Op from "../../bytecode/Op";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import OpNoOp from "../../bytecode/OpNoOp";
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

	public evaluate(visitor: INodeInterpreter): any {
		return visitor.visitBlock(this);
	}


	public analyze(analizer: ISemanticAnalyzer): void {
		for (const child of this.children) {
			child.analyze(analizer);
		}
	}

	public toBytecode(generator: IBytecodeGenerator): Op {
		let last = new OpNoOp();
		generator.pushOp(last);

		for (const child of this.children) {
			last = child.toBytecode(generator);
		}

		return last;
	}
}