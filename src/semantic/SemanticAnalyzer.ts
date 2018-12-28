import Scope from "./Scope";
import ASTBlock from "../ast/statements/ASTBlock";
import Type from "./Type";
import Symbol from "./Symbol";
import ISemanticAnalyzer from "./ISemanticAnalyzer";
import { type } from "os";

export default class SemanticAnalyzer implements ISemanticAnalyzer {
	
	private _scope: Scope = new Scope();

	public readonly TYPE_INT: Type;
	public readonly TYPE_FLOAT: Type;
	public readonly TYPE_BOOL: Type;

	constructor() {
		this.TYPE_INT   = this._scope.declareType("int");
		this.TYPE_FLOAT = this._scope.declareType("float");
		this.TYPE_BOOL = this._scope.declareType("bool");
	}

	public analyze(program: ASTBlock) {
		program.analize(this);
	}

	public typeFor(typeName: string): Type {
		const type = this._scope.lookupType(typeName);
		if (type === undefined) {
			throw new Error("Unknown type " + typeName);
		}
		return type;
	}

	public symbolFor(symbolName: string): Symbol {
		const name = this._scope.lookupName(symbolName);
		if (name === undefined) {
			throw new Error("Unknown variable " + name);
		}
		return name;
	}
}