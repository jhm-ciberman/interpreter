import Context from "./Context";
import ASTBlock from "../../ast/statements/ASTBlock";
import IInterpreter from "./IInterpreter";

export default class Interpreter implements IInterpreter {

	private _context: Context = new Context();

	private _lastEvalValue: any = undefined;

	public eval(program: ASTBlock) {
		this._lastEvalValue = undefined;
		program.execute(this);
		return this._lastEvalValue;
	}

	public setLastEvalValue(value: any): void {
		this._lastEvalValue = value;
	}

	public setVar(name: string, value: any): any {
		return this._context.insertVar<any>(name, value);

	}

	public getVarValue(name: string): any {
		return this._context.lookupVar<any>(name);
	}
}