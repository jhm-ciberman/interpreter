"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const path = require("path");
const Lexer_1 = require("./lexer/Lexer");
const Parser_1 = require("./parser/Parser");
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
        const lexer = new Lexer_1.default(value);
        const parser = new Parser_1.default(lexer);
        const ast = parser.parse();
        console.log("AST: ");
        console.log(ast.log(1));
        const result = ast.visit();
        console.log("OUTPUT:");
        console.log(result);
    }
}
exports.default = Main;
