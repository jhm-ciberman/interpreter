import ASTIf from "../ast/statements/ASTIf";
import ASTBlock from "../ast/statements/ASTBlock";
import ASTVarDec from "../ast/statements/ASTVarDec";
import ASTWhile from "../ast/statements/ASTWhile";
import ASTAssign from "../ast/expressions/ASTAssign";
import ASTFloat from "../ast/expressions/ASTFloat";
import ASTInt from "../ast/expressions/ASTInt";
import ASTUnaryOp from "../ast/expressions/ASTUnaryOp";
import ASTVar from "../ast/expressions/ASTVar";
import Type from "./Type";
import ASTBinOp from "../ast/expressions/binop/ASTBinOp";
import ASTComparation from "../ast/expressions/binop/ASTComparation";

export default interface INodeAnalyzer {
    visitIf(node: ASTIf): void;
    visitBlock(node: ASTBlock): void;
    visitVarDec(node: ASTVarDec): void;
    visitWhile(node: ASTWhile): void;

    visitAssign(node: ASTAssign): Type;
    visitFloat(node: ASTFloat): Type;
    visitInt(node: ASTInt): Type;
    visitUnaryOp(node: ASTUnaryOp): Type;
    visitVar(node: ASTVar): Type;
    visitBinOp(node: ASTBinOp): Type;
    visitComparation(node: ASTComparation): Type;
}