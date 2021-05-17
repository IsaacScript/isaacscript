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
const figlet_1 = __importDefault(require("figlet"));
const source_map_support_1 = __importDefault(require("source-map-support"));
const update_notifier_1 = __importDefault(require("update-notifier"));
const package_json_1 = __importDefault(require("../package.json"));
const checkForWindowsTerminalBugs_1 = __importDefault(require("./checkForWindowsTerminalBugs"));
const Command_1 = require("./Command");
const configFile = __importStar(require("./configFile"));
const copy_1 = __importDefault(require("./copy/copy"));
const init_1 = __importDefault(require("./init/init"));
const misc_1 = require("./misc");
const monitor_1 = __importDefault(require("./monitor/monitor"));
const parseArgs_1 = __importDefault(require("./parseArgs"));
const publish_1 = __importDefault(require("./publish/publish"));
const validateOS_1 = require("./validateOS");
async function main() {
    source_map_support_1.default.install();
    validateOS_1.validateOS();
    // Get command line arguments
    const argv = parseArgs_1.default();
    // ASCII banner
    console.log(chalk_1.default.green(figlet_1.default.textSync("IsaacScript")));
    // Check for a new version
    update_notifier_1.default({ pkg: package_json_1.default }).notify();
    // Pre-flight checks
    await checkForWindowsTerminalBugs_1.default();
    const config = configFile.read();
    await handleCommands(argv, config);
}
async function handleCommands(argv, config) {
    const positionalArgs = argv._;
    let command;
    if (positionalArgs.length > 0) {
        command = positionalArgs[0];
    }
    else {
        command = Command_1.DEFAULT_COMMAND;
    }
    switch (command) {
        case "monitor": {
            monitor_1.default(config);
            break;
        }
        case "init": {
            await init_1.default(argv);
            break;
        }
        case "copy": {
            copy_1.default(config);
            break;
        }
        case "publish": {
            publish_1.default(argv, config);
            break;
        }
        default: {
            misc_1.ensureAllCases(command);
            break;
        }
    }
    if (command !== "monitor") {
        process.exit(0);
    }
}
main().catch((err) => {
    console.error("IsaacScript failed:", err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map