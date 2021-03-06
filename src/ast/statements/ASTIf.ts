import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

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

	public accept(visitor: INodeVisitor): void {
		visitor.visitIf(this);
	}

	public execute(visitor: INodeInterpreter): any {
		visitor.visitIf(this);
	}

	public toBytecode(generator: INodeVisitor): void {
        generator.visitIf(this);
    }
}