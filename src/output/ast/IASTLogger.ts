import ASTNode from "../../ast/ASTNode";

export default interface IASTLogger {
	visit(ast: ASTNode): void
    print(str: string): void;
	printNode(ast: ASTNode, str?: string): void;
	printLine(str: string): void;
}