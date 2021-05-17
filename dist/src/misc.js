"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeKebabToCamel = exports.parseIntSafe = exports.getTime = exports.execShell = exports.execExe = exports.ensureAllCases = void 0;
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const moment_1 = __importDefault(require("moment"));
const constants_1 = require("./constants");
// Use this on a switch statement's default case to get
// the linter to complain if a case was not predicted
const ensureAllCases = (obj) => obj;
exports.ensureAllCases = ensureAllCases;
function execExe(path, cwd = constants_1.CWD) {
    let stdout;
    try {
        const buffer = child_process_1.execSync(`"${path}"`, {
            cwd,
        });
        stdout = buffer.toString().trim();
    }
    catch (err) {
        console.error(`Failed to run "${chalk_1.default.green(path)}":`, err);
        process.exit(1);
    }
    return stdout;
}
exports.execExe = execExe;
function execShell(command, args, allowFailure = false, cwd = constants_1.CWD) {
    const commandDescription = `${command} ${args.join(" ")}`;
    let spawnSyncReturns;
    try {
        spawnSyncReturns = child_process_1.spawnSync(command, args, {
            shell: true,
            cwd,
        });
    }
    catch (err) {
        console.error(`Failed to run the "${chalk_1.default.green(commandDescription)}" command:`, err);
        process.exit(1);
    }
    const exitStatus = spawnSyncReturns.status;
    const stdout = spawnSyncReturns.output.join("\n").trim();
    if (exitStatus !== 0) {
        if (allowFailure) {
            return [exitStatus, stdout];
        }
        console.error(`Failed to run the "${chalk_1.default.green(commandDescription)}" command with an exit code of ${exitStatus}.`);
        process.exit(1);
    }
    return [exitStatus, stdout];
}
exports.execShell = execShell;
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
// Convert snake_case and kebab-case to camelCase
// From: https://hisk.io/javascript-snake-to-camel/
function snakeKebabToCamel(str) {
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));
}
exports.snakeKebabToCamel = snakeKebabToCamel;
//# sourceMappingURL=misc.js.map