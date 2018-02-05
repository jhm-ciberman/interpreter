"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType;
(function (TokenType) {
    TokenType["TOKEN"] = "TOKEN";
    TokenType["INTEGER"] = "INTEGER";
    TokenType["MULTIPLY"] = "MULTIPLY";
    TokenType["DIVISION"] = "DIVISION";
    TokenType["LPARENT"] = "LPARENT";
    TokenType["RPARENT"] = "RPARENT";
    TokenType["PLUS"] = "PLUS";
    TokenType["MINUS"] = "MINUS";
    TokenType["EOF"] = "EOF";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
exports.default = TokenType;
