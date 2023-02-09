// Like many open source projects, we use Docusaurus to generate a really nice looking webpage that
// contains hand-written documentation. Additionally, we want to leverage TypeDoc for automatic API
// documentation generation. However, TypeDoc generates a webpage that looks entirely different from
// how the Docusaurus site looks. (And it looks much worse.) In order to get the best end-user
// experience, we want to combine the manually-written documentation together with the
// auto-generated documentation so that everything is in one place.

// The normal way to accomplish this is to use `docusaurus-plugin-typedoc`. Since it is a Docusaurus
// plugin, it invokes TypeDoc for you under the hood, and converts the normal TypeDoc website into
// Markdown using `typedoc-plugin-markdown`. This helpfully abstracts some of the complexity away.

// Unfortunately, by default, the resulting webpage from `docusaurus-plugin-typedoc` is
// unsatisfactory, with all of the modules in the same directory, and other imperfections.

// To work around this problem, we can invoke TypeDoc ourselves using `typedoc-plugin-markdown`.
// Then, we can use a script to manually mutate the Markdown files in specific ways. (This is the
// point of the following script.) After that, we feed the "fixed" Markdown content to Docusaurus,
// alongside the non-auto-generated documentation, generating the entire site at once.

// One disadvantage of this method is that since we are manually moving the paths, all of the links
// will break. Thus, we must also manually adjust all of the links.

// In order for this script to work correctly, several options must be used to configure TypeDoc and
// `typedoc-plugin-markdown`; see "typedoc.json".

/*

Example of frontmatter from `docusaurus-plugin-typedoc`:

---
id: "index"
title: "isaacscript-common"
sidebar_label: "Readme"
sidebar_position: 0
custom_edit_url: null
---

*/

import glob from "glob";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  capitalizeFirstLetter,
  deleteFileOrDirectory,
  error,
  makeDir,
  readFile,
  renameFile,
  trimSuffix,
  writeFile,
  __dirname,
} from "./utils.mjs";

const DEBUG = false as boolean;
const PACKAGE_NAME = "isaacscript-common";
const REPO_ROOT = path.join(__dirname, "..");
const MARKDOWN_DOCS_DIR = path.join(REPO_ROOT, "packages", "docs", "docs");
const PACKAGE_DOCS_DIR = path.join(MARKDOWN_DOCS_DIR, PACKAGE_NAME);
const MODULES_DIR = path.join(PACKAGE_DOCS_DIR, "modules");
const MODULES_MD_PATH = path.join(PACKAGE_DOCS_DIR, "modules.md");
const OTHER_DIR = path.join(PACKAGE_DOCS_DIR, "other");
const FEATURES_DIR = path.join(PACKAGE_DOCS_DIR, "features");
const CATEGORY_FILE_NAME = "_category_.yml";

/** We hard-code the label for some specific directories. */
const DIRECTORY_NAME_TO_LABEL: ReadonlyMap<string, string> = new Map([
  ["callbacks", "Extra Callbacks"],
  ["features", "Extra Features"],
  ["functions", "Helper Functions by Category"],
  ["other", "Other Miscellaneous Exports"],
]);

/** We hard-code the title for some specific files. */
const FILE_NAME_TO_TITLE: ReadonlyMap<string, string> = new Map([
  // Core
  ["constants", "Constants (Miscellaneous)"],
  ["constantsFirstLast", "Constants (First & Last)"],
  ["upgradeMod", "Upgrading Your Mod"],

  // Functions
  ["arrayLua", "Array (in Lua)"],
  ["bitSet128", "BitSet128"],
  ["kColor", "KColor"],
  ["jsonHelpers", "JSON"],
  ["jsonRoom", "JSON Room"],
  ["npcs", "NPCs"],
  ["rng", "RNG"],
  ["tstlClass", "TSTL Class"],
  ["ui", "UI"],

  // Objects
  ["colors", "COLORS"],
  ["kColors", "K_COLORS"],
]);

const SIDEBAR_POSITIONS: ReadonlyMap<string, number> = new Map([
  // "Introduction" is hard coded as position 0 in "website-root.md".
  ["Core", 1],
  ["Helper Functions by Category", 2],
  ["Extra Callbacks", 3],
  ["Extra Features", 4],
  ["Other Miscellaneous Exports", 5],
]);

const ROOT_DIR_NAMES = ["features", "functions"] as const;

const OTHER_DIR_NAMES = [
  "classes",
  "enums",
  "interfaces",
  "maps",
  "objects",
  "types",
] as const;

/**
 * `typedoc-plugin-markdown` will not remove the second breadcrumbs line from some files for some
 * reason.
 */
const DIR_NAMES_WITH_SECOND_BREADCRUMBS_LINE: readonly string[] = [
  "classes",
  "enums",
  "interfaces",
] as const;

const BROKEN_LINK_DIR_NAMES = [
  ...DIR_NAMES_WITH_SECOND_BREADCRUMBS_LINE,
  "types",
] as const;

main();

function main() {
  createCallbackFile();
  moveModulesFiles();
  deleteFileOrDirectory(MODULES_MD_PATH);
  makeDir(OTHER_DIR);
  makeDir(FEATURES_DIR);
  addCategoryFilesAndMarkdownHeaders();
  moveDirsToOther();
  deleteDuplicatedPages();
  renameDuplicatedPages();
  fixLinks();
}

/**
 * Custom callbacks are documented on the `ModCallbackCustom` enum, but we want custom callbacks to
 * be part of the root navigation layout. Thus, we create a new Markdown file from scratch to
 * represent this.
 */
function createCallbackFile() {
  const filePath = path.join(PACKAGE_DOCS_DIR, "extra-callbacks.md");
  const fileContent = `
---
sidebar_label: Extra Callbacks
sidebar_position: 3
custom_edit_url: null
---

# Extra Callbacks

See the [ModCallbackCustom](other/enums/ModCallbackCustom) enum.
  `
    .trim()
    .concat("\n");
  writeFile(filePath, fileContent);
}

/** Move the files in the "modules" directory to proper directories. */
function moveModulesFiles() {
  const markdownFileNames = getMarkdownFileNames(MODULES_DIR);
  for (const markdownFileName of markdownFileNames) {
    const markdownFilePath = path.join(MODULES_DIR, markdownFileName);

    const match = markdownFileName.match(/^(.+?)_(.+.md)$/);
    if (match === null) {
      error(
        `The file of "${markdownFileName}" has no underscore, which is probably because it is a renamed module via the "@module" JSDoc tag. Currently, we do not rename any modules in this package, so this is likely an error.`,
      );
    } else {
      const directoryName = match[1];
      if (directoryName === undefined) {
        error(
          `Failed to parse the directory from the file name: ${markdownFileName}`,
        );
      }

      const newFileName = match[2];
      if (newFileName === undefined) {
        error(
          `Failed to parse the suffix from the file name: ${markdownFileName}`,
        );
      }

      const dstDirectory = path.join(PACKAGE_DOCS_DIR, directoryName);
      makeDir(dstDirectory);
      const dstPath = path.join(dstDirectory, newFileName);
      renameFile(markdownFilePath, dstPath);

      if (DEBUG) {
        console.log(`Moved:\n  ${markdownFilePath}\n  -->\n  ${dstPath}`);
      }
    }
  }

  const remainingFiles = getFileNames(MODULES_DIR);
  if (remainingFiles.length > 0) {
    error(
      `Failed to move one or more files in the "modules" directory: ${MODULES_DIR}`,
    );
  }

  deleteFileOrDirectory(MODULES_DIR);
}

function addCategoryFilesAndMarkdownHeaders() {
  const directories = getDirectoryNames(PACKAGE_DOCS_DIR);
  for (const directoryName of directories) {
    const directoryPath = path.join(PACKAGE_DOCS_DIR, directoryName);

    addCategoryFile(directoryPath);
    const subDirectories = getDirectoryNames(directoryPath);
    for (const subDirectoryName of subDirectories) {
      const subDirectoryPath = path.join(directoryPath, subDirectoryName);
      addCategoryFile(subDirectoryPath);
    }

    const markdownFileNames = getMarkdownFileNames(directoryPath);
    for (const markdownFileName of markdownFileNames) {
      const markdownFilePath = path.join(directoryPath, markdownFileName);
      addMarkdownHeader(markdownFilePath, directoryName);
    }
  }
}

/** Move some specific directories to an "other" directory for better top-level organization. */
function moveDirsToOther() {
  for (const dirName of OTHER_DIR_NAMES) {
    const srcPath = path.join(PACKAGE_DOCS_DIR, dirName);
    const dstPath = path.join(OTHER_DIR, dirName);
    renameFile(srcPath, dstPath);
  }
}

function addCategoryFile(directoryPath: string) {
  const directoryName = path.basename(directoryPath);
  const categoryFilePath = path.join(directoryPath, CATEGORY_FILE_NAME);

  const customLabel = DIRECTORY_NAME_TO_LABEL.get(directoryName);
  const capitalizedDirectoryName = capitalizeFirstLetter(directoryName);
  const label =
    customLabel === undefined ? capitalizedDirectoryName : customLabel;
  let fileContents = `label: ${label}\n`;
  const position = SIDEBAR_POSITIONS.get(label);
  if (position !== undefined) {
    fileContents += `position: ${position}\n`;
  }
  writeFile(categoryFilePath, fileContents);
}

function addMarkdownHeader(filePath: string, directoryName: string) {
  const title = getTitle(filePath, directoryName);
  const header = `
---
custom_edit_url: null
---

# ${title}
  `
    .trim()
    .concat("\n\n");

  let fileContents = readFile(filePath);

  // Remove the title generated by `typedoc-plugin-markdown`, which will be on the first line.
  const lines = fileContents.trim().split("\n");
  lines.shift();
  lines.shift(); // This is a blank line.

  // Certain types of pages also need to have breadcrumbs removed.
  if (DIR_NAMES_WITH_SECOND_BREADCRUMBS_LINE.includes(directoryName)) {
    // Remove the first line, which is a breadcrumbs link that is not needed in this context.
    // e.g. "[classes/DefaultMap](../modules/classes_DefaultMap.md).DefaultMap"
    lines.shift();
    lines.shift(); // This is a blank line.
  }

  fileContents = lines.join("\n");

  const newFileContents = header + fileContents;
  writeFile(filePath, newFileContents);
}

function getTitle(filePath: string, directoryName: string) {
  const fileName = path.basename(filePath);

  // First, handle the special case of a hard-coded title.
  const pageName = trimSuffix(fileName, ".md");
  const customTitle = FILE_NAME_TO_TITLE.get(pageName);
  if (customTitle !== undefined) {
    return customTitle;
  }

  // Second, handle the special case of a page with a unnecessary suffix, like "classes_".
  if (DIR_NAMES_WITH_SECOND_BREADCRUMBS_LINE.includes(directoryName)) {
    const properNameMatch = fileName.match(/(\w+)\.md/);
    if (properNameMatch === null) {
      error(`Failed to parse the proper name from the file name: ${fileName}`);
    }

    const properName = properNameMatch[1];
    if (properName === undefined) {
      error(`Failed to parse the proper name from the match: ${fileName}`);
    }

    return fileName.includes("_features_")
      ? pascalCaseToTitleCase(properName)
      : properName;
  }

  // Third, file names should be title-cased in certain directories.
  if (directoryName === "core" || directoryName === "functions") {
    return pascalCaseToTitleCase(pageName);
  }

  // Base case: use the file name without the ".md" suffix.
  return pageName;
}

function deleteDuplicatedPages() {
  for (const directoryName of DIR_NAMES_WITH_SECOND_BREADCRUMBS_LINE) {
    const directoryPath = path.join(OTHER_DIR, directoryName);
    const fileNames = getFileNames(directoryPath);

    for (const fileName of fileNames) {
      if (fileName === CATEGORY_FILE_NAME) {
        continue;
      }

      if (!isValidDuplicate(fileName, directoryName)) {
        const filePath = path.join(directoryPath, fileName);
        deleteFileOrDirectory(filePath);

        if (DEBUG) {
          console.log(`Deleted duplicate page:\n  ${filePath}`);
        }
      }
    }
  }
}

function renameDuplicatedPages() {
  for (const directoryName of DIR_NAMES_WITH_SECOND_BREADCRUMBS_LINE) {
    const directoryPath = path.join(OTHER_DIR, directoryName);
    const fileNames = getFileNames(directoryPath);

    for (const fileName of fileNames) {
      if (fileName === CATEGORY_FILE_NAME) {
        continue;
      }

      if (!isValidDuplicate(fileName, directoryName)) {
        continue;
      }

      const properNameMatch = fileName.match(/\.(\w+\.md)/);
      if (properNameMatch === null) {
        error(`Failed to parse the file name: ${fileName}`);
      }

      const properName = properNameMatch[1];
      if (properName === undefined) {
        error(`Failed to parse the file name match: ${fileName}`);
      }

      const filePath = path.join(directoryPath, fileName);
      let properPath = path.join(directoryPath, properName);

      // Handle the special case of feature classes, which should go in the "features" directory.
      // First, handle the special case of feature classes, which should go to the "features"
      // directory instead of the "classes" directory.
      if (fileName.includes("_features_")) {
        properPath = path.join(FEATURES_DIR, properName);
      }

      renameFile(filePath, properPath);

      if (DEBUG) {
        console.log(`Renamed:\n  ${filePath}\n  -->\n  ${properPath}`);
      }
    }
  }
}

function isValidDuplicate(fileName: string, directoryName: string) {
  const validPrefix = `${directoryName}_`;

  // Some types go to the interfaces directory, so whitelist all types.
  return fileName.startsWith(validPrefix) || fileName.startsWith("types_");
}

/** Because we manually moved files around, internal links generated by TypeDoc will break. */
function fixLinks() {
  process.chdir(PACKAGE_DOCS_DIR);
  const markdownFilePaths = glob.sync("**/*.md");

  for (const filePath of markdownFilePaths) {
    const fileContents = readFile(filePath);
    let newFileContents = fileContents;

    // Start by removing any links with a "modules" prefix, since they are moved to the root.
    newFileContents = newFileContents.replaceAll("modules/", "");

    // Fix links with a duplicated file name.
    // e.g. "ModUpgraded.ModUpgraded.md"
    const linkFileNames = newFileContents.match(/\w+\.md/gm);
    if (linkFileNames !== null) {
      for (const linkFileName of linkFileNames) {
        const fileNameWithoutExtension = linkFileName.replace(/\.md$/, "");
        newFileContents = newFileContents.replaceAll(
          `${fileNameWithoutExtension}.${fileNameWithoutExtension}.md`,
          `${fileNameWithoutExtension}.md`,
        );

        // Also handle the case of some specific interfaces being put into the same file.
        for (const specialCombinedFileName of [
          "JSONRoomsFile",
          "CustomStageTSConfig",
        ]) {
          newFileContents = newFileContents.replaceAll(
            `${specialCombinedFileName}.${fileNameWithoutExtension}.md`,
            `${fileNameWithoutExtension}.md`,
          );
        }
      }
    }

    for (const dirName of ROOT_DIR_NAMES) {
      // cspell:ignore conversionheartsubtype
      // e.g. "(features_characterHealthConversion.md#conversionheartsubtype)" -->
      // "(characterHealthConversion.md#conversionheartsubtype)"
      const brokenLink = `(${dirName}_`;
      const fixedLink = "(";
      newFileContents = newFileContents.replaceAll(brokenLink, fixedLink);
    }

    const numDirectoriesAwayFromRoot = getNumDirectoriesAwayFromRoot(filePath);
    const linkPrefix = "../".repeat(numDirectoriesAwayFromRoot);

    for (const brokenLinkDirName of BROKEN_LINK_DIR_NAMES) {
      // Fix links with a duplicated directory.
      // e.g. "classes/classes" --> "classes"
      newFileContents = newFileContents.replaceAll(
        `${brokenLinkDirName}/${brokenLinkDirName}`,
        brokenLinkDirName,
      );

      // Fix the path to links in the "other" directory.
      // e.g. "(../classes_ModUpgraded.md)" --> "(../classes/ModUpgraded.md)"
      const brokenLink = new RegExp(`\\(\\.*/*${brokenLinkDirName}_`, "gm");
      const fixedLink = `(${linkPrefix}other/${brokenLinkDirName}/`;
      newFileContents = newFileContents.replaceAll(brokenLink, fixedLink);
    }

    // Finally, fix links with a "types_" prefix.
    // e.g. "(../interfaces/types_PickingUpItem.PickingUpItemNull.md)" -->
    // "(../interfaces/PickingUpItemNull.md)"
    newFileContents = newFileContents.replaceAll(/types_\w+\./gm, "");

    if (fileContents !== newFileContents) {
      writeFile(filePath, newFileContents);
    }
  }
}

// ----------------
// Helper functions
// ----------------

function getFileNames(directoryPath: string) {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .map((dirent) => dirent.name);
}

function getDirectoryNames(directoryPath: string) {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function getMarkdownFileNames(directoryPath: string) {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name);
}

function getNumDirectoriesAwayFromRoot(filePath: string, num = 0): number {
  const directoryPath = path.dirname(filePath);
  if (
    directoryPath === "." ||
    directoryPath === "/" ||
    directoryPath.endsWith(PACKAGE_NAME)
  ) {
    return num;
  }

  const newNum = num + 1;
  return getNumDirectoriesAwayFromRoot(directoryPath, newNum);
}

// From: https://stackoverflow.com/questions/26188882/split-pascal-case-in-javascript-certain-case
function pascalCaseToTitleCase(string: string) {
  return (
    string
      // Look for long acronyms and filter out the last letter.
      .replace(/([A-Z]+)([A-Z][a-z])/g, " $1 $2")
      // Look for lower-case letters followed by upper-case letters.
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      // Look for lower-case letters followed by numbers.
      .replace(/([a-zA-Z])(\d)/g, "$1 $2")
      .replace(/^./, (s) => s.toUpperCase())
      // Remove any white space left around the word.
      .trim()
  );
}
