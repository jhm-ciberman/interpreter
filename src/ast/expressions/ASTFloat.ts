import ASTExpression from "./ASTExpression";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import OpExpr from "../../bytecode/OpExpr";

export default class ASTFloat extends ASTExpression {
	
	public readonly value: number;

	constructor(integer: string, real: string) {
		super();
		this.value = parseFloat(integer + "." + real);
	}

	public log(logger: IASTLogger): void {
		return logger.printNode(this, " = " + this.value );
	}

	public resolveType(analizer: ISemanticAnalyzer): Type {
		return analizer.TYPE_FLOAT;
	}

	public evaluate(interpreter: IInterpreter): any {
		return this.value;
	}

	public toBytecode(generator: IBytecodeGenerator): OpExpr {
		throw new Error("Bytecode generation not supported in float numbers");
	}
}