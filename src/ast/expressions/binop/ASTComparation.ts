import ASTBinOp from "./ASTBinOp";
import ASTExpression from "../ASTExpression";
import ComparationType from "../ComparationType";
import Type from "../../../semantic/Type";
import INodeVisitor from "../../../INodeVisitor";
import INodeInterpreter from "../../../output/interpreter/INodeInterpreter";

export default class ASTComparation extends ASTBinOp {

	public readonly comparationType: ComparationType;

    constructor(left: ASTExpression, type: ComparationType, right: ASTExpression) {
        super(left, right);
        this.comparationType = type;
    }

	public accept(visitor: INodeVisitor): void {
		visitor.visitComparation(this);
	}
    
    public resolveValue(evaluator: INodeInterpreter): any {
        return evaluator.visitComparation(this);
    }
	
    public toBytecode(generator: INodeVisitor): void {
        generator.visitComparation(this);
    }
}