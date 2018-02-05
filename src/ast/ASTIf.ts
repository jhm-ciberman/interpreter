import AST from "./AST";
import ASTCompound from "./ASTCompound";

export default class ASTIf extends AST {

	private _cond: AST;

	private _statements: ASTCompound;

	constructor(cond: AST, statements: ASTCompound) {
		super();
		this._cond = cond;
		this._statements = statements;
	}

	public eval() {
		if (this._cond.eval()) {
			return this._statements.eval();
		}
	}

}