import Lexer from "../lexer/Lexer";
import Token from "../lexer/Token";
import ASTBlock from "../ast/statements/ASTBlock";
import TokenType from "../lexer/TokenType";
import SyntaxError from "./SyntaxError";

export default class TokenStream {

    
	private readonly _lexer: Lexer;

	/**
	 * current token
	 */
	private _t: Token;

	/**
	 * The last token
	 */
	private _prev: Token;

	/**
	 * Parser class
	 * @param lexer The lexer
	 */
	constructor(lexer: Lexer) {
		this._lexer = lexer;
		this._t = this._lexer.getNextToken();
		
		this._prev = this._t;
	}

	/**
	 * Consume the current token
	 * @param type The expected token type
     * @returns The consumed token
	 */
	public expect(type: TokenType): Token {
		if (this.accept(type)) {
			return this._prev;
		}
		throw new SyntaxError(this._t, [type]);
        
	}

	/**
	 * If the current token is the token type, consumes it and return ture. If not, returns false.
	 * @param type The expected token type
	 */
	public accept(type: TokenType): boolean {
		if (this._t.type == type) {
			this._prev = this._t;
			this._t = this._lexer.getNextToken();
			return true;
		}
		return false;
    }
    
    public get current(): Token {
        return this._t;
    }

    public get prev(): Token {
        return this._prev;
    }
}