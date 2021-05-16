#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const update_notifier_1 = __importDefault(require("update-notifier"));
const package_json_1 = __importDefault(require("../../package.json"));
const constants_1 = require("../common/constants");
const validateOS_1 = require("../common/validateOS");
const checkIfProjectPathExists_1 = __importDefault(require("./checkIfProjectPathExists"));
const checkModSubdirectory_1 = __importDefault(require("./checkModSubdirectory"));
const checkModTargetDirectory_1 = __importDefault(require("./checkModTargetDirectory"));
const createMod_1 = __importDefault(require("./createMod"));
const getModsDirectory_1 = __importDefault(require("./getModsDirectory"));
const getProjectPath_1 = __importDefault(require("./getProjectPath"));
const parseArgs_1 = __importDefault(require("./parseArgs"));
const promptSaveSlot_1 = __importDefault(require("./promptSaveSlot"));
const promptVSCode_1 = __importDefault(require("./promptVSCode"));
async function main() {
    validateOS_1.validateOS();
    // Get command-line arguments
    const argv = parseArgs_1.default();
    // Check for a new version
    update_notifier_1.default({ pkg: package_json_1.default }).notify();
    // Prompt the end-user for some information
    const [projectPath, createNewDir] = await getProjectPath_1.default(argv);
    await checkIfProjectPathExists_1.default(projectPath);
    const modsDirectory = await getModsDirectory_1.default();
    checkModSubdirectory_1.default(projectPath, modsDirectory);
    const projectName = path_1.default.basename(projectPath);
    await checkModTargetDirectory_1.default(modsDirectory, projectName);
    const modTargetPath = path_1.default.join(modsDirectory, projectName);
    const saveSlot = await promptSaveSlot_1.default(argv);
    // Begin the creation of the new mod
    createMod_1.default(projectName, projectPath, createNewDir, modTargetPath, saveSlot);
    console.log(`Successfully created mod: ${chalk_1.default.green(projectName)}`);
    await promptVSCode_1.default(projectPath, argv);
    // Finished
    let commandsToType = "";
    if (projectPath !== constants_1.CWD) {
        commandsToType += `"${chalk_1.default.green(`cd ${projectName}`)}" and `;
    }
    commandsToType += `"${chalk_1.default.green("npx isaacscript")}"`;
    console.log(`Now, start IsaacScript by typing ${commandsToType}.`);
    process.exit(0);
}
main().catch((err) => {
    console.error("IsaacScript failed:", err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map