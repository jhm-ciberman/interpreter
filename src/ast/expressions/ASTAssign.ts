import ASTVar from "../expressions/ASTVar";
import ASTExpression from "../expressions/ASTExpression";
import Type from "../../semantic/Type";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import INodeAnalyzer from "../../semantic/INodeAnalyzer";
import Op from "../../bytecode/Op";

export default class ASTAssign extends ASTExpression {

	public readonly var: ASTVar;

	public readonly value: ASTExpression; 

	constructor(variable: ASTVar, value: ASTExpression) {
		super();
		this.var = variable;
		this.value = value;
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitAssign(this);
	}

	public resolveValue(evaluator: INodeInterpreter): any {
		return evaluator.visitAssign(this);
	}

	public resolveType(analyzer: INodeAnalyzer): Type {
		return analyzer.visitAssign(this);
	}

	public toBytecode(generator: INodeVisitor): Op[] {
        return generator.visitAssign(this);
    }
}