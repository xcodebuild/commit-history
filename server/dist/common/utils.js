"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils;
(function (utils) {
    function range(from, to) {
        var r = [];
        for (var i = from; i <= to; i++) {
            r.push(i);
        }
        return r;
    }
    utils.range = range;
    function getTimeStampByDate(t) {
        var d = new Date(t);
        return d.getTime();
    }
    utils.getTimeStampByDate = getTimeStampByDate;
    function getDateString(t, format) {
        if (format === void 0) { format = "yyyy/MM/dd"; }
        var d = new Date(getTimeStampByDate(t));
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var formatedString = format
            .replace("yyyy", String(year))
            .replace("MM", String(month))
            .replace("dd", String(date));
        return formatedString;
    }
    utils.getDateString = getDateString;
    function copyTextToClipboard(text) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(navigator.clipboard && navigator.clipboard.writeText)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.clipboard.writeText(text)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.warn("Copy to clipboard failed.", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        console.warn("Copy to clipboard failed, methods not supports.");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    utils.copyTextToClipboard = copyTextToClipboard;
    function convertSVGToDataURL(svgElement) {
        var xml = new XMLSerializer().serializeToString(svgElement);
        var encodedData = window.btoa(xml);
        return "data:image/svg+xml;base64,".concat(encodedData);
    }
    utils.convertSVGToDataURL = convertSVGToDataURL;
    function waitImageLoaded(image) {
        image.loading = "eager";
        return new Promise(function (resolve, reject) {
            image.onload = function () {
                // NOTE: There is image loading problem in Safari, fix it with some trick
                setTimeout(function () {
                    resolve();
                }, 200);
            };
            image.onerror = function () {
                reject("Image load failed");
            };
        });
    }
    utils.waitImageLoaded = waitImageLoaded;
    function calcBytes(d) {
        var bytes = 0;
        if (typeof d === "number") {
            bytes += 8;
        }
        else if (typeof d === "string") {
            bytes += d.length * 2;
        }
        else if (typeof d === "boolean") {
            bytes += 1;
        }
        else if (typeof d === "object") {
            if (Array.isArray(d)) {
                for (var _i = 0, d_1 = d; _i < d_1.length; _i++) {
                    var i = d_1[_i];
                    bytes += calcBytes(i);
                }
            }
            else {
                for (var k in d) {
                    bytes += calcBytes(d[k]);
                }
            }
        }
        return bytes;
    }
    utils.calcBytes = calcBytes;
})(utils || (utils = {}));
exports.default = utils;
