import IASTLogger from "./IASTLogger";
import ASTNode from "../../ast/ASTNode";
import ASTStatement from "../../ast/statements/ASTStatement";
import INodeVisitor from "../../INodeVisitor";
import ASTIf from "../../ast/statements/ASTIf";
import ASTBlock from "../../ast/statements/ASTBlock";
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
import ASTBinOp from "../../ast/expressions/binop/ASTBinOp";
import ComparationType from "../../ast/expressions/ComparationType";
import { type } from "os";

export default class ASTLogger implements IASTLogger, INodeVisitor {

	private _level = -1;
	private _stream: NodeJS.WriteStream;

	constructor(stream: NodeJS.WriteStream) {
		this._stream = stream;
	}

	public visit(ast: ASTStatement): void {
		this._level++;
		ast.accept(this);
		this._level--;
	}

	public print(str: string) {
		this._stream.write("  ".repeat(this._level) + str);
	}

	public printNode(ast: ASTNode, str: string = ""): void {
		this.print(ast.getNodeName() + str + "\n");
	}

	public printLine(str: string): void {
		this.print(str + "\n");
	}

	public visitIf(node: ASTIf): void {
		this.printNode(node);
		this.printLine("Condition:");
		this.visit(node.condition);
		this.printLine("Then: ");
		this.visit(node.then);
		if (node.else) {
			this.printLine("Else: ");
			this.visit(node.else);
		}
	}

    public visitBlock(node: ASTBlock): void {
		for (const child of node.children) {
			this.visit(child);
		}
	}

    public visitVarDec(node: ASTVarDec): void {
		this.printNode(node, " [" + node.var.name + "]");
	}

    public visitWhile(node: ASTWhile): void {
		this.printNode(node);
		this.printLine("Condition: ");
		this.visit(node.condition);
		this.printLine("Then: ");
		this.visit(node.then);
	}
	
	public visitAssign(node: ASTAssign): void {
		this.printNode(node, " [" + node.var.name + "]")
		this.visit(node.value);
	}

    public visitFloat(node: ASTFloat): void {
		this.printNode(node, " = " + node.value );
	}

    public visitInt(node: ASTInt): void {
		this.printNode(node, " = " + node.value );
	}

    public visitUnaryOp(node: ASTUnaryOp): void {
		this.printNode(node);
		this.visit(node.expr);
	}

    public visitVar(node: ASTVar): void {
		this.printNode(node, " [" + node.name + "]");
	}
	
	protected _comparationSymbol(node: ASTComparation): string {
		switch (node.type) {
			case ComparationType.EQ:
				return "==";
			case ComparationType.NOTEQ:
				return "!=";
			case ComparationType.LT:
				return "<";
			case ComparationType.LTEQ:
				return "<=";
			case ComparationType.GT:
				return ">";
			case ComparationType.GTEQ:
				return ">=";
		}
	}

	private _logBinOp(node: ASTBinOp, extraString: string = "") {
		this.printNode(node);
		this.printLine("Left: ");
		this.visit(node.left);
		this.printLine("Right: ");
		this.visit(node.right);
	}

	public visitComparation(node: ASTComparation): void {
		this._logBinOp(node, " [" + this._comparationSymbol(node) + "]");
	}
	
	public visitAddition(node: ASTAddition): void {
		this._logBinOp(node);
	}

    public visitDivision(node: ASTDivision): void {
		this._logBinOp(node);
	}
	
    public visitMultiplication(node: ASTMultiplication): void {
		this._logBinOp(node);
	}
	
    public visitSubstraction(node: ASTSubstraction): void {
		this._logBinOp(node);
	}
	
}