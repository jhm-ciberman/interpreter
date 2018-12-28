import Parser from "../parser/Parser";
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
import ASTVarDec from "../ast/statements/ASTVarDec";
import Context from "./Context";
import ASTBlock from "../ast/statements/ASTBlock";
import ASTIf from "../ast/statements/ASTIf";
import ASTWhile from "../ast/statements/ASTWhile";

export default class Interpreter extends NodeVisitor<any> {

	private _context: Context = new Context();

	public eval(program: ASTBlock) {
		return this._visit(program);
	}

	protected _visitBlock(compound: ASTBlock): any {
		let val: any;
		for (const child of compound.children) {
			val = this._visit(child);
		}
		return val;
	}

	protected _visitAssign(assign: ASTAssign): any {
		return this._context.insertVar<any>(assign.var.name, this._visit(assign.value));

	}

	protected _visitBinOp(binop: ASTBinOp): any {
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
			case BinOpType.EQ:
				return (left === right);
			case BinOpType.NOTEQ:
				return (left !== right);
			case BinOpType.LT:
				return (left < right);
			case BinOpType.LTEQ:
				return (left <= right);
			case BinOpType.GT:
				return (left > right);
			case BinOpType.GTEQ:
				return (left >= right);
		}
		return undefined;
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
		if (ast.value) {
			return this._context.insertVar<any>(ast.var.name, this._visit(ast.value));
		} else {
			return undefined;
		}
	}

	protected _visitInt(integer: ASTInt): number {
		return integer.value;
	}

	protected _visitVar(variable: ASTVar): any {
		return this._context.lookupVar<any>(variable.name);
	}

	protected _visitIf(st: ASTIf): void {
		if (this._visit(st.condition)) {
			this._visit(st.then);
		} else if (st.else) {
			this._visit(st.else)
		}
	}

	protected _visitWhile(ast: ASTWhile): void {
		while (this._visit(ast.condition) === true) {
			this._visit(ast.then);
		}
	}
}