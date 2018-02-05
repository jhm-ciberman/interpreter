"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AST {
    constructor(token) {
        this.token = token;
    }
    log(level) {
        return "  ".repeat(level) + this.constructor.name + "(" + this.token.type + ") \n";
    }
    ;
}
exports.default = AST;
