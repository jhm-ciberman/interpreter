import IASTLogger from "../output/ast/IASTLogger";
import ISemanticAnalyzer from "../semantic/ISemanticAnalyzer";

export default abstract class ASTNode {
	public getNodeName(): string {
        return this.constructor.name.split("AST").join("");
    }
    
    public abstract log(logger: IASTLogger): void;
    public abstract analize(analizer: ISemanticAnalyzer): void;
}