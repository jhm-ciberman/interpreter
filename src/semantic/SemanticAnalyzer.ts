import Scope from "./Scope";
import ASTBlock from "../ast/statements/ASTBlock";
import Type from "./Type";
import Symbol from "./Symbol";
import TypeInferenceError from "./exceptions/TypeInferenceError";
import ASTVarDec from "../ast/statements/ASTVarDec";
import TypeAsignationError from "./exceptions/TypeAsignationError";
import ASTIf from "../ast/statements/ASTIf";
import ASTWhile from "../ast/statements/ASTWhile";
import ASTAssign from "../ast/expressions/ASTAssign";
import ASTFloat from "../ast/expressions/ASTFloat";
import ASTInt from "../ast/expressions/ASTInt";
import ASTUnaryOp from "../ast/expressions/ASTUnaryOp";
import ASTVar from "../ast/expressions/ASTVar";
import INodeAnalyzer from "./INodeAnalyzer";
import ASTBinOp from "../ast/expressions/binop/ASTBinOp";
import ASTComparation from "../ast/expressions/binop/ASTComparation";
import SemanticError from "./exceptions/SemanticError";

export default class SemanticAnalyzer implements INodeAnalyzer {
	
	private _scope: Scope = new Scope();

	public readonly TYPE_INT: Type;
	public readonly TYPE_FLOAT: Type;
	public readonly TYPE_BOOL: Type;

	constructor() {
		this.TYPE_INT   = this._scope.declareType("int");
		this.TYPE_FLOAT = this._scope.declareType("float");
		this.TYPE_BOOL  = this._scope.declareType("bool");
	}

	public analyze(program: ASTBlock) {
		program.analyze(this);
	}

	private _typeFor(typeName: string): Type {
		const type = this._scope.lookupType(typeName);
		if (type === undefined) {
			throw new Error("Unknown type " + typeName);
		}
		return type;
	}

	private _symbolFor(symbolName: string): Symbol {
		const name = this._scope.lookupName(symbolName);
		if (name === undefined) {
			throw new Error("Unknown variable " + name);
		}
		return name;
	}

	private _inferType(node: ASTVarDec, decType?: Type, infType?: Type): Type {
		if (!decType) {
			if (!infType) {
				throw new TypeInferenceError(node);
			}
			return infType;
		}
		if (!infType) {
			return decType;
		}
		if (infType === decType) {
			return decType;
		}
		throw new TypeAsignationError(node, decType, infType);
	}


	public visitIf(node: ASTIf): void {
		node.condition.analyze(this)
		if (node.then) {
			node.then.analyze(this)
		}
		if (node.else) {
			node.else.analyze(this)
		}
	}
	
	public visitBlock(node: ASTBlock): void {
		for (const child of node.children) {
			child.analyze(this);
		}
	}
	
	public visitVarDec(node: ASTVarDec): void {
		const decType = node.type ? this._typeFor(node.type) : undefined;
		const infType = node.value ? node.value.resolveType(this) : undefined;
		const type = this._inferType(node, decType, infType);

		this._scope.declareName(node.var.name, type);
	}
	
	public visitWhile(node: ASTWhile): void {
		node.condition.resolveType(this);
		if (node.then) {
			node.then.analyze(this);
		}
		return undefined;
	}
	
	public visitAssign(node: ASTAssign): Type {
		return node.value.resolveType(this);
	}
	
	public visitFloat(node: ASTFloat): Type {
		return this.TYPE_FLOAT;
	}
	
	public visitInt(node: ASTInt): Type {
		return this.TYPE_INT;
	}
	
	public visitUnaryOp(node: ASTUnaryOp): Type {
		return node.expr.resolveType(this);
	}
	
	public visitVar(node: ASTVar): Type {
		return this._symbolFor(node.name).type;
	}

	public visitBinOp(node: ASTBinOp): Type {
		var leftType = node.left.resolveType(this);
		var rightType = node.right.resolveType(this);

		if (leftType === this.TYPE_FLOAT || rightType === this.TYPE_FLOAT) {
			return this.TYPE_FLOAT;
		}
		return this.TYPE_INT;
	}

	public visitComparation(node: ASTComparation): Type {
		var leftType = node.left.resolveType(this);
		var rightType = node.right.resolveType(this);

		if (leftType === rightType) {
			return this.TYPE_BOOL;
		}

		throw new SemanticError(this, "Cannot compare. Types are incompatible: " + leftType.name + " and " + rightType.name);
	}
}