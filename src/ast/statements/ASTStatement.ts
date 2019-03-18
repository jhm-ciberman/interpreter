import ASTNode from "../ASTNode";
import IInterpreter from "../../output/interpreter/IInterpreter";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import IASTLogger from "../../output/ast/IASTLogger";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";

export default abstract class ASTStatement extends ASTNode {
	public abstract execute(interpreter: IInterpreter): void;
	public abstract analyze(analizer: ISemanticAnalyzer): void;
	public abstract log(logger: IASTLogger): void;
	public abstract toBytecode(generator: IBytecodeGenerator): Op;
}