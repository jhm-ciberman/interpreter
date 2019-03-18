import Token from "../../lexer/Token";
import ASTExpression from "./ASTExpression";
import IASTLogger from "../../output/ast/IASTLogger";
import ISemanticAnalyzer from "../../semantic/ISemanticAnalyzer";
import Type from "../../semantic/Type";
import IInterpreter from "../../output/interpreter/IInterpreter";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import Op from "../../bytecode/Op";
import OpExpr from "../../bytecode/OpExpr";
import INodeVisitor from "../../INodeVisitor";

export default class ASTVar extends ASTExpression {

	private readonly _token: Token;

	constructor(token: Token) {
		super();
		this._token = token;
	}

	public get name(): string {
		return this._token.value;
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitVar(this);
	}

	public resolveType(analizer: ISemanticAnalyzer): Type {
		return analizer.TYPE_INT;
	}

	public evaluate(interpreter: IInterpreter): any {
		return interpreter.getVarValue(this.name);
	}

	public toBytecode(generator: IBytecodeGenerator): OpExpr {
		throw new Error("Bytecode generation not supported in variables");
	}
}