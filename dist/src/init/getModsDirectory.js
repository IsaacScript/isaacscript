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
async function getModsDirectory() {
    if (file.exists(constants_1.MODS_DIRECTORY_PATH) && file.isDir(constants_1.MODS_DIRECTORY_PATH)) {
        return constants_1.MODS_DIRECTORY_PATH;
    }
    console.error(`Failed to find your mods directory at "${chalk_1.default.green(constants_1.MODS_DIRECTORY_PATH)}".`);
    const response = await prompts_1.default({
        type: "text",
        name: "modDirectory",
        message: "Enter the full path to the directory where Binding of Isaac mods live on your system:",
    });
    if (typeof response.modDirectory !== "string") {
        console.error("Error: The response was not a string.");
        process.exit(1);
    }
    if (!file.exists(response.modDirectory)) {
        console.error(`Error: The directory of "${chalk_1.default.green(response.modDirectory)}" does not exist. Exiting.`);
        process.exit(1);
    }
    if (!file.isDir(response.modDirectory)) {
        console.error(`Error: The path of "${chalk_1.default.green(response.modDirectory)}" is not a directory. Exiting.`);
        process.exit(1);
    }
    return response.modDirectory;
}
exports.default = getModsDirectory;
//# sourceMappingURL=getModsDirectory.js.map