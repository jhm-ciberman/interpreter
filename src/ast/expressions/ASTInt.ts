import ASTExpression from "./ASTExpression";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import OpMov from "../../bytecode/OpMov";
import DataSourceValue from "../../bytecode/DataSourceValue";
import OpExpr from "../../bytecode/OpExpr";
import INodeVisitor from "../../INodeVisitor";

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

	public evaluate(interpreter: IInterpreter): any {
		return this.value;
	}

	public toBytecode(generator: IBytecodeGenerator): OpExpr {
		return new OpMov(generator.requestRegister(), new DataSourceValue(this.value));
	}
}