"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drawLegend = function (selection, _a) {
    var _b, _c;
    var items = _a.items, strokeColor = _a.strokeColor, backgroundColor = _a.backgroundColor;
    var legendXPadding = 7;
    var legendYPadding = 6;
    var xkcdCharWidth = 7;
    var xkcdCharHeight = 20;
    var colorBlockWidth = 8;
    var legend = selection.append("svg");
    var backgroundLayer = legend.append("svg");
    var textLayer = legend.append("svg");
    var maxTextLength = 0;
    items.forEach(function (item, i) {
        // draw color dot
        textLayer
            .append("rect")
            .style("fill", item.color)
            .attr("width", colorBlockWidth)
            .attr("height", colorBlockWidth)
            .attr("rx", 2)
            .attr("ry", 2)
            .attr("filter", "url(#xkcdify)")
            .attr("x", 8 + legendXPadding)
            .attr("y", 17 + xkcdCharHeight * i);
        // draw text
        textLayer
            .append("text")
            .style("font-size", "15px")
            .style("fill", strokeColor)
            .attr("x", 8 + legendXPadding + colorBlockWidth + 6)
            .attr("y", 17 + xkcdCharHeight * i + 8)
            .text(item.text);
        maxTextLength = Math.max(item.text.length, maxTextLength);
    });
    var bboxWidth = maxTextLength * (xkcdCharWidth + 0.5) + colorBlockWidth + legendXPadding;
    // Because there is no `getBBox` method in nodejs env,
    // we have to use it after validate function existed.
    if ((_b = textLayer.node()) === null || _b === void 0 ? void 0 : _b.getBBox) {
        bboxWidth = (_c = textLayer.node()) === null || _c === void 0 ? void 0 : _c.getBBox().width;
    }
    var backgroundWidth = Math.max(bboxWidth + legendXPadding * 2, maxTextLength * xkcdCharWidth + colorBlockWidth + legendXPadding * 2 + 6);
    var backgroundHeight = items.length * xkcdCharHeight + legendYPadding * 2;
    // add background
    backgroundLayer
        .append("rect")
        .style("fill", backgroundColor)
        .attr("fill-opacity", 0.85)
        .attr("stroke", strokeColor)
        .attr("stroke-width", 2)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("filter", "url(#xkcdify)")
        .attr("width", backgroundWidth)
        .attr("height", backgroundHeight)
        .attr("x", 8)
        .attr("y", 5);
};
exports.default = drawLegend;
