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
import ASTIf from "../../ast/statements/ASTIf";
import ASTBlock from "../../ast/statements/ASTBlock";
import ASTVarDec from "../../ast/statements/ASTVarDec";
import ASTWhile from "../../ast/statements/ASTWhile";

export default interface INodeInterpreter {
    visitIf(node: ASTIf): void;
    visitBlock(node: ASTBlock): void;
    visitVarDec(node: ASTVarDec): void;
    visitWhile(node: ASTWhile): void;
    visitAssign(node: ASTAssign): void;

    visitAssign(node: ASTAssign): number;
    visitFloat(node: ASTFloat): number;
    visitInt(node: ASTInt): number;
    visitUnaryOp(node: ASTUnaryOp): number;
    visitVar(node: ASTVar): number
    visitAddition(node: ASTAddition): number;
    visitComparation(node: ASTComparation): boolean;
    visitDivision(node: ASTDivision): number;
    visitMultiplication(node: ASTMultiplication): number;
    visitSubstraction(node: ASTSubstraction): number;
}