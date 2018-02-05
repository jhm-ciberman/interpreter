"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("./AST");
class ASTInt extends AST_1.default {
    constructor(token) {
        super(token);
        this.value = parseInt(this.token.value);
    }
    eval() {
        return this.value;
    }
    log(level) {
        return "  ".repeat(level) + this.constructor.name + "(" + this.token.type + ") = " + this.value + "\n";
    }
    ;
}
exports.default = ASTInt;
