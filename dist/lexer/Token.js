"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    toString() {
        return `Token{${this.type},${this.value}}`;
    }
}
exports.default = Token;
