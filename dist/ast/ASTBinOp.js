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
var AST_1 = require("./AST");
var ASTBinOp = (function (_super) {
    __extends(ASTBinOp, _super);
    function ASTBinOp(left, op, right) {
        var _this = _super.call(this, op) || this;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    return ASTBinOp;
}(AST_1.default));
exports.default = ASTBinOp;
