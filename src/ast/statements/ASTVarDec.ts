import Token from "../../lexer/Token";
import ASTVar from "../expressions/ASTVar";
import ASTStatement from "./ASTStatement";
import ASTType from "../ASTType";
import ASTExpression from "../expressions/ASTExpression";
import IASTLogger from "../../output/ast/IASTLogger";

export default class ASTVarDec extends ASTStatement {

	public readonly var: ASTVar;

	public readonly type: ASTType | null;
	
	public readonly value: ASTExpression | null;

	constructor(variable: ASTVar, type: ASTType | null, value: ASTExpression | null) {
		super();
		this.var = variable;
		this.type = type;
		this.value = value;
	}

	public log(logger: IASTLogger): void {
		logger.printNode(this, " [" + this.var.name + "]");
	}
}