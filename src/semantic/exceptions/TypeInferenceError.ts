import ASTVarDec from "../../ast/statements/ASTVarDec";
import SemanticError from "./SemanticError";

export default class TypeInferenceError extends SemanticError {
    constructor(varDec: ASTVarDec) {
        super(varDec, "Cannot infer type for declared variable " + varDec.var.name);
    }
}