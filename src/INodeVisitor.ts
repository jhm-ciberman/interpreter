import ASTIf from "./ast/statements/ASTIf";
import ASTBlock from "./ast/statements/ASTBlock";
import ASTVarDec from "./ast/statements/ASTVarDec";
import ASTWhile from "./ast/statements/ASTWhile";
import ASTAssign from "./ast/expressions/ASTAssign";
import ASTFloat from "./ast/expressions/ASTFloat";
import ASTInt from "./ast/expressions/ASTInt";
import ASTUnaryOp from "./ast/expressions/ASTUnaryOp";
import ASTVar from "./ast/expressions/ASTVar";
import ASTAddition from "./ast/expressions/binop/ASTAddition";
import ASTComparation from "./ast/expressions/binop/ASTComparation";
import ASTDivision from "./ast/expressions/binop/ASTDivision";
import ASTMultiplication from "./ast/expressions/binop/ASTMultiplication";
import ASTSubstraction from "./ast/expressions/binop/ASTSubstraction";

export default interface INodeVisitor {
    visitIf(node: ASTIf): void;
    visitBlock(node: ASTBlock): void;
    visitVarDec(node: ASTVarDec): void;
    visitWhile(node: ASTWhile): void;

    visitAssign(node: ASTAssign): void;
    visitFloat(node: ASTFloat): void;
    visitInt(node: ASTInt): void;
    visitUnaryOp(node: ASTUnaryOp): void;
    visitVar(node: ASTVar): void;

    visitAddition(node: ASTAddition): void;
    visitComparation(node: ASTComparation): void;
    visitDivision(node: ASTDivision): void;
    visitMultiplication(node: ASTMultiplication): void;
    visitSubstraction(node: ASTSubstraction): void;
}