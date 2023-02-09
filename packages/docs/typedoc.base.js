const fs = require("node:fs");
const path = require("node:path");

/** @type {import('typedoc').TypeDocOptions} */
const baseConfig = {
  sort: ["source-order"],
  tsconfig: "tsconfig.json",
  readme: "website-root.md",
  treatWarningsAsErrors: true,
  validation: {
    invalidLink: true,
    notExported: true,
  },
  excludePrivate: true,
  plugin: [
    "typedoc-plugin-markdown",
    "@zamiell/typedoc-plugin-not-exported",
    "typedoc-plugin-rename",
  ],
  githubPages: false,

  // "typedoc-plugin-markdown" settings
  hideBreadcrumbs: true,
  hideInPageTOC: true,
};

/**
 * @param {string} packageDirectoryPath The path to the package directory.
 * @returns {import('typedoc').TypeDocOptions} A TypeDoc configuration object.
 */
function getConfig(packageDirectoryPath) {
  const packageName = path.basename(packageDirectoryPath);
  const out = path.join(__dirname, "docs", packageName);
  const indexTSPath = path.join(packageDirectoryPath, "src", "index.ts");
  const entryPointsRaw = getEntryPoints(indexTSPath);
  const entryPoints = entryPointsRaw.map((entryPoint) =>
    entryPoint.replaceAll("./", "src/"),
  );

  return {
    ...baseConfig,
    out,
    entryPoints,
  };
}
exports.getConfig = getConfig;

/** @param {string} indexTSPath The path to the "index.ts" file. */
function getEntryPoints(indexTSPath) {
  const indexTS = fs.readFileSync(indexTSPath, "utf-8");
  const lines = indexTS.split("\n");
  const exportLines = lines.filter((line) => line.startsWith("export"));
  return exportLines.map((line) => {
    const match = line.match(/"(.+)"/);
    if (match === null) {
      throw new Error(`Failed to parse line: ${line}`);
    }
    return match[1];
  });
}
