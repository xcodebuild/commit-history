"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberFormatUnit = void 0;
var getNumberFormatUnit = function (n) {
    if (n >= 300) {
        return 1000;
    }
    return 1;
};
exports.getNumberFormatUnit = getNumberFormatUnit;
var getFormatNumber = function (n, type) {
    if (type === void 0) { type = 1; }
    if (type === 1) {
        return "".concat(n);
    }
    return "".concat((n / 1000).toFixed(1), "k");
};
exports.default = getFormatNumber;
