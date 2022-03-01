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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var koa_1 = __importDefault(require("koa"));
var koa_router_1 = __importDefault(require("koa-router"));
var jsdom_1 = require("jsdom");
var logger_1 = __importDefault(require("./logger"));
var xy_chart_1 = __importDefault(require("../packages/xy-chart"));
var chart_1 = require("../common/chart");
var cache_1 = __importDefault(require("./cache"));
var utils_1 = require("./utils");
var token_1 = require("./token");
var const_1 = require("./const");
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, router;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, token_1.initTokenFromEnv)()];
            case 1:
                _a.sent();
                app = new koa_1.default();
                router = new koa_router_1.default();
                // Example request link:
                // /svg?repos=bytebase/star-history&type=Date
                router.get("/svg", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
                    var repos, type, size, reposStarData, nodataRepos, _i, repos_1, repo, cacheData, token, data, _a, data_1, d, error_1, status_1, message, dom, body, svg, svgContent, now;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                repos = "".concat(ctx.query["repos"]).split(",");
                                type = "".concat(ctx.query["type"]);
                                size = "".concat(ctx.query["size"]);
                                if (!const_1.CHART_TYPES.includes(type)) {
                                    type = "Date";
                                }
                                if (!const_1.CHART_SIZES.includes(size)) {
                                    size = "laptop";
                                }
                                if (repos.length === 0) {
                                    ctx.throw(400, "".concat(http_1.default.STATUS_CODES[400], ": Repo name required"));
                                    return [2 /*return*/];
                                }
                                reposStarData = [];
                                nodataRepos = [];
                                for (_i = 0, repos_1 = repos; _i < repos_1.length; _i++) {
                                    repo = repos_1[_i];
                                    cacheData = cache_1.default.get(repo);
                                    if (cacheData) {
                                        reposStarData.push({
                                            repo: repo,
                                            starRecords: cacheData.starRecords,
                                        });
                                    }
                                    else {
                                        nodataRepos.push(repo);
                                    }
                                }
                                if (!(nodataRepos.length > 0)) return [3 /*break*/, 4];
                                token = (0, token_1.getNextToken)();
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, (0, chart_1.getReposStarData)(nodataRepos, token, const_1.MAX_REQUEST_AMOUNT)];
                            case 2:
                                data = _b.sent();
                                for (_a = 0, data_1 = data; _a < data_1.length; _a++) {
                                    d = data_1[_a];
                                    cache_1.default.set(d.repo, {
                                        starRecords: d.starRecords,
                                        starAmount: d.starRecords[d.starRecords.length - 1].count,
                                    });
                                    reposStarData.push(d);
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _b.sent();
                                status_1 = error_1.status || 400;
                                message = error_1.message || "Some unexpected error happened, try again later";
                                if (status_1 === 404) {
                                    // do nth, repo from user not found.
                                }
                                else {
                                    logger_1.default.error("Failed to request data", error_1);
                                }
                                ctx.status = status_1;
                                ctx.message = "".concat(http_1.default.STATUS_CODES[status_1], ": ").concat(message);
                                return [2 /*return*/];
                            case 4:
                                dom = new jsdom_1.JSDOM("<!DOCTYPE html><body></body>");
                                body = dom.window.document.querySelector("body");
                                svg = dom.window.document.createElement("svg");
                                if (!dom || !body || !svg) {
                                    ctx.throw(500, "".concat(http_1.default.STATUS_CODES[500], ": Failed to mock dom with JSDOM"));
                                    return [2 /*return*/];
                                }
                                body.append(svg);
                                svg.setAttribute("width", "".concat((0, utils_1.getChartWidthWithSize)(size)));
                                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                                try {
                                    (0, xy_chart_1.default)(svg, {
                                        title: "Commit history",
                                        xLabel: type === "Date" ? "Date" : "Timeline",
                                        yLabel: "GitHub Stars",
                                        data: (0, chart_1.convertStarDataToChartData)(reposStarData, type),
                                        showDots: false,
                                    }, {
                                        xTickLabelType: type === "Date" ? "Date" : "Number",
                                    });
                                }
                                catch (error) {
                                    ctx.throw(500, "".concat(http_1.default.STATUS_CODES[500], ": Failed to generate chart, ").concat(error));
                                    return [2 /*return*/];
                                }
                                svgContent = (0, utils_1.replaceSVGContentFilterWithCamelcase)(svg.outerHTML);
                                now = new Date().toLocaleDateString("en-US");
                                ctx.type = "image/svg+xml;charset=utf-8";
                                ctx.set("cache-control", "no-cache");
                                ctx.set("date", "".concat(now));
                                ctx.set("expires", "".concat(now));
                                ctx.body = svgContent;
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.on("error", function (err) {
                    logger_1.default.error("server error: ", err);
                });
                app.use(router.routes()).use(router.allowedMethods());
                app.listen(8080, function () {
                    logger_1.default.info("server running on port ".concat(8080));
                });
                return [2 /*return*/];
        }
    });
}); };
startServer();
