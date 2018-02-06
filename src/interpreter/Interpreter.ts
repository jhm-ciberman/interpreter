import Parser from "../parser/Parser";
import ASTCompound from "../ast/ASTCompound";
import ASTStatement from "../ast/statements/ASTStatement";
import ASTBinOp from "../ast/expressions/ASTBinOp";
import ASTExpression from "../ast/expressions/ASTExpression";
import { BinOpType } from "../ast/expressions/BinOpType";
import ASTUnaryOp from "../ast/expressions/ASTUnaryOp";
import { UnaryOpType } from "../ast/expressions/UnaryOpType";
import ASTAssign from "../ast/expressions/ASTAssign";
import NodeVisitor from "../NodeVisitor";
import ASTVar from "../ast/expressions/ASTVar";
import ASTInt from "../ast/expressions/ASTInt";
import ASTVarDec from "../ast/ASTVarDec";
import Context from "./Context";

export default class Interpreter extends NodeVisitor<any> {

	private _context: Context = new Context();

	public eval(program: ASTCompound) {
		return this._visit(program);
	}

	protected _visitCompound(compound: ASTCompound): any {
		let val: any;
		for (const child of compound.children) {
			val = this._visit(child);
		}
		return val;
	}

	protected _visitAssign(assign: ASTAssign): any {
		return this._context.insertVar<any>(assign.var.name, this._visit(assign.value));
	}

	protected _visitBinOp(binop: ASTBinOp): number {
		const left = this._visit(binop.left);
		const right = this._visit(binop.right);
		switch (binop.type) {
			case BinOpType.ADDITION:
				return left + right;
			case BinOpType.SUBSTRACTION:
				return left - right;
			case BinOpType.MULTIPLICATION:
				return left * right;
			case BinOpType.DIVISION:
				return left / right;
		}
	}

	protected _visitUnaryOp(unaryop: ASTUnaryOp): number {
		const expr = this._visit(unaryop.expr);
		switch (unaryop.type) {
			case UnaryOpType.MINUS:
				return -expr;
			case UnaryOpType.PLUS:
				return +expr;
		}
		return expr;
	}

	protected _visitVarDec(ast: ASTVarDec): void {
		// ...
	}

	protected _visitInt(integer: ASTInt): number {
		return integer.value;
	}

	protected _visitVar(variable: ASTVar): any {
		return this._context.lookupVar<any>(variable.name);
	}
}