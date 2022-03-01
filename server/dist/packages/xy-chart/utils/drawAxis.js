"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawYAxis = exports.drawXAxis = void 0;
var d3_axis_1 = require("d3-axis");
var getFormatNumber_1 = __importStar(require("./getFormatNumber"));
var getFormatTimeline_1 = __importStar(require("./getFormatTimeline"));
var drawXAxis = function (selection, _a) {
    var xScale = _a.xScale, tickCount = _a.tickCount, moveDown = _a.moveDown, fontFamily = _a.fontFamily, stroke = _a.stroke, type = _a.type;
    var xAxisGenerator = (0, d3_axis_1.axisBottom)(xScale)
        .tickSize(0)
        .tickPadding(6)
        .ticks(tickCount);
    if (type === "Number") {
        var index_1 = 1;
        var type_1 = undefined;
        xAxisGenerator.tickFormat(function (d) {
            var timestamp = Number(d);
            var tickAmount = selection.selectAll(".xaxis > .tick").nodes().length;
            index_1++;
            if (timestamp === 0 || (tickAmount >= 7 && index_1 % 2 === 0)) {
                return " ";
            }
            if (!type_1) {
                type_1 = (0, getFormatTimeline_1.getTimestampFormatUnit)(timestamp);
            }
            return (0, getFormatTimeline_1.default)(timestamp, type_1);
        });
    }
    selection
        .append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0,".concat(moveDown, ")"))
        .call(xAxisGenerator);
    selection
        .selectAll(".domain")
        .attr("filter", "url(#xkcdify)")
        .style("stroke", stroke);
    selection
        .selectAll(".xaxis > .tick > text")
        .style("font-family", fontFamily)
        .style("font-size", "16px")
        .style("fill", stroke);
};
exports.drawXAxis = drawXAxis;
var drawYAxis = function (selection, _a) {
    var yScale = _a.yScale, tickCount = _a.tickCount, fontFamily = _a.fontFamily, stroke = _a.stroke;
    var type = undefined;
    var yAxisGenerator = (0, d3_axis_1.axisLeft)(yScale)
        .tickSize(1)
        .tickPadding(6)
        .ticks(tickCount, "s")
        .tickFormat(function (d) {
        if (d === 0) {
            return " ";
        }
        if (!type) {
            type = (0, getFormatNumber_1.getNumberFormatUnit)(d);
        }
        return (0, getFormatNumber_1.default)(d, type);
    });
    selection.append("g").attr("class", "yaxis").call(yAxisGenerator);
    selection
        .selectAll(".domain")
        .attr("filter", "url(#xkcdify)")
        .style("stroke", stroke);
    selection
        .selectAll(".yaxis > .tick > text")
        .style("font-family", fontFamily)
        .style("font-size", "16px")
        .style("fill", stroke);
};
exports.drawYAxis = drawYAxis;
