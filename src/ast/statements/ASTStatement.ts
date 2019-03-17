import ASTNode from "../ASTNode";
import IInterpreter from "../../output/interpreter/IInterpreter";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import IASTLogger from "../../output/ast/IASTLogger";

export default abstract class ASTStatement extends ASTNode {
	public abstract execute(interpreter: IInterpreter): void;
	public abstract analyze(analizer: ISemanticAnalyzer): void;
	public abstract log(logger: IASTLogger): void;
}