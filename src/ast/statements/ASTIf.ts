import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import ASTBlock from "./ASTBlock";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import IInterpreter from "../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import INodeVisitor from "../../INodeVisitor";

export default class ASTIf extends ASTStatement {

	public readonly condition: ASTExpression;

	public readonly then: ASTStatement;

	public readonly else: ASTStatement | null;

	constructor(condition: ASTExpression, thenStatement: ASTStatement, elseStatment: ASTStatement | null) {
		super();
		this.condition = condition;
		this.then = thenStatement;
		this.else = elseStatment;
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitIf(this);
	}

	public analyze(analizer: ISemanticAnalyzer): void {
		this.condition.analyze(analizer)
		if (this.then) {
			this.then.analyze(analizer)
		}
		if (this.else) {
			this.else.analyze(analizer)
		}
	}

	public execute(interpreter: IInterpreter): void {
		if (this.condition.evaluate(interpreter) === true) {
			this.then.execute(interpreter);
		} else if (this.else) {
			this.else.execute(interpreter);
		}
	}

	public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in IF statement");
	}
}