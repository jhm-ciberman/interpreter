import Op from "./Op";
import ASTStatement from "../ast/statements/ASTStatement";
import INodeVisitor from "../INodeVisitor";
import ASTIf from "../ast/statements/ASTIf";
import ASTBlock from "../ast/statements/ASTBlock";
import ASTVarDec from "../ast/statements/ASTVarDec";
import ASTWhile from "../ast/statements/ASTWhile";
import ASTAssign from "../ast/expressions/ASTAssign";
import ASTFloat from "../ast/expressions/ASTFloat";
import ASTInt from "../ast/expressions/ASTInt";
import ASTUnaryOp from "../ast/expressions/ASTUnaryOp";
import ASTVar from "../ast/expressions/ASTVar";
import ASTAddition from "../ast/expressions/binop/ASTAddition";
import ASTComparation from "../ast/expressions/binop/ASTComparation";
import ASTDivision from "../ast/expressions/binop/ASTDivision";
import ASTMultiplication from "../ast/expressions/binop/ASTMultiplication";
import ASTSubstraction from "../ast/expressions/binop/ASTSubstraction";
import OpBinOp from "./OpBinOp";
import Symbol from "../semantic/Symbol";
import Type from "../semantic/Type";
import OpAssign from "./OpAssign";

export default class BytecodeGenerator implements INodeVisitor {
    
    private _operations: Op[] = [];
    private _temps: Symbol[] = [];

    public generate(node: ASTStatement): Op[] {
        this._operations = [];
        node.accept(this);
        return this._operations;
    }
    
    private _pushOp(op: Op): void {
        this._operations.push(op);
    }

    private _requestTemp(type: Type) {
        const name = "T" + this._temps.length;
        const s = new Symbol(name, type);
        this._temps.push(s);
        return s;
    }

    private get _lastTemp(): Symbol {
        return this._temps[this._temps.length - 1];
    }

    private _notSupported(name: string) {
        throw new Error(`Bytecode generation not supported in ${ name } statement`);
    }

    public visitIf(node: ASTIf): void {
        this._notSupported("if");
    }

    public visitBlock(node: ASTBlock): void {
		for (const child of node.children) {
			child.accept(this);
		}
    }

    public visitVarDec(node: ASTVarDec): void {
        this._notSupported("variable declaration");
    }

    public visitWhile(node: ASTWhile): void {
        this._notSupported("while");
    }

    public visitAssign(node: ASTAssign): void {
        this._notSupported("assignment");
    }

    public visitFloat(node: ASTFloat): void {
        const temp = this._requestTemp(node.type);
        this._pushOp(new OpAssign(temp, node.value));
    }

    public visitInt(node: ASTInt): void {
        const temp = this._requestTemp(node.type);
        this._pushOp(new OpAssign(temp, node.value));
    }

    public visitUnaryOp(node: ASTUnaryOp): void {
        this._notSupported("unary operation");
    }

    public visitVar(node: ASTVar): void {
        this._notSupported("variable");
    }

    public visitAddition(node: ASTAddition): void {
        
        node.left.accept(this);
        const left = this._lastTemp;
        
        node.right.accept(this);
        const right = this._lastTemp;

        const temp = this._requestTemp(node.type);

        this._pushOp(new OpBinOp(temp, "ADD", left, right));
		
    }

    public visitComparation(node: ASTComparation): void {
        this._notSupported("comparation");
    }

    public visitDivision(node: ASTDivision): void {
        this._notSupported("division");
    }

    public visitMultiplication(node: ASTMultiplication): void {
        this._notSupported("multiplication");
    }

    public visitSubstraction(node: ASTSubstraction): void {
        this._notSupported("substraction");
    }

}
