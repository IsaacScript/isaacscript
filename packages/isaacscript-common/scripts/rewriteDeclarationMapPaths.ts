import * as fs from "fs";
import glob from "glob";
import { file } from "isaacscript-cli";
import { error } from "isaacscript-common-ts";
import * as JSONC from "jsonc-parser";
import path from "path";

const PACKAGE_ROOT = path.join(__dirname, "..");
const REPO_NAME = path.basename(PACKAGE_ROOT);
const TSCONFIG_PATH = path.join(PACKAGE_ROOT, "tsconfig.json");

main();

function main() {
  const outDir = getOutDir();
  const distDir = path.resolve(PACKAGE_ROOT, outDir);
  const globPath = "/**/*.d.ts.map";
  const filePaths = glob.sync(globPath, {
    root: distDir,
  });
  if (filePaths.length === 0) {
    error(`Failed to find any files in the following glob: ${globPath}`);
  }

  for (const filePath of filePaths) {
    const fileContents = file.read(filePath, false);
    const newFileContents = fileContents.replaceAll(
      `../../../../packages/${REPO_NAME}`,
      "..",
    );
    file.write(filePath, newFileContents, false);
  }
}

function getOutDir(): string {
  let fileContents: string;
  try {
    fileContents = fs.readFileSync(TSCONFIG_PATH, "utf8");
  } catch (err) {
    error(`Failed to read the "${TSCONFIG_PATH}" file:`, err);
  }

  let config: Record<string, unknown>;
  try {
    config = JSONC.parse(fileContents) as Record<string, unknown>;
  } catch (err) {
    error(`Failed to parse the "${TSCONFIG_PATH}" file:`, err);
  }

  if (typeof config !== "object") {
    error(`Failed to read the config file: ${TSCONFIG_PATH}`);
  }

  const { compilerOptions } = config;
  if (typeof compilerOptions !== "object") {
    error(`Failed to read the "compilerOptions" field in: ${TSCONFIG_PATH}`);
  }

  const { outDir } = compilerOptions as Record<string, unknown>;
  if (typeof outDir !== "string") {
    error(`Failed to read the "outDir" field in: ${TSCONFIG_PATH}`);
  }

  return outDir;
}
