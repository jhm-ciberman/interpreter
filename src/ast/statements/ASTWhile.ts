import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import INodeAnalyzer from "../../semantic/INodeAnalyzer";

export default class ASTWhile extends ASTStatement {

	public readonly condition: ASTExpression;

	public readonly then: ASTStatement;

	constructor(condition: ASTExpression, st: ASTStatement) {
		super();
		this.condition = condition;
		this.then = st;
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitWhile(this);
	}

	public execute(visitor: INodeInterpreter): any {
		visitor.visitWhile(this);
	}

	public analyze(analyzer: INodeAnalyzer): void {
		analyzer.visitWhile(this);
	}

	public toBytecode(generator: INodeVisitor): void {
        generator.visitWhile(this);
    }
}