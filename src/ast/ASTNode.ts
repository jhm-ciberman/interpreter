export default abstract class ASTNode {
	public getNodeName(): string {
        return this.constructor.name.split("AST").join("");
    }
}