import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import ASTCompound from "../ASTCompound";

export default class ASTIf extends ASTStatement {

	public readonly condition: ASTExpression;

	public readonly statements: ASTCompound;

	constructor(condition: ASTExpression, statements: ASTCompound) {
		super();
		this.condition = condition;
		this.statements = statements;
	}

}