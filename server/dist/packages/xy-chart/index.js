"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var d3_scale_1 = require("d3-scale");
var d3_selection_1 = require("d3-selection");
var d3_shape_1 = require("d3-shape");
var dayjs_1 = __importDefault(require("dayjs"));
var ToolTip_1 = __importDefault(require("./components/ToolTip"));
var drawAxis_1 = require("./utils/drawAxis");
var addFilter_1 = __importDefault(require("./utils/addFilter"));
var addFont_1 = __importDefault(require("./utils/addFont"));
var drawLabels_1 = require("./utils/drawLabels");
var drawLegend_1 = __importDefault(require("./utils/drawLegend"));
var getFormatTimeline_1 = __importStar(require("./utils/getFormatTimeline"));
var colors = [
    "#dd4528",
    "#28a3dd",
    "#f3db52",
    "#ed84b5",
    "#4ab74e",
    "#9179c0",
    "#8e6d5a",
    "#f19839",
    "#949494",
];
var margin = {
    top: 50,
    right: 30,
    bottom: 50,
    left: 50,
};
var getDefaultOptions = function () {
    return {
        xTickLabelType: "Date",
        dateFormat: "MM/DD/YYYY",
        xTickCount: 5,
        yTickCount: 5,
        showLine: true,
        dotSize: 0.5,
        dataColors: colors,
        fontFamily: "xkcd",
        backgroundColor: "white",
        strokeColor: "black",
    };
};
var XYChart = function (svg, _a, intialOptions) {
    var title = _a.title, xLabel = _a.xLabel, yLabel = _a.yLabel, datasets = _a.data.datasets, showDots = _a.showDots;
    var options = __assign(__assign({}, getDefaultOptions()), intialOptions);
    if (title) {
        margin.top = 60;
    }
    if (xLabel) {
        margin.bottom = 50;
    }
    if (yLabel) {
        margin.left = 70;
    }
    var data = {
        datasets: datasets,
    };
    var filter = "url(#xkcdify)";
    var fontFamily = options.fontFamily || "xkcd";
    var clientWidth = Number(svg.clientWidth || svg.getAttribute("width") || "") || 600;
    var clientHeight = (clientWidth * 2) / 3;
    var d3Selection = (0, d3_selection_1.select)(svg)
        .style("stroke-width", 3)
        .style("font-family", fontFamily)
        .style("background", options.backgroundColor)
        .attr("width", clientWidth)
        .attr("height", clientHeight);
    d3Selection.selectAll("*").remove();
    (0, addFont_1.default)(d3Selection);
    (0, addFilter_1.default)(d3Selection);
    var chart = d3Selection
        .append("g")
        .attr("transform", "translate(".concat(margin.left, ",").concat(margin.top, ")"));
    var tooltip = new ToolTip_1.default({
        selection: d3Selection,
        title: "",
        items: [],
        position: { x: 60, y: 60, type: "up_left" },
        strokeColor: options.strokeColor,
        backgroundColor: options.backgroundColor,
    });
    if (options.xTickLabelType === "Date") {
        data.datasets.forEach(function (dataset) {
            dataset.data.forEach(function (d) {
                d.x = (0, dayjs_1.default)(d.x);
            });
        });
    }
    var allData = [];
    data.datasets.map(function (d) { return allData.push.apply(allData, d.data); });
    var allXData = allData.map(function (d) { return d.x; });
    var allYData = allData.map(function (d) { return d.y; });
    var chartWidth = clientWidth - margin.left - margin.right;
    var chartHeight = clientHeight - margin.top - margin.bottom;
    // NOTE: Xaxis with date type(default)
    var xScale = (0, d3_scale_1.scaleTime)()
        .domain([
        Math.min.apply(Math, allXData.map(function (d) { return Number(d); })),
        Math.max.apply(Math, allXData.map(function (d) { return Number(d); })),
    ])
        .range([0, chartWidth]);
    if (options.xTickLabelType === "Number") {
        xScale = (0, d3_scale_1.scaleLinear)()
            .domain([0, Math.max.apply(Math, allXData.map(function (d) { return Number(d); }))])
            .range([0, chartWidth]);
    }
    var yScale = (0, d3_scale_1.scaleLinear)()
        .domain([Math.min.apply(Math, allYData), Math.max.apply(Math, allYData)])
        .range([chartHeight, 0]);
    var svgChart = chart.append("g").attr("pointer-events", "all");
    if (title) {
        (0, drawLabels_1.drawTitle)(d3Selection, title, options.strokeColor);
    }
    if (xLabel) {
        (0, drawLabels_1.drawXLabel)(d3Selection, xLabel, options.strokeColor);
    }
    if (yLabel) {
        var maxYData = Math.max.apply(Math, allYData);
        var offsetY = 24;
        // dynamic offset Y label
        if (maxYData > 100000) {
            offsetY = 2;
        }
        else if (maxYData > 10000) {
            offsetY = 8;
        }
        else if (maxYData > 1000) {
            offsetY = 12;
        }
        else if (maxYData > 100) {
            offsetY = 20;
        }
        (0, drawLabels_1.drawYLabel)(d3Selection, yLabel, options.strokeColor, offsetY);
    }
    // draw axis
    (0, drawAxis_1.drawXAxis)(svgChart, {
        xScale: xScale,
        tickCount: options.xTickCount,
        moveDown: chartHeight,
        fontFamily: fontFamily,
        stroke: options.strokeColor,
        type: options.xTickLabelType,
    });
    (0, drawAxis_1.drawYAxis)(svgChart, {
        yScale: yScale,
        tickCount: options.yTickCount,
        fontFamily: fontFamily,
        stroke: options.strokeColor,
    });
    // draw lines
    if (options.showLine) {
        var drawLine_1 = (0, d3_shape_1.line)()
            .x(function (d) { return xScale(d.x) || 0; })
            .y(function (d) { return yScale(d.y); })
            .curve(d3_shape_1.curveMonotoneX);
        svgChart
            .selectAll(".xkcd-chart-xyline")
            .data(data.datasets)
            .enter()
            .append("path")
            .attr("class", "xkcd-chart-xyline")
            .attr("d", function (d) { return drawLine_1(d.data); })
            .attr("fill", "none")
            .attr("stroke", function (_, i) { return options.dataColors[i]; })
            .attr("filter", filter);
    }
    if (showDots) {
        // draw dots
        var dotInitSize_1 = 3.5 * (options.dotSize === undefined ? 1 : options.dotSize);
        var dotHoverSize_1 = 6 * (options.dotSize === undefined ? 1 : options.dotSize);
        svgChart
            .selectAll(".xkcd-chart-xycircle-group")
            .data(data.datasets)
            .enter()
            .append("g")
            .attr("class", "xkcd-chart-xycircle-group")
            .attr("filter", filter)
            .attr("xy-group-index", function (_, i) { return i; })
            .selectAll(".xkcd-chart-xycircle-circle")
            .data(function (dataset) { return dataset.data; })
            .enter()
            .append("circle")
            .attr("class", "chart-tooltip-dot")
            .style("stroke", function (_, i, nodes) {
            var xyGroupIndex = Number((0, d3_selection_1.select)(nodes[i].parentElement).attr("xy-group-index"));
            return options.dataColors[xyGroupIndex];
        })
            .style("fill", function (_, i, nodes) {
            var xyGroupIndex = Number((0, d3_selection_1.select)(nodes[i].parentElement).attr("xy-group-index"));
            return options.dataColors[xyGroupIndex];
        })
            .attr("r", dotInitSize_1)
            .attr("cx", function (d) { return xScale(d.x) || 0; })
            .attr("cy", function (d) { return yScale(d.y); })
            .attr("pointer-events", "all")
            .on("mouseover", function (d, i, nodes) {
            var xyGroupIndex = Number((0, d3_selection_1.select)(nodes[i].parentElement).attr("xy-group-index"));
            (0, d3_selection_1.select)(nodes[i]).attr("r", dotHoverSize_1);
            var tipX = (xScale(d.x) || 0) + margin.left + 5;
            var tipY = yScale(d.y) + margin.top + 5;
            var tooltipPositionType = "down_right";
            if (tipX > chartWidth / 2 && tipY < chartHeight / 2) {
                tooltipPositionType = "down_left";
            }
            else if (tipX > chartWidth / 2 && tipY > chartHeight / 2) {
                tooltipPositionType = "up_left";
            }
            else if (tipX < chartWidth / 2 && tipY > chartHeight / 2) {
                tooltipPositionType = "up_right";
            }
            // NOTE: tooltip title with date type(default)
            var title = (0, dayjs_1.default)(data.datasets[xyGroupIndex].data[i].x).format(options.dateFormat);
            if (options.xTickLabelType === "Number") {
                var type = (0, getFormatTimeline_1.getTimestampFormatUnit)(Number(data.datasets[xyGroupIndex].data[1].x ||
                    data.datasets[xyGroupIndex].data[i].x));
                title = (0, getFormatTimeline_1.default)(Number(data.datasets[xyGroupIndex].data[i].x), type);
            }
            tooltip.update({
                title: title,
                items: [
                    {
                        color: options.dataColors[xyGroupIndex],
                        text: "".concat(data.datasets[xyGroupIndex].label || "", ": ").concat(d.y),
                    },
                ],
                position: {
                    x: tipX,
                    y: tipY,
                    type: tooltipPositionType,
                },
            });
            tooltip.show();
        })
            .on("mouseout", function (_, i, nodes) {
            (0, d3_selection_1.select)(nodes[i]).attr("r", dotInitSize_1);
            tooltip.hide();
        });
    }
    // draw legend
    var legendItems = data.datasets.map(function (dataset, i) { return ({
        color: options.dataColors[i] || "",
        text: dataset.label,
    }); });
    (0, drawLegend_1.default)(svgChart, {
        items: legendItems,
        strokeColor: options.strokeColor,
        backgroundColor: options.backgroundColor,
    });
};
exports.default = XYChart;
