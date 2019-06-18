import ASTStatement from "../statements/ASTStatement";
import Type from "../../symbols/Type";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import SymbolElement from "../../symbols/SymbolElement";

export default abstract class ASTExpression extends ASTStatement {

	private _type: Type | undefined = undefined;

	private _temp: SymbolElement | undefined = undefined;

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

	public set temp(value: SymbolElement) {
		this._temp = value;
	}

	public get temp(): SymbolElement {
		if (!this._temp) {
			throw new Error('Undefined temporary variable');
		}
		return this._temp;
	}
}