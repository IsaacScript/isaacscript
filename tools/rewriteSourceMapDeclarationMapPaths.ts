import glob from "glob";
import { file } from "isaacscript-cli";
import { error } from "isaacscript-common-ts";
import path from "path";

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
    const fileContents = file.read(filePath, false);
    const newFileContents = fileContents.replaceAll(
      `../../../../packages/${packageName}`,
      "..",
    );
    file.write(filePath, newFileContents, false);
  }
}
