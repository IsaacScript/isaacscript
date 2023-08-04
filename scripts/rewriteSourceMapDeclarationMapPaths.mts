import { globSync } from "glob";
import path from "node:path";
import { __dirname, fatalError, readFile, writeFile } from "./utils.mjs";

const REPO_ROOT = path.join(__dirname, "..");

main();

function main() {
  const firstCommandLineArgument = process.argv[2];
  if (
    firstCommandLineArgument === undefined ||
    firstCommandLineArgument === ""
  ) {
    fatalError("This script requires the name of the package to operate on.");
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
    fatalError(`Failed to find any files in the following glob: ${globPath}`);
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
