import ASTStatement from "../ast/statements/ASTStatement";
import Scope from "./Scope";
import ASTBlock from "../ast/statements/ASTBlock";
import NodeVisitor from "../NodeVisitor";
import ASTVarDec from "../ast/statements/ASTVarDec";
import ASTAssign from "../ast/expressions/ASTAssign";
import ASTBinOp from "../ast/expressions/ASTBinOp";
import ASTUnaryOp from "../ast/expressions/ASTUnaryOp";
import ASTInt from "../ast/expressions/ASTInt";
import ASTVar from "../ast/expressions/ASTVar";
import ASTIf from "../ast/statements/ASTIf";
import ASTWhile from "../ast/statements/ASTWhile";
import Type from "./Type";

export default class SemanticAnalyzer extends NodeVisitor<Type | undefined> {
	
	private _scope: Scope = new Scope();

	constructor() {
		super();
		this._scope.declareType("int");
		this._scope.declareType("float");
	}
	public analyze(program: ASTBlock) {

		this._visit(program);
	}

	protected _visitBlock(ast: ASTBlock): undefined {
		for (const child of ast.children) {
			this._visit(child);
		}
		return undefined;
	}
	protected _visitVarDec(ast: ASTVarDec): undefined {
		let decType: Type | undefined;
		let infType: Type | undefined;
		if (ast.type) {
			decType = this._visit(ast.type);
		} 
		if (ast.value) {
			infType = this._visit(ast.value);
		}
		if (decType && infType && decType !== infType) {
			throw new Error(`Type "${decType.name}" is not asignable to type "${infType.name}"`);
		}
		/*if (decType === infType) {
			if (decType === undefined) {
			throw new Error("Type is not defined and cannot be infered");
			}
		}*/
		
		return undefined;
	}
	protected _visitAssign(ast: ASTAssign): Type {
		throw new Error("Method not implemented.");
	}
	protected _visitBinOp(ast: ASTBinOp): Type {
		throw new Error("Method not implemented.");
	}
	protected _visitUnaryOp(ast: ASTUnaryOp): Type {
		throw new Error("Method not implemented.");
	}
	protected _visitInt(ast: ASTInt): Type {
		return this._scope.lookupType("int") as Type;
	}
	protected _visitVar(ast: ASTVar): Type | undefined {
		const symbol = this._scope.lookupName(ast.name);
		if (symbol === undefined) {
			throw new Error(`Uninitialized variable "${ast.name}"`);
		}
		return symbol.type;
	}
	protected _visitIf(ast: ASTIf): undefined {
		this._visit(ast.condition);
		if (ast.then) {
			this._visit(ast.then);
		}
		if (ast.else) {
			this._visit(ast.else);
		}
		return undefined;
	}
	protected _visitWhile(ast: ASTWhile): undefined {
		this._visit(ast.condition);
		if (ast.then) {
			this._visit(ast.then);
		}
		return undefined;
	}
}