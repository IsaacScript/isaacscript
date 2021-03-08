#!/usr/bin/env node
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
const figlet_1 = __importDefault(require("figlet"));
const path_1 = __importDefault(require("path"));
const update_notifier_1 = __importDefault(require("update-notifier"));
const package_json_1 = __importDefault(require("../package.json"));
const checkForWindowsTerminalBugs_1 = __importDefault(require("./checkForWindowsTerminalBugs"));
const compileAndCopyMod_1 = __importDefault(require("./compileAndCopyMod"));
const configFile = __importStar(require("./configFile"));
const constants_1 = require("./constants");
const copyWatcherMod_1 = __importDefault(require("./copyWatcherMod"));
const getTSConfigInclude_1 = __importDefault(require("./getTSConfigInclude"));
const notifyGame = __importStar(require("./notifyGame"));
const parseArgs_1 = __importDefault(require("./parseArgs"));
async function main() {
    // Validate the platform
    if (process.platform !== "win32") {
        console.error(`IsaacScript is only supported on ${chalk_1.default.green("Windows")}.`);
        console.error("If you use another operating system and you want to use IsaacScript, contact Zamiel and let him know.");
        console.error("(Since the program is written in TypeScript, porting to a new operating system should be easy, but is untested.)");
        process.exit(1);
    }
    // Get command line arguments
    const copyOnly = parseArgs_1.default();
    // ASCII banner
    console.log(chalk_1.default.green(figlet_1.default.textSync("IsaacScript")));
    // Check for a new version
    update_notifier_1.default({ pkg: package_json_1.default }).notify();
    // Do some pre-flight checks
    await checkForWindowsTerminalBugs_1.default();
    const config = configFile.read();
    // The user might have specified a flag to only copy the mod and then exit
    // (as opposed to running forever)
    if (copyOnly) {
        compileAndCopyMod_1.default(constants_1.MOD_SOURCE_PATH, config.modTargetPath);
        process.exit(0);
    }
    // Prepare the watcher mod
    copyWatcherMod_1.default(config);
    // Subprocess #1 - The mod directory syncer
    spawnModDirectorySyncer(config);
    // Subprocess #2 - tstl --watch (to automatically convert TypeScript to Lua)
    spawnTSTLWatcher(config);
    // Read the "tsconfig.json" file
    const tsConfigInclude = getTSConfigInclude_1.default();
    const resolvedIncludePath = path_1.default.resolve(constants_1.CWD, tsConfigInclude);
    console.log("Automatically monitoring the following for changes:");
    console.log(`1) your TypeScript code:     ${chalk_1.default.green(resolvedIncludePath)}`);
    console.log(`2) the source mod directory: ${chalk_1.default.green(constants_1.MOD_SOURCE_PATH)}`);
    console.log("");
    // (the process will now continue indefinitely for as long as the subprocesses exist)
}
function spawnModDirectorySyncer(config) {
    const modDirectorySyncerPath = path_1.default.join(__dirname, "modDirectorySyncer");
    const childProcess = child_process_1.fork(modDirectorySyncerPath, [
        constants_1.MOD_SOURCE_PATH,
        config.modTargetPath,
    ]);
    childProcess.on("message", (msg) => {
        notifyGame.msg(msg, config, true);
    });
}
function spawnTSTLWatcher(config) {
    const tstl = child_process_1.spawn("npx", ["tstl", "--watch", "--preserveWatchOutput"], {
        shell: true,
    });
    tstl.stdout.on("data", (data) => {
        const msg = data.toString().trim();
        if (msg.includes("Starting compilation in watch mode...")) {
            const newMsg = "IsaacScript is now watching for changes.";
            notifyGame.msg(newMsg, config, true);
        }
        else if (msg.includes("File change detected. Starting incremental compilation...")) {
            const newMsg = "TypeScript change detected. Compiling...";
            notifyGame.msg(newMsg, config, true);
        }
        else if (msg.includes("Found 0 errors. Watching for file changes.")) {
            notifyGame.command(`luamod ${constants_1.CURRENT_DIRECTORY_NAME}`, config);
            notifyGame.command("restart", config);
            const newMsg = `${constants_1.CURRENT_DIRECTORY_NAME} - Successfully compiled & reloaded!`;
            notifyGame.msg(newMsg, config, true);
        }
        else {
            notifyGame.msg(msg, config, false);
        }
    });
    tstl.stderr.on("data", (data) => {
        const msg = data.toString().trim();
        if (msg === "^C") {
            return;
        }
        console.error("Error:", msg);
        notifyGame.msg(`Error: ${msg}`, config, true);
    });
    tstl.on("close", (code) => {
        console.error("tstl exited abruptly with code:", code);
        process.exit(1);
    });
}
main().catch((err) => {
    console.error("IsaacScript failed:", err);
    process.exit(1);
});
