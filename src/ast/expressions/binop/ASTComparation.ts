import ASTBinOp from "./ASTBinOp";
import ASTExpression from "../ASTExpression";
import ComparationType from "../ComparationType";
import Type from "../../../semantic/Type";
import INodeVisitor from "../../../INodeVisitor";
import INodeInterpreter from "../../../output/interpreter/INodeInterpreter";
import INodeAnalyzer from "../../../semantic/INodeAnalyzer";

export default class ASTComparation extends ASTBinOp {

	public readonly type: ComparationType;

    constructor(left: ASTExpression, type: ComparationType, right: ASTExpression) {
        super(left, right);
        this.type = type;
    }

	public accept(visitor: INodeVisitor): void {
		visitor.visitComparation(this);
	}

	public resolveType(analizer: INodeAnalyzer): Type {
		return analizer.visitComparation(this);
    }
    
    public resolveValue(evaluator: INodeInterpreter): any {
        return evaluator.visitComparation(this);
    }
	
    public toBytecode(generator: INodeVisitor): void {
        generator.visitComparation(this);
    }
}