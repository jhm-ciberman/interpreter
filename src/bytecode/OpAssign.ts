import Symbol from "../semantic/Symbol";
import Op from "./Op";

export default class OpAssign extends Op {

    public left: Symbol;

    public value: number;

    constructor(left: Symbol, value: number) {
        super();
        this.left = left;
        this.value = value;
    }

    public toString(): string {
        return this.left.name + " = " + this.value + ";"; 
    }
}