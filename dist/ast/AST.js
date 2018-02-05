"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AST {
    log(level) {
        return "  ".repeat(level) + this.constructor.name + "\n";
    }
    ;
}
exports.default = AST;
