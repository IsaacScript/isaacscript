"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIntSafe = exports.getTime = exports.execScript = exports.execCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const moment_1 = __importDefault(require("moment"));
const constants_1 = require("./constants");
function execCommand(command, args, allowFailure = false) {
    let spawnSyncReturns;
    try {
        spawnSyncReturns = child_process_1.spawnSync(command, args, {
            shell: true,
        });
    }
    catch (err) {
        console.error(`Failed to run the "${chalk_1.default.green(`${command} ${args.join(" ")}`)}" command:`, err);
        process.exit(1);
    }
    if (spawnSyncReturns.status !== 0) {
        if (allowFailure) {
            return spawnSyncReturns.status;
        }
        console.error(`Failed to run the "${chalk_1.default.green(`${command} ${args.join(" ")}`)}" command.`);
        process.exit(1);
    }
    return spawnSyncReturns.status;
}
exports.execCommand = execCommand;
function execScript(path, cwd = constants_1.CWD) {
    let stdout;
    try {
        const buffer = child_process_1.execSync(`"${path}"`, {
            cwd,
        });
        stdout = buffer.toString().trim();
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
// parseIntSafe is a more reliable version of parseInt
// By default, "parseInt('1a')" will return "1", which is unexpected
// This returns either an integer or NaN
function parseIntSafe(input) {
    // Remove all leading and trailing whitespace
    let trimmedInput = input.trim();
    const isNegativeNumber = trimmedInput.startsWith("-");
    if (isNegativeNumber) {
        // Remove the leading minus sign before we match the regular expression
        trimmedInput = trimmedInput.substring(1);
    }
    if (/^\d+$/.exec(trimmedInput) === null) {
        // "\d" matches any digit (same as "[0-9]")
        return NaN;
    }
    if (isNegativeNumber) {
        // Add the leading minus sign back
        trimmedInput = `-${trimmedInput}`;
    }
    return parseInt(trimmedInput, 10);
}
exports.parseIntSafe = parseIntSafe;
