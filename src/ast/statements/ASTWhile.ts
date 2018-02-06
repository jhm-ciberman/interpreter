import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import ASTBlock from "./ASTBlock";

export default class ASTWhile extends ASTStatement {

	public readonly condition: ASTExpression;

	public readonly then: ASTStatement;

	constructor(condition: ASTExpression, st: ASTStatement) {
		super();
		this.condition = condition;
		this.then = st;
	}

}