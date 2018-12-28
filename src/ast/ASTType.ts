import ASTNode from "./ASTNode";

export default class ASTType extends ASTNode {

	public readonly name: string; 

	constructor(name: string) {
		super();
		this.name = name;
	}
}