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
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const package_json_1 = __importDefault(require("../package.json"));
const constants_1 = require("./constants");
const file = __importStar(require("./file"));
// If an important file does not exist in the project directory,
// copy it over from the templates directory
function checkForTemplateFiles() {
    // Copy static files, like ".eslintrc.js", "tsconfig.json", etc.
    const staticFileList = file.getDirList(constants_1.TEMPLATES_DIR_STATIC);
    staticFileList.forEach((fileName) => {
        const thisFilePath = path_1.default.join(constants_1.CWD, fileName);
        if (!file.exists(thisFilePath)) {
            const filePath = path_1.default.join(constants_1.TEMPLATES_DIR_STATIC, fileName);
            file.copy(filePath, thisFilePath);
        }
    });
    // "package.json"
    if (!file.exists(constants_1.PACKAGE_JSON_PATH)) {
        const template = file.read(constants_1.PACKAGE_JSON_TEMPLATE_PATH);
        const packageJSON = template
            .replace(/MOD_NAME/g, constants_1.PROJECT_NAME)
            .replace(/"isaacscript": "\^0.0.1"/g, `"isaacscript": "^${package_json_1.default.version}"`);
        file.write(constants_1.PACKAGE_JSON_PATH, packageJSON);
    }
    // "README.md"
    if (!file.exists(constants_1.README_MD_PATH)) {
        const template = file.read(constants_1.README_MD_TEMPLATES_PATH);
        const readmeMD = template.replace(/MOD_NAME/g, constants_1.PROJECT_NAME);
        file.write(constants_1.README_MD_PATH, readmeMD);
    }
    // "src/main.ts"
    if (!file.exists(constants_1.TS_SOURCE_PATH)) {
        file.makeDir(constants_1.TS_SOURCE_PATH);
    }
    if (!file.exists(constants_1.MAIN_TS_PATH)) {
        const template = file.read(constants_1.MAIN_TS_TEMPLATE_PATH);
        const mainTS = template.replace(/MOD_NAME/g, constants_1.PROJECT_NAME);
        file.write(constants_1.MAIN_TS_PATH, mainTS);
    }
    // "mod/metadata.xml"
    if (!file.exists(constants_1.MOD_SOURCE_PATH)) {
        file.makeDir(constants_1.MOD_SOURCE_PATH);
    }
    if (!file.exists(constants_1.METADATA_XML_SOURCE_PATH)) {
        const template = file.read(constants_1.METADATA_XML_TEMPLATE_PATH);
        const metadataXML = template.replace(/MOD_NAME/g, constants_1.PROJECT_NAME);
        file.write(constants_1.METADATA_XML_SOURCE_PATH, metadataXML);
    }
    // ".vscode"
    if (!file.exists(constants_1.VSCODE_DIR_PATH)) {
        file.makeDir(constants_1.VSCODE_DIR_PATH);
    }
    const vsCodeFileList = file.getDirList(constants_1.VSCODE_DIR_TEMPLATE_PATH);
    vsCodeFileList.forEach((fileName) => {
        const thisFilePath = path_1.default.join(constants_1.VSCODE_DIR_PATH, fileName);
        if (!file.exists(thisFilePath)) {
            const filePath = path_1.default.join(constants_1.VSCODE_DIR_TEMPLATE_PATH, fileName);
            file.copy(filePath, thisFilePath);
        }
    });
    // "node_modules"
    if (!file.exists(constants_1.NODE_MODULES_PATH)) {
        console.log("Installing node modules... (This can take a long time.)");
        const command = "npm i";
        try {
            child_process_1.execSync(command);
        }
        catch (err) {
            console.error(`Failed to run "${chalk_1.default.green(command)}":`, err);
            process.exit(1);
        }
    }
}
exports.default = checkForTemplateFiles;
