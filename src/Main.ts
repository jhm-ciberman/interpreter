import * as fse from "fs-extra";
import * as path from "path";
import Lexer from "./lexer/Lexer";
import Parser from "./parser/Parser";
import { TokenType } from "./lexer/TokenType";
import Token from "./lexer/Token";
import AST from "./ast/AST";

export default class Main {
	public run(argv: string[]) {
		if (argv.length > 2) {
			fse.readFile(path.resolve(argv[2]), "utf8").then(value => {
				this.processFile(value);
			}).catch((e) => {
				console.error(e);
			});
		}
		
	}

	public processFile(value: string) {
		console.log("INPUT:");
		console.log(value);
		
		this._printStream(value);

		const lexer = new Lexer(value);
		const parser = new Parser(lexer);
		
		console.log("AST: ");
		const ast = parser.parse();
		if (ast) {
			
			console.log(ast.log(1));

			console.log("OUTPUT:");
			console.log(ast.eval());
		} else {
			console.log("> No ast");
		}
	}

	private _printStream(value: string) {
		console.log("STREAM:");
		const lexer = new Lexer(value);
		let token: Token;
		const arr = [];
		do  {
			token = lexer.getNextToken();
			arr.push(token.type);
		} while (token.type !== TokenType.EOF);
		console.log(arr.join(", "));
	} 
}

