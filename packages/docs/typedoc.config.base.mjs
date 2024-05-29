import fs from "node:fs";
import path from "node:path";

const config = {
  sort: ["source-order"],
  tsconfig: "tsconfig.json",
  readme: "website-root.md",
  treatWarningsAsErrors: true,
  validation: {
    notExported: true,
    invalidLink: true,
    notDocumented: false, // Not every enum member has a JSDoc comment.
  },
  excludePrivate: true,
  plugin: [
    "typedoc-plugin-markdown",
    "typedoc-plugin-rename",
    "@zamiell/typedoc-plugin-not-exported",
  ],
  githubPages: false,

  // "typedoc-plugin-markdown" settings
  hideBreadcrumbs: true,
  hideInPageTOC: true,
};

/**
 * @param {string} packageDirectoryPath The path to the package directory.
 */
export function getTypeDocConfig(packageDirectoryPath) {
  const packageName = path.basename(packageDirectoryPath);
  const out = path.join(import.meta.dirname, "docs", packageName);

  // We want one entry point for each export source file, which will correspond to one Markdown file
  // for each source file.
  const indexTSPath = path.join(packageDirectoryPath, "src", "index.ts");
  const typeScriptFileExports = getTypeScriptFileExports(indexTSPath);
  const exportsWithSrcPrefix = typeScriptFileExports.map((entryPoint) =>
    entryPoint.replace(/\.\//g, "./src/"),
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
