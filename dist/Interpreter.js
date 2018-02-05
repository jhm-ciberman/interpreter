"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Token_1 = require("./Token");
var TokenType_1 = require("./TokenType");
var Char_1 = require("./Char");
var Interpreter = (function () {
    function Interpreter(text) {
        this._text = text;
        this._pos = 0;
        this._currentChar = this._text[this._pos];
    }
    Interpreter.prototype._advance = function () {
        this._pos++;
        if (this._pos > this._text.length - 1) {
            this._currentChar = "";
        }
        else {
            this._currentChar = this._text[this._pos];
        }
    };
    Interpreter.prototype._skipWhitespace = function () {
        while (this._currentChar !== '' && Char_1.default.isWhitespace(this._currentChar)) {
            this._advance();
        }
    };
    Interpreter.prototype._integer = function () {
        var result = '';
        while (this._currentChar !== "" && Char_1.default.isDigit(this._currentChar)) {
            result += this._currentChar;
            this._advance();
        }
        return parseInt(result);
    };
    Interpreter.prototype._getNextToken = function () {
        var text = this._text;
        if (this._pos > this._text.length - 1) {
            return new Token_1.default(TokenType_1.default.EOF, null);
        }
        var char = text[this._pos];
        if (Char_1.default.isDigit(char)) {
            var token = new Token_1.default(TokenType_1.default.INTEGER, parseInt(char));
            this._pos += 1;
            return token;
        }
        if (char == '+') {
            var token = new Token_1.default(TokenType_1.default.PLUS, char);
            this._pos += 1;
            return token;
        }
        throw new Error("Invalid character at position " + this._pos);
    };
    Interpreter.prototype._eat = function (type) {
        if (this._currentToken.type == type) {
            this._currentToken = this._getNextToken();
        }
        else {
            throw new Error("Invalid token: " + this._currentToken.toString() + ". Expected: " + type + ".");
        }
    };
    Interpreter.prototype.expr = function () {
        this._currentToken = this._getNextToken();
        var left = this._currentToken;
        this._eat(TokenType_1.default.INTEGER);
        var op = this._currentToken;
        switch (op.type) {
            case TokenType_1.default.PLUS:
                this._eat(TokenType_1.default.PLUS);
                break;
            case TokenType_1.default.MINUS:
                this._eat(TokenType_1.default.MINUS);
                break;
            default:
                throw new Error("Invalid expresion");
        }
        var right = this._currentToken;
        this._eat(TokenType_1.default.INTEGER);
        switch (op.type) {
            case TokenType_1.default.PLUS:
                return left.value + right.value;
            case TokenType_1.default.MINUS:
                return left.value - right.value;
        }
    };
    return Interpreter;
}());
exports.default = Interpreter;
