import INodeVisitor from "../INodeVisitor";
import INodeInterpreter from "../output/interpreter/INodeInterpreter";

export default abstract class ASTNode {
	public getNodeName(): string {
        return this.constructor.name.split("AST").join("");
    }

    public abstract accept(visitor: INodeVisitor): void;
    public abstract evaluate(visitor: INodeInterpreter): void;
}