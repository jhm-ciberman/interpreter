"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASTBinOp_1 = require("./ASTBinOp");
class ASTDivision extends ASTBinOp_1.default {
    visit() {
        return this.left.visit() / this.right.visit();
    }
}
exports.default = ASTDivision;
