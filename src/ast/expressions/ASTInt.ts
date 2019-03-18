import ASTExpression from "./ASTExpression";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import OpMov from "../../bytecode/OpMov";
import DataSourceValue from "../../bytecode/DataSourceValue";
import OpExpr from "../../bytecode/OpExpr";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

export default class ASTInt extends ASTExpression {
	
	public readonly value: number;

	constructor(value: string) {
		super();
		this.value = parseInt(value);
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitInt(this);
	}

	public resolveType(analizer: ISemanticAnalyzer): Type {
		return analizer.TYPE_INT;
	}

	public evaluate(evaluator: INodeInterpreter): any {
		return evaluator.visitInt(this);
	}

	public toBytecode(generator: IBytecodeGenerator): OpExpr {
		return new OpMov(generator.requestRegister(), new DataSourceValue(this.value));
	}
}