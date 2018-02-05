"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Char = (function () {
    function Char() {
    }
    Char.isDigit = function (char) {
        return (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(char) !== -1);
    };
    Char.isWhitespace = function (char) {
        return ([' ', '\t'].indexOf(char) !== -1);
    };
    return Char;
}());
exports.default = Char;
