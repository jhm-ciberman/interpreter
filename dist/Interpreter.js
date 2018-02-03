"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Token_1 = require("./Token");
var TokenType_1 = require("./TokenType");
var Interpreter = (function () {
    function Interpreter(text) {
        this.pos = 0;
        this.text = text;
    }
    Interpreter.prototype.getNextToken = function () {
        var text = this.text;
        if (this.pos > this.text.length - 1) {
            return new Token_1.default(TokenType_1.default.EOF, null);
        }
        var char = text[this.pos];
        if (this._isDigit(char)) {
            var token = new Token_1.default(TokenType_1.default.INTEGER, parseInt(char));
            this.pos += 1;
            return token;
        }
        if (char == '+') {
            var token = new Token_1.default(TokenType_1.default.PLUS, char);
            this.pos += 1;
            return token;
        }
        throw new Error("Invalid character at position " + this.pos);
    };
    Interpreter.prototype.eat = function (type) {
        if (this.currentToken.type == type) {
            this.currentToken = this.getNextToken();
        }
        else {
            throw new Error("Invalid token: " + this.currentToken.toString() + ". Expected: " + type + ".");
        }
    };
    Interpreter.prototype.expr = function () {
        this.currentToken = this.getNextToken();
        var left = this.currentToken;
        this.eat(TokenType_1.default.INTEGER);
        var op = this.currentToken;
        this.eat(TokenType_1.default.PLUS);
        var right = this.currentToken;
        this.eat(TokenType_1.default.INTEGER);
        var result = left.value + right.value;
        return result;
    };
    Interpreter.prototype._isDigit = function (char) {
        return (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(char) !== -1);
    };
    return Interpreter;
}());
exports.default = Interpreter;
