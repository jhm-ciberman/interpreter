import ASTExpression from "./ASTExpression";
import UnaryOpType from "./UnaryOpType";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import OpExpr from "../../bytecode/OpExpr";
import INodeVisitor from "../../INodeVisitor";

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

	public evaluate(interpreter: IInterpreter): any {
		if (this.type === UnaryOpType.MINUS) {
			return -this.expr.evaluate(interpreter);
		} else if (this.type === UnaryOpType.PLUS) {
			return +this.expr.evaluate(interpreter);
		}
		return undefined;
	}

	public toBytecode(generator: IBytecodeGenerator): OpExpr {
		throw new Error("Bytecode generation not supported in unary operators");
	}
}

