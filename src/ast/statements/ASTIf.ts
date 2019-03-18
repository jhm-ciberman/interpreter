import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

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

	public evaluate(visitor: INodeInterpreter): any {
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

	public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in IF statement");
	}
}