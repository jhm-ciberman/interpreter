"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fse = require("fs-extra");
var path = require("path");
var Main = (function () {
    function Main() {
    }
    Main.prototype.run = function (argv) {
        var _this = this;
        if (argv.length > 2) {
            fse.readFile(path.resolve(argv[2]), "utf8").then(function (value) {
                _this.processFile(value);
            });
        }
    };
    Main.prototype.processFile = function (value) {
        process.stdout.write(value);
    };
    return Main;
}());
exports.default = Main;
