import ASTStatement from "./ASTStatement";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import IInterpreter from "../../output/interpreter/IInterpreter";

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

	public analyze(analizer: ISemanticAnalyzer): void {
		for (const child of this.children) {
			child.analyze(analizer);
		}
	}

	public execute(interpreter: IInterpreter): void {
		let val: any;
		for (const child of this.children) {
			child.execute(interpreter);
		}
	}
}