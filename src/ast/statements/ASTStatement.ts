import ASTNode from "../ASTNode";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import INodeVisitor from "../../INodeVisitor";

export default abstract class ASTStatement extends ASTNode {
	public abstract accept(visitor: INodeVisitor): void;
	public abstract execute(visitor: INodeInterpreter): void;
}