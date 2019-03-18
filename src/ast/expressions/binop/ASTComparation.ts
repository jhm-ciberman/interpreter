import ASTBinOp from "./ASTBinOp";
import ASTExpression from "../ASTExpression";
import ComparationType from "../ComparationType";
import ISemanticAnalyzer from "../../../semantic/ISemanticAnalyzer";
import Type from "../../../semantic/Type";
import IInterpreter from "../../../output/interpreter/IInterpreter";
import SemanticError from "../../../semantic/exceptions/SemanticError";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import Op from "../../../bytecode/Op";
import INodeVisitor from "../../../INodeVisitor";

export default class ASTComparation extends ASTBinOp {

	public readonly type: ComparationType;

    constructor(left: ASTExpression, type: ComparationType, right: ASTExpression) {
        super(left, right);
        this.type = type;
    }

	public accept(visitor: INodeVisitor): void {
		visitor.visitComparation(this);
	}

	public resolveType(analizer: ISemanticAnalyzer): Type {
		var leftType = this.left.resolveType(analizer);
		var rightType = this.left.resolveType(analizer);

		if (leftType === rightType) {
			return analizer.TYPE_BOOL;
		}

		throw new SemanticError(this, "Cannot compare. Types are incompatible: " + leftType.name + " and " + rightType.name);
    }
    
    public evaluate(interpreter: IInterpreter): any {
        const left = this.left.evaluate(interpreter);
		const right = this.right.evaluate(interpreter);
		switch (this.type) {
			case ComparationType.EQ:
				return (left === right);
			case ComparationType.NOTEQ:
				return (left !== right);
			case ComparationType.LT:
				return (left < right);
			case ComparationType.LTEQ:
				return (left <= right);
			case ComparationType.GT:
				return (left > right);
			case ComparationType.GTEQ:
				return (left >= right);
		}
		return undefined;
	}
	
	public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in comparations");
	}
}