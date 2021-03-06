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
import IntRepGenerator from "./intrep/IntRepGenerator";
import AssamblyBuilder from "./assambly/AssamblyBuilder";
import FASMCompiler from "./assambly/FASMCompiler";
import AssamblyGenerator from "./assambly/AssamblyGenerator";

export default class Main {
	public static main(argv: string[]) {
		if (argv.length < 2) {
			console.log("Error: Expected 1 argument");
			return;
		}

		fse.readFile(path.resolve(argv[2]), "utf8")
			.then(source => {
				const inst = new Main();
				try {
					inst.processFile(source);
				} catch (e) {
					inst._printError(e, source);
				}
			}).catch((e) => {
				
				console.error(e);
			});
	}

	private _printError(e: Error, source: string): void {
		if (e instanceof SyntaxError) {
			const lines = source.split('\n');
			console.error(lines[e.line - 1])
			console.error(" ".repeat(e.col - 1) + "^");
		}
		console.error(e);
	}

	public processFile(value: string) {
		console.log("INPUT:");
		console.log(value);
		
		// this._printStream(value);

		const lexer = new Lexer(value);
		const stream = new TokenStream(lexer);
		const parser = new Parser(stream);
		const ast = parser.parse();

		const analyzer = new SemanticAnalyzer();
		analyzer.analyze(ast);

		console.log("AST: ");
		const logger = new ASTLogger(process.stdout);
		ast.accept(logger);

		const generator = new IntRepGenerator(analyzer.globalScope);
		const opList = generator.generate(ast);
		console.log("OPLIST:");
		opList.forEach(op => {
			console.log(op.toString());
		});

		const asmGen = new AssamblyGenerator();
		opList.forEach(op => op.accept(asmGen));

		const asmGenerator = new AssamblyBuilder();
		const asmStr = asmGenerator.generateAssambly(asmGen.opStringList);
		console.log(asmStr);

		const fasmCompiler = new FASMCompiler();
		fasmCompiler.compile(asmStr, './out.exe');

		console.log("OUTPUT:");
		const interpreter = new Interpreter();
		console.log(interpreter.visitBlock(ast));
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

