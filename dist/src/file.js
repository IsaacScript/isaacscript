"use strict";
// Helper functions for the "fs" library
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = exports.makeDir = exports.isSubDirOf = exports.isFile = exports.isDir = exports.getDirList = exports.exists = exports.deleteFile = exports.deleteDir = exports.copy = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
function copy(srcPath, dstPath) {
    try {
        fs_extra_1.default.copySync(srcPath, dstPath);
    }
    catch (err) {
        console.error(`Failed to copy directory "${chalk_1.default.green(srcPath)}" to "${chalk_1.default.green(dstPath)}":`, err);
        process.exit(1);
    }
}
exports.copy = copy;
function deleteDir(dirPath) {
    try {
        fs_extra_1.default.rmdirSync(dirPath, {
            recursive: true,
        });
    }
    catch (err) {
        console.error(`Failed to delete directory "${chalk_1.default.green(dirPath)}":`, err);
        process.exit(1);
    }
}
exports.deleteDir = deleteDir;
function deleteFile(filePath) {
    try {
        fs_extra_1.default.unlinkSync(filePath);
    }
    catch (err) {
        console.error(`Failed to delete file "${chalk_1.default.green(filePath)}":`, err);
        process.exit(1);
    }
}
exports.deleteFile = deleteFile;
function exists(filePath) {
    let pathExists;
    try {
        pathExists = fs_extra_1.default.existsSync(filePath);
    }
    catch (err) {
        console.error(`Failed to check to see if "${chalk_1.default.green(filePath)}" exists:`, err);
        process.exit(1);
    }
    return pathExists;
}
exports.exists = exists;
function getDirList(dirPath) {
    let fileList;
    try {
        fileList = fs_extra_1.default.readdirSync(dirPath);
    }
    catch (err) {
        console.error(`Failed to get the files in the "${chalk_1.default.green(dirPath)}" directory:`, err);
        process.exit(1);
    }
    return fileList;
}
exports.getDirList = getDirList;
function isDir(dirPath) {
    let pathIsDir;
    try {
        pathIsDir = fs_extra_1.default.lstatSync(dirPath).isDirectory();
    }
    catch (err) {
        console.error(`Failed to check to see if "${chalk_1.default.green(dirPath)}" is a directory:`, err);
        process.exit(1);
    }
    return pathIsDir;
}
exports.isDir = isDir;
function isFile(dirPath) {
    let pathIsFile;
    try {
        pathIsFile = fs_extra_1.default.lstatSync(dirPath).isFile();
    }
    catch (err) {
        console.error(`Failed to check to see if "${chalk_1.default.green(dirPath)}" is a file:`, err);
        process.exit(1);
    }
    return pathIsFile;
}
exports.isFile = isFile;
function isSubDirOf(dir, parent) {
    const relative = path_1.default.relative(parent, dir);
    return (relative !== "" && !relative.startsWith("..") && !path_1.default.isAbsolute(relative));
}
exports.isSubDirOf = isSubDirOf;
function makeDir(dirPath) {
    try {
        fs_extra_1.default.mkdirSync(dirPath);
    }
    catch (err) {
        console.error(`Failed to create the "${chalk_1.default.green(dirPath)}" directory:`, err);
        process.exit(1);
    }
}
exports.makeDir = makeDir;
function read(filePath) {
    let fileContents;
    try {
        fileContents = fs_extra_1.default.readFileSync(filePath, "utf8");
    }
    catch (err) {
        console.error(`Failed to read the "${chalk_1.default.green(filePath)}" file:`, err);
        process.exit(1);
    }
    return fileContents;
}
exports.read = read;
function write(filePath, data) {
    try {
        fs_extra_1.default.writeFileSync(filePath, data);
    }
    catch (err) {
        console.error(`Failed to write to the "${chalk_1.default.green(filePath)}" file:`, err);
        process.exit(1);
    }
}
exports.write = write;
