"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimestampFormatUnit = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var duration_1 = __importDefault(require("dayjs/plugin/duration"));
var relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
dayjs_1.default.extend(duration_1.default);
dayjs_1.default.extend(relativeTime_1.default);
var getTimestampFormatUnit = function (timestamp) {
    var timelineUnit = "day";
    if (dayjs_1.default.duration(timestamp).asYears() > 1) {
        timelineUnit = "year";
    }
    else if (dayjs_1.default.duration(timestamp).asMonths() > 1) {
        timelineUnit = "month";
    }
    else if (dayjs_1.default.duration(timestamp).asWeeks() > 1) {
        timelineUnit = "week";
    }
    return timelineUnit;
};
exports.getTimestampFormatUnit = getTimestampFormatUnit;
var getFormatTimeline = function (timestamp, type) {
    if (type === void 0) { type = "day"; }
    if (timestamp === 0) {
        return "day one";
    }
    var seconds = Math.floor(timestamp / 1000);
    var days = Math.floor(seconds / 60 / 60 / 24);
    var weeks = Math.floor(days / 7);
    var months = (days / 30).toFixed(0);
    var years = (days / 365).toFixed(0);
    if (type === "day") {
        if (days === 1) {
            return "a day";
        }
        return "".concat(days, " days");
    }
    else if (type === "week") {
        if (weeks === 1) {
            return "a week";
        }
        return "".concat(weeks, " weeks");
    }
    else if (type === "month") {
        if (Number(months) === 1) {
            return "a month";
        }
        return "".concat(months, " months");
    }
    else {
        if (Number(years) === 1) {
            return "a year";
        }
        return "".concat(years, " years");
    }
};
exports.default = getFormatTimeline;
