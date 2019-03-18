import ASTBinOp from "./ASTBinOp";
import ASTExpression from "../ASTExpression";
import BinOpType from "../ComparationType";
import ISemanticAnalyzer from "../../../semantic/ISemanticAnalyzer";
import Type from "../../../semantic/Type";
import IInterpreter from "../../../output/interpreter/IInterpreter";
import SemanticError from "../../../semantic/exceptions/SemanticError";
import IBytecodeGenerator from "../../../bytecode/IBytecodeGenerator";
import Op from "../../../bytecode/Op";
import OpExpr from "../../../bytecode/OpExpr";

export default class ASTComparation extends ASTBinOp {

	public readonly type: BinOpType;

    constructor(left: ASTExpression, type: BinOpType, right: ASTExpression) {
        super(left, right);
        this.type = type;
    }
    
    protected _operationName(): string {
        switch (this.type) {
			case BinOpType.EQ:
				return "==";
			case BinOpType.NOTEQ:
				return "!=";
			case BinOpType.LT:
				return "<";
			case BinOpType.LTEQ:
				return "<=";
			case BinOpType.GT:
				return ">";
			case BinOpType.GTEQ:
				return ">=";
		}
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
			case BinOpType.EQ:
				return (left === right);
			case BinOpType.NOTEQ:
				return (left !== right);
			case BinOpType.LT:
				return (left < right);
			case BinOpType.LTEQ:
				return (left <= right);
			case BinOpType.GT:
				return (left > right);
			case BinOpType.GTEQ:
				return (left >= right);
		}
		return undefined;
	}
	
	public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in comparations");
	}
}