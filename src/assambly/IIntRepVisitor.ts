import OpAdd from "../intrep/op/binop/OpAdd";
import OpAssignInt from "../intrep/op/OpAssignInt";
import OpRet from "../intrep/op/OpRet";

export default interface IIntRepVisitor {
    visitAdd(op: OpAdd): void;
    visitSubstract(op: OpAdd): void;
    visitAssignInt(op: OpAssignInt): void;
    visitRet(op: OpRet): void;
}