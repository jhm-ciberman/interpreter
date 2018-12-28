import IASTLogger from "./IASTLogger";
import ASTNode from "../../ast/ASTNode";

export default class ASTLogger implements IASTLogger {

	private _level = -1;
	private _stream: NodeJS.WriteStream;

	constructor(stream: NodeJS.WriteStream) {
		this._stream = stream;
	}

	public visit(ast: ASTNode): void {
		this._level++;
		ast.log(this);
		this._level--;
	}

	public print(str: string) {
		this._stream.write("  ".repeat(this._level) + str);
	}

	public printNode(ast: ASTNode, str: string = ""): void {
		this.print(ast.getNodeName() + str + "\n");
	}

	public printLine(str: string): void {
		this.print(str + "\n");
	}
}