"use strict";
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
const chalk_1 = __importDefault(require("chalk"));
const constants_1 = require("./constants");
const file = __importStar(require("./file"));
function checkForConfig() {
    if (file.exists(constants_1.CONFIG_FILE_PATH)) {
        return;
    }
    console.error(chalk_1.default.red(`An "${constants_1.CONFIG_FILE_NAME}" was not found in the current directory.`));
    console.error("IsaacScript needs this file in order to run.");
    console.error(`Use the "${chalk_1.default.green("npx create-isaacscript-mod")}" command to create a new project (with an "${chalk_1.default.green(constants_1.CONFIG_FILE_NAME)}" file). Then, go into that directory and run "${chalk_1.default.green("npx isaacscript")}".`);
    process.exit(1);
}
exports.default = checkForConfig;
