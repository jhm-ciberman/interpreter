import ASTVar from "../expressions/ASTVar";
import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import INodeAnalyzer from "../../semantic/INodeAnalyzer";

export default class ASTVarDec extends ASTStatement {

	public readonly var: ASTVar;

	public readonly type: string | null;
	
	public readonly value: ASTExpression | null;

	constructor(variable: ASTVar, type: string | null, value: ASTExpression | null) {
		super();
		this.var = variable;
		this.type = type;
		this.value = value;
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitVarDec(this);
	}

	public execute(visitor: INodeInterpreter): any {
		return visitor.visitVarDec(this);
	}

	public analyze(analyzer: INodeAnalyzer): void {
		analyzer.visitVarDec(this);
	}

	public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in variable declaration statement");
	}
}