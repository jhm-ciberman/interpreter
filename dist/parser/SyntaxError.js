"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SyntaxError extends Error {
    constructor(current, expected) {
        super();
        this._current = current;
        this._expected = expected;
        this.message = `Invalid token: ${this._current.toString()}. Expected: ${this._expected.join(", ")}.`;
    }
}
exports.default = SyntaxError;
