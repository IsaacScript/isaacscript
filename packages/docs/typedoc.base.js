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
function getTypeDocConfig(packageDirectoryPath) {
  const packageName = path.basename(packageDirectoryPath);
  const out = path.join(__dirname, "docs", packageName);

  // We want one entry point for each export source file, which will correspond to one Markdown file
  // for each source file.
  const indexTSPath = path.join(packageDirectoryPath, "src", "index.ts");
  const typeScriptFileExports = getTypeScriptFileExports(indexTSPath);
  const exportsWithSrcPrefix = typeScriptFileExports.map((entryPoint) =>
    entryPoint.replaceAll("./", "./src/"),
  );
  const entryPoints = exportsWithSrcPrefix.map(
    (entryPoint) => `${entryPoint}.ts`,
  );

  return {
    ...baseConfig,
    out,
    entryPoints,
  };
}
exports.getTypeDocConfig = getTypeDocConfig;

/** @param {string} typeScriptFilePath The path to the ".ts" file. */
function getTypeScriptFileExports(typeScriptFilePath) {
  const typeScriptFile = fs.readFileSync(typeScriptFilePath, "utf8");
  const lines = typeScriptFile.split("\n");
  const exportLines = lines.filter((line) => line.startsWith("export"));
  return exportLines.map((line) => {
    // eslint-disable-next-line prefer-named-capture-group
    const match = line.match(/"(.+)"/);
    if (match === null) {
      throw new Error(`Failed to parse line: ${line}`);
    }
    return match[1];
  });
}
