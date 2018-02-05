"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const TokenType_1 = require("./TokenType");
const Char_1 = require("./Char");
class Lexer {
    constructor(text) {
        this._pos = 0;
        this._text = text;
        this._currentChar = this._text[this._pos];
    }
    getNextToken() {
        while (this._currentChar !== '' && Char_1.default.isWhitespace(this._currentChar)) {
            this._advance();
        }
        const c = this._currentChar;
        if (Char_1.default.isDigit(c)) {
            return new Token_1.default(TokenType_1.default.INTEGER, this._integer());
        }
        else {
            let t;
            switch (c) {
                case "+":
                    t = new Token_1.default(TokenType_1.default.PLUS, c);
                    break;
                case "-":
                    t = new Token_1.default(TokenType_1.default.MINUS, c);
                    break;
                case "*":
                    t = new Token_1.default(TokenType_1.default.MULTIPLY, c);
                    break;
                case "/":
                    t = new Token_1.default(TokenType_1.default.DIVISION, c);
                    break;
                case "(":
                    t = new Token_1.default(TokenType_1.default.LPARENT, c);
                    break;
                case ")":
                    t = new Token_1.default(TokenType_1.default.RPARENT, c);
                    break;
                case "":
                    t = new Token_1.default(TokenType_1.default.EOF, c);
                    break;
                default:
                    throw new Error(`Invalid character "${c}" at position ${this._pos}`);
            }
            this._advance();
            return t;
        }
    }
    _advance() {
        this._pos++;
        if (this._pos > this._text.length - 1) {
            this._currentChar = "";
        }
        else {
            this._currentChar = this._text[this._pos];
        }
    }
    _integer() {
        let result = '';
        while (this._currentChar !== "" && Char_1.default.isDigit(this._currentChar)) {
            result += this._currentChar;
            this._advance();
        }
        return result;
    }
}
exports.default = Lexer;
