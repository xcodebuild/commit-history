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
exports.convertStarDataToChartData = exports.getReposStarData = exports.DEFAULT_MAX_REQUEST_AMOUNT = void 0;
var api_1 = __importDefault(require("./api"));
var utils_1 = __importDefault(require("./utils"));
exports.DEFAULT_MAX_REQUEST_AMOUNT = 40;
var getReposStarData = function (repos, token, maxRequestAmount) {
    if (token === void 0) { token = ""; }
    if (maxRequestAmount === void 0) { maxRequestAmount = exports.DEFAULT_MAX_REQUEST_AMOUNT; }
    return __awaiter(void 0, void 0, void 0, function () {
        var repoStarDataCacheMap, _i, repos_1, repo, starRecords, error_1, message, status_1, reposStarData, _a, repos_2, repo, records;
        var _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    repoStarDataCacheMap = new Map();
                    _i = 0, repos_1 = repos;
                    _f.label = 1;
                case 1:
                    if (!(_i < repos_1.length)) return [3 /*break*/, 6];
                    repo = repos_1[_i];
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, api_1.default.getRepoStarRecords(repo, token, maxRequestAmount)];
                case 3:
                    starRecords = _f.sent();
                    repoStarDataCacheMap.set(repo, starRecords);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _f.sent();
                    message = "";
                    status_1 = 500;
                    if (((_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.status) === 404) {
                        message = "Repo ".concat(repo, " not found");
                        status_1 = 404;
                    }
                    else if (((_c = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _c === void 0 ? void 0 : _c.status) === 403) {
                        message = "GitHub API rate limit exceeded";
                        status_1 = 403;
                    }
                    else if (((_d = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _d === void 0 ? void 0 : _d.status) === 401) {
                        message = "Access Token Unauthorized";
                        status_1 = 401;
                    }
                    else if (Array.isArray(error_1 === null || error_1 === void 0 ? void 0 : error_1.data) && ((_e = error_1.data) === null || _e === void 0 ? void 0 : _e.length) === 0) {
                        message = "Repo ".concat(repo, " has no commit history");
                        status_1 = 501;
                    }
                    else {
                        message = "Some unexpected error happened, try again later";
                    }
                    return [2 /*return*/, Promise.reject({
                            message: message,
                            status: status_1,
                            repo: repo,
                        })];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    reposStarData = [];
                    for (_a = 0, repos_2 = repos; _a < repos_2.length; _a++) {
                        repo = repos_2[_a];
                        records = repoStarDataCacheMap.get(repo);
                        if (records) {
                            reposStarData.push({
                                repo: repo,
                                starRecords: records,
                            });
                        }
                    }
                    return [2 /*return*/, reposStarData.sort(function (d1, d2) {
                            return (Math.max.apply(Math, d2.starRecords.map(function (s) { return s.count; })) - Math.max.apply(Math, d1.starRecords.map(function (s) { return s.count; })));
                        })];
            }
        });
    });
};
exports.getReposStarData = getReposStarData;
var convertStarDataToChartData = function (reposStarData, chartMode) {
    if (chartMode === "Date") {
        var datasets = reposStarData.map(function (item) {
            var repo = item.repo, starRecords = item.starRecords;
            return {
                label: repo,
                data: starRecords.map(function (item) {
                    return {
                        x: new Date(item.date),
                        y: Number(item.count),
                    };
                }),
            };
        });
        return {
            datasets: datasets,
        };
    }
    else {
        var datasets = reposStarData.map(function (item) {
            var repo = item.repo, starRecords = item.starRecords;
            var started = starRecords[0].date;
            return {
                label: repo,
                data: starRecords.map(function (item) {
                    return {
                        x: utils_1.default.getTimeStampByDate(new Date(item.date)) -
                            utils_1.default.getTimeStampByDate(new Date(started)),
                        y: Number(item.count),
                    };
                }),
            };
        });
        return {
            datasets: datasets,
        };
    }
};
exports.convertStarDataToChartData = convertStarDataToChartData;
