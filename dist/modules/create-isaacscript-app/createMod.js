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
const path_1 = __importDefault(require("path"));
const constants_1 = require("../common/constants");
const file = __importStar(require("../common/file"));
const misc_1 = require("../common/misc");
const constants_2 = require("./constants");
function createMod(projectName, projectPath, createNewDir, modTargetPath, saveSlot) {
    if (createNewDir) {
        file.makeDir(projectPath);
    }
    // Make subdirectories
    for (const subdirectory of ["mod", "src"]) {
        const srcPath = path_1.default.join(projectPath, subdirectory);
        file.makeDir(srcPath);
    }
    copyStaticFiles(projectPath);
    copyDynamicFiles(projectName, projectPath);
    makeConfigFile(projectPath, modTargetPath, saveSlot);
    installNodeModules(projectPath);
}
exports.default = createMod;
// Copy static files, like ".eslintrc.js", "tsconfig.json", etc.
function copyStaticFiles(projectPath) {
    const staticFileList = file.getDirList(constants_2.TEMPLATES_DIR_STATIC);
    staticFileList.forEach((fileName) => {
        let thisFilePath = path_1.default.join(projectPath, fileName);
        // As an exception, the "isaacScriptInit.ts" file goes into the "src" subdirectory
        if (fileName === "isaacScriptInit.ts") {
            thisFilePath = path_1.default.join(projectPath, "src", fileName);
        }
        if (!file.exists(thisFilePath)) {
            const filePath = path_1.default.join(constants_2.TEMPLATES_DIR_STATIC, fileName);
            file.copy(filePath, thisFilePath);
        }
    });
}
// Copy files that need to have text replaced inside of them
function copyDynamicFiles(projectName, projectPath) {
    // ".gitignore"
    {
        const fileName = "gitignore"; // Not named ".gitignore" to prevent NPM from deleting it
        const templatePath = path_1.default.join(constants_2.TEMPLATES_DIR, fileName);
        const template = file.read(templatePath);
        let separatorLine = "# ";
        for (let i = 0; i < projectName.length; i++) {
            separatorLine += "-";
        }
        separatorLine += "\n";
        const gitignoreHeader = `${separatorLine}# ${projectName}\n${separatorLine}\n`;
        const gitignore = gitignoreHeader + template;
        const destinationPath = path_1.default.join(projectPath, `.${fileName}`); // We need to prepend a period
        file.write(destinationPath, gitignore);
    }
    // "package.json"
    {
        // Get the latest released version of IsaacScript
        const isaacScriptVersion = misc_1.execShell("npm", [
            "view",
            "isaacscript",
            "version",
        ]);
        // Modify and copy the file
        const fileName = constants_2.PACKAGE_JSON;
        const templatePath = path_1.default.join(constants_2.TEMPLATES_DIR, fileName);
        const template = file.read(templatePath);
        const packageJSON = template
            .replace(/MOD_NAME/g, projectName)
            .replace(/"isaacscript": "\^0.0.1"/g, `"isaacscript": "^${isaacScriptVersion}"`);
        const destinationPath = path_1.default.join(projectPath, fileName);
        file.write(destinationPath, packageJSON);
    }
    // "README.md"
    {
        const fileName = constants_2.README_MD;
        const templatePath = path_1.default.join(constants_2.TEMPLATES_DIR, fileName);
        const template = file.read(templatePath);
        const readmeMD = template.replace(/MOD_NAME/g, projectName);
        const destinationPath = path_1.default.join(projectPath, fileName);
        file.write(destinationPath, readmeMD);
    }
    // "mod/metadata.xml"
    {
        const modPath = path_1.default.join(projectPath, "mod");
        const fileName = constants_2.METADATA_XML;
        const templatePath = path_1.default.join(constants_2.TEMPLATES_DIR, fileName);
        const template = file.read(templatePath);
        const metadataXML = template.replace(/MOD_NAME/g, projectName);
        const destinationPath = path_1.default.join(modPath, fileName);
        file.write(destinationPath, metadataXML);
    }
    // "src/main.ts"
    {
        // Convert snake_case and kebab-case to camelCase
        // (kebab-case in particular will make the example TypeScript file fail to compile)
        const srcPath = path_1.default.join(projectPath, "src");
        const camelCaseProjectName = misc_1.snakeKebabToCamel(projectName);
        const fileName = constants_2.MAIN_TS;
        const templatePath = path_1.default.join(constants_2.TEMPLATES_DIR, fileName);
        const template = file.read(templatePath);
        const mainTS = template
            .replace(/MOD_NAME initialized/g, `${projectName} initialized`)
            .replace(/MOD_NAME/g, camelCaseProjectName);
        const destinationPath = path_1.default.join(srcPath, fileName);
        file.write(destinationPath, mainTS);
    }
}
function makeConfigFile(projectPath, modTargetPath, saveSlot) {
    const configFilePath = path_1.default.join(projectPath, constants_1.CONFIG_FILE_NAME);
    const configObject = {
        modTargetPath,
        saveSlot,
    };
    const configContents = JSON.stringify(configObject, null, 2);
    file.write(configFilePath, configContents);
}
function installNodeModules(projectPath) {
    console.log("Installing node modules... (This can take a long time.)");
    misc_1.execShell("npm", ["install", projectPath]);
}
//# sourceMappingURL=createMod.js.map