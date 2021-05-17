"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const constants_1 = require("../constants");
async function getProjectPath(argv) {
    let projectName = getProjectNameFromCommandLineArgument(argv);
    let projectPath;
    let createNewDir;
    if (argv.useCurrentDir) {
        // The "--use-current-dir" command-line flag was specified,
        // so there is no need to prompt the user
        [projectName, projectPath, createNewDir] = [
            constants_1.CURRENT_DIRECTORY_NAME,
            constants_1.CWD,
            false,
        ];
    }
    else if (projectName !== null) {
        // The project name was specified on the command-line
        projectPath = path_1.default.join(constants_1.CWD, projectName);
        createNewDir = true;
    }
    else {
        // The project name was not specified on the command-line, so prompt the user for it
        [projectName, projectPath, createNewDir] = await getNewProjectName();
    }
    if (!validateProjectName(projectName)) {
        process.exit(1);
    }
    console.log(`Using a project name of: ${chalk_1.default.green(projectName)}`);
    return [projectPath, createNewDir];
}
exports.default = getProjectPath;
function getProjectNameFromCommandLineArgument(argv) {
    return typeof argv.name === "string" && argv.name !== "" ? argv.name : null;
}
async function getNewProjectName() {
    console.log("You did not specify a project name as a command-line argument.");
    const response1 = await prompts_1.default({
        type: "confirm",
        name: "useCurrentDir",
        message: `Would you like to create a new project using the current directory "${chalk_1.default.green(constants_1.CURRENT_DIRECTORY_NAME)}" as the root?`,
        initial: true,
    });
    if (response1.useCurrentDir === true) {
        return [constants_1.CURRENT_DIRECTORY_NAME, constants_1.CWD, false];
    }
    const response2 = await prompts_1.default({
        type: "text",
        name: "projectName",
        message: "Enter the name of the project:",
    });
    if (typeof response2.projectName !== "string") {
        console.error("Error: The response was not a string.");
        process.exit(1);
    }
    const projectName = response2.projectName;
    const projectPath = path_1.default.join(constants_1.CWD, projectName);
    return [projectName, projectPath, true];
}
function validateProjectName(projectName) {
    if (projectName === "") {
        console.error("Error: You cannot have a blank project name.");
        return false;
    }
    for (const character of constants_1.ILLEGAL_CHARACTERS_FOR_WINDOWS_FILENAMES) {
        if (projectName.includes(character)) {
            console.error(`Error: The "${character}" character is not allowed in a Windows file name.`);
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=getProjectPath.js.map