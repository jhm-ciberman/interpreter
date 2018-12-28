import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import ASTBlock from "./ASTBlock";
import IASTLogger from "../../output/ast/IASTLogger";

export default class ASTWhile extends ASTStatement {

	public readonly condition: ASTExpression;

	public readonly then: ASTStatement;

	constructor(condition: ASTExpression, st: ASTStatement) {
		super();
		this.condition = condition;
		this.then = st;
	}

	public log(logger: IASTLogger): void {
		logger.printNode(this);
		logger.printLine("Condition: ");
		logger.visit(this.condition);
		logger.printLine("Then: ");
		logger.visit(this.then);
	}
	
}