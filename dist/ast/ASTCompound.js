"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("./AST");
class ASTCompound extends AST_1.default {
    constructor(childs) {
        super();
        this._childs = childs;
    }
    eval() {
        let r;
        for (const child of this._childs) {
            r = child.eval();
        }
        return r;
    }
    log(level) {
        let str = super.log(level);
        for (const child of this._childs) {
            str += child.log(level + 1);
        }
        return str;
    }
}
exports.default = ASTCompound;
