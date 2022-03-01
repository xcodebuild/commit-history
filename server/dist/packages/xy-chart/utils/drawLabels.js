"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawYLabel = exports.drawXLabel = exports.drawTitle = void 0;
var drawTitle = function (seletion, text, color) {
    seletion
        .append("text")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("fill", color)
        .attr("x", "50%")
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text(text);
};
exports.drawTitle = drawTitle;
var drawXLabel = function (seletion, text, color) {
    seletion
        .append("text")
        .style("font-size", "17px")
        .style("fill", color)
        .attr("x", "50%")
        .attr("y", (seletion.attr("height") || 10) - 10)
        .attr("text-anchor", "middle")
        .text(text);
};
exports.drawXLabel = drawXLabel;
var drawYLabel = function (seletion, text, color, offsetY) {
    if (offsetY === void 0) { offsetY = 6; }
    seletion
        .append("text")
        .attr("text-anchor", "end")
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .style("font-size", "17px")
        .style("fill", color)
        .text(text)
        .attr("y", offsetY)
        .call(function (f) {
        var _a, _b;
        var defaultTextLength = 24;
        var textLength = defaultTextLength;
        // Because there is no `getComputedTextLength` method in nodejs env,
        // we have to use it after validate function existed.
        if ((_a = f.node()) === null || _a === void 0 ? void 0 : _a.getComputedTextLength) {
            textLength = (_b = f.node()) === null || _b === void 0 ? void 0 : _b.getComputedTextLength();
        }
        f.attr("x", 0 -
            (seletion.attr("height") || 10) / 2 +
            textLength / 2);
    });
};
exports.drawYLabel = drawYLabel;
