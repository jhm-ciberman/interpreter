import ASTNode from "../../ast/ASTNode";
import ASTStatement from "../../ast/statements/ASTStatement";

export default interface IASTLogger {
	visit(ast: ASTStatement): void
    print(str: string): void;
	printNode(ast: ASTNode, str?: string): void;
	printLine(str: string): void;
}