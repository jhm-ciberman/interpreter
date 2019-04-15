import ASTExpression from "./ASTExpression";
import Type from "../../semantic/Type";
import INodeVisitor from "../../INodeVisitor";
import INodeInterpreter from "../../output/interpreter/INodeInterpreter";
import INodeAnalyzer from "../../semantic/INodeAnalyzer";
import Op from "../../bytecode/Op";

export default class ASTInt extends ASTExpression {
	
	public readonly value: number;

	constructor(value: string) {
		super();
		this.value = parseInt(value);
	}

	public accept(visitor: INodeVisitor): void {
		visitor.visitInt(this);
	}

	public resolveValue(evaluator: INodeInterpreter): any {
		return evaluator.visitInt(this);
	}

	public resolveType(analyzer: INodeAnalyzer): Type {
		return analyzer.visitInt(this);
	}

	public toBytecode(generator: INodeVisitor): Op[] {
        return generator.visitInt(this);
    }
}