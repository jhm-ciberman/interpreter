import ASTStatement from "../statements/ASTStatement";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import INodeAnalyzer from "../../semantic/INodeAnalyzer";
import Type from "../../semantic/Type";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";


export default abstract class ASTExpression extends ASTStatement {
	public abstract toBytecode(generator: IBytecodeGenerator): Op;
	public abstract resolveType(generator: INodeAnalyzer): Type;
	
	public analyze(analyzer: INodeAnalyzer): void {
		this.resolveType(analyzer);
	}

	public abstract resolveValue(interpreter: INodeInterpreter): any;

	public execute(interpreter: INodeInterpreter): void {
		this.resolveValue(interpreter);
	}
}