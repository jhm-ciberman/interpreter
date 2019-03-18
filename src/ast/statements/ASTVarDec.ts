import ASTVar from "../expressions/ASTVar";
import ASTStatement from "./ASTStatement";
import ASTType from "../ASTType";
import ASTExpression from "../expressions/ASTExpression";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";
import TypeAsignationError from "../../semantic/exceptions/TypeAsignationError";
import TypeInferenceError from "../../semantic/exceptions/TypeInferenceError";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";

export default class ASTVarDec extends ASTStatement {

	public readonly var: ASTVar;

	public readonly type: ASTType | null;
	
	public readonly value: ASTExpression | null;

	constructor(variable: ASTVar, type: ASTType | null, value: ASTExpression | null) {
		super();
		this.var = variable;
		this.type = type;
		this.value = value;
	}

	public log(logger: IASTLogger): void {
		logger.printNode(this, " [" + this.var.name + "]");
	}

	public analyze(analyzer: ISemanticAnalyzer): void {
		const decType = this.type ? analyzer.typeFor(this.type.name) : undefined;
		const infType = this.value ? this.value.resolveType(analyzer) : undefined;
		const type = this._inferType(decType, infType);
		analyzer.declareVar(this.var.name, type);
	}

	/*
	decType  	infType		type
	0			0			0
	0			1			infType
	1			0			decType
	1			1			=== => decType
	*/
	private _inferType(decType?: Type, infType?: Type): Type {
		if (!decType) {
			if (!infType) {
				throw new TypeInferenceError(this);
			}
			return infType;
		}
		if (!infType) {
			return decType;
		}
		if (infType === decType) {
			return decType;
		}
		throw new TypeAsignationError(this, decType, infType);
	}

	public execute(interpreter: IInterpreter): void {
		if (this.value) {
			interpreter.setVar(this.var.name, this.value.evaluate(interpreter));
		}
	}

	public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in variable declaration statement");
	}
}