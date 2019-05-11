import ASTStatement from "../statements/ASTStatement";
import Type from "../../semantic/Type";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

export default abstract class ASTExpression extends ASTStatement {

	private _type: Type | undefined = undefined;

	public execute(interpreter: INodeInterpreter): void {
		this.resolveValue(interpreter);
	}

	public abstract resolveValue(interpreter: INodeInterpreter): any;

	public set type(value: Type) {
		this._type = value;
	}

	public get type(): Type {
		if (!this._type) {
			throw new Error('Undefined type');
		}
		return this._type;
	}
}