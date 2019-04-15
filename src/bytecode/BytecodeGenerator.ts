import Op from "./Op";
import ASTStatement from "../ast/statements/ASTStatement";
import DataSourceRegister from "./DataSourceRegister";
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
import OpNoOp from "./OpNoOp";
import OpBinOp from "./OpBinOp";
import OpMov from "./OpMov";
import DataSourceValue from "./DataSourceValue";

export default class BytecodeGenerator implements INodeVisitor {
    
    private _operations: Op[] = [];

    private _registers: DataSourceRegister[] = [];

    constructor(regCount: number) {
        for (let i = 0; i < regCount; i++) {
            this._registers[i] = new DataSourceRegister(i);
        }
        this._registers = this._registers.reverse();
    }

    public generate(node: ASTStatement): Op[] {
        this._operations = [];
        node.toBytecode(this);
        return this._operations;
    }
    
    private _pushOp(op: Op): void {
        this._operations.push(op);
    }

    private _requestRegister(): DataSourceRegister {
        const reg = this._registers.pop();
        if (!reg) {
            throw new Error("No registers available");
        }
        return reg;
    }

    private _freeRegister(reg: DataSourceRegister) {
        this._registers.push(reg);
    }

    private _notSupported(name: string) {
        throw new Error(`Bytecode generation not supported in ${ name } statement`);
    }

    public visitIf(node: ASTIf): void {
        this._notSupported("if");
    }

    public visitBlock(node: ASTBlock): void {
        let last = new OpNoOp();
		this._pushOp(last);

		for (const child of node.children) {
			child.toBytecode(this);
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
        this._notSupported("float");
    }

    public visitInt(node: ASTInt): void {
        const reg = this._requestRegister();
        return [new OpMov(reg, new DataSourceValue(node.value))];
    }

    public visitUnaryOp(node: ASTUnaryOp): void {
        this._notSupported("unary operation");
    }

    public visitVar(node: ASTVar): void {
        this._notSupported("variable");
    }

    public visitAddition(node: ASTAddition): void {
        const left = node.left.toBytecode(this);
        const right = node.right.toBytecode(this);
		return new OpBinOp("ADD", left, right);
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
