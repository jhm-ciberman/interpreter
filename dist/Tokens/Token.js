"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Token = (function () {
    function Token(value) {
        this._name = "TOKEN";
        this.value = value;
    }
    Token.prototype.toString = function () {
        return "Token{" + this._name + "," + this.value + "}";
    };
    return Token;
}());
exports.default = Token;
