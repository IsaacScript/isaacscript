import glob from "glob";
import path from "path";

const TYPEDOC_CONFIG_PATH = path.join(__dirname, "..", "typedoc.json");

main();

function main() {
  let atLeastOneError = false;

  const entryPoints = getEntryPoints();
  const entryPointsSet = new Set(entryPoints);

  const classesFilePaths = glob
    .sync("../isaacscript-common/src/classes/*.ts")
    .map((string) => string.replace(/^\.\.\/isaacscript-common\//, ""));
  for (const filePath of classesFilePaths) {
    if (!entryPointsSet.has(filePath)) {
      console.error(
        `Failed to find the following file in the entry point: ${filePath}`,
      );
      atLeastOneError = true;
    }
  }

  const enumsFilePaths = glob
    .sync("../isaacscript-common/src/enums/*.ts")
    .map((string) => string.replace(/^\.\.\/isaacscript-common\//, ""));
  for (const filePath of enumsFilePaths) {
    if (filePath.endsWith("private")) {
      continue;
    }

    if (!entryPointsSet.has(filePath)) {
      console.error(
        `Failed to find the following file in the entry point: ${filePath}`,
      );
      atLeastOneError = true;
    }
  }

  const featuresFilePaths = glob
    .sync("../isaacscript-common/src/features/*.ts")
    .map((string) => string.replace(/^\.\.\/isaacscript-common\//, ""));
  for (const filePath of featuresFilePaths) {
    if (!entryPointsSet.has(filePath)) {
      if (!filePath.endsWith(".ts")) {
        continue;
      }

      console.error(
        `Failed to find the following file in the entry point: ${filePath}`,
      );
      atLeastOneError = true;
    }
  }

  const functionFilePaths = glob
    .sync("../isaacscript-common/src/functions/*.ts")
    .map((string) => string.replace(/^\.\.\/isaacscript-common\//, ""));
  for (const filePath of functionFilePaths) {
    if (filePath.endsWith("Tests.ts")) {
      continue;
    }

    if (!entryPointsSet.has(filePath)) {
      console.error(
        `Failed to find the following file in the entry point: ${filePath}`,
      );
      atLeastOneError = true;
    }
  }

  const interfacesFilePaths = glob
    .sync("../isaacscript-common/src/interfaces/*.ts")
    .map((string) => string.replace(/^\.\.\/isaacscript-common\//, ""));
  for (const filePath of interfacesFilePaths) {
    if (
      filePath.endsWith("private") ||
      filePath.endsWith("AddCallbackParameterCustom.ts")
    ) {
      continue;
    }

    if (!entryPointsSet.has(filePath)) {
      console.error(
        `Failed to find the following file in the entry point: ${filePath}`,
      );
      atLeastOneError = true;
    }
  }

  // Only specific maps in the "maps" directory are exported. Thus, we do not check this directory.

  const typesFilePaths = glob
    .sync("../isaacscript-common/src/types/*.ts")
    .map((string) => string.replace(/^\.\.\/isaacscript-common\//, ""));
  for (const filePath of typesFilePaths) {
    if (filePath.endsWith("private") || filePath.endsWith(".d.ts")) {
      continue;
    }

    if (!entryPointsSet.has(filePath)) {
      console.error(
        `Failed to find the following file in the entry point: ${filePath}`,
      );
      atLeastOneError = true;
    }
  }

  if (atLeastOneError) {
    process.exit(1);
  }
}

function getEntryPoints(): string[] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require,global-require
  const typeDocConfig = require(TYPEDOC_CONFIG_PATH) as Record<string, unknown>;

  if (typeof typeDocConfig !== "object") {
    error(`Failed to read the config file: ${TYPEDOC_CONFIG_PATH}`);
  }

  const { entryPoints } = typeDocConfig;
  if (!Array.isArray(entryPoints)) {
    error(`Failed to read the "entryPoints" field: ${TYPEDOC_CONFIG_PATH}`);
  }

  return entryPoints as string[];
}

export function error(...args: unknown[]): never {
  console.error(...args);
  return process.exit(1);
}
