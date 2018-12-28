import ASTExpression from "./ASTExpression";
import BinOpType from "./BinOpType";
import IASTLogger from "../../output/ast/IASTLogger";

export default class ASTBinOp extends ASTExpression {
	
	public readonly left: ASTExpression;

	public readonly right: ASTExpression;

	public readonly type: BinOpType;

	constructor(left: ASTExpression, type: BinOpType, right: ASTExpression) {
		super();
		this.left = left;
		this.type = type;
		this.right = right;
	}

	public log(logger: IASTLogger): void {
		logger.printNode(this, " [" + this._operationToString() + "]");
		logger.printLine("Left: ");
		logger.visit(this.left);
		logger.printLine("Right: ");
		logger.visit(this.right);
	}

	private _operationToString(): string {
		switch (this.type) {
			case BinOpType.ADDITION:
				return "+";
			case BinOpType.SUBSTRACTION:
				return "-";
			case BinOpType.MULTIPLICATION:
				return "*";
			case BinOpType.DIVISION:
				return "/";
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
}