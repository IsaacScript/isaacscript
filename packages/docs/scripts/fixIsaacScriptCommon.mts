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
// `typedoc-plugin-markdown`; see "typedoc.js".

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

import {
  ReadonlyMap,
  assertDefined,
  capitalizeFirstLetter,
  trimSuffix,
} from "complete-common";
import {
  deleteFileOrDirectory,
  echo,
  isMain,
  makeDirectory,
  readFile,
  renameFileOrDirectory,
  writeFile,
} from "complete-node";
import { globSync } from "glob";
import fs from "node:fs";
import path from "node:path";

const DEBUG = false as boolean;
const PACKAGE_NAME = "isaacscript-common";
const PACKAGE_ROOT = path.resolve(import.meta.dirname, "..");
const MARKDOWN_DOCS_DIR = path.join(PACKAGE_ROOT, "docs");
const PACKAGE_DOCS_DIR = path.join(MARKDOWN_DOCS_DIR, PACKAGE_NAME);
const MODULES_DIR = path.join(PACKAGE_DOCS_DIR, "modules");
const MODULES_MD_PATH = path.join(PACKAGE_DOCS_DIR, "modules.md");
const OTHER_DIR = path.join(PACKAGE_DOCS_DIR, "other");
const FEATURES_DIR = path.join(PACKAGE_DOCS_DIR, "features");
const CATEGORY_FILE_NAME = "_category_.yml";

/** We hard-code the label for some specific directories. */
const DIRECTORY_NAME_TO_LABEL = new ReadonlyMap([
  ["callbacks", "Extra Callbacks"],
  ["features", "Extra Features"],
  ["functions", "Helper Functions by Category"],
  ["other", "Other Miscellaneous Exports"],
]);

/** We hard-code the title for some specific files. */
const FILE_NAME_TO_TITLE = new ReadonlyMap([
  // Core
  ["constants", "Constants (Miscellaneous)"],
  ["constantsFirstLast", "Constants (First & Last)"],
  ["constantsVanilla", "Constants (Vanilla Collections)"],
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

const SIDEBAR_POSITIONS = new ReadonlyMap([
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
const DIR_NAMES_WITH_SECOND_BREADCRUMBS_LINE: ReadonlySet<string> = new Set([
  "classes",
  "enums",
  "interfaces",
]);

const BROKEN_LINK_DIR_NAMES = [
  ...DIR_NAMES_WITH_SECOND_BREADCRUMBS_LINE,
  "types",
] as const;

if (isMain(import.meta.filename)) {
  await main();
}

async function main() {
  await createCallbackFile();
  await moveModulesFiles();
  await deleteFileOrDirectory(MODULES_MD_PATH);
  await makeDirectory(OTHER_DIR);
  await makeDirectory(FEATURES_DIR);
  await addCategoryFilesAndMarkdownHeaders();
  await moveDirsToOther();
  await renameSpecialPages();
  await deleteDuplicatedPages();
  await renameDuplicatedPages();
  await fixLinks();
}

/**
 * Custom callbacks are documented on the `ModCallbackCustom` enum, but we want custom callbacks to
 * be part of the root navigation layout. Thus, we create a new Markdown file from scratch to
 * represent this.
 */
async function createCallbackFile() {
  const filePath = path.join(PACKAGE_DOCS_DIR, "extra-callbacks.md");
  const fileContent = `
---
sidebar_label: Extra Callbacks
sidebar_position: 3
custom_edit_url: null
---

# Extra Callbacks

See the [ModCallbackCustom](/isaacscript-common/other/enums/ModCallbackCustom) enum.
  `
    .trim()
    .concat("\n");
  await writeFile(filePath, fileContent);
}

/** Move the files in the "modules" directory to proper directories. */
async function moveModulesFiles() {
  const markdownFileNames = getMarkdownFileNames(MODULES_DIR);
  for (const markdownFileName of markdownFileNames) {
    const markdownFilePath = path.join(MODULES_DIR, markdownFileName);

    const match = markdownFileName.match(
      /^(?<directoryName>.+?)_(?<newFileName>.+.md)$/,
    );
    if (match === null || match.groups === undefined) {
      throw new Error(
        `The file of "${markdownFileName}" has no underscore, which is probably because it is a renamed module via the "@module" JSDoc tag. Currently, we do not rename any modules in this package, so this is likely an error.`,
      );
    } else {
      const { directoryName } = match.groups;
      assertDefined(
        directoryName,
        `Failed to parse the directory from the file name: ${markdownFileName}`,
      );

      const { newFileName } = match.groups;
      assertDefined(
        newFileName,
        `Failed to parse the suffix from the file name: ${markdownFileName}`,
      );

      const dstDirectory = path.join(PACKAGE_DOCS_DIR, directoryName);
      // eslint-disable-next-line no-await-in-loop
      await makeDirectory(dstDirectory);
      const dstPath = path.join(dstDirectory, newFileName);
      // eslint-disable-next-line no-await-in-loop
      await renameFileOrDirectory(markdownFilePath, dstPath);

      if (DEBUG) {
        echo(`Moved:\n  ${markdownFilePath}\n  -->\n  ${dstPath}`);
      }
    }
  }

  const remainingFiles = getFileNames(MODULES_DIR);
  if (remainingFiles.length > 0) {
    throw new Error(
      `Failed to move one or more files in the "modules" directory: ${MODULES_DIR}`,
    );
  }

  await deleteFileOrDirectory(MODULES_DIR);
}

async function addCategoryFilesAndMarkdownHeaders() {
  const directories = getDirectoryNames(PACKAGE_DOCS_DIR);
  for (const directoryName of directories) {
    const directoryPath = path.join(PACKAGE_DOCS_DIR, directoryName);

    // eslint-disable-next-line no-await-in-loop
    await addCategoryFile(directoryPath);
    const subDirectories = getDirectoryNames(directoryPath);
    for (const subDirectoryName of subDirectories) {
      const subDirectoryPath = path.join(directoryPath, subDirectoryName);
      // eslint-disable-next-line no-await-in-loop
      await addCategoryFile(subDirectoryPath);
    }

    const markdownFileNames = getMarkdownFileNames(directoryPath);
    for (const markdownFileName of markdownFileNames) {
      const markdownFilePath = path.join(directoryPath, markdownFileName);
      // eslint-disable-next-line no-await-in-loop
      await addMarkdownHeader(markdownFilePath, directoryName);
    }
  }
}

/** Move some specific directories to an "other" directory for better top-level organization. */
async function moveDirsToOther() {
  for (const otherDirName of OTHER_DIR_NAMES) {
    const srcPath = path.join(PACKAGE_DOCS_DIR, otherDirName);
    const dstPath = path.join(OTHER_DIR, otherDirName);
    // eslint-disable-next-line no-await-in-loop
    await renameFileOrDirectory(srcPath, dstPath);
  }
}

async function addCategoryFile(directoryPath: string) {
  const directoryName = path.basename(directoryPath);
  const categoryFilePath = path.join(directoryPath, CATEGORY_FILE_NAME);

  const customLabel = DIRECTORY_NAME_TO_LABEL.get(directoryName);
  const capitalizedDirectoryName = capitalizeFirstLetter(directoryName);
  const label = customLabel ?? capitalizedDirectoryName;
  let fileContents = `label: ${label}\n`;
  const position = SIDEBAR_POSITIONS.get(label);
  if (position !== undefined) {
    fileContents += `position: ${position}\n`;
  }
  await writeFile(categoryFilePath, fileContents);
}

async function addMarkdownHeader(filePath: string, directoryName: string) {
  const title = getTitle(filePath, directoryName);
  const header = `
---
custom_edit_url: null
---

# ${title}

`.trimStart();

  let fileContents = await readFile(filePath);

  // Remove the title generated by `typedoc-plugin-markdown`, which will be on the first line.
  const lines = fileContents.trim().split("\n");
  lines.shift();
  lines.shift(); // This is a blank line.

  // Certain types of pages also need to have breadcrumbs removed.
  if (DIR_NAMES_WITH_SECOND_BREADCRUMBS_LINE.has(directoryName)) {
    // Remove the first line, which is a breadcrumbs link that is not needed in this context.
    // e.g. "[classes/DefaultMap](../modules/classes_DefaultMap.md).DefaultMap"
    lines.shift();
    lines.shift(); // This is a blank line.
  }

  fileContents = lines.join("\n");

  const newFileContents = header + fileContents;
  await writeFile(filePath, newFileContents);
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
  if (DIR_NAMES_WITH_SECOND_BREADCRUMBS_LINE.has(directoryName)) {
    const match = fileName.match(/(?<properName>\w+)\.md/);
    if (match === null || match.groups === undefined) {
      throw new Error(
        `Failed to parse the proper name from the file name: ${fileName}`,
      );
    }

    const { properName } = match.groups;
    assertDefined(
      properName,
      `Failed to parse the proper name from the match: ${fileName}`,
    );

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

/**
 * Some pages are erroneously deleted by the `deleteDuplicatedPages`, so we must handle them
 * manually.
 */
async function renameSpecialPages() {
  const oldPath = path.join(
    OTHER_DIR,
    "classes",
    "features_other_extraConsoleCommands_commands.md",
  );
  const newPath = path.join(FEATURES_DIR, "ExtraConsoleCommandsList.md");
  await renameFileOrDirectory(oldPath, newPath);

  const contents = await readFile(newPath);
  const newContents = contents.replace(
    "# features_other_extraConsoleCommands_commands",
    "# Extra Console Commands (List)",
  );
  await writeFile(newPath, newContents);
}

async function deleteDuplicatedPages() {
  for (const directoryName of DIR_NAMES_WITH_SECOND_BREADCRUMBS_LINE) {
    const directoryPath = path.join(OTHER_DIR, directoryName);
    const fileNames = getFileNames(directoryPath);

    for (const fileName of fileNames) {
      if (fileName === CATEGORY_FILE_NAME) {
        continue;
      }

      if (!isValidDuplicate(fileName, directoryName)) {
        const filePath = path.join(directoryPath, fileName);
        // eslint-disable-next-line no-await-in-loop
        await deleteFileOrDirectory(filePath);

        if (DEBUG) {
          echo(`Deleted duplicate page:\n  ${filePath}`);
        }
      }
    }
  }
}

async function renameDuplicatedPages() {
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

      const match = fileName.match(/\.(?<properName>\w+\.md)/);
      if (match === null || match.groups === undefined) {
        throw new Error(`Failed to parse the file name: ${fileName}`);
      }

      const { properName } = match.groups;
      assertDefined(
        properName,
        `Failed to parse the file name match: ${fileName}`,
      );

      const filePath = path.join(directoryPath, fileName);
      let properPath = path.join(directoryPath, properName);

      // Handle the special case of feature classes, which should go in the "features" directory.
      // First, handle the special case of feature classes, which should go to the "features"
      // directory instead of the "classes" directory.
      if (fileName.includes("_features_")) {
        properPath = path.join(FEATURES_DIR, properName);
      }

      // eslint-disable-next-line no-await-in-loop
      await renameFileOrDirectory(filePath, properPath);

      if (DEBUG) {
        echo(`Renamed:\n  ${filePath}\n  -->\n  ${properPath}`);
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
async function fixLinks() {
  const markdownFilePaths = globSync("**/*.md", { cwd: PACKAGE_DOCS_DIR });

  for (const filePath of markdownFilePaths) {
    const fullFilePath = path.join(PACKAGE_DOCS_DIR, filePath);
    // eslint-disable-next-line no-await-in-loop
    const fileContents = await readFile(fullFilePath);
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

    for (const rootDirName of ROOT_DIR_NAMES) {
      // cspell:ignore conversionheartsubtype
      // e.g. "(features_characterHealthConversion.md#conversionheartsubtype)" -->
      // "(characterHealthConversion.md#conversionheartsubtype)"
      const brokenLink = `(${rootDirName}_`;
      const fixedLink = "(";
      newFileContents = newFileContents.replaceAll(brokenLink, fixedLink);
    }

    const numDirectoriesAwayFromRoot =
      getNumDirectoriesAwayFromRoot(fullFilePath);
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
      // eslint-disable-next-line no-await-in-loop
      await writeFile(fullFilePath, newFileContents);
    }
  }
}

// ----------------
// Helper functions
// ----------------

function getFileNames(directoryPath: string): readonly string[] {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .map((dirent) => dirent.name);
}

function getDirectoryNames(directoryPath: string): readonly string[] {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function getMarkdownFileNames(directoryPath: string): readonly string[] {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name);
}

function getNumDirectoriesAwayFromRoot(filePath: string, num = 0): number {
  const directoryPath = path.dirname(filePath);
  if (
    directoryPath === "."
    || directoryPath === "/"
    || directoryPath.endsWith(PACKAGE_NAME)
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
      .replaceAll(/([A-Z]+)([A-Z][a-z])/g, " $1 $2")
      // Look for lower-case letters followed by upper-case letters.
      .replaceAll(/([\da-z])([A-Z])/g, "$1 $2")
      // Look for lower-case letters followed by numbers.
      .replaceAll(/([A-Za-z])(\d)/g, "$1 $2")
      .replace(/^./, (s) => s.toUpperCase())
      // Remove any white space left around the word.
      .trim()
  );
}
