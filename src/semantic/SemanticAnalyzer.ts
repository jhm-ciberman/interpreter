import ASTStatement from "../ast/statements/ASTStatement";
import Scope from "./Scope";
import ASTBlock from "../ast/statements/ASTBlock";

export default class SemanticAnalyzer {

	private _scope: Scope | null = null;

	public analyze(program: ASTBlock) {
		this._scope = new Scope();
		this._visitCompound(program);
		this._scope = this._scope.parent;
	}

	private _visitCompound(compound: ASTBlock): void {
		for (const child of compound.children) {
			this._visitStatement(child);
		}
	}

	private _visitStatement(st: ASTStatement): void {
		if (st instanceof ASTBlock) {
			this._visitCompound(st);
		}
	}
}