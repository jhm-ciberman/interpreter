import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import ASTBlock from "./ASTBlock";

export default class ASTIf extends ASTStatement {

	public readonly condition: ASTExpression;

	public readonly then: ASTStatement;

	public readonly else: ASTStatement | null;

	constructor(condition: ASTExpression, thenStatement: ASTStatement, elseStatment: ASTStatement | null) {
		super();
		this.condition = condition;
		this.then = thenStatement;
		this.else = elseStatment;
	}

}