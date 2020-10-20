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
const configFile = __importStar(require("./configFile"));
const constants_1 = require("./constants");
const file = __importStar(require("./file"));
let modDir;
let modTargetPath;
let saveSlot;
async function checkForConfig() {
    if (file.exists(constants_1.CONFIG_FILE_PATH)) {
        return;
    }
    await promptNewConfig();
    await checkProjectName();
    await getModDirectory();
    await checkModSubdirectory();
    await promptSaveSlot();
    configFile.write({
        modTargetPath,
        saveSlot,
    });
}
exports.default = checkForConfig;
async function promptNewConfig() {
    console.log(chalk_1.default.red(`An "${constants_1.CONFIG_FILE_NAME}" was not found in the current directory.`));
    const response = await prompts_1.default({
        type: "confirm",
        name: "createConfig",
        message: "Would you like to create one now?",
        initial: true,
    });
    if (response.createConfig === false) {
        console.error("Error: IsaacScript needs a config file in order to operate; exiting.");
        process.exit(1);
    }
}
async function checkProjectName() {
    console.log(`From the directory you are in, it looks like the name of your mod project is: ${chalk_1.default.green(constants_1.PROJECT_NAME)}`);
    const response = await prompts_1.default({
        type: "confirm",
        name: "inProjectDirectory",
        message: "Is that right?",
        initial: true,
    });
    if (response.inProjectDirectory === false) {
        console.error("Navigate to the directory for your mod project before invoking isaacscript. Exiting.");
        process.exit(1);
    }
}
async function getModDirectory() {
    if (file.exists(constants_1.MOD_DIRECTORY_PATH)) {
        modDir = constants_1.MOD_DIRECTORY_PATH;
        return;
    }
    console.error(`Failed to find your mod directory at "${chalk_1.default.green(constants_1.MOD_DIRECTORY_PATH)}".`);
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
    modDir = response.modDirectory;
}
async function checkModSubdirectory() {
    if (file.isSubDirOf(constants_1.CWD, modDir)) {
        console.error(`Error: The mod project directory of "${chalk_1.default.green(constants_1.CWD)}" is a subdirectory of "${chalk_1.default.green(modDir)}".`);
        console.error(`You are supposed to have your mod project folder somewhere else on the system than the Isaac mods directory. (This is because we don't want to upload the ".git" folder or the TypeScript files to the Steam Workshop.) Exiting.`);
        process.exit(1);
    }
    modTargetPath = path_1.default.join(modDir, constants_1.PROJECT_NAME);
    if (file.exists(modTargetPath)) {
        console.error(`Error: The target mod path of "${chalk_1.default.green(modTargetPath)}" already exists.`);
        console.error("IsaacScript wants to create a directory here so that it can keep it in sync with your project folder.");
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
}
async function promptSaveSlot() {
    const response = await prompts_1.default({
        type: "number",
        name: "saveSlot",
        message: "In-game, do you use save slot 1, 2, or 3?",
        initial: 1,
        validate: (value) => value <= 0 || value >= 4
            ? `You must choose a number between 1 and 3.`
            : true,
    });
    saveSlot = response.saveSlot;
}
