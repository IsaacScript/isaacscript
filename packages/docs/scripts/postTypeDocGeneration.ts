/* eslint-disable @nrwl/nx/enforce-module-boundaries,import/no-relative-packages */

// We use TypeDoc to generate documentation from the source code and we use the
// `typedoc-plugin-markdown` plugin to output it as Markdown instead of HTML.

// However, TypeDoc will output the content in an unsatisfactory way, with all of the modules in the
// same directory, and other imperfections. Thus, we manually reorganize the Markdown output.

// One disadvantage of this method is that since we are manually moving the paths, all of the links
// will break, so we must also manually adjust all of the links.

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

import { readdirSync } from "fs";
import path from "path";
import * as file from "../../isaacscript-cli/src/file";
import { error } from "../../isaacscript-cli/src/utils";
import {
  capitalizeFirstLetter,
  trimSuffix,
} from "../../isaacscript-common/src/functions/string";

const COMMON_DIR = path.join(__dirname, "..", "docs", "isaacscript-common");
const MODULES_DIR = path.join(COMMON_DIR, "modules");
const MODULES_MARKDOWN_PATH = path.join(COMMON_DIR, "modules.md");
const CORE_DIR = path.join(COMMON_DIR, "core");
const CATEGORY_FILE_NAME = "_category_.yml";

/** We hard-code the label for some specific directories. */
const DIRECTORY_NAME_TO_LABEL = new Map<string, string>([
  ["features", "Extra Features"],
  ["functions", "Helper Functions by Category"],
]);

/** We hard-code the title for some specific files. */
const FILE_NAME_TO_TITLE = new Map<string, string>([
  ["README", "Introduction"],
  ["Constants", "Constants (Miscellaneous)"],
  ["Constants First Last", "Constants (First & Last)"],
  ["Upgrade Mod", "Upgrading Your Mod"],
  ["K Color", "KColor"],
  ["Npc", "NPC"],
  ["Rng", "RNG"],
  ["Tstl Class", "TSTL Class"],
  ["Ui", "UI"],
]);

const SIDEBAR_POSITIONS = new Map<string, number>([
  // "Introduction" is hard coded as 0.
  ["Core", 1],
  ["Custom Callbacks", 2],
  ["Extra Features", 3],
  ["Helper Functions by Category", 4],
  ["Classes", 5],
  ["Enums", 6],
  ["Interfaces", 7],
  ["Maps", 8],
  ["Types", 9],
]);

main();

function main() {
  moveModulesFiles();
  file.deleteFileOrDirectory(MODULES_MARKDOWN_PATH, false);

  const directories = getDirectories(COMMON_DIR);
  for (const directoryName of directories) {
    const directoryPath = path.join(COMMON_DIR, directoryName);

    addCategoryFile(directoryName, directoryPath);

    const markdownFileNames = getMarkdownFileNames(directoryPath);
    for (const markdownFileName of markdownFileNames) {
      const markdownFilePath = path.join(directoryPath, markdownFileName);
      addMarkdownHeader(markdownFilePath);
    }
  }
}

/** Move the files in the "modules" directory to proper directories. */
function moveModulesFiles() {
  const markdownFileNames = getMarkdownFileNames(MODULES_DIR);
  for (const markdownFileName of markdownFileNames) {
    const markdownFilePath = path.join(MODULES_DIR, markdownFileName);

    const match = markdownFileName.match(/^(.+?)_(.+.md)$/);
    if (match === null) {
      // Since there is no underscore, this is a root file, so it belongs in the "core" directory.
      file.makeDir(CORE_DIR, false);
      const dstPath = path.join(CORE_DIR, markdownFileName);
      file.move(markdownFilePath, dstPath, false);
    } else {
      const directoryName = match[1];
      if (directoryName === undefined) {
        error(`Failed to parse the file name: ${markdownFileName}`);
      }

      const newFileName = match[2];
      if (newFileName === undefined) {
        error(`Failed to parse the file name: ${markdownFileName}`);
      }

      const dstDirectory = path.join(COMMON_DIR, directoryName);
      file.makeDir(dstDirectory, false);
      const dstPath = path.join(dstDirectory, newFileName);
      file.move(markdownFilePath, dstPath, false);
    }
  }

  const remainingFiles = getFiles(MODULES_DIR);
  if (remainingFiles.length > 0) {
    error(
      `Failed to move one or more files in the "modules" directory: ${MODULES_DIR}`,
    );
  }

  file.deleteFileOrDirectory(MODULES_DIR, false);
}

function addCategoryFile(directoryName: string, directoryPath: string) {
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
  file.write(categoryFilePath, fileContents, false);
}

function addMarkdownHeader(filePath: string) {
  const fileName = path.basename(filePath);
  const pageName = trimSuffix(fileName, ".md");
  const vanillaTitle = pascalCaseToTitleCase(pageName);
  const customTitle = FILE_NAME_TO_TITLE.get(vanillaTitle);
  const title = customTitle === undefined ? vanillaTitle : customTitle;
  const header = `
---
custom_edit_url: null
---

# ${title}
  `
    .trim()
    .concat("\n\n");

  const fileContents = file.read(filePath, false);
  const newFileContents = header + fileContents;
  file.write(filePath, newFileContents, false);
}

// ----------------
// Helper functions
// ----------------

function getFiles(directoryPath: string) {
  return readdirSync(directoryPath, { withFileTypes: true }).map(
    (dirent) => dirent.name,
  );
}

function getDirectories(directoryPath: string) {
  return readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function getMarkdownFileNames(directoryPath: string) {
  return readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name);
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
