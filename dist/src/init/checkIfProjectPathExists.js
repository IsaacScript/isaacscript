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
const prompts_1 = __importDefault(require("prompts"));
const constants_1 = require("../constants");
const file = __importStar(require("../file"));
async function checkIfProjectPathExists(projectPath) {
    if (projectPath !== constants_1.CWD && file.exists(projectPath)) {
        const fileType = file.isDir(projectPath) ? "directory" : "file";
        console.log(`A ${fileType} already exists with a name of "${chalk_1.default.green(projectPath)}".`);
        const response = await prompts_1.default({
            type: "confirm",
            name: "delete",
            message: "Do you want me to delete it?",
        });
        if (!response.delete) {
            console.error("Ok then. Good-bye.");
            process.exit(1);
        }
        if (fileType === "directory") {
            file.deleteDir(projectPath);
        }
        else {
            file.deleteFile(projectPath);
        }
    }
}
exports.default = checkIfProjectPathExists;
//# sourceMappingURL=checkIfProjectPathExists.js.map