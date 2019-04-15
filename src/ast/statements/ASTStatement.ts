import ASTNode from "../ASTNode";
import INodeAnalyzer from "../../semantic/INodeAnalyzer";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import INodeVisitor from "../../INodeVisitor";
import Op from "../../bytecode/Op";

export default abstract class ASTStatement extends ASTNode {
	public abstract accept(visitor: INodeVisitor): void;
	public abstract analyze(analyzer: INodeAnalyzer): void;
	public abstract execute(visitor: INodeInterpreter): void;
	public abstract toBytecode(generator: INodeVisitor): Op[]; 
}