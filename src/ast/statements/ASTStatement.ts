import ASTNode from "../ASTNode";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import INodeAnalyzer from "../../semantic/INodeAnalyzer";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import INodeVisitor from "../../INodeVisitor";

export default abstract class ASTStatement extends ASTNode {
	public abstract toBytecode(generator: IBytecodeGenerator): Op;

	public abstract accept(visitor: INodeVisitor): void;
	public abstract analyze(analyzer: INodeAnalyzer): void;
	public abstract execute(visitor: INodeInterpreter): void; 
}