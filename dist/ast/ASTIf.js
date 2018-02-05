"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("./AST");
class ASTIf extends AST_1.default {
    constructor(cond, statements) {
        super();
        this._cond = cond;
        this._statements = statements;
    }
    eval() {
        if (this._cond.eval()) {
            return this._statements.eval();
        }
    }
}
exports.default = ASTIf;
