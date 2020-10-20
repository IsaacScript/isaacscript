import path from "path";
import {
  CWD,
  MAIN_TS_PATH,
  MAIN_TS_TEMPLATE_PATH,
  PROJECT_NAME,
  TEMPLATES_DIR_STATIC,
  TS_SOURCE_PATH,
} from "./constants";
import * as file from "./file";

// If an important file does not exist in the project directory,
// copy it over from the templates directory
export default function checkForTemplateFiles(): void {
  // Copy static files, like ".eslintrc.js", "tsconfig.json", etc.
  const fileList = file.getDirList(TEMPLATES_DIR_STATIC);
  fileList.forEach((fileName: string) => {
    const thisFilePath = path.join(CWD, fileName);
    if (!file.exists(thisFilePath)) {
      const filePath = path.join(TEMPLATES_DIR_STATIC, fileName);
      file.copy(filePath, thisFilePath);
    }
  });

  // "main.ts"
  if (!file.exists(TS_SOURCE_PATH)) {
    file.makeDir(TS_SOURCE_PATH);
  }
  if (!file.exists(MAIN_TS_PATH)) {
    const template = file.read(MAIN_TS_TEMPLATE_PATH);
    const mainTS = template.replace(/MOD_NAME/g, PROJECT_NAME);
    file.write(MAIN_TS_PATH, mainTS);
  }
}
