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
const file = __importStar(require("./file"));
function compileAndCopyMod(modSourcePath, modTargetPath) {
    compile();
    copyMod(modSourcePath, modTargetPath);
}
exports.default = compileAndCopyMod;
function compile() {
    let spawnSyncReturns;
    try {
        spawnSyncReturns = child_process_1.spawnSync("npx", ["tstl"], {
            shell: true,
            stdio: "pipe",
        });
    }
    catch (err) {
        console.error(`Failed to run the "${chalk_1.default.green("npx tstl")}" command:`, err);
        process.exit(1);
    }
    console.log(spawnSyncReturns.output);
    if (spawnSyncReturns.status !== 0) {
        console.error(`Failed to run the "${chalk_1.default.green("npx tstl")}" command.`);
        process.exit(1);
    }
    console.log("Mod compiled successfully!");
}
function copyMod(modSourcePath, modTargetPath) {
    file.deleteDir(modTargetPath);
    file.copy(modSourcePath, modTargetPath);
    console.log("Mod copied successfully!");
}
