import ASTStatement from "../statements/ASTStatement";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";

export default abstract class ASTExpression extends ASTStatement {
	
	public abstract resolveType(analizer: ISemanticAnalyzer): Type;

	public analyze(analizer: ISemanticAnalyzer): void {
		this.resolveType(analizer);
	}

	public abstract evaluate(interpreter: IInterpreter): any;

	public execute(interpreter: IInterpreter): void {
		interpreter.setLastEvalValue(this.evaluate(interpreter));
	}

	public abstract toBytecode(generator: IBytecodeGenerator): Op;
}