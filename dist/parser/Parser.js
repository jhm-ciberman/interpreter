"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenType_1 = require("../Lexer/TokenType");
const SyntaxError_1 = require("./SyntaxError");
const ASTInt_1 = require("../ast/ASTInt");
const ASTDivision_1 = require("../ast/binop/ASTDivision");
const ASTAddition_1 = require("../ast/binop/ASTAddition");
const ASTSubstraction_1 = require("../ast/binop/ASTSubstraction");
const ASTMultiplication_1 = require("../ast/binop/ASTMultiplication");
const ASTUnaryPlus_1 = require("../ast/unaryop/ASTUnaryPlus");
const ASTUnaryMinus_1 = require("../ast/unaryop/ASTUnaryMinus");
const ASTCompound_1 = require("../ast/ASTCompound");
class Parser {
    constructor(lexer) {
        this._lexer = lexer;
        this._t = this._lexer.getNextToken();
    }
    parse() {
        return this._program();
    }
    _expect(type) {
        if (!this._accept(type)) {
            throw new SyntaxError_1.default(this._t, [type]);
        }
    }
    _accept(type) {
        if (this._t.type == type) {
            this._prev = this._t;
            this._t = this._lexer.getNextToken();
            return true;
        }
        return false;
    }
    _factor() {
        if (this._accept(TokenType_1.default.PLUS)) {
            return new ASTUnaryPlus_1.default(this._expr());
        }
        else if (this._accept(TokenType_1.default.MINUS)) {
            return new ASTUnaryMinus_1.default(this._expr());
        }
        else if (this._accept(TokenType_1.default.INTEGER)) {
            return new ASTInt_1.default(this._prev.value);
        }
        else if (this._accept(TokenType_1.default.LPAREN)) {
            const expr = this._expr();
            this._expect(TokenType_1.default.RPAREN);
            return expr;
        }
        else {
            throw new SyntaxError_1.default(this._t, [
                TokenType_1.default.PLUS,
                TokenType_1.default.MINUS,
                TokenType_1.default.INTEGER,
                TokenType_1.default.LPAREN,
            ]);
        }
    }
    _term() {
        let node = this._factor();
        while (true) {
            if (this._accept(TokenType_1.default.MULTIPLY)) {
                node = new ASTMultiplication_1.default(node, this._factor());
            }
            else if (this._accept(TokenType_1.default.DIVISION)) {
                node = new ASTDivision_1.default(node, this._factor());
            }
            else {
                break;
            }
        }
        return node;
    }
    _expr() {
        let node = this._term();
        while (true) {
            if (this._accept(TokenType_1.default.PLUS)) {
                node = new ASTAddition_1.default(node, this._term());
            }
            else if (this._accept(TokenType_1.default.MINUS)) {
                node = new ASTSubstraction_1.default(node, this._term());
            }
            else {
                break;
            }
        }
        return node;
    }
    _block() {
        const arr = [];
        this._expect(TokenType_1.default.LBRACE);
        while (!this._accept(TokenType_1.default.RBRACE)) {
            const s = this._statement();
            if (s) {
                arr.push(s);
            }
        }
        return new ASTCompound_1.default(arr);
    }
    _statement() {
        if (this._accept(TokenType_1.default.SEMI) || this._accept(TokenType_1.default.EOL)) {
            return null;
        }
        else if (this._t.type == TokenType_1.default.LBRACE) {
            return this._block();
        }
        else {
            return this._expr();
        }
    }
    _program() {
        const arr = [];
        while (!this._accept(TokenType_1.default.EOF)) {
            const s = this._statement();
            if (s) {
                arr.push(s);
            }
        }
        return new ASTCompound_1.default(arr);
    }
}
exports.default = Parser;
