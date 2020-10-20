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
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const prompts_1 = __importDefault(require("prompts"));
const constants_1 = require("./constants");
const file = __importStar(require("./file"));
// By default, Git Bash for Windows uses MINGW64
// This will not work correctly with the prompts library (or any other NodeJS input library)
// Try to detect this and warn the end-user
async function checkForWindowsTerminalBugs() {
    if (process.env.SHELL !== "C:\\Program Files\\Git\\usr\\bin\\bash.exe") {
        return;
    }
    await checkForCodePage();
    await checkForWindowsBugColor();
}
exports.default = checkForWindowsTerminalBugs;
async function checkForCodePage() {
    const chcpPath = "C:\\Windows\\System32\\chcp.com";
    let stdout;
    try {
        stdout = child_process_1.execSync(`"${chcpPath}"`).toString().trim();
    }
    catch (err) {
        console.error(`Failed to run "${chalk_1.default.green(chcpPath)}":`, err);
        process.exit(1);
    }
    const match = /^Active code page: (\d+)$/.exec(stdout);
    if (match === null) {
        console.error(`Failed to parse the results of "${chalk_1.default.green(chcpPath)}":`, stdout);
        process.exit(1);
    }
    const activeCodePage = match[1].trim();
    if (activeCodePage === "65001") {
        return;
    }
    console.error(chalk_1.default.red(`Error: It looks like you are using Git Bash for Windows (MINGW64) with an incorrect code page of "${chalk_1.default.green(activeCodePage)}". (It should be equal to "${constants_1.WINDOWS_CODE_PAGE}".)`));
    const response = await prompts_1.default({
        type: "confirm",
        name: "fixCodePage",
        message: 'Do you want me to fix this for you? (Type "y", then press "enter".)',
        initial: true,
    });
    if (response.fixCodePage === false) {
        console.error("Ok then. Good-bye.");
        process.exit(1);
    }
    applyFixesToBashProfile();
}
async function checkForWindowsBugColor() {
    if (process.env.FORCE_COLOR === "true") {
        return;
    }
    console.error(chalk_1.default.red(`Error: It looks like you are using Git Bash for Windows (MINGW64) without the "${chalk_1.default.green("FORCE_COLOR")}" environment variable.`));
    console.error("This is necessary in order for colors to work properly in the terminal.");
    const response = await prompts_1.default({
        type: "confirm",
        name: "fixColors",
        message: 'Do you want me to fix this for you? (Type "y", then press "enter".)',
        initial: true,
    });
    if (response.fixColors === false) {
        console.error("Ok then. Good-bye.");
        process.exit(1);
    }
    applyFixesToBashProfile();
}
function applyFixesToBashProfile() {
    // Check to see if the Bash profile has data
    let bashProfileContents;
    if (file.exists(constants_1.BASH_PROFILE_PATH)) {
        bashProfileContents = file.read(constants_1.BASH_PROFILE_PATH);
    }
    else {
        bashProfileContents = "";
    }
    // Prepare the text to append
    let newText = "";
    if (bashProfileContents !== "" &&
        bashProfileContents[bashProfileContents.length - 1] !== "\n") {
        // If the Bash profile exists and has data, it should end in a newline
        // Add an extra newline if this is not the case
        newText += "\n";
    }
    if (bashProfileContents !== "") {
        // If the Bash profile exists and has data, add an extra newline between the existing stuff and
        // the new lines added by us
        newText += "\n";
    }
    newText += "# Terminal fixes added by IsaacScript\n";
    newText += `chcp.com ${constants_1.WINDOWS_CODE_PAGE} > /dev/null\n`;
    newText += "export FORCE_COLOR=true\n";
    try {
        fs_1.default.appendFileSync(constants_1.BASH_PROFILE_PATH, newText);
    }
    catch (err) {
        console.error(`Failed to append text to "${constants_1.BASH_PROFILE_PATH}":`, err);
        process.exit(1);
    }
    console.log(chalk_1.default.green("Complete!"), `I have added the terminal fixes to "${constants_1.BASH_PROFILE_PATH}".`);
    console.log(chalk_1.default.red("Please close and re-open your terminal, then run isaacscript again."));
    process.exit(0);
}
