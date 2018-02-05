"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../AST");
class ASTBinOp extends AST_1.default {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
    log(level) {
        let str = super.log(level);
        str += "  ".repeat(level) + "Left: \n";
        str += this.left.log(level + 1);
        str += "  ".repeat(level) + "Right: \n";
        str += this.right.log(level + 1);
        return str;
    }
}
exports.default = ASTBinOp;
