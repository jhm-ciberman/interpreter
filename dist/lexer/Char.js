"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Char {
    static isDigit(char) {
        return (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(char) !== -1);
    }
    static isWhitespace(char) {
        return ([' ', '\t'].indexOf(char) !== -1);
    }
}
exports.default = Char;
