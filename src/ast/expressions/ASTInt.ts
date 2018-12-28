import ASTExpression from "./ASTExpression";
import IASTLogger from "../../output/ast/IASTLogger";

export default class ASTInt extends ASTExpression {
	
	public readonly value: number;

	constructor(value: string) {
		super();
		this.value = parseInt(value);
	}

	public log(logger: IASTLogger): void {
		return logger.printNode(this, " = " + this.value );
	}
}