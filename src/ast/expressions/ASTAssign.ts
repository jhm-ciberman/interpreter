import ASTVar from "../expressions/ASTVar";
import ASTExpression from "../expressions/ASTExpression";
import IASTLogger from "../../output/ast/IASTLogger";

export default class ASTAssign extends ASTExpression {

	public readonly var: ASTVar;

	public readonly value: ASTExpression; 

	constructor(variable: ASTVar, value: ASTExpression) {
		super();
		this.var = variable;
		this.value = value;
	}

	public log(logger: IASTLogger): void {
		logger.printNode(this, " [" + this.var.name + "]")
		logger.visit(this.value);
	}
}