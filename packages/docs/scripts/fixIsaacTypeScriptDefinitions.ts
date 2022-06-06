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
import glob from "glob";
import { file } from "isaacscript-cli";
import path from "path";

const DOCS_DIR = path.join(__dirname, "..", "docs");
const DEFINITIONS_DIR = path.join(DOCS_DIR, "isaac-typescript-definitions");
const MODULES_DIR = path.join(DEFINITIONS_DIR, "modules");
const MODS_DIR = path.join(DEFINITIONS_DIR, "mods");
const CLASSES_DIR = path.join(DEFINITIONS_DIR, "classes");
const ENUMS_DIR = path.join(DEFINITIONS_DIR, "enums");
const INTERFACES_DIR = path.join(DEFINITIONS_DIR, "interfaces");
const MOD_ENUMS_DIR = path.join(MODS_DIR, "enums");
const MOD_INTERFACES_DIR = path.join(MODS_DIR, "interfaces");
const MODULES_MD_PATH = path.join(DEFINITIONS_DIR, "modules.md");
const CATEGORY_FILE_NAME = "_category_.yml";

/** We hard-code the title for some specific files. */
const FILE_NAME_TO_TITLE: ReadonlyMap<string, string> = new Map([
  ["functions", "Global Functions"],
  ["main", "main.lua"],
  ["json", "json.lua"],
  ["socket", "socket.lua"],
  ["primitives", "Primitives"],
]);

const SIDEBAR_POSITIONS: ReadonlyMap<string, number> = new Map([
  // "Introduction" is hard coded as 0 in "website-root.md".
  ["Classes", 1],
  ["Enums", 2],
  ["Global Functions", 3],
  ["main.lua", 4],
  ["json.lua", 5],
  ["socket.lua", 6],
  ["Unofficial", 7],
  ["Mods", 8],
]);

const DIR_NAMES_WITH_DUPLICATION: readonly string[] = [
  "classes",
  "enums",
  "interfaces",
];

const BROKEN_LINK_DIR_NAMES = [...DIR_NAMES_WITH_DUPLICATION, "types"];

main();

function main() {
  moveModulesFiles();
  file.deleteFileOrDirectory(MODULES_MD_PATH, false);
  fixClassConstructors();
  mergeClassFiles();
  renameEnumFiles();
  mergeInterfaces();
  addCategoryFilesAndMarkdownHeaders();
  fixLinks();
}

/** Move the files in the "modules" directory to proper directories. */
function moveModulesFiles() {
  const markdownFileNames = getMarkdownFileNames(MODULES_DIR);
  for (const markdownFileName of markdownFileNames) {
    const markdownFilePath = path.join(MODULES_DIR, markdownFileName);

    // Flag enums are not blank.
    const enumsFlagsPrefix = "enums_flags_";
    if (markdownFileName.startsWith(enumsFlagsPrefix)) {
      const newMarkdownFileName = markdownFileName.slice(
        enumsFlagsPrefix.length,
      );
      const dstPath = path.join(ENUMS_DIR, newMarkdownFileName);
      file.move(markdownFilePath, dstPath, false);
      continue;
    }

    // The enum files in this directory are blank pages that link to the pages in the "enums"
    // directory (except for the flags).
    if (markdownFileName.startsWith("enums_")) {
      file.deleteFileOrDirectory(markdownFilePath, false);
      continue;
    }

    // Every other file in this directory will have a superfluous "types_" prefix.
    const typesPrefix = "types_";
    if (!markdownFileName.startsWith(typesPrefix)) {
      error(
        `Found an unknown file in the modules directory: ${markdownFileName}`,
      );
    }
    const modifiedMarkdownFileName = markdownFileName.slice(typesPrefix.length);

    const match = modifiedMarkdownFileName.match(/^(.+?)_(.+.md)$/);
    if (match === null) {
      // If it doesn't have a prefix, then it must belong in the root directory.
      const dstDirectory = path.join(DEFINITIONS_DIR);
      const dstPath = path.join(dstDirectory, modifiedMarkdownFileName);
      file.move(markdownFilePath, dstPath, false);
      continue;
    }

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

    const dstDirectory = path.join(DEFINITIONS_DIR, directoryName);
    file.makeDir(dstDirectory, false);
    const dstPath = path.join(dstDirectory, newFileName);
    file.move(markdownFilePath, dstPath, false);
  }

  const remainingFiles = getFileNames(MODULES_DIR);
  if (remainingFiles.length > 0) {
    error(
      `Failed to move one or more files in the "modules" directory: ${MODULES_DIR}`,
    );
  }

  file.deleteFileOrDirectory(MODULES_DIR, false);
}

/**
 * In a class file, the only function will be the constructor. Thus, we can rename the "Functions"
 * header accordingly.
 */
function fixClassConstructors() {
  const markdownFileNames = getMarkdownFileNames(CLASSES_DIR);

  for (const markdownFileName of markdownFileNames) {
    // Skip duplicated classes, which we will address later.
    if (markdownFileName.endsWith("-1.md")) {
      continue;
    }

    const markdownFilePath = path.join(CLASSES_DIR, markdownFileName);
    const fileContents = file.read(markdownFilePath, false);
    const newFileContents = fileContents.replaceAll(
      "## Functions",
      "## Constructor",
    );
    file.write(markdownFilePath, newFileContents, false);
  }
}

/**
 * Due to how static class methods are implemented, TypeDoc will display them on a separate page.
 * Thus, we must merge the contents together with the original file.
 */
function mergeClassFiles() {
  const markdownFileNames = getMarkdownFileNames(CLASSES_DIR);
  for (const markdownFileName of markdownFileNames) {
    if (!markdownFileName.endsWith("-1.md")) {
      continue;
    }

    const markdownFilePath = path.join(CLASSES_DIR, markdownFileName);
    const fileContents = file.read(markdownFilePath, false);
    const lines = fileContents.split("\n");

    // Remove the title on the first line.
    // e.g. "[types/classes/Color](types_classes_Color.md).Color"
    lines.unshift();

    const contentToAppend = lines.join("\n");
    const editedContentToAppend = contentToAppend.replaceAll(
      "## Functions",
      "## Static Methods",
    );

    const match = markdownFileName.match(/^(\w+?)\./);
    if (match === null) {
      error(`Failed to parse the file name for the class: ${markdownFileName}`);
    }

    const className = match[1];
    if (className === undefined) {
      error(
        `Failed to parse the file name for the class match: ${markdownFileName}`,
      );
    }

    const classFileName = `${className}.md`;
    const classFilePath = path.join(CLASSES_DIR, classFileName);
    const oldFileContents = file.read(classFilePath, false);

    const newFileContents = oldFileContents + editedContentToAppend;
    file.write(classFilePath, newFileContents, false);
    file.deleteFileOrDirectory(markdownFilePath, false);
  }
}

/** "enums_ActiveSlot.ActiveSlot.md" --> "ActiveSlot.md" */
function renameEnumFiles() {
  file.makeDir(MOD_ENUMS_DIR, false);

  const markdownFileNames = getMarkdownFileNames(ENUMS_DIR);
  for (const markdownFileName of markdownFileNames) {
    const markdownFilePath = path.join(ENUMS_DIR, markdownFileName);

    const match = markdownFileName.match(/\.(\w+?\.md)$/);
    if (match === null) {
      // The flag enums will not match this pattern.
      continue;
    }

    const newName = match[1];
    if (newName === undefined) {
      error(
        `Failed to parse the file name for the enum match: ${markdownFileName}`,
      );
    }

    const dstDir = markdownFileName.startsWith("types_mods_")
      ? MOD_ENUMS_DIR
      : ENUMS_DIR;
    const dstPath = path.join(dstDir, newName);
    file.move(markdownFilePath, dstPath, false);
  }
}

function mergeInterfaces() {
  const markdownFileNames = getMarkdownFileNames(INTERFACES_DIR);
  file.makeDir(MOD_INTERFACES_DIR, false);
  for (const markdownFileName of markdownFileNames) {
    const markdownFilePath = path.join(INTERFACES_DIR, markdownFileName);

    // We don't need to document the unofficial interfaces ("AddCallbackParameter" and
    // "EntitySubPlayer").
    if (markdownFileName.startsWith("types_unofficial_")) {
      file.deleteFileOrDirectory(markdownFilePath, false);
      continue;
    }

    const match = markdownFileName.match(/\.(\w+?\.md)$/);
    if (match === null) {
      error(
        `Failed to parse the file name for the interface: ${markdownFileName}`,
      );
    }

    const newName = match[1];
    if (newName === undefined) {
      error(
        `Failed to parse the file name for the interface match: ${markdownFileName}`,
      );
    }

    if (markdownFileName.startsWith("types_mods_")) {
      const dstPath = path.join(MOD_INTERFACES_DIR, newName);
      file.move(markdownFilePath, dstPath, false);
    } else {
      // Since classes are implemented as interfaces, we have to merge the interface with the page
      // that contains the class constructor.
      const fileContents = file.read(markdownFilePath, false);
      const classPath = path.join(CLASSES_DIR, newName);
      if (file.exists(classPath, false)) {
        const oldContents = file.read(classPath, false);
        const newContents = oldContents + fileContents;
        file.write(classPath, newContents, false);
        file.deleteFileOrDirectory(markdownFilePath, false);
      } else {
        file.move(markdownFilePath, classPath, false);
      }
    }
  }

  const remainingFiles = getFileNames(INTERFACES_DIR);
  if (remainingFiles.length > 0) {
    error(
      `Failed to move one or more files in the "interfaces" directory: ${INTERFACES_DIR}`,
    );
  }

  file.deleteFileOrDirectory(INTERFACES_DIR, false);
}

function addCategoryFilesAndMarkdownHeaders() {
  // First, do the specific base files.
  for (const markdownFileName of [
    "functions.md",
    "json.md",
    "main.md",
    "socket.md",
  ]) {
    const markdownFilePath = path.join(DEFINITIONS_DIR, markdownFileName);
    addMarkdownHeader(markdownFilePath);
  }

  // Do every sub-directory.
  const directories = getDirectoryNames(DEFINITIONS_DIR);
  for (const directoryName of directories) {
    const directoryPath = path.join(DEFINITIONS_DIR, directoryName);
    addCategoryFile(directoryPath);

    const markdownFileNames = getMarkdownFileNames(directoryPath);
    for (const markdownFileName of markdownFileNames) {
      const markdownFilePath = path.join(directoryPath, markdownFileName);
      addMarkdownHeader(markdownFilePath);
    }

    const subDirectories = getDirectoryNames(directoryPath);
    for (const subDirectoryName of subDirectories) {
      const subDirectoryPath = path.join(directoryPath, subDirectoryName);
      addCategoryFile(subDirectoryPath);

      const subDirMarkdownFileNames = getMarkdownFileNames(subDirectoryPath);
      for (const markdownFileName of subDirMarkdownFileNames) {
        const markdownFilePath = path.join(subDirectoryPath, markdownFileName);
        addMarkdownHeader(markdownFilePath);
      }
    }
  }
}

function addCategoryFile(directoryPath: string) {
  const directoryName = path.basename(directoryPath);
  const categoryFilePath = path.join(directoryPath, CATEGORY_FILE_NAME);

  const capitalizedDirectoryName = capitalizeFirstLetter(directoryName);
  const label = capitalizedDirectoryName;
  let fileContents = `label: ${label}\n`;
  const position = SIDEBAR_POSITIONS.get(label);
  if (position !== undefined) {
    fileContents += `position: ${position}\n`;
  }
  file.write(categoryFilePath, fileContents, false);
}

function addMarkdownHeader(filePath: string) {
  const title = getTitle(filePath);
  const sidebarPosition = SIDEBAR_POSITIONS.get(title);

  let frontMatter = "custom_edit_url: null";
  if (sidebarPosition !== undefined) {
    frontMatter += `\nsidebar_position: ${sidebarPosition}`;
  }

  const header = `
---
${frontMatter}
---

# ${title}
  `
    .trim()
    .concat("\n");

  let fileContents = file.read(filePath, false);
  const lines = fileContents.split("\n");

  // Remove the first line, which is a breadcrumbs link that is not needed in this context.
  // e.g. "[classes/DefaultMap](../modules/classes_DefaultMap.md).DefaultMap"
  /// lines.shift(); // TODO: needed?

  fileContents = lines.join("\n");

  const newFileContents = header + fileContents;
  file.write(filePath, newFileContents, false);
}

function getTitle(filePath: string) {
  const fileName = path.basename(filePath);

  // First, handle the special case of a hard-coded title.
  const pageName = trimSuffix(fileName, ".md");
  const customTitle = FILE_NAME_TO_TITLE.get(pageName);
  if (customTitle !== undefined) {
    return customTitle;
  }

  const properNameMatch = fileName.match(/(\w+)\.md/);
  if (properNameMatch === null) {
    error(`Failed to parse the proper name from the file name: ${fileName}`);
  }

  const properName = properNameMatch[1];
  if (properName === undefined) {
    error(`Failed to parse the proper name from the match: ${fileName}`);
  }

  return properName;
}

/** Because we manually moved files around, internal links generated by TypeDoc will break. */
function fixLinks() {
  const markdownFilePaths = glob.sync("**/*.md");

  for (const filePath of markdownFilePaths) {
    const fileContents = file.read(filePath, false);
    const newFileContents = fileContents;

    // TODO

    if (fileContents !== newFileContents) {
      file.write(filePath, newFileContents, false);
    }
  }
}

// ----------------
// Helper functions
// ----------------

function getFileNames(directoryPath: string) {
  return readdirSync(directoryPath, { withFileTypes: true }).map(
    (dirent) => dirent.name,
  );
}

function getDirectoryNames(directoryPath: string) {
  return readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function getMarkdownFileNames(directoryPath: string) {
  return readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name);
}

function getNumDirectoriesAwayFromRoot(filePath: string, num = 0): number {
  const directoryPath = path.dirname(filePath);
  if (
    directoryPath === "." ||
    directoryPath === "/" ||
    directoryPath.endsWith("isaacscript-common")
  ) {
    return num;
  }

  const newNum = num + 1;
  return getNumDirectoriesAwayFromRoot(directoryPath, newNum);
}

function capitalizeFirstLetter(string: string): string {
  const firstCharacter = string.charAt(0);
  const capitalizedFirstLetter = firstCharacter.toUpperCase();
  const restOfString = string.slice(1);

  return `${capitalizedFirstLetter}${restOfString}`;
}

/** Helper function to trim a suffix from a string, if it exists. Returns the trimmed string. */
function trimSuffix(string: string, prefix: string): string {
  if (!string.endsWith(prefix)) {
    return string;
  }

  const endCharacter = string.length - prefix.length;
  return string.slice(0, endCharacter);
}

function error(...args: unknown[]): never {
  console.error(...args);
  return process.exit(1);
}
