"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("./AST");
class ASTInt extends AST_1.default {
    constructor(value) {
        super();
        this.value = parseInt(value);
    }
    eval() {
        return this.value;
    }
    log(level) {
        return super.log(level).replace("\n", " = " + this.value + "\n");
    }
    ;
}
exports.default = ASTInt;
