import ASTVar from "../expressions/ASTVar";
import ASTExpression from "../expressions/ASTExpression";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import OpExpr from "../../bytecode/OpExpr";
import INodeVisitor from "../../INodeVisitor";

export default class ASTAssign extends ASTExpression {

	public readonly var: ASTVar;

	public readonly value: ASTExpression; 

	constructor(variable: ASTVar, value: ASTExpression) {
		super();
		this.var = variable;
		this.value = value;
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitAssign(this);
	}

	public resolveType(analizer: ISemanticAnalyzer): Type {
		return this.value.resolveType(analizer);
	}

	public evaluate(interpreter: IInterpreter): any {
		const value = this.value.evaluate(interpreter);
		interpreter.setVar(this.var.name, value);
		return value;
	}

	public toBytecode(generator: IBytecodeGenerator): OpExpr {
		throw new Error("Bytecode generation not supported in float numbers");
	}
}