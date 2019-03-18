import ASTVar from "../expressions/ASTVar";
import ASTStatement from "./ASTStatement";
import ASTExpression from "../expressions/ASTExpression";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import TypeAsignationError from "../../semantic/exceptions/TypeAsignationError";
import TypeInferenceError from "../../semantic/exceptions/TypeInferenceError";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

export default class ASTVarDec extends ASTStatement {

	public readonly var: ASTVar;

	public readonly type: string | null;
	
	public readonly value: ASTExpression | null;

	constructor(variable: ASTVar, type: string | null, value: ASTExpression | null) {
		super();
		this.var = variable;
		this.type = type;
		this.value = value;
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitVarDec(this);
	}

	public evaluate(visitor: INodeInterpreter): any {
		return visitor.visitVarDec(this);
	}

	public analyze(analyzer: ISemanticAnalyzer): void {
		const decType = this.type ? analyzer.typeFor(this.type) : undefined;
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

	public toBytecode(generator: IBytecodeGenerator): Op {
		throw new Error("Bytecode generation not supported in variable declaration statement");
	}
}