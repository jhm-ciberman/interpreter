import Type from "../semantic/Type";

export default class OperandValue {
    public readonly type: Type;
    public readonly operand: any;

    constructor(type: Type, operand: any) {
        this.type = type;
        this.operand = operand;
    }

    
}