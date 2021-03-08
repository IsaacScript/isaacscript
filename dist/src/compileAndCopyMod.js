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
Object.defineProperty(exports, "__esModule", { value: true });
const file = __importStar(require("./file"));
const misc = __importStar(require("./misc"));
function compileAndCopyMod(modSourcePath, modTargetPath) {
    compile();
    console.log("ZZ", modSourcePath, modTargetPath);
    copyMod(modSourcePath, modTargetPath);
}
exports.default = compileAndCopyMod;
function compile() {
    misc.execCommand("npx tstl");
    console.log("Mod compiled successfully!");
}
function copyMod(modSourcePath, modTargetPath) {
    file.deleteDir(modTargetPath);
    file.copy(modSourcePath, modTargetPath);
    console.log("Mod copied successfully!");
}
