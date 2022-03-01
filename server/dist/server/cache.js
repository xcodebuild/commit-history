"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lru_cache_1 = __importDefault(require("lru-cache"));
var utils_1 = __importDefault(require("../common/utils"));
// Actually, we don't need LRU, but the memory control.
var options = {
    // the number of most recently used items to keep,
    // based on the monthly visit count with `o/pv-star`.
    max: 20000,
    // max cache memory cost bytes: about 24Mb.
    maxSize: 24 * 1024 * 1024,
    // calc cache size with its bytes.
    sizeCalculation: function (value) {
        return utils_1.default.calcBytes(value);
    },
    // max 6 hours to live.
    ttl: 1000 * 60 * 60 * 6,
    updateAgeOnGet: false,
};
var cache = new lru_cache_1.default(options);
exports.default = cache;
