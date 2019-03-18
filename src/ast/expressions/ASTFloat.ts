import ASTExpression from "./ASTExpression";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import OpExpr from "../../bytecode/OpExpr";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import INodeAnalyzer from "../../semantic/INodeAnalyzer";
import Type from "../../semantic/Type";

export default class ASTFloat extends ASTExpression {
	
	public readonly value: number;

	constructor(integer: string, real: string) {
		super();
		this.value = parseFloat(integer + "." + real);
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitFloat(this);
	}

	public resolveValue(evaluator: INodeInterpreter): any {
		return evaluator.visitFloat(this);
	}

	public resolveType(analyzer: INodeAnalyzer): Type {
		return analyzer.visitFloat(this);
	}

	public toBytecode(generator: IBytecodeGenerator): OpExpr {
		throw new Error("Bytecode generation not supported in float numbers");
	}
}