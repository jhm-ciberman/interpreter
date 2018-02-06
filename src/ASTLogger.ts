import ASTCompound from "./ast/ASTCompound";
import ASTBinOp from "./ast/expressions/ASTBinOp";
import ASTExpression from "./ast/expressions/ASTExpression";
import ASTUnaryOp from "./ast/expressions/ASTUnaryOp";
import ASTInt from "./ast/expressions/ASTInt";
import ASTVar from "./ast/expressions/ASTVar";
import ASTStatement from "./ast/statements/ASTStatement";
import ASTVarDec from "./ast/ASTVarDec";
import ASTAssign from "./ast/expressions/ASTAssign";
import NodeVisitor from "./NodeVisitor";

export default class ASTLogger extends NodeVisitor<string> {

	private _level = -1;

	public log(ast: any): string {
		return this._visit(ast);
	}

	protected _visit(ast: any): string {
		this._level++;
		const r: string = super._visit(ast);
		this._level--;
		return r;
	}

	private _log(ast: any, concat: string = ""): string {
		return "  ".repeat(this._level) + ast.constructor.name + concat + "\n";
	}

	protected _visitCompound(compound: ASTCompound): string {
		let str = '';
		for (const child of compound.children) {
			str += this._visit(child);
		}
		return str;
	}

	protected _visitBinOp(binop: ASTBinOp): string {
		let str = this._log(binop);
		str += "  ".repeat(this._level) + "Left: \n";
		str += this._visit(binop.left);
		str += "  ".repeat(this._level) + "Right: \n";
		str += this._visit(binop.right);
		return str;
	}

	protected _visitUnaryOp(unaryop: ASTUnaryOp): string {
		let str = this._log(unaryop);
		str += this._visit(unaryop.expr);
		return str;
	}

	protected _visitInt(int: ASTInt) {
		return this._log(int, " = " + int.value );
	}

	protected _visitVar(variable: ASTVar): string {
		return this._log(variable, " [" + variable.name + "]");
	};

	protected _visitVarDec(varDec: ASTVarDec) {
		return this._log(varDec, " [" + varDec.var.name + "]");
	}

	protected _visitAssign(assign: ASTAssign) {
		return this._log(assign, " [" + assign.var.name + "]")
			+ this._visit(assign.value);
	}

}