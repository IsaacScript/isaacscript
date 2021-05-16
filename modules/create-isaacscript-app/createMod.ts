import path from "path";
import { Config } from "../common/Config";
import { CONFIG_FILE_NAME } from "../common/constants";
import * as file from "../common/file";
import { execShell, snakeKebabToCamel } from "../common/misc";
import {
  MAIN_TS,
  METADATA_XML,
  PACKAGE_JSON,
  README_MD,
  TEMPLATES_DIR,
  TEMPLATES_DIR_STATIC,
} from "./constants";

export default function createMod(
  projectName: string,
  projectPath: string,
  createNewDir: boolean,
  modTargetPath: string,
  saveSlot: number,
): void {
  if (createNewDir) {
    file.makeDir(projectPath);
  }

  // Make subdirectories
  for (const subdirectory of ["mod", "src"]) {
    const srcPath = path.join(projectPath, subdirectory);
    file.makeDir(srcPath);
  }

  copyStaticFiles(projectPath);
  copyDynamicFiles(projectName, projectPath);
  makeConfigFile(projectPath, modTargetPath, saveSlot);
  installNodeModules(projectPath);
}

// Copy static files, like ".eslintrc.js", "tsconfig.json", etc.
function copyStaticFiles(projectPath: string) {
  const staticFileList = file.getDirList(TEMPLATES_DIR_STATIC);
  staticFileList.forEach((fileName: string) => {
    let thisFilePath = path.join(projectPath, fileName);

    // As an exception, the "isaacScriptInit.ts" file goes into the "src" subdirectory
    if (fileName === "isaacScriptInit.ts") {
      thisFilePath = path.join(projectPath, "src", fileName);
    }

    if (!file.exists(thisFilePath)) {
      const filePath = path.join(TEMPLATES_DIR_STATIC, fileName);
      file.copy(filePath, thisFilePath);
    }
  });
}

// Copy files that need to have text replaced inside of them
function copyDynamicFiles(projectName: string, projectPath: string) {
  // ".gitignore"
  {
    const fileName = "gitignore"; // Not named ".gitignore" to prevent NPM from deleting it
    const templatePath = path.join(TEMPLATES_DIR, fileName);
    const template = file.read(templatePath);
    let separatorLine = "# ";
    for (let i = 0; i < projectName.length; i++) {
      separatorLine += "-";
    }
    separatorLine += "\n";
    const gitignoreHeader = `${separatorLine}# ${projectName}\n${separatorLine}\n`;
    const gitignore = gitignoreHeader + template;
    const destinationPath = path.join(projectPath, `.${fileName}`); // We need to prepend a period
    file.write(destinationPath, gitignore);
  }

  // "package.json"
  {
    // Get the latest released version of IsaacScript
    const isaacScriptVersion = execShell("npm", [
      "view",
      "isaacscript",
      "version",
    ]);

    // Modify and copy the file
    const fileName = PACKAGE_JSON;
    const templatePath = path.join(TEMPLATES_DIR, fileName);
    const template = file.read(templatePath);
    const packageJSON = template
      .replace(/MOD_NAME/g, projectName)
      .replace(
        /"isaacscript": "\^0.0.1"/g,
        `"isaacscript": "^${isaacScriptVersion}"`,
      );
    const destinationPath = path.join(projectPath, fileName);
    file.write(destinationPath, packageJSON);
  }

  // "README.md"
  {
    const fileName = README_MD;
    const templatePath = path.join(TEMPLATES_DIR, fileName);
    const template = file.read(templatePath);
    const readmeMD = template.replace(/MOD_NAME/g, projectName);
    const destinationPath = path.join(projectPath, fileName);
    file.write(destinationPath, readmeMD);
  }

  // "mod/metadata.xml"
  {
    const modPath = path.join(projectPath, "mod");
    const fileName = METADATA_XML;
    const templatePath = path.join(TEMPLATES_DIR, fileName);
    const template = file.read(templatePath);
    const metadataXML = template.replace(/MOD_NAME/g, projectName);
    const destinationPath = path.join(modPath, fileName);
    file.write(destinationPath, metadataXML);
  }

  // "src/main.ts"
  {
    // Convert snake_case and kebab-case to camelCase
    // (kebab-case in particular will make the example TypeScript file fail to compile)
    const srcPath = path.join(projectPath, "src");
    const camelCaseProjectName = snakeKebabToCamel(projectName);
    const fileName = MAIN_TS;
    const templatePath = path.join(TEMPLATES_DIR, fileName);
    const template = file.read(templatePath);
    const mainTS = template
      .replace(/MOD_NAME initialized/g, `${projectName} initialized`)
      .replace(/MOD_NAME/g, camelCaseProjectName);
    const destinationPath = path.join(srcPath, fileName);
    file.write(destinationPath, mainTS);
  }
}

function makeConfigFile(
  projectPath: string,
  modTargetPath: string,
  saveSlot: number,
) {
  const configFilePath = path.join(projectPath, CONFIG_FILE_NAME);
  const configObject: Config = {
    modTargetPath,
    saveSlot,
  };
  const configContents = JSON.stringify(configObject, null, 2);
  file.write(configFilePath, configContents);
}

function installNodeModules(projectPath: string) {
  console.log("Installing node modules... (This can take a long time.)");
  execShell("npm", ["install", projectPath]);
}
