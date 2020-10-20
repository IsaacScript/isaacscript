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
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const file = __importStar(require("./file"));
// If an important file does not exist in the project directory,
// copy it over from the templates directory
function checkForTemplateFiles() {
    // Copy static files, like ".eslintrc.js", "tsconfig.json", etc.
    const fileList = file.getDirList(constants_1.TEMPLATES_DIR_STATIC);
    fileList.forEach((fileName) => {
        const thisFilePath = path_1.default.join(constants_1.CWD, fileName);
        if (!file.exists(thisFilePath)) {
            const filePath = path_1.default.join(constants_1.TEMPLATES_DIR_STATIC, fileName);
            file.copy(filePath, thisFilePath);
        }
    });
    // "main.ts"
    if (!file.exists(constants_1.TS_SOURCE_PATH)) {
        file.makeDir(constants_1.TS_SOURCE_PATH);
    }
    if (!file.exists(constants_1.MAIN_TS_PATH)) {
        const template = file.read(constants_1.MAIN_TS_TEMPLATE_PATH);
        const mainTS = template.replace("MOD_NAME", constants_1.PROJECT_NAME);
        file.write(constants_1.MAIN_TS_PATH, mainTS);
    }
}
exports.default = checkForTemplateFiles;
