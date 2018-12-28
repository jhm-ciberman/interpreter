import * as fse from "fs-extra";
import * as path from "path";
import Lexer from "./lexer/Lexer";
import Parser from "./parser/Parser";
import { TokenType } from "./lexer/TokenType";
import Token from "./lexer/Token";
import Interpreter from "./output/interpreter/Interpreter";
import SyntaxError from "./parser/SyntaxError";
import TokenStream from "./parser/TokenStream";
import ASTLogger from "./output/ast/ASTLogger";
import SemanticAnalyzer from "./semantic/SemanticAnalyzer";

export default class Main {
	public run(argv: string[]) {
		if (argv.length > 2) {
			fse.readFile(path.resolve(argv[2]), "utf8").then(value => {
				try {
					this.processFile(value);
				} catch (e) {
					if (e instanceof SyntaxError) {
						const lines = value.split('\n');
						console.error(lines[e.line - 1])
						console.error(" ".repeat(e.col - 1) + "^");
					}
					console.error(e);
				}
				
			}).catch((e) => {
				
				console.error(e);
			});
		}
		
	}

	public processFile(value: string) {
		console.log("INPUT:");
		console.log(value);
		
		// this._printStream(value);

		const lexer = new Lexer(value);
		const stream = new TokenStream(lexer);
		const parser = new Parser(stream);
		
		
		const ast = parser.parse();
		if (ast) {

			const analyzer = new SemanticAnalyzer();
			analyzer.analyze(ast);

			console.log("AST: ");
			const logger = new ASTLogger(process.stdout);
			logger.visit(ast);

			console.log("OUTPUT:");
			const interpreter = new Interpreter();
			console.log(interpreter.eval(ast));
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

