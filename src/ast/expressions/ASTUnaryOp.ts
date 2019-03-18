import ASTExpression from "./ASTExpression";
import UnaryOpType from "./UnaryOpType";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import OpExpr from "../../bytecode/OpExpr";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

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

	public resolveType(analizer: ISemanticAnalyzer): Type {
		return this.expr.resolveType(analizer);
	}

	public evaluate(evaluator: INodeInterpreter): any {
		return evaluator.visitUnaryOp(this);
	}

	public toBytecode(generator: IBytecodeGenerator): OpExpr {
		throw new Error("Bytecode generation not supported in unary operators");
	}
}

