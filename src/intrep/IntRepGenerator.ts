import Op from "./op/Op";
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
import OpBinOp from "./op/binop/OpBinOp";
import SymbolElement from "../symbols/SymbolElement";
import OpAssign from "./op/OpAssignInt";
import Scope from "../symbols/Scope";
import OpAssignInt from "./op/OpAssignInt";
import ASTExpression from "../ast/expressions/ASTExpression";
import OpAdd from "./op/binop/OpAdd";
import ASTBinOp from "../ast/expressions/binop/ASTBinOp";
import OpSubstract from "./op/binop/OpSubstract";
import OpRet from "./op/OpRet";

export default class IntRepGenerator implements INodeVisitor {
    
    private _operations: Op[] = [];

    private _scope: Scope;

    constructor(scope: Scope) {
        this._scope = scope;
    }

    public generate(node: ASTStatement): Op[] {
        this._operations = [];
        node.accept(this);

        // This adds an implicit return at the end. It will be removed in the future
        const lastOp = this._operations[this._operations.length - 1];
        if (lastOp instanceof OpBinOp) {
            this._operations.push(new OpRet(lastOp.left));
        }

        return this._operations;
    }

    private _temp(node: ASTExpression): SymbolElement {
        const temp = this._scope.declareTemp(node.type);
        node.temp = temp;
        return temp;
    }

    private _notSupported(name: string) {
        throw new Error(`Intermediate Representation generation not supported in ${ name } statement`);
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
        this._notSupported("float");
    }

    public visitInt(node: ASTInt): void {
        this._operations.push(new OpAssignInt(this._temp(node), node.value))
    }

    public visitUnaryOp(node: ASTUnaryOp): void {
        this._notSupported("unary operation");
    }

    public visitVar(node: ASTVar): void {
        this._notSupported("variable");
    }
    public visitAddition(node: ASTAddition): void {
        node.left.accept(this);
        node.right.accept(this);
        this._operations.push(new OpAdd(this._temp(node), node.left.temp, node.right.temp));
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
        node.left.accept(this);
        node.right.accept(this);
        this._operations.push(new OpSubstract(this._temp(node), node.left.temp, node.right.temp));
    }

}
