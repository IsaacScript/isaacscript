"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = __importDefault(require("prompts"));
const misc_1 = require("../common/misc");
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
    misc_1.execShell("code", [projectPath]);
}
//# sourceMappingURL=promptVSCode.js.map