"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Token = (function () {
    function Token(type, value) {
        this.type = type;
        this.value = value;
    }
    Token.prototype.toString = function () {
        return "Token{" + this.type + "," + this.value + "}";
    };
    return Token;
}());
exports.default = Token;
