import fs from "node:fs";
import path from "node:path";
import { OptionDefaults } from "typedoc";

/** @type {Partial<import('typedoc').TypeDocOptions>} */
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

  blockTags: [
    ...OptionDefaults.blockTags,
    "@allowEmptyVariadic",
    "@maximum",
    "@minimum",
  ],
};

const configTypeDocPluginMarkdown = {
  /// hideBreadcrumbs: true,
};

/**
 * @param {string} packageDirectoryPath The path to the package directory.
 * @returns {Partial<import('typedoc').TypeDocOptions>} The generated config.
 */
export function getTypeDocConfig(packageDirectoryPath) {
  const packageName = path.basename(packageDirectoryPath);
  const out = path.join(import.meta.dirname, "docs", packageName);

  // We want one entry point for each export source file, which will correspond to one Markdown file
  // for each source file.
  const indexTSPath = path.join(packageDirectoryPath, "src", "index.ts");
  const typeScriptFileExports = getIndexTSExports(indexTSPath);
  const exportsWithSrcPrefix = typeScriptFileExports.map((entryPoint) =>
    entryPoint.replaceAll("./", "./src/"),
  );
  const entryPoints = exportsWithSrcPrefix.map(
    (entryPoint) => `${entryPoint}.ts`,
  );

  return {
    ...config,
    ...configTypeDocPluginMarkdown,
    out,
    entryPoints,
  };
}

/**
 * By default, TypeDoc will create a page for each individual function (even if the
 * "entryPointStrategy" is set to "expand"). Instead, we want to create a page per function
 * category.
 *
 * This function parses the "index.ts" file to find all of the individual pages.
 *
 * @param {string} typeScriptFilePath The path to the ".ts" file.
 * @returns {readonly string[]} An array of exported file paths.
 */
function getIndexTSExports(typeScriptFilePath) {
  const typeScriptFile = fs.readFileSync(typeScriptFilePath, "utf8");
  const lines = typeScriptFile.split("\n");
  const exportLines = lines.filter((line) => line.startsWith("export"));
  return exportLines.map((line) => {
    const match = line.match(/export (?:type )?\* from "(.+)";/);
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
