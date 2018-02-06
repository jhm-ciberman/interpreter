import ASTCompound from "./ast/ASTCompound";
import ASTBinOp from "./ast/expressions/ASTBinOp";
import ASTExpression from "./ast/expressions/ASTExpression";
import ASTUnaryOp from "./ast/expressions/ASTUnaryOp";
import ASTInt from "./ast/expressions/ASTInt";
import ASTVar from "./ast/expressions/ASTVar";
import ASTStatement from "./ast/statements/ASTStatement";
import ASTVarDec from "./ast/ASTVarDec";
import ASTAssign from "./ast/expressions/ASTAssign";

export default abstract class NodeVisitor<T> {

	protected _visit(ast: any): T {
		const name = ast.constructor.name.split("AST").join("");
		const methodName = "_visit" + name;
		if (methodName in this) {
			return ((this as any)[methodName])(ast);;
		} else {
			throw new Error(`Unrecognized Node type: "${name}"`);
		}
	}

	protected abstract _visitCompound(ast: ASTCompound): T;
	protected abstract _visitVarDec(ast: ASTVarDec): T;


	protected abstract _visitAssign(ast: ASTAssign): T;
	protected abstract _visitBinOp(ast: ASTBinOp): T;
	protected abstract _visitUnaryOp(ast: ASTUnaryOp): T;
	protected abstract _visitInt(ast: ASTInt): T;
	protected abstract _visitVar(ast: ASTVar): T;


}