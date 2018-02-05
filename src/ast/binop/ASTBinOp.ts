import AST from "../AST";
import ASTInt from "../ASTInt";
import Token from "../../Lexer/Token";
import { TokenType } from "../../Lexer/TokenType";

export default abstract class ASTBinOp extends AST {
	
	public left: AST;

	public right: AST;

	constructor(left: AST, right: AST) {
		super();
		this.left = left;
		this.right = right;
	}

	public log(level: number): string {
		let str = super.log(level);
		str += "  ".repeat(level) + "Left: \n";
		str += this.left.log(level + 1);
		str += "  ".repeat(level) + "Right: \n"; 
		str += this.right.log(level + 1);
		return str;
	}

}