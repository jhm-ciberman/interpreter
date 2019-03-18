import Token from "../../lexer/Token";
import ASTExpression from "./ASTExpression";
import Type from "../../semantic/Type";
import IBytecodeGenerator from "../../bytecode/IBytecodeGenerator";
import OpExpr from "../../bytecode/OpExpr";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import INodeAnalyzer from "../../semantic/INodeAnalyzer";

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
	
	public resolveValue(evaluator: INodeInterpreter): any {
		return evaluator.visitVar(this);
	}

	public resolveType(analyzer: INodeAnalyzer): Type {
		return analyzer.visitVar(this);
	}

	public toBytecode(generator: IBytecodeGenerator): OpExpr {
		throw new Error("Bytecode generation not supported in variables");
	}
}