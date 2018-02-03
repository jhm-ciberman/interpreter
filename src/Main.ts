import * as fse from "fs-extra";
import * as path from "path";
import Interpreter from "./Interpreter";

export default class Main {
	public run(argv: string[]) {
		if (argv.length > 2) {
			fse.readFile(path.resolve(argv[2]), "utf8").then(value => {
				this.processFile(value);
			})
		}
		
	}

	public processFile(value: string) {
		const interpreter = new Interpreter(value);
		const result = interpreter.expr();
		console.log(result);
	}
}

