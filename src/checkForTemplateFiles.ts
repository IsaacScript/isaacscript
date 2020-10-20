import chalk from "chalk";
import { execSync } from "child_process";
import path from "path";
import pkg from "../package.json";
import {
  CWD,
  MAIN_TS_PATH,
  MAIN_TS_TEMPLATE_PATH,
  METADATA_XML_SOURCE_PATH,
  METADATA_XML_TEMPLATE_PATH,
  MOD_SOURCE_PATH,
  NODE_MODULES_PATH,
  PACKAGE_JSON_PATH,
  PACKAGE_JSON_TEMPLATE_PATH,
  PROJECT_NAME,
  README_MD_PATH,
  README_MD_TEMPLATES_PATH,
  TEMPLATES_DIR_STATIC,
  TS_SOURCE_PATH,
  VSCODE_DIR_PATH,
  VSCODE_DIR_TEMPLATE_PATH,
} from "./constants";
import * as file from "./file";

// If an important file does not exist in the project directory,
// copy it over from the templates directory
export default function checkForTemplateFiles(): void {
  // Copy static files, like ".eslintrc.js", "tsconfig.json", etc.
  const staticFileList = file.getDirList(TEMPLATES_DIR_STATIC);
  staticFileList.forEach((fileName: string) => {
    const thisFilePath = path.join(CWD, fileName);
    if (!file.exists(thisFilePath)) {
      const filePath = path.join(TEMPLATES_DIR_STATIC, fileName);
      file.copy(filePath, thisFilePath);
    }
  });

  // "package.json"
  if (!file.exists(PACKAGE_JSON_PATH)) {
    const template = file.read(PACKAGE_JSON_TEMPLATE_PATH);
    const packageJSON = template
      .replace(/MOD_NAME/g, PROJECT_NAME)
      .replace(/"isaacscript": "\^0.0.1"/g, `"isaacscript": "^${pkg.version}"`);
    file.write(PACKAGE_JSON_PATH, packageJSON);
  }

  // "README.md"
  if (!file.exists(README_MD_PATH)) {
    const template = file.read(README_MD_TEMPLATES_PATH);
    const readmeMD = template.replace(/MOD_NAME/g, PROJECT_NAME);
    file.write(README_MD_PATH, readmeMD);
  }

  // "src/main.ts"
  if (!file.exists(TS_SOURCE_PATH)) {
    file.makeDir(TS_SOURCE_PATH);
  }
  if (!file.exists(MAIN_TS_PATH)) {
    const template = file.read(MAIN_TS_TEMPLATE_PATH);
    const mainTS = template.replace(/MOD_NAME/g, PROJECT_NAME);
    file.write(MAIN_TS_PATH, mainTS);
  }

  // "mod/metadata.xml"
  if (!file.exists(MOD_SOURCE_PATH)) {
    file.makeDir(MOD_SOURCE_PATH);
  }
  if (!file.exists(METADATA_XML_SOURCE_PATH)) {
    const template = file.read(METADATA_XML_TEMPLATE_PATH);
    const metadataXML = template.replace(/MOD_NAME/g, PROJECT_NAME);
    file.write(METADATA_XML_SOURCE_PATH, metadataXML);
  }

  // ".vscode"
  if (!file.exists(VSCODE_DIR_PATH)) {
    file.makeDir(VSCODE_DIR_PATH);
  }
  const vsCodeFileList = file.getDirList(VSCODE_DIR_TEMPLATE_PATH);
  vsCodeFileList.forEach((fileName: string) => {
    const thisFilePath = path.join(VSCODE_DIR_PATH, fileName);
    if (!file.exists(thisFilePath)) {
      const filePath = path.join(VSCODE_DIR_TEMPLATE_PATH, fileName);
      file.copy(filePath, thisFilePath);
    }
  });

  // "node_modules"
  if (!file.exists(NODE_MODULES_PATH)) {
    console.log("Installing node modules... (This can take a long time.)");
    const command = "npm i";
    try {
      execSync(command);
    } catch (err) {
      console.error(`Failed to run "${chalk.green(command)}":`, err);
      process.exit(1);
    }
  }
}
