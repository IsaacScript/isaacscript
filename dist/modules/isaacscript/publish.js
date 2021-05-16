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
exports.main = void 0;
const chalk_1 = __importDefault(require("chalk"));
const file = __importStar(require("../common/file"));
const misc_1 = require("../common/misc");
const compileAndCopy = __importStar(require("./compileAndCopy"));
const constants_1 = require("./constants");
function main(modSourcePath, modTargetPath, skip) {
    updateDeps();
    let version = getVersionFromPackageJSON();
    if (!skip) {
        version = bumpVersionInPackageJSON(version);
    }
    writeVersionToConstantsTS(version);
    writeVersionToMetadataXML(version);
    writeVersionToVersionTXT(version);
    compileAndCopy.main(modSourcePath, modTargetPath);
    gitCommitIfChanges(version);
    openModUploader(modTargetPath);
    console.log(`\nPublished version ${version} successfully.`);
}
exports.main = main;
function updateDeps() {
    misc_1.execShell("npx", [
        "npm-check-updates",
        "--upgrade",
        "--packageFile",
        "package.json",
    ]);
    console.log("NPM dependencies updated successfully.");
}
function getVersionFromPackageJSON() {
    if (!file.exists(constants_1.PACKAGE_JSON_PATH)) {
        console.error(chalk_1.default.red(`A "${constants_1.PACKAGE_JSON_PATH}" was not found in the current directory.`));
        process.exit(1);
    }
    const packageJSONRaw = file.read(constants_1.PACKAGE_JSON_PATH);
    let packageJSON;
    try {
        packageJSON = JSON.parse(packageJSONRaw);
    }
    catch (err) {
        console.error(`Failed to parse "${chalk_1.default.green(constants_1.PACKAGE_JSON_PATH)}":`, err);
        process.exit(1);
    }
    if (!Object.prototype.hasOwnProperty.call(packageJSON, "version")) {
        console.error(`The "${chalk_1.default.green(constants_1.PACKAGE_JSON_PATH)}" file does not have a "version" field.`);
        process.exit(1);
    }
    if (typeof packageJSON.version !== "string") {
        console.error(`The "${chalk_1.default.green(constants_1.PACKAGE_JSON_PATH)}" file has a "version" field that is not a string.`);
        process.exit(1);
    }
    return packageJSON.version;
}
function bumpVersionInPackageJSON(version) {
    // Get the patch version (i.e. the third number)
    const matches = /(\d+\.\d+\.)(\d+)/.exec(version);
    if (matches === null) {
        console.error(`Failed to parse the version of: ${version}`);
        process.exit(1);
    }
    const versionPrefix = matches[1];
    if (versionPrefix === undefined) {
        console.error(`Failed to parse the first part of the version: ${version}`);
        process.exit(1);
    }
    const patchVersionString = matches[2];
    if (patchVersionString === undefined) {
        console.error(`Failed to parse the second part of the version: ${version}`);
        process.exit(1);
    }
    const patchVersion = misc_1.parseIntSafe(patchVersionString);
    if (Number.isNaN(patchVersion)) {
        console.error(`Failed to convert "${patchVersionString}" to a number.`);
        process.exit(1);
    }
    const incrementedPatchVersion = patchVersion + 1;
    const incrementedVersion = `${versionPrefix}${incrementedPatchVersion}`;
    const packageJSON = file.read(constants_1.PACKAGE_JSON_PATH);
    const newPackageJSON = packageJSON.replace(/"version": ".+",/, `"version": "${incrementedVersion}",`);
    file.write(constants_1.PACKAGE_JSON_PATH, newPackageJSON);
    console.log(`Bumped the version to: ${incrementedVersion}`);
    return incrementedVersion;
}
function writeVersionToConstantsTS(version) {
    const constantsTS = file.read(constants_1.CONSTANTS_TS_PATH);
    const newConstantsTS = constantsTS.replace(/const VERSION = ".+"/, `const VERSION = "${version}"`);
    file.write(constants_1.CONSTANTS_TS_PATH, newConstantsTS);
    console.log(`The version of ${version} was written to the ${constants_1.CONSTANTS_TS_PATH} file.`);
}
function writeVersionToMetadataXML(version) {
    const metadataXML = file.read(constants_1.METADATA_XML_PATH);
    const newMetadataXML = metadataXML.replace(/<version>.+<\/version>/, `<version>${version}</version>`);
    file.write(constants_1.METADATA_XML_PATH, newMetadataXML);
    console.log(`The version of ${version} was written to the ${constants_1.METADATA_XML_PATH} file.`);
}
function writeVersionToVersionTXT(version) {
    file.write(constants_1.VERSION_TXT_PATH, version);
    console.log(`The version of ${version} was written to the ${constants_1.VERSION_TXT_PATH} file.`);
}
function gitCommitIfChanges(version) {
    // Throw an error if this is not a git repository
    misc_1.execShell("git", ["status"]);
    // Check to see if there are any changes
    // https://stackoverflow.com/questions/3878624/how-do-i-programmatically-determine-if-there-are-uncommitted-changes
    const exitCode = misc_1.execShell("git", ["diff-index", "--quiet", "HEAD", "--"], true);
    if (exitCode === 0) {
        // There are no changes
        return;
    }
    const commitMessage = `v${version}`;
    misc_1.execShell("git", ["add", "-A"]);
    misc_1.execShell("git", ["commit", "-m", commitMessage]);
    misc_1.execShell("git", ["push"]);
    console.log(`Committed and pushed to the git repository with a message of: ${commitMessage}`);
}
function openModUploader(modTargetPath) {
    console.log("Opening the mod uploader tool from Nicalis. Close it when you are finished uploading the mod...");
    misc_1.execExe(constants_1.MOD_UPLOADER_PATH, modTargetPath);
    // (this will block until the user closes the mod uploader tool)
    console.log("Mod uploader tool closed.");
}
//# sourceMappingURL=publish.js.map