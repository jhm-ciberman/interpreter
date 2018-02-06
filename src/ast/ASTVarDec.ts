import ASTCompound from "./ASTCompound";
import Token from "../lexer/Token";
import ASTVar from "./expressions/ASTVar";
import ASTStatement from "./statements/ASTStatement";

export default class ASTVarDec extends ASTStatement {

	public readonly var: ASTVar;

	constructor(variable: ASTVar) {
		super();
		this.var = variable;
	}
}