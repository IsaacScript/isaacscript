import { globSync } from "glob";
import * as path from "node:path";
import { __dirname, error, readFile, writeFile } from "./utils.mjs";

const REPO_ROOT = path.join(__dirname, "..");

main();

function main() {
  const firstCommandLineArgument = process.argv[2];
  if (
    firstCommandLineArgument === undefined ||
    firstCommandLineArgument === ""
  ) {
    error("This script requires the name of the package to operate on.");
  }
  const packageName = firstCommandLineArgument;

  if (packageName === "isaacscript-common-ts") {
    replaceTextInGlob(packageName, "./**/*.mjs.map");
    replaceTextInGlob(packageName, "./**/*.d.mts.map");
  } else {
    replaceTextInGlob(packageName, "./**/*.d.ts.map");
  }
}

function replaceTextInGlob(packageName: string, globPath: string) {
  const outDir = path.join(REPO_ROOT, "dist", "packages", packageName);
  const filePaths = globSync(globPath, {
    cwd: outDir,
  });
  if (filePaths.length === 0) {
    error(`Failed to find any files in the following glob: ${globPath}`);
  }

  for (const partialFilePath of filePaths) {
    const filePath = path.join(outDir, partialFilePath);
    const fileContents = readFile(filePath);
    const newFileContents = fileContents.replaceAll(
      `../../../../packages/${packageName}`,
      "..",
    );
    writeFile(filePath, newFileContents);
  }
}
