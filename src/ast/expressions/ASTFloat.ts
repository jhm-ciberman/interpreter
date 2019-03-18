import ASTExpression from "./ASTExpression";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import OpExpr from "../../bytecode/OpExpr";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

export default class ASTFloat extends ASTExpression {
	
	public readonly value: number;

	constructor(integer: string, real: string) {
		super();
		this.value = parseFloat(integer + "." + real);
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitFloat(this);
	}

	public resolveType(analizer: ISemanticAnalyzer): Type {
		return analizer.TYPE_FLOAT;
	}

	public evaluate(evaluator: INodeInterpreter): any {
		return evaluator.visitFloat(this);
	}

	public toBytecode(generator: IBytecodeGenerator): OpExpr {
		throw new Error("Bytecode generation not supported in float numbers");
	}
}