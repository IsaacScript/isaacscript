"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const constants_1 = require("../constants");
const misc_1 = require("../misc");
async function promptVSCode(projectPath, argv) {
    if (argv.vscode) {
        // They supplied the "--vscode" command-line flag,
        // so there is no need to prompt the user
        openVSCode(projectPath);
        return;
    }
    const response = await prompts_1.default({
        type: "confirm",
        name: "VSCode",
        message: "Do you want to open your new project in VSCode now?",
        initial: true,
    });
    if (response.VSCode === true) {
        openVSCode(projectPath);
    }
}
exports.default = promptVSCode;
function openVSCode(projectPath) {
    const MAIN_TS_PATH = path_1.default.join(projectPath, "src", constants_1.MAIN_TS);
    misc_1.execShell("code", [projectPath, MAIN_TS_PATH]);
}
//# sourceMappingURL=promptVSCode.js.map