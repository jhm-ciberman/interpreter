"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const TokenType_1 = require("./TokenType");
const Char_1 = require("./Char");
class Lexer {
    constructor(text) {
        this._tokenMap = new Map();
        this._pos = -1;
        this._text = text;
        this._advance();
        this._tokenMap
            .set("\n", new Token_1.default(TokenType_1.default.EOL))
            .set(";", new Token_1.default(TokenType_1.default.SEMI))
            .set("+", new Token_1.default(TokenType_1.default.PLUS))
            .set("-", new Token_1.default(TokenType_1.default.MINUS))
            .set("*", new Token_1.default(TokenType_1.default.MULTIPLY))
            .set("/", new Token_1.default(TokenType_1.default.DIVISION))
            .set("(", new Token_1.default(TokenType_1.default.LPAREN))
            .set(")", new Token_1.default(TokenType_1.default.RPAREN))
            .set("{", new Token_1.default(TokenType_1.default.LBRACE))
            .set("}", new Token_1.default(TokenType_1.default.RBRACE));
    }
    getNextToken() {
        if (this._cc == "") {
            return new Token_1.default(TokenType_1.default.EOF);
        }
        this._skipCommentsAndWhitespace();
        const c = this._cc;
        if (Char_1.default.isDigit(c)) {
            return new Token_1.default(TokenType_1.default.INTEGER, this._integer());
        }
        else {
            let t;
            if (this._tokenMap.has(c)) {
                this._advance();
                return this._tokenMap.get(c);
            }
            else {
                throw new Error(`Invalid character "${c}" at position ${this._pos}`);
            }
        }
    }
    _advance() {
        this._pos++;
        this._cc = (this._pos > this._text.length - 1) ? "" : this._text[this._pos];
        return this._cc;
    }
    _peek(n = 1) {
        return (this._pos + n > this._text.length - 1) ? "" : this._text[this._pos + n];
    }
    _integer() {
        let result = '';
        while (this._cc !== '' && Char_1.default.isDigit(this._cc)) {
            result += this._cc;
            this._advance();
        }
        return result;
    }
    _skipCommentsAndWhitespace() {
        while (this._cc !== '' && Char_1.default.isWhitespace(this._cc)) {
            this._advance();
        }
        if (this._cc == "/") {
            switch (this._peek()) {
                case '/':
                    this._advance();
                    this._skipDoubleSlashComment();
                    this._skipCommentsAndWhitespace();
                    break;
                case '*':
                    this._advance();
                    this._skipMultilineComment();
                    this._skipCommentsAndWhitespace();
                    break;
            }
        }
    }
    _skipMultilineComment() {
        do {
            this._advance();
        } while (this._cc !== '' && this._cc !== '*' && this._peek() !== '/');
        this._advance();
        this._advance();
    }
    _skipDoubleSlashComment() {
        do {
            this._advance();
        } while (this._cc !== '\n' && this._cc !== '');
        this._advance();
    }
}
exports.default = Lexer;
