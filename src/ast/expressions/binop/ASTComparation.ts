import ASTBinOp from "./ASTBinOp";
import ASTExpression from "../ASTExpression";
import BinOpType from "../BinOpType";
import ISemanticAnalyzer from "../../../semantic/ISemanticAnalyzer";
import Type from "../../../semantic/Type";
import IInterpreter from "../../../output/interpreter/IInterpreter";

export default class ASTComparation extends ASTBinOp {

	public readonly type: BinOpType;

    constructor(left: ASTExpression, type: BinOpType, right: ASTExpression) {
        super(left, right);
        this.type = type;
    }
    
    protected _operationName(): string {
        switch (this.type) {
			case BinOpType.EQ:
				return "===";
			case BinOpType.NOTEQ:
				return "!==";
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
		return analizer.TYPE_BOOL;
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
}