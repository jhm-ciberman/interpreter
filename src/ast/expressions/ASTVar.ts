import Token from "../../lexer/Token";
import ASTExpression from "./ASTExpression";
import Symbol from "../../semantic/Symbol";

export default class ASTVar extends ASTExpression {

	private readonly _token: Token;

	constructor(token: Token) {
		super();
		this._token = token;
	}

	public get name(): string {
		return this._token.value;
	}
}