import ASTExpression from "./ASTExpression";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";

export default class ASTInt extends ASTExpression {
	
	public readonly value: number;

	constructor(value: string) {
		super();
		this.value = parseInt(value);
	}

	public log(logger: IASTLogger): void {
		return logger.printNode(this, " = " + this.value );
	}

	public resolveType(analizer: ISemanticAnalyzer): Type {
		return analizer.typeFor("int");
	}

	public evaluate(interpreter: IInterpreter): any {
		return this.value;
	}
}