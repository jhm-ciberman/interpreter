import Token from "../../lexer/Token";
import { TokenType } from "../../lexer/TokenType";
import ASTExpression from "./ASTExpression";
import BinOpType from "./BinOpType";

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
}