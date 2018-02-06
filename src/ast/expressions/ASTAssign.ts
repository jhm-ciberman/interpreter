import ASTVar from "../expressions/ASTVar";
import ASTExpression from "../expressions/ASTExpression";

export default class ASTAssign extends ASTExpression {

	public readonly var: ASTVar;

	public readonly value: ASTExpression; 

	constructor(variable: ASTVar, value: ASTExpression) {
		super();
		this.var = variable;
		this.value = value;
	}
}