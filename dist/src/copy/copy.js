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
exports.compileAndCopy = void 0;
const configFile = __importStar(require("../configFile"));
const constants_1 = require("../constants");
const file = __importStar(require("../file"));
const misc_1 = require("../misc");
function copy(config) {
    if (config === null) {
        configFile.errorNotExist();
        return;
    }
    compileAndCopy(constants_1.MOD_SOURCE_PATH, config.modTargetPath);
}
exports.default = copy;
function compileAndCopy(modSourcePath, modTargetPath) {
    compile();
    copyMod(modSourcePath, modTargetPath);
}
exports.compileAndCopy = compileAndCopy;
function compile() {
    misc_1.execShell("npx", ["tstl"]);
    console.log("Mod compiled successfully.");
}
function copyMod(modSourcePath, modTargetPath) {
    file.deleteDir(modTargetPath);
    file.copy(modSourcePath, modTargetPath);
    console.log("Mod copied successfully.");
}
//# sourceMappingURL=copy.js.map