import * as fse from "fs-extra";
import * as path from "path";
import Lexer from "./lexer/Lexer";
import Parser from "./parser/Parser";

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
		const lexer = new Lexer(value);
		const parser = new Parser(lexer);
		const ast = parser.parse();
		console.log("AST: ");
		console.log(ast.log(1));
		const result = ast.eval();
		console.log("OUTPUT:");
		console.log(result);
	}
}

