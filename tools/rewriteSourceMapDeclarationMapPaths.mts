import glob from "glob";
import * as path from "node:path";
import * as url from "node:url";
import { error, readFile, writeFile } from "./utils.mjs";

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

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

  replaceTextInGlob(packageName, "/**/*.d.ts.map");
  if (packageName === "isaacscript-common-ts") {
    replaceTextInGlob(packageName, "/**/*.js.map");
  }
}

function replaceTextInGlob(packageName: string, globPath: string) {
  const outDir = path.join(REPO_ROOT, "dist", "packages", packageName);
  const filePaths = glob.sync(globPath, {
    root: outDir,
  });
  if (filePaths.length === 0) {
    error(`Failed to find any files in the following glob: ${globPath}`);
  }

  for (const filePath of filePaths) {
    const fileContents = readFile(filePath);
    const newFileContents = fileContents.replaceAll(
      `../../../../packages/${packageName}`,
      "..",
    );
    writeFile(filePath, newFileContents);
  }
}
