import ASTNode from "../../ast/ASTNode";

export default class SemanticError extends Error {

    public node: ASTNode;

    constructor(node: ASTNode, str: string) {
        super(str);
        this.node = node;
    }
}