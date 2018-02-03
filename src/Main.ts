import * as fse from "fs-extra";
import * as path from "path";

export default class Main {
	public run(argv: string[]) {
		if (argv.length > 2) {
			fse.readFile(path.resolve(argv[2]), "utf8").then(value => {
				this.processFile(value);
			})
		}
		
	}

	public processFile(value: string) {
		process.stdout.write(value);
	}
}

