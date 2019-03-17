import ASTVarDec from "../../ast/statements/ASTVarDec";
import Type from "../Type";
import SemanticError from "./SemanticError";

export default class TypeAsignationError extends SemanticError {
    constructor(varDec: ASTVarDec, decType: Type, infType: Type) {
        super(varDec, `Type "${decType.name}" is not asignable to type "${infType.name}"`);
    }
}