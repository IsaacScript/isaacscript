import fs from "node:fs";
import path from "node:path";
import { OptionDefaults } from "typedoc";

const TYPE_DOC_FRONTMATTER_PLUGIN_PATH = path.join(
  import.meta.dirname,
  "src",
  "plugins",
  "typedoc-frontmatter.mjs",
);

export function getTypeDocConfig(packageDirectoryPath) {
  return {
    blockTags: [
      ...OptionDefaults.blockTags,
      "@allowEmptyVariadic",
      "@maximum",
      "@minimum",
      "@rename",
    ],
    entryFileName: "index",
    entryPoints: getEntryPoints(packageDirectoryPath),
    githubPages: false,
    out: path.join(
      import.meta.dirname,
      "src",
      "content",
      "docs",
      path.basename(packageDirectoryPath),
    ),
    plugin: [
      "@zamiell/typedoc-plugin-not-exported",
      import.meta.resolve("typedoc-plugin-frontmatter"),
      TYPE_DOC_FRONTMATTER_PLUGIN_PATH,
      path.join(import.meta.dirname, "src", "plugins", "typedoc-rename.mjs"),
      "typedoc-plugin-markdown",
    ],
    readme: path.join(packageDirectoryPath, "website-root.md"),
    router: "module",
    sort: ["source-order"],
    treatWarningsAsErrors: true,
    tsconfig: path.join(packageDirectoryPath, "tsconfig.json"),
  };
}

/**
 * @param {string} packageDirectoryPath
 * @returns {readonly string[]}
 */
function getEntryPoints(packageDirectoryPath) {
  const indexPath = path.join(packageDirectoryPath, "src", "index.ts");
  const source = fs.readFileSync(indexPath, "utf8");
  const exportPaths = source
    .split("\n")
    .filter((line) => line.startsWith("export"))
    .map((line) => {
      const match = /export (?:type )?\* from "(?<path>[^"]+)";/v.exec(line);
      if (match?.groups?.["path"] === undefined) {
        throw new Error(`Failed to parse export line: ${line}`);
      }

      return match.groups["path"];
    });

  return exportPaths.map((exportPath) =>
    path.join(packageDirectoryPath, `${exportPath.replace("./", "src/")}.ts`),
  );
}
