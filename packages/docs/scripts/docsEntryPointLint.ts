import glob from "glob";
import { utils } from "isaacscript-cli";
import path from "path";

const { error } = utils;

const TYPEDOC_CONFIG_PATH = path.join(__dirname, "..", "typedoc.json");

main();

function main() {
  let atLeastOneError = false;

  const entryPoints = getEntryPoints();
  const entryPointsSet = new Set(entryPoints);

  const classesFilePaths = glob.sync("../isaacscript-common/src/classes/*.ts");
  for (const filePath of classesFilePaths) {
    if (!entryPointsSet.has(filePath)) {
      console.error(
        `Failed to find the following file in the entry point: ${filePath}`,
      );
      atLeastOneError = true;
    }
  }

  const enumsFilePaths = glob.sync("../isaacscript-common/src/enums/*.ts");
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

  const featuresFilePaths = glob.sync(
    "../isaacscript-common/src/features/*.ts",
  );
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

  const functionFilePaths = glob.sync(
    "../isaacscript-common/src/functions/*.ts",
  );
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

  const typesFilePaths = glob.sync("../isaacscript-common/src/types/*.ts");
  for (const filePath of typesFilePaths) {
    if (
      filePath.endsWith("private") ||
      filePath.endsWith(".d.ts") ||
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

  if (atLeastOneError) {
    process.exit(1);
  }
}

function getEntryPoints(): string[] {
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const typeDocConfig = require(TYPEDOC_CONFIG_PATH) as Record<string, unknown>;

  if (typeof typeDocConfig !== "object") {
    return error(`Failed to read the config file: ${TYPEDOC_CONFIG_PATH}`);
  }

  const { entryPoints } = typeDocConfig;
  if (!Array.isArray(entryPoints)) {
    return error(
      `Failed to read the "entryPoints" field: ${TYPEDOC_CONFIG_PATH}`,
    );
  }

  return entryPoints as string[];
}
