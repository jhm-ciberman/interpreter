import ASTExpression from "./ASTExpression";
import Type from "../../semantic/Type";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import OpMov from "../../bytecode/OpMov";
import DataSourceValue from "../../bytecode/DataSourceValue";
import OpExpr from "../../bytecode/OpExpr";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import INodeAnalyzer from "../../semantic/INodeAnalyzer";

export default class ASTInt extends ASTExpression {
	
	public readonly value: number;

	constructor(value: string) {
		super();
		this.value = parseInt(value);
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitInt(this);
	}

	public resolveValue(evaluator: INodeInterpreter): any {
		return evaluator.visitInt(this);
	}

	public resolveType(analyzer: INodeAnalyzer): Type {
		return analyzer.visitInt(this);
	}

	public toBytecode(generator: IBytecodeGenerator): OpExpr {
		return new OpMov(generator.requestRegister(), new DataSourceValue(this.value));
	}
}