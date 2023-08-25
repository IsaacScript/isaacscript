import { globSync } from "glob";
import fs from "node:fs";
import path from "node:path";
import { __dirname, readFile } from "./utils.js";

const REPO_ROOT = path.join(__dirname, "..");

main();

function main() {
  const firstCommandLineArgument = process.argv[2];
  if (
    firstCommandLineArgument === undefined ||
    firstCommandLineArgument === ""
  ) {
    throw new Error(
      "This script requires the name of the package to operate on.",
    );
  }
  const packageName = firstCommandLineArgument;

  if (firstCommandLineArgument === "isaacscript-common-ts") {
    replaceTextInGlob(packageName, "./**/*.js.map");
  }
  replaceTextInGlob(packageName, "./**/*.d.ts.map");
}

function replaceTextInGlob(packageName: string, globPath: string) {
  const outDir = path.join(REPO_ROOT, "dist", "packages", packageName);
  const filePaths = globSync(globPath, {
    cwd: outDir,
  });
  if (filePaths.length === 0) {
    throw new Error(
      `Failed to find any files in the following glob: ${globPath}`,
    );
  }

  for (const partialFilePath of filePaths) {
    const filePath = path.join(outDir, partialFilePath);
    const fileContents = readFile(filePath);
    const newFileContents = fileContents.replaceAll(
      `../../../../packages/${packageName}`,
      "..",
    );
    fs.writeFileSync(filePath, newFileContents);
  }
}
