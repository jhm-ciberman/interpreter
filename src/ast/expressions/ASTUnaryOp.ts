import ASTExpression from "./ASTExpression";
import UnaryOpType from "./UnaryOpType";
import Type from "../../semantic/Type";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import INodeAnalyzer from "../../semantic/INodeAnalyzer";
import Op from "../../bytecode/Op";

export default class ASTUnaryOp extends ASTExpression {

	public readonly expr: ASTExpression;

	public readonly type: UnaryOpType;

	constructor(type: UnaryOpType, expr: ASTExpression) {
		super();
		this.type = type;
		this.expr = expr;
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitUnaryOp(this);
	}

	public resolveValue(evaluator: INodeInterpreter): any {
		return evaluator.visitUnaryOp(this);
	}

	public resolveType(analyzer: INodeAnalyzer): Type {
		return analyzer.visitUnaryOp(this);
	}

	public toBytecode(generator: INodeVisitor): Op[] {
        return generator.visitUnaryOp(this);
    }
}

