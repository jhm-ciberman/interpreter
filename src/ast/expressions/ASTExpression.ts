import ASTStatement from "../statements/ASTStatement";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

export default abstract class ASTExpression extends ASTStatement {
	
	public abstract resolveType(analizer: ISemanticAnalyzer): Type;

	public analyze(analizer: ISemanticAnalyzer): void {
		this.resolveType(analizer);
	}

	public abstract evaluate(evaluator: INodeInterpreter): any;

	public abstract toBytecode(generator: IBytecodeGenerator): Op;
}