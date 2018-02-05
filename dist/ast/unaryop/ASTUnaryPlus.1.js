"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASTUnaryOp_1 = require("./ASTUnaryOp");
class ASTUnaryPlus extends ASTUnaryOp_1.default {
    visit() {
        return +this.expr.visit();
    }
}
exports.default = ASTUnaryPlus;
