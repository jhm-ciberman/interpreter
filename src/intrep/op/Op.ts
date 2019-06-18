import IIntRepVisitor from "../../assambly/IIntRepVisitor";

export default abstract class Op {
    public abstract toString(): string;
    public abstract accept(visitor: IIntRepVisitor): void;
}