import ASTNode from "./ASTNode";
import IASTLogger from "../output/ast/IASTLogger";

export default class ASTType extends ASTNode {
	public readonly name: string; 

	constructor(name: string) {
		super();
		this.name = name;
	}

	public log(logger: IASTLogger): string {
		throw new Error("Method not implemented.");
	}
}