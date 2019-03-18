import ASTIf from "./ast/statements/ASTIf";
import ASTBlock from "./ast/statements/ASTBlock";
import ASTVarDec from "./ast/statements/ASTVarDec";
import ASTWhile from "./ast/statements/ASTWhile";

export default interface INodeVisitor {
    visitIf(node: ASTIf): void;
    visitBlock(node: ASTBlock): void;
    visitVarDec(node: ASTVarDec): void;
    visitWhile(node: ASTWhile): void;
}