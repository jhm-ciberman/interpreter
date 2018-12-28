import Token from "../../lexer/Token";
import ASTExpression from "./ASTExpression";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";

export default class ASTVar extends ASTExpression {

	private readonly _token: Token;

	constructor(token: Token) {
		super();
		this._token = token;
	}

	public get name(): string {
		return this._token.value;
	}

	public log(logger: IASTLogger): void {
		logger.printNode(this, " [" + this.name + "]");
	}

	
	public resolveType(analizer: ISemanticAnalyzer): Type {
		return analizer.TYPE_INT;
	}

	public evaluate(interpreter: IInterpreter): any {
		return interpreter.getVarValue(this.name);
	}
}