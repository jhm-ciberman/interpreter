"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../AST");
class ASTBinOp extends AST_1.default {
    constructor(op, expr) {
        super(op);
        this.expr = expr;
    }
    log(level) {
        let str = super.log(level);
        str += this.expr.log(level + 1);
        return str;
    }
}
exports.default = ASTBinOp;
