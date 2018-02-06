import ASTCompound from "../ast/ASTCompound";
import ASTStatement from "../ast/statements/ASTStatement";
import Scope from "./Scope";

export default class SemanticAnalyzer {

	private _scope: Scope | null = null;

	public analyze(program: ASTCompound) {
		this._scope = new Scope();
		this._visitCompound(program);
		this._scope = this._scope.parent;
	}

	private _visitCompound(compound: ASTCompound): void {
		for (const child of compound.children) {
			this._visitStatement(child);
		}
	}

	private _visitStatement(st: ASTStatement): void {
		if (st instanceof ASTCompound) {
			this._visitCompound(st);
		}
	}
}