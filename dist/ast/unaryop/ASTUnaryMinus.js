"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASTUnaryOp_1 = require("./ASTUnaryOp");
class ASTUnaryMinus extends ASTUnaryOp_1.default {
    eval() {
        return -this.expr.eval();
    }
}
exports.default = ASTUnaryMinus;
