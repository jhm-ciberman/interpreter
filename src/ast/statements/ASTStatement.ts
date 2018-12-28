import ASTNode from "../ASTNode";
import IInterpreter from "../../output/interpreter/IInterpreter";

export default abstract class ASTStatement extends ASTNode {
	abstract execute(interpreter: IInterpreter): void;
}