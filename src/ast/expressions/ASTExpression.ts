import ASTStatement from "../statements/ASTStatement";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";

export default abstract class ASTExpression extends ASTStatement {
	
	public analize(analizer: ISemanticAnalyzer): void {
		throw new Error("Method not implemented.");
	}
	
	public abstract resolveType(analizer: ISemanticAnalyzer): Type;

	public abstract evaluate(interpreter: IInterpreter): any;

	execute(interpreter: IInterpreter): void {
		interpreter.setLastEvalValue(this.evaluate(interpreter));
	}
}