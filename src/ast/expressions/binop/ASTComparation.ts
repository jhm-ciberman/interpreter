import ASTBinOp from "./ASTBinOp";
import ASTExpression from "../ASTExpression";
import ComparationType from "../ComparationType";
import ISemanticAnalyzer from "../../../semantic/ISemanticAnalyzer";
import Type from "../../../semantic/Type";
import SemanticError from "../../../semantic/exceptions/SemanticError";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import Op from "../../../bytecode/Op";
import INodeVisitor from "../../../INodeVisitor";
import INodeInterpreter from "../../../output/interpreter/INodeInterpreter";

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
    
    public evaluate(evaluator: INodeInterpreter): any {
        return evaluator.visitComparation(this);
    }
	
	public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in comparations");
	}
}