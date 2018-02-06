import Lexer from "../lexer/Lexer";
import Token from "../lexer/Token";
import TokenType from "../lexer/TokenType";

import SyntaxError from "./SyntaxError";
import ASTUnaryOp from "../ast/expressions/ASTUnaryOp";
import UnaryOpType from "../ast/expressions/UnaryOpType";
import ASTInt from "../ast/expressions/ASTInt";
import ASTExpression from "../ast/expressions/ASTExpression";
import ASTBinOp from "../ast/expressions/ASTBinOp";
import BinOpType from "../ast/expressions/BinOpType";
import ASTVarDec from "../ast/statements/ASTVarDec";
import ASTVar from "../ast/expressions/ASTVar";
import ASTStatement from "../ast/statements/ASTStatement";
import ASTAssign from "../ast/expressions/ASTAssign";
import ASTBlock from "../ast/statements/ASTBlock";
import ASTIf from "../ast/statements/ASTIf";
import ASTType from "../ast/ASTType";
import ASTWhile from "../ast/statements/ASTWhile";


export default class Parser {

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
	 * Parses the Token stream into an abstract syntaxt tree
	 */
	public parse(): ASTBlock {
		return this._program();
	}

	/**
	 * Consume the current token
	 * @param type The expected token type
	 */
	private _expect(type: TokenType): void {
		if (!this._accept(type)) {
			throw new SyntaxError(this._t, [type]);
		}
	}

	/**
	 * If the current token is the token type, consumes it and return ture. If not, returns false.
	 * @param type The expected token type
	 */
	private _accept(type: TokenType): boolean {
		if (this._t.type == type) {
			this._prev = this._t;
			this._t = this._lexer.getNextToken();
			return true;
		}
		return false;
	}

	/**
	 * factor 
	 * 		: PLUS factor 
	 * 		| MINUS factor
	 * 		| INTEGER 
	 * 		| LPAREN expr RPAREN
	 * 		| variableExpresion
	 * 		;
	 */
	private _factor(): ASTExpression {
		if (this._accept(TokenType.PLUS)) {
			return new ASTUnaryOp(UnaryOpType.PLUS, this._expr());
		} else if (this._accept(TokenType.MINUS)) {
			return new ASTUnaryOp(UnaryOpType.MINUS, this._expr());
		} else if (this._accept(TokenType.INTEGER)) {
			return new ASTInt(this._prev.value);
		} else if (this._accept(TokenType.LPAREN)) {
			const expr = this._expr();
			this._expect(TokenType.RPAREN);
			return expr;
		} else if (this._t.type === TokenType.ID) {
			return this._variableExpresion();
		} else {
			throw new SyntaxError(this._t, [
				TokenType.PLUS,
				TokenType.MINUS,
				TokenType.INTEGER,
				TokenType.LPAREN,
				TokenType.ID
			]);
		}
	}

	/**
	 * multiplicativeExpression
	 * 		: factor ((MUL | DIV) factor)*
	 * 		:
	 */
	private _multiplicativeExpression(): ASTExpression {
		let node = this._factor();
		while (true) {
			if (this._accept(TokenType.MULTIPLY)) {
				node = new ASTBinOp(node, BinOpType.MULTIPLICATION, this._factor());
			} else if (this._accept(TokenType.DIVISION)) {
				node = new ASTBinOp(node, BinOpType.DIVISION, this._factor());
			} else {
				break;
			}
		}
		return node;
	}

	/**
	 * additiveExpression
	 * 		: multiplicativeExpression ((PLUS | MINUS) multiplicativeExpression)*
	 * 		;
	 */
	private _additiveExpression(): ASTExpression {
		let node = this._multiplicativeExpression();
		while (true) {
			if (this._accept(TokenType.PLUS)) {
				node = new ASTBinOp(node, BinOpType.ADDITION, this._multiplicativeExpression());
			} else if (this._accept(TokenType.MINUS)) {
				node = new ASTBinOp(node, BinOpType.SUBSTRACTION, this._multiplicativeExpression());
			} else {
				break;
			}
		}
		return node;
	}

	/**
	 * relationalExpression
	 * 		: additiveExpression ((LT | GT | LTEQ | GTEQ) additiveExpression)*
	 * 		;
	 */
	private _relationalExpression(): ASTExpression {
		let node = this._additiveExpression();
		while (true) {
			if (this._accept(TokenType.LT)) {
				node = new ASTBinOp(node, BinOpType.LT, this._additiveExpression());
			} else if (this._accept(TokenType.GT)) {
				node = new ASTBinOp(node, BinOpType.GT, this._additiveExpression());
			} else if (this._accept(TokenType.LTEQ)) {
				node = new ASTBinOp(node, BinOpType.LTEQ, this._additiveExpression());
			} else if (this._accept(TokenType.GTEQ)) {
				node = new ASTBinOp(node, BinOpType.GTEQ, this._additiveExpression());
			} else {
				break;
			}
		}
		return node;
	}

	/**
	 * additiveExpression
	 * 		: relationalExpression ((EQ | NOTEQ) relationalExpression)*
	 * 		;
	 */
	private _equalityExpression(): ASTExpression {
		let node = this._relationalExpression();
		while (true) {
			if (this._accept(TokenType.EQ)) {
				node = new ASTBinOp(node, BinOpType.EQ, this._relationalExpression());
			} else if (this._accept(TokenType.NOTEQ)) {
				node = new ASTBinOp(node, BinOpType.NOTEQ, this._relationalExpression());
			} else {
				break;
			}
		}
		return node;
	}

	/**
	 * expr
	 * 		: additiveExpression
	 */
	private _expr() {
		return this._equalityExpression();
	}

	/**
	 * varDeclaration
	 * 		: VAR variableName ( COLON ID )? ( ASSIGN expr )?
	 */
	private _varDeclaration(): ASTVarDec {
		this._expect(TokenType.VAR);
		const name = this._variableName();
		let type = null, value = null;
		if (this._accept(TokenType.COLON)) {
			this._expect(TokenType.ID);
			type = new ASTType(this._prev.value);
		}
		if (this._accept(TokenType.ASSIGN)) {
			value = this._expr();
		}
		return new ASTVarDec(name, type, value);
	}


	/**
	 * variableExpression
	 * 		: variableName ( ASSIGN expr )?
	 * 		;
	 */
	private _variableExpresion(): ASTExpression {
		const variable = this._variableName()
		if (this._accept(TokenType.ASSIGN)) {
			return new ASTAssign(variable, this._expr());
		}
		return variable;
	}

	/**
	 * variableName:
	 * 		ID
	 * 		;
	 */
	private _variableName(): ASTVar {
		this._expect(TokenType.ID);
		return new ASTVar(this._prev);
	}

	/**
	 * block 
	 * 		: LBRACE (statement)* RBRACE
	 		;
	 */
	private _block(): ASTBlock | string {
		const arr: ASTExpression[] = [];
		this._expect(TokenType.LBRACE);
		while (!this._accept(TokenType.RBRACE)) {
			const s = this._statement();
			if (s) {
				arr.push(s);
			}
		}
		return new ASTBlock(arr);
	}


	/**
	 * statement
	 * 		: SEMI
	 * 		| block
	 * 		| varDeclaration
	 * 		| ifStatement
	 * 		| expr SEMI
	 * 		;
	 */
	private _statement(): ASTStatement | null{
		let value;
		if (this._accept(TokenType.SEMI)) {
			return null;
		}
		if (this._t.type === TokenType.LBRACE) {
			return this._block();
		} else if (this._t.type === TokenType.VAR) {
			return this._varDeclaration();
		} else if (this._t.type === TokenType.IF) {
			return this._ifStatement();	
		} else if (this._t.type === TokenType.WHILE) {
			return this._whileStatement();	
		} else {
			const value =  this._expr();
			this._expect(TokenType.SEMI);
			return value;
		}
	}

	/**
	 * ifStatement
	 * 		: IF LPAREN expr RPAREN statement (ELSE statement)?
	 */
	private _ifStatement() {
		this._expect(TokenType.IF);
		this._expect(TokenType.LPAREN);
		const expr = this._expr();
		this._expect(TokenType.RPAREN);
		const statement = this._statement();
		if (statement === null) {
			throw new SyntaxError(this._prev);
		}
		let statementElse = null;
		if (this._accept(TokenType.ELSE)) {
			statementElse = this._statement();
		}
		return new ASTIf(expr, statement, statementElse);
	}

	/**
	 * whileStatement
	 * 		: WHILE LPAREN expr RPAREN statement
	 */
	private _whileStatement() {
		this._expect(TokenType.WHILE);
		this._expect(TokenType.LPAREN);
		const expr = this._expr();
		this._expect(TokenType.RPAREN);
		const statement = this._statement();
		if (statement === null) {
			throw new SyntaxError(this._prev);
		}
		return new ASTWhile(expr, statement);
	}

	/**
	 * program 
	 * 		: (statement)* EOF
	 * 		;
	 */
	private _program(): ASTBlock {
		const arr: ASTStatement[] = [];
		while (!this._accept(TokenType.EOF)) {
			const s = this._statement();
			if (s) {
				arr.push(s);
			}
		}
		return new ASTBlock(arr);
	}

}