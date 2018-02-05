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
class Parser {
    constructor(lexer) {
        this._lexer = lexer;
        this._currentToken = this._lexer.getNextToken();
    }
    parse() {
        return this._expr();
    }
    _eat(type) {
        if (this._currentToken.type == type) {
            const t = this._currentToken;
            this._currentToken = this._lexer.getNextToken();
            return t;
        }
        else {
            throw new SyntaxError_1.default(this._currentToken, [type]);
        }
    }
    _factor() {
        switch (this._currentToken.type) {
            case TokenType_1.default.PLUS:
                return new ASTUnaryPlus_1.default(this._eat(TokenType_1.default.PLUS), this._expr());
            case TokenType_1.default.MINUS:
                return new ASTUnaryMinus_1.default(this._eat(TokenType_1.default.MINUS), this._expr());
            case TokenType_1.default.INTEGER:
                return new ASTInt_1.default(this._eat(TokenType_1.default.INTEGER));
            case TokenType_1.default.LPARENT:
                this._eat(TokenType_1.default.LPARENT);
                const expr = this._expr();
                this._eat(TokenType_1.default.RPARENT);
                return expr;
            default:
                throw new SyntaxError_1.default(this._currentToken, [TokenType_1.default.INTEGER]);
        }
    }
    _term() {
        let node = this._factor();
        for (;;) {
            switch (this._currentToken.type) {
                case TokenType_1.default.MULTIPLY:
                    node = new ASTMultiplication_1.default(node, this._eat(TokenType_1.default.MULTIPLY), this._factor());
                    continue;
                case TokenType_1.default.DIVISION:
                    node = new ASTDivision_1.default(node, this._eat(TokenType_1.default.DIVISION), this._factor());
                    continue;
            }
            break;
        }
        return node;
    }
    _expr() {
        let node = this._term();
        for (;;) {
            switch (this._currentToken.type) {
                case TokenType_1.default.PLUS:
                    node = new ASTAddition_1.default(node, this._eat(TokenType_1.default.PLUS), this._term());
                    continue;
                case TokenType_1.default.MINUS:
                    node = new ASTSubstraction_1.default(node, this._eat(TokenType_1.default.MINUS), this._term());
                    continue;
            }
            break;
        }
        return node;
    }
}
exports.default = Parser;
