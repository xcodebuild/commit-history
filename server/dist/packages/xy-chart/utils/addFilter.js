"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addFilter = function (selection) {
    selection
        .append("filter")
        .attr("id", "xkcdify")
        .attr("filterUnits", "userSpaceOnUse")
        .attr("x", -5)
        .attr("y", -5)
        .attr("width", "100%")
        .attr("height", "100%")
        .call(function (f) {
        f.append("feTurbulence")
            .attr("type", "fractalNoise")
            .attr("baseFrequency", "0.05")
            .attr("result", "noise");
        f.append("feDisplacementMap")
            .attr("scale", "5")
            .attr("xChannelSelector", "R")
            .attr("yChannelSelector", "G")
            .attr("in", "SourceGraphic")
            .attr("in2", "noise");
    });
};
exports.default = addFilter;
