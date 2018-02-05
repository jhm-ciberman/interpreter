"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASTBinOp_1 = require("./ASTBinOp");
class ASTSubstraction extends ASTBinOp_1.default {
    eval() {
        return this.left.eval() - this.right.eval();
    }
}
exports.default = ASTSubstraction;
