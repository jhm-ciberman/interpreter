"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const path = require("path");
const Lexer_1 = require("./lexer/Lexer");
const Parser_1 = require("./parser/Parser");
const TokenType_1 = require("./lexer/TokenType");
class Main {
    run(argv) {
        if (argv.length > 2) {
            fse.readFile(path.resolve(argv[2]), "utf8").then(value => {
                this.processFile(value);
            }).catch((e) => {
                console.error(e);
            });
        }
    }
    processFile(value) {
        console.log("INPUT:");
        console.log(value);
        this._printStream(value);
        const lexer = new Lexer_1.default(value);
        const parser = new Parser_1.default(lexer);
        console.log("AST: ");
        const ast = parser.parse();
        if (ast) {
            console.log(ast.log(1));
            console.log("OUTPUT:");
            console.log(ast.eval());
        }
        else {
            console.log("> No ast");
        }
    }
    _printStream(value) {
        console.log("STREAM:");
        const lexer = new Lexer_1.default(value);
        let token;
        const arr = [];
        do {
            token = lexer.getNextToken();
            arr.push(token.type);
        } while (token.type !== TokenType_1.TokenType.EOF);
        console.log(arr.join(", "));
    }
}
exports.default = Main;
