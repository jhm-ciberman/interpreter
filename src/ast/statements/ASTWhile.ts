import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import IInterpreter from "../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import INodeVisitor from "../../INodeVisitor";

export default class ASTWhile extends ASTStatement {

	public readonly condition: ASTExpression;

	public readonly then: ASTStatement;

	constructor(condition: ASTExpression, st: ASTStatement) {
		super();
		this.condition = condition;
		this.then = st;
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitWhile(this);
	}
	
	public analyze(analizer: ISemanticAnalyzer): void {
		this.condition.analyze(analizer);
		if (this.then) {
			this.then.analyze(analizer);
		}
		return undefined;
	}

	public execute(interpreter: IInterpreter): void {
		while (this.condition.evaluate(interpreter) === true) {
			this.then.execute(interpreter);
		}
	}

	public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in while statement");
	}
}