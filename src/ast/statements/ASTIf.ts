import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import ASTBlock from "./ASTBlock";
import IASTLogger from "../../output/ast/IASTLogger";

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

	public log(logger: IASTLogger): void {
		logger.printNode(this);
		logger.printLine("Condition:");
		logger.visit(this.condition);
		logger.printLine("Then: ");
		logger.visit(this.then);
		if (this.else) {
			logger.printLine("Else: ");
			logger.visit(this.else);
		}
	}
}