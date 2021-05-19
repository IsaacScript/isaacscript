import path from "path";
import { Config } from "../Config";
import {
  CONFIG_FILE_NAME,
  GITIGNORE,
  GITIGNORE_TEMPLATE_PATH,
  MAIN_TS,
  MAIN_TS_TEMPLATE_PATH,
  METADATA_XML,
  METADATA_XML_TEMPLATE_PATH,
  PACKAGE_JSON,
  PACKAGE_JSON_TEMPLATE_PATH,
  README_MD,
  README_MD_TEMPLATES_PATH,
  TEMPLATES_STATIC_DIR,
} from "../constants";
import * as file from "../file";
import { execShell, snakeKebabToCamel } from "../misc";

export default function createMod(
  projectName: string,
  projectPath: string,
  createNewDir: boolean,
  modsDirectory: string,
  saveSlot: number,
): void {
  if (createNewDir) {
    file.makeDir(projectPath);
  }

  // Make subdirectories
  for (const subdirectory of [".vscode", "mod", "src"]) {
    const srcPath = path.join(projectPath, subdirectory);
    file.makeDir(srcPath);
  }

  copyStaticFiles(projectPath);
  copyDynamicFiles(projectName, projectPath);
  makeConfigFile(projectName, projectPath, modsDirectory, saveSlot);
  installNodeModules(projectPath);
}

// Copy static files, like ".eslintrc.js", "tsconfig.json", etc.
function copyStaticFiles(projectPath: string) {
  const staticFileList = file.getDirList(TEMPLATES_STATIC_DIR);
  staticFileList.forEach((fileName: string) => {
    const templateFilePath = path.join(TEMPLATES_STATIC_DIR, fileName);
    const thisFilePath = path.join(projectPath, fileName);
    if (!file.exists(thisFilePath)) {
      file.copy(templateFilePath, thisFilePath);
    }
  });
}

// Copy files that need to have text replaced inside of them
function copyDynamicFiles(projectName: string, projectPath: string) {
  // ".gitignore"
  {
    const fileName = GITIGNORE;
    const templatePath = GITIGNORE_TEMPLATE_PATH;
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
    const [, isaacScriptVersion] = execShell("npm", [
      "view",
      "isaacscript",
      "version",
    ]);

    // Modify and copy the file
    const fileName = PACKAGE_JSON;
    const templatePath = PACKAGE_JSON_TEMPLATE_PATH;
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
    const templatePath = README_MD_TEMPLATES_PATH;
    const template = file.read(templatePath);
    const readmeMD = template.replace(/MOD_NAME/g, projectName);
    const destinationPath = path.join(projectPath, fileName);
    file.write(destinationPath, readmeMD);
  }

  // "mod/metadata.xml"
  {
    const fileName = METADATA_XML;
    const templatePath = METADATA_XML_TEMPLATE_PATH;
    const template = file.read(templatePath);
    const metadataXML = template.replace(/MOD_NAME/g, projectName);
    const modPath = path.join(projectPath, "mod");
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
    const templatePath = MAIN_TS_TEMPLATE_PATH;
    const template = file.read(templatePath);
    const mainTS = template
      .replace(/MOD_NAME initialized/g, `${projectName} initialized`)
      .replace(/MOD_NAME/g, camelCaseProjectName);
    const destinationPath = path.join(srcPath, fileName);
    file.write(destinationPath, mainTS);
  }
}

function makeConfigFile(
  projectName: string,
  projectPath: string,
  modsDirectory: string,
  saveSlot: number,
) {
  const configFilePath = path.join(projectPath, CONFIG_FILE_NAME);
  const configObject: Config = {
    projectName,
    modsDirectory,
    saveSlot,
  };
  const configContents = JSON.stringify(configObject, null, 2);
  file.write(configFilePath, configContents);
}

function installNodeModules(projectPath: string) {
  console.log("Installing node modules... (This can take a long time.)");
  execShell("npm", ["install"], false, projectPath);
}
