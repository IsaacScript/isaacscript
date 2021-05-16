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
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const file = __importStar(require("../common/file"));
async function checkModTargetDirectory(modsDirectory, projectName) {
    const modTargetPath = path_1.default.join(modsDirectory, projectName);
    if (!file.exists(modTargetPath)) {
        return;
    }
    console.error(`Error: The target mod path of "${chalk_1.default.green(modTargetPath)}" already exists.`);
    console.error("When you run IsaacScript, it will want to create a directory here so that it can sync it with your project folder.");
    const response = await prompts_1.default({
        type: "confirm",
        name: "deleteDirectory",
        message: "Should I delete the existing directory for you? (Make sure that it does not contain anything important first.)",
        initial: true,
    });
    if (response.deleteDirectory === false) {
        console.error("Ok then. You delete it yourself. Good bye.");
        process.exit(1);
    }
    file.deleteDir(modTargetPath);
}
exports.default = checkModTargetDirectory;
//# sourceMappingURL=checkModTargetDirectory.js.map