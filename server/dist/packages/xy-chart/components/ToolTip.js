"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var ToolTip = /** @class */ (function () {
    /**
     *
     * @param {String} parent
     * @param {String} title
     * @param {Array} items
     * @param {Object} position
     * @example
     * {
     *    parent: {}, // a d3 selection component
     *    title: 'tooltip title',
     *    items:[{
     *      color: 'red',
     *      text: 'tim: 13'
     *    }],
     *    position: {
     *      type: 'upleft'
     *      x: 100,
     *      y: 230,
     *    }
     * }
     */
    function ToolTip(_a) {
        var _this = this;
        var selection = _a.selection, title = _a.title, items = _a.items, position = _a.position, backgroundColor = _a.backgroundColor, strokeColor = _a.strokeColor;
        this.filter = "url(#xkcdify)";
        this.title = title;
        this.items = items;
        this.position = position;
        this.backgroundColor = backgroundColor;
        this.strokeColor = strokeColor;
        this.svg = selection
            .append("svg")
            .attr("x", this._getUpLeftX())
            .attr("y", this._getUpLeftY())
            .style("visibility", "hidden");
        this.tipBackground = this.svg
            .append("rect")
            .style("fill", this.backgroundColor)
            .attr("fill-opacity", 0.9)
            .attr("stroke", strokeColor)
            .attr("stroke-width", 2)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("filter", this.filter)
            .attr("width", this._getBackgroundWidth())
            .attr("height", this._getBackgroundHeight())
            .attr("x", 5)
            .attr("y", 5);
        this.tipTitle = this.svg
            .append("text")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .style("fill", this.strokeColor)
            .attr("x", 15)
            .attr("y", 25)
            .text(title);
        this.tipItems = items.map(function (item, i) {
            var g = _this._generateTipItem(item, i);
            return g;
        });
    }
    ToolTip.prototype.show = function () {
        this.svg.style("visibility", "visible");
    };
    ToolTip.prototype.hide = function () {
        this.svg.style("visibility", "hidden");
    };
    // update tooltip position / content
    ToolTip.prototype.update = function (_a) {
        var _this = this;
        var title = _a.title, items = _a.items, position = _a.position;
        if (title && title !== this.title) {
            this.title = title;
            this.tipTitle.text(title);
        }
        if (items && JSON.stringify(items) !== JSON.stringify(this.items)) {
            this.items = items;
            this.tipItems.forEach(function (g) { return g.svg.remove(); });
            this.tipItems = this.items.map(function (item, i) {
                var g = _this._generateTipItem(item, i);
                return g;
            });
            var maxWidth = Math.max.apply(Math, __spreadArray(__spreadArray([], this.tipItems.map(function (item) { return item.width; }), false), [this.tipTitle.node().getBBox().width], false));
            this.tipBackground
                .attr("width", maxWidth + 15)
                .attr("height", this._getBackgroundHeight());
        }
        if (position) {
            this.position = position;
            this.svg.attr("x", this._getUpLeftX());
            this.svg.attr("y", this._getUpLeftY());
        }
    };
    ToolTip.prototype._generateTipItem = function (item, i) {
        var svg = this.svg.append("svg");
        svg
            .append("rect")
            .style("fill", item.color)
            .attr("width", 8)
            .attr("height", 8)
            .attr("rx", 2)
            .attr("ry", 2)
            .attr("filter", this.filter)
            .attr("x", 15)
            .attr("y", 37 + 20 * i);
        svg
            .append("text")
            .style("font-size", "15px")
            .style("fill", this.strokeColor)
            .attr("x", 15 + 12)
            .attr("y", 37 + 20 * i + 8)
            .text(item.text);
        var bbox = svg.node().getBBox();
        var width = bbox.width + 15;
        var height = bbox.height + 10;
        return {
            svg: svg,
            width: width,
            height: height,
        };
    };
    ToolTip.prototype._getBackgroundWidth = function () {
        var maxItemLength = this.items.reduce(function (pre, cur) { return (pre > cur.text.length ? pre : cur.text.length); }, 0);
        var maxLength = Math.max(maxItemLength, this.title.length);
        return maxLength * 7.4 + 25;
    };
    ToolTip.prototype._getBackgroundHeight = function () {
        var rows = this.items.length + 1;
        return rows * 20 + 10;
    };
    ToolTip.prototype._getUpLeftX = function () {
        if (this.position.type === "up_right" ||
            this.position.type === "down_right") {
            return this.position.x;
        }
        return this.position.x - this._getBackgroundWidth() - 20;
    };
    ToolTip.prototype._getUpLeftY = function () {
        if (this.position.type === "down_left" ||
            this.position.type === "down_right") {
            return this.position.y;
        }
        return this.position.y - this._getBackgroundHeight() - 20;
    };
    return ToolTip;
}());
exports.default = ToolTip;
