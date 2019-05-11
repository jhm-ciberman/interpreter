import Token from "../../lexer/Token";
import ASTExpression from "./ASTExpression";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";

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

	public toBytecode(generator: INodeVisitor): void {
        generator.visitVar(this);
    }
}