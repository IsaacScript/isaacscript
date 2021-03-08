"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = exports.execScript = exports.execCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const moment_1 = __importDefault(require("moment"));
function execCommand(command) {
    let stdout;
    try {
        stdout = child_process_1.spawnSync(command).toString().trim();
    }
    catch (err) {
        console.error(`Failed to run the "${chalk_1.default.green(command)}" command:`, err);
        process.exit(1);
    }
    return stdout;
}
exports.execCommand = execCommand;
function execScript(path) {
    let stdout;
    try {
        stdout = child_process_1.execSync(`"${path}"`).toString().trim();
    }
    catch (err) {
        console.error(`Failed to run the "${chalk_1.default.green(path)}" script:`, err);
        process.exit(1);
    }
    return stdout;
}
exports.execScript = execScript;
function getTime() {
    return moment_1.default().format("h:mm:ss A"); // e.g. "1:23:45 AM"
}
exports.getTime = getTime;
