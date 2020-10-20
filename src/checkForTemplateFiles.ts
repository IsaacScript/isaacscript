import path from "path";
import { CWD, TEMPLATES_DIR } from "./constants";
import * as misc from "./misc";

// If an important file does not exist in the project directory,
// copy it over from the templates directory
export default function checkForTemplateFiles(): void {
  const fileList = misc.getDirList(TEMPLATES_DIR);
  for (const fileName of fileList) {
    const thisFilePath = path.join(CWD, fileName);
    if (!misc.exists(thisFilePath)) {
      const filePath = path.join(TEMPLATES_DIR, fileName);
      misc.copy(filePath, thisFilePath);
    }
  }
}
