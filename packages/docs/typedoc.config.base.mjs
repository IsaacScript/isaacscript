import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** @type {import('typedoc').TypeDocOptions} */
const config = {
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
};

/**
 * @param {string} packageDirectoryPath The path to the package directory.
 * @returns {import('typedoc').TypeDocOptions} A TypeDoc configuration object.
 */
export function getTypeDocConfig(packageDirectoryPath) {
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
    ...config,
    out,
    entryPoints,
  };
}

/**
 * @param {string} typeScriptFilePath The path to the ".ts" file.
 * @returns {readonly string[]} An array of exported file paths.
 */
function getTypeScriptFileExports(typeScriptFilePath) {
  const typeScriptFile = fs.readFileSync(typeScriptFilePath, "utf8");
  const lines = typeScriptFile.split("\n");
  const exportLines = lines.filter((line) => line.startsWith("export"));
  return exportLines.map((line) => {
    const match = line.match(/"(.+)"/);
    if (match === null) {
      throw new Error(`Failed to parse line: ${line}`);
    }

    const insideQuotes = match[1];
    if (insideQuotes === undefined) {
      throw new Error(`Failed to parse inside the quotes: ${line}`);
    }

    return insideQuotes;
  });
}
