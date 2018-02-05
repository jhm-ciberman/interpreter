"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ASTBinOp_1 = require("./ASTBinOp");
var ASTMultiplication = (function (_super) {
    __extends(ASTMultiplication, _super);
    function ASTMultiplication() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ASTMultiplication.prototype.visit = function () {
        return this.left.visit() * this.right.visit();
    };
    return ASTMultiplication;
}(ASTBinOp_1.default));
exports.default = ASTMultiplication;
