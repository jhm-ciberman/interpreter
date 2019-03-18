import Context from "./Context";
import ASTBlock from "../../ast/statements/ASTBlock";
import ASTIf from "../../ast/statements/ASTIf";
import ASTVarDec from "../../ast/statements/ASTVarDec";
import ASTWhile from "../../ast/statements/ASTWhile";
import ASTAssign from "../../ast/expressions/ASTAssign";
import ASTFloat from "../../ast/expressions/ASTFloat";
import ASTInt from "../../ast/expressions/ASTInt";
import ASTUnaryOp from "../../ast/expressions/ASTUnaryOp";
import ASTVar from "../../ast/expressions/ASTVar";
import ASTAddition from "../../ast/expressions/binop/ASTAddition";
import ASTComparation from "../../ast/expressions/binop/ASTComparation";
import ASTDivision from "../../ast/expressions/binop/ASTDivision";
import ASTMultiplication from "../../ast/expressions/binop/ASTMultiplication";
import ASTSubstraction from "../../ast/expressions/binop/ASTSubstraction";
import ComparationType from "../../ast/expressions/ComparationType";
import INodeInterpreter from "./INodeInterpreter";
import UnaryOpType from "../../ast/expressions/UnaryOpType";

export default class Interpreter implements INodeInterpreter {

	private _context: Context = new Context();

	public visitIf(node: ASTIf): void {
		if (node.condition.evaluate(this) === true) {
			node.then.evaluate(this);
		} else if (node.else) {
			node.else.evaluate(this);
		}
	}

	public visitBlock(node: ASTBlock): void {
		let lastValue: any = undefined;
		for (const child of node.children) {
			lastValue = child.evaluate(this);
		}
		return lastValue;
	}

	public visitVarDec(node: ASTVarDec): void {
		if (node.value) {
			this._context.insertVar(node.var.name, node.value.evaluate(this));
		}
	}

	public visitWhile(node: ASTWhile): void {
		while (node.condition.evaluate(this) === true) {
			node.then.evaluate(this);
		}
	}

    public visitAssign(node: ASTAssign): number {
		const value = node.value.evaluate(this);
		this._context.insertVar(node.var.name, value);
        return value;
    }
    
    public visitFloat(node: ASTFloat): number {
        return node.value;
    }
    
    public visitInt(node: ASTInt): number {
        return node.value;
    }
    
    public visitUnaryOp(node: ASTUnaryOp): number {
		if (node.type === UnaryOpType.MINUS) {
			return -node.expr.evaluate(this);
		} else {
			return +node.expr.evaluate(this);
		}
    }
    
    public visitVar(node: ASTVar): number {
        return this._context.lookupVar(node.name);
    }
    
    public visitAddition(node: ASTAddition): number {
        return node.left.evaluate(this) + node.right.evaluate(this);
    }
    
    public visitComparation(node: ASTComparation): boolean {
        const left = node.left.evaluate(this);
		const right = node.right.evaluate(this);
		switch (node.type) {
			case ComparationType.EQ:
				return (left === right);
			case ComparationType.NOTEQ:
				return (left !== right);
			case ComparationType.LT:
				return (left < right);
			case ComparationType.LTEQ:
				return (left <= right);
			case ComparationType.GT:
				return (left > right);
			case ComparationType.GTEQ:
				return (left >= right);
		}
    }
    
    public visitDivision(node: ASTDivision): number {
        return node.left.evaluate(this) / node.right.evaluate(this);
    }
    
    public visitMultiplication(node: ASTMultiplication): number {
        return node.left.evaluate(this) * node.right.evaluate(this);
    }
    
    public visitSubstraction(node: ASTSubstraction): number {
        return node.left.evaluate(this) - node.right.evaluate(this);
    }
}