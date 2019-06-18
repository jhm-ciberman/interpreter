import Scope from "../symbols/Scope";
import ASTBlock from "../ast/statements/ASTBlock";
import Type from "../symbols/Type";
import Symbol from "../symbols/SymbolElement";
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
import ASTBinOp from "../ast/expressions/binop/ASTBinOp";
import ASTComparation from "../ast/expressions/binop/ASTComparation";
import SemanticError from "./exceptions/SemanticError";
import INodeVisitor from "../INodeVisitor";
import ASTAddition from "../ast/expressions/binop/ASTAddition";
import ASTDivision from "../ast/expressions/binop/ASTDivision";
import ASTMultiplication from "../ast/expressions/binop/ASTMultiplication";
import ASTSubstraction from "../ast/expressions/binop/ASTSubstraction";

export default class SemanticAnalyzer implements INodeVisitor {
	
	private _scope: Scope = new Scope();

	public readonly TYPE_INT: Type;
	public readonly TYPE_FLOAT: Type;
	public readonly TYPE_BOOL: Type;
	public readonly TYPE_VOID: Type;

	constructor() {
		this.TYPE_INT   = this._scope.declareType("int");
		this.TYPE_FLOAT = this._scope.declareType("float");
		this.TYPE_BOOL  = this._scope.declareType("bool");
		this.TYPE_VOID  = this._scope.declareType("void");
	}

	public analyze(program: ASTBlock) {
		program.accept(this);
	}

	public get globalScope() {
		return this._scope;
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

	private _inferType(node: ASTVarDec): Type {
		
		// If the left hand side has a type defined
		if (node.type) {
			const leftType = this._typeFor(node.type);

			if (! node.value) {
				return leftType;
			}

			node.value.accept(this);
			let rightType = node.value.type || this.TYPE_VOID;

			if (leftType !== rightType) {
				throw new TypeAsignationError(node, leftType, rightType);
			}
		}
		
		// If the left hand side do NOT has a type defined
		// And the right hand side has no value defined, then throw an error

		if (! node.value) {
			throw new TypeInferenceError(node);
		}

		// If the right hand side has a value defined, then we visit the node 
		// in order to infer the type

		node.value.accept(this);
		return node.value.type || this.TYPE_VOID;		
	}

	public visitIf(node: ASTIf): void {
		node.condition.accept(this)
		if (node.then) {
			node.then.accept(this)
		}
		if (node.else) {
			node.else.accept(this)
		}
	}
	
	public visitBlock(node: ASTBlock): void {
		for (const child of node.children) {
			child.accept(this);
		}
	}
	
	public visitVarDec(node: ASTVarDec): void {
		const type = this._inferType(node);
		this._scope.declareName(node.var.name, type);
	}
	
	public visitWhile(node: ASTWhile): void {
		node.condition.accept(this);
		if (node.then) {
			node.then.accept(this);
		}
		return undefined;
	}
	
	public visitAssign(node: ASTAssign): void {
		node.value.accept(this);
		node.type = node.value.type;
	}
	
	public visitFloat(node: ASTFloat): void {
		node.type = this.TYPE_FLOAT;
	}
	
	public visitInt(node: ASTInt): void {
		node.type = this.TYPE_INT;
	}
	
	public visitUnaryOp(node: ASTUnaryOp): void {
		node.expr.accept(this);
		node.type = node.expr.type;
	}
	
	public visitVar(node: ASTVar): void {
		node.type = this._symbolFor(node.name).type;
	}

	public visitComparation(node: ASTComparation): void {
		node.left.accept(this);
		node.right.accept(this);

		if (node.left.type !== node.right.type) {
			const left = node.left.type || this.TYPE_VOID;
			const right = node.left.type || this.TYPE_VOID;
			throw new SemanticError(this, "Cannot compare. Types are incompatible: " + left.name + " and " + right.name);
		}

		node.type = this.TYPE_BOOL;		
	}

	private _visitBinOp(node: ASTBinOp): void {
		node.left.accept(this);
		node.right.accept(this);

		if (node.left.type === this.TYPE_FLOAT || node.right.type === this.TYPE_FLOAT) {
			node.type = this.TYPE_FLOAT;
		} else {
			node.type = this.TYPE_INT;
		}
	}

	public visitAddition(node: ASTAddition): void {
		this._visitBinOp(node);
	}

	public visitDivision(node: ASTDivision): void {
		this._visitBinOp(node);
	}

	public visitMultiplication(node: ASTMultiplication): void {
		this._visitBinOp(node);
	}

	public visitSubstraction(node: ASTSubstraction): void {
		this._visitBinOp(node);
	}

}