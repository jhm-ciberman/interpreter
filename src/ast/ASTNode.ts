import IASTLogger from "../output/ast/IASTLogger";

export default abstract class ASTNode {
	public getNodeName(): string {
        return this.constructor.name.split("AST").join("");
    }
    
    public abstract log(logger: IASTLogger): void;
}