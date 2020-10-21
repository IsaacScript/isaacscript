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
const chokidar = __importStar(require("chokidar"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const file = __importStar(require("./file"));
if (process.argv.length !== 4) {
    throw new Error("The directory syncer process did not get the right amount of arguments.");
}
const modSourcePath = process.argv[2];
const modTargetPath = process.argv[3];
// First, copy the existing directory fresh
if (!file.exists(modSourcePath)) {
    file.makeDir(modSourcePath);
}
if (file.exists(modTargetPath)) {
    file.deleteDir(modTargetPath);
}
file.copy(modSourcePath, modTargetPath);
// Second, watch for changes
const watcher = chokidar.watch(modSourcePath, {
    persistent: true,
    ignoreInitial: true,
});
watcher
    .on("add", add)
    .on("addDir", addDir)
    .on("change", change)
    .on("unlink", unlink)
    .on("unlinkDir", unlinkDir)
    .on("error", error);
function add(filePath) {
    if (filePath === constants_1.MAIN_LUA_SOURCE_PATH) {
        const mainLua = file.read(constants_1.MAIN_LUA_SOURCE_PATH);
        if (mainLua === "") {
            return;
        }
    }
    file.copy(filePath, getTargetPath(filePath));
    if (filePath === constants_1.MAIN_LUA_SOURCE_PATH) {
        // We don't need to report if the "main.lua" file changes,
        // since we have a dedicated message for that
        return;
    }
    send(`Copied new file: ${filePath}`);
}
function addDir(dirPath) {
    file.copy(dirPath, getTargetPath(dirPath));
    send(`Copied new directory: ${dirPath}`);
}
function change(filePath) {
    file.copy(filePath, getTargetPath(filePath));
    if (filePath === constants_1.MAIN_LUA_SOURCE_PATH) {
        // We don't need to report if the "main.lua" file changes,
        // since we have a dedicated message for that
        return;
    }
    send(`Copied changed file: ${filePath}`);
}
function unlink(filePath) {
    file.deleteFile(getTargetPath(filePath));
    send(`Deleted file: ${filePath}`);
}
function unlinkDir(dirPath) {
    file.deleteDir(getTargetPath(dirPath));
    send(`Deleted directory: ${dirPath}`);
}
function error(err) {
    console.error("modDirectorySyncer - Error:", err);
    send(`Error: ${err.message}`);
}
function getTargetPath(filePath) {
    const basePath = path_1.default.relative(modSourcePath, filePath);
    return path_1.default.join(modTargetPath, basePath);
}
function send(msg) {
    if (typeof process.send === "function") {
        process.send(msg);
    }
}
