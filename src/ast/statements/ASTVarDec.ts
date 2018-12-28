import Token from "../../lexer/Token";
import ASTVar from "../expressions/ASTVar";
import ASTStatement from "./ASTStatement";
import ASTType from "../ASTType";
import ASTExpression from "../expressions/ASTExpression";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";

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

	public analize(analizer: ISemanticAnalyzer): void {
		let decType: Type | undefined;
		let infType: Type | undefined;
		if (this.type) {
			decType = analizer.typeFor(this.type.name);
		} 
		if (this.value) {
			infType = this.value.resolveType(analizer)
		}
		if (decType && infType && decType !== infType) {
			throw new Error(`Type "${decType.name}" is not asignable to type "${infType.name}"`);
		}
		/*if (decType === infType) {
			if (decType === undefined) {
			throw new Error("Type is not defined and cannot be infered");
			}
		}*/
		
		return undefined;
	}

	public execute(interpreter: IInterpreter): void {
		if (this.value) {
			interpreter.setVar(this.var.name, this.value.evaluate(interpreter));
		}
	}
}