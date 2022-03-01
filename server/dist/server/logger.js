"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var createLogger = function () {
    return winston_1.default.createLogger({
        transports: [new winston_1.default.transports.Console()],
        format: winston_1.default.format.combine(winston_1.default.format.simple()),
    });
};
exports.default = createLogger();
