import glob from "glob";
import path from "path";

const DOCUSAURUS_CONFIG_PATH = path.join(__dirname, "docusaurus.config.js");

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
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const docusaurusConfig = require(DOCUSAURUS_CONFIG_PATH) as Record<
    string,
    unknown
  >;

  if (typeof docusaurusConfig !== "object") {
    error(`Failed to read the config file: ${DOCUSAURUS_CONFIG_PATH}`);
  }

  const { plugins } = docusaurusConfig;
  if (!Array.isArray(plugins)) {
    error(`Failed to read the "plugins" field: ${DOCUSAURUS_CONFIG_PATH}`);
  }

  const firstPlugin = plugins[0];
  if (!Array.isArray(firstPlugin)) {
    error(`Failed to read the first plugin: ${DOCUSAURUS_CONFIG_PATH}`);
  }

  const options = firstPlugin[1] as Record<string, unknown>;
  if (typeof options !== "object") {
    error(
      `Failed to read the options of the first plugin: ${DOCUSAURUS_CONFIG_PATH}`,
    );
  }

  const { entryPoints } = options;
  if (!Array.isArray(entryPoints)) {
    error(`Failed to read the "entryPoints" field: ${DOCUSAURUS_CONFIG_PATH}`);
  }

  return entryPoints as string[];
}

export function error(...args: unknown[]): never {
  console.error(...args);
  process.exit(1);
}
