"use strict";
/* eslint-disable import/prefer-default-export */
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
exports.read = void 0;
const chalk_1 = __importDefault(require("chalk"));
const JSONC = __importStar(require("jsonc-parser"));
const constants_1 = require("./constants");
const file = __importStar(require("./file"));
function read() {
    const configRaw = file.read(constants_1.CONFIG_FILE_PATH);
    let config;
    try {
        config = JSONC.parse(configRaw);
    }
    catch (err) {
        console.error(`Failed to parse "${chalk_1.default.green(constants_1.CONFIG_FILE_PATH)}":`, err);
        process.exit(1);
    }
    return config;
}
exports.read = read;
