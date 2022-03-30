import chalk from "chalk";
import path from "path";
import * as configFile from "../../configFile";
import {
  GITIGNORE,
  GITIGNORE_TEMPLATE_PATH,
  MAIN_TS,
  MAIN_TS_TEMPLATE_PATH,
  METADATA_VDF,
  METADATA_VDF_TEMPLATE_PATH,
  METADATA_XML,
  METADATA_XML_TEMPLATE_PATH,
  PACKAGE_JSON,
  PACKAGE_JSON_TEMPLATE_PATH,
  README_MD,
  README_MD_TEMPLATES_PATH,
  TEMPLATES_STATIC_DIR,
} from "../../constants";
import { execShell } from "../../exec";
import * as file from "../../file";
import { initGitRepository } from "./git";

export function createMod(
  projectName: string,
  projectPath: string,
  createNewDir: boolean,
  modsDirectory: string,
  saveSlot: number,
  gitRemoteURL: string | undefined,
  skipNPMInstall: boolean,
  verbose: boolean,
): void {
  if (createNewDir) {
    file.makeDir(projectPath, verbose);
  }

  const config = configFile.createObject(modsDirectory, saveSlot);
  configFile.createFile(projectPath, config, verbose);
  const targetModDirectory = path.join(config.modsDirectory, projectName);

  makeSubdirectories(projectPath, verbose);
  copyStaticFiles(projectPath, verbose);
  copyDynamicFiles(projectName, projectPath, targetModDirectory, verbose);
  updateNodeModules(projectPath, verbose);
  installNodeModules(projectPath, skipNPMInstall, verbose);
  formatFiles(projectPath, verbose);

  // Only make the initial commit once all of the files have been copied and formatted
  initGitRepository(projectPath, gitRemoteURL, verbose);

  console.log(`Successfully created mod: ${chalk.green(projectName)}`);
}

function makeSubdirectories(projectPath: string, verbose: boolean) {
  // The "src" directory is created during copying of static files
  for (const subdirectory of ["mod"]) {
    const srcPath = path.join(projectPath, subdirectory);
    file.makeDir(srcPath, verbose);
  }
}

/** Copy static files, like ".eslintrc.js", "tsconfig.json", etc. */
function copyStaticFiles(projectPath: string, verbose: boolean) {
  const staticFileList = file.getDirList(TEMPLATES_STATIC_DIR, verbose);
  staticFileList.forEach((fileName: string) => {
    const templateFilePath = path.join(TEMPLATES_STATIC_DIR, fileName);
    const destinationFilePath = path.join(projectPath, fileName);
    if (!file.exists(destinationFilePath, verbose)) {
      file.copy(templateFilePath, destinationFilePath, verbose);
    }
  });
}

/** Copy files that need to have text replaced inside of them. */
function copyDynamicFiles(
  projectName: string,
  projectPath: string,
  targetModDirectory: string,
  verbose: boolean,
) {
  // ".gitignore"
  {
    const fileName = GITIGNORE;
    const templatePath = GITIGNORE_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);

    // Prepend a header with the project name
    let separatorLine = "# ";
    for (let i = 0; i < projectName.length; i++) {
      separatorLine += "-";
    }
    separatorLine += "\n";
    const gitignoreHeader = `${separatorLine}# ${projectName}\n${separatorLine}\n`;
    const gitignore = gitignoreHeader + template;

    const destinationPath = path.join(projectPath, `.${fileName}`); // We need to prepend a period
    file.write(destinationPath, gitignore, verbose);
  }

  // "package.json"
  {
    // Modify and copy the file
    const fileName = PACKAGE_JSON;
    const templatePath = PACKAGE_JSON_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);
    const packageJSON = template.replace(/MOD_NAME_TO_REPLACE/g, projectName);
    const destinationPath = path.join(projectPath, fileName);
    file.write(destinationPath, packageJSON, verbose);
  }

  // "README.md"
  {
    const fileName = README_MD;
    const templatePath = README_MD_TEMPLATES_PATH;
    const template = file.read(templatePath, verbose);
    const readmeMD = template.replace(/MOD_NAME_TO_REPLACE/g, projectName);
    const destinationPath = path.join(projectPath, fileName);
    file.write(destinationPath, readmeMD, verbose);
  }

  // "mod/metadata.xml"
  {
    const fileName = METADATA_XML;
    const templatePath = METADATA_XML_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);
    const metadataXML = template.replace(/MOD_NAME_TO_REPLACE/g, projectName);
    const modPath = path.join(projectPath, "mod");
    const destinationPath = path.join(modPath, fileName);
    file.write(destinationPath, metadataXML, verbose);
  }

  // "mod/metadata.vdf"
  {
    const fileName = METADATA_VDF;
    const templatePath = METADATA_VDF_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);
    const metadataVDF = template.replace(/MOD_TARGET_DIR/g, targetModDirectory);
    const modPath = path.join(projectPath, "mod");
    const destinationPath = path.join(modPath, fileName);
    file.write(destinationPath, metadataVDF, verbose);
  }

  // "src/main.ts"
  {
    // Convert snake_case and kebab-case to camelCase
    // (kebab-case in particular will make the example TypeScript file fail to compile)
    const srcPath = path.join(projectPath, "src");
    const fileName = MAIN_TS;
    const templatePath = MAIN_TS_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);
    const mainTS = template.replace(/MOD_NAME_TO_REPLACE/g, projectName);
    const destinationPath = path.join(srcPath, fileName);
    file.write(destinationPath, mainTS, verbose);
  }
}

/** The "package.json" file has to be copied first before this step. */
function updateNodeModules(projectPath: string, verbose: boolean) {
  console.log("Finding out the latest versions of the NPM packages...");
  execShell(
    "npx",
    ["npm-check-updates", "--upgrade", "--packageFile", "package.json"],
    verbose,
    false,
    projectPath,
  );
}

function installNodeModules(
  projectPath: string,
  skipNPMInstall: boolean,
  verbose: boolean,
) {
  if (skipNPMInstall) {
    return;
  }

  console.log("Installing node modules... (This can take a long time.)");
  execShell("npm", ["install"], verbose, false, projectPath);
}

function formatFiles(projectPath: string, verbose: boolean) {
  execShell(
    "npx",
    ["prettier", "--write", projectPath],
    verbose,
    false,
    projectPath,
  );
}
