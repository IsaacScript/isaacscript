import chalk from "chalk";
import { error, getEnumValues } from "isaacscript-common-ts";
import klawSync from "klaw-sync";
import path from "node:path";
import {
  CI_YML_TEMPLATE_PATH,
  CWD,
  TEMPLATES_DYNAMIC_DIR,
  TEMPLATES_STATIC_DIR,
} from "../../constants.js";
import { PackageManager } from "../../enums/PackageManager.js";
import { execShell } from "../../exec.js";
import * as file from "../../file.js";
import { getAllPackageManagerLockFileNames } from "../../packageManager.js";
import { Args } from "../../parseArgs.js";

const URL_PREFIX =
  "https://raw.githubusercontent.com/IsaacScript/isaacscript/main/packages/isaacscript-cli/file-templates/static";

const MARKER_CUSTOMIZATION_START = "@template-customization-start";
const MARKER_CUSTOMIZATION_END = "@template-customization-end";
const MARKER_IGNORE_NEXT_LINE = "@template-ignore-next-line";

const PACKAGE_MANAGER_STRINGS = [
  "PACKAGE-MANAGER-NAME",
  "PACKAGE-MANAGER-INSTALL",
  ...getEnumValues(PackageManager),
  ...getAllPackageManagerLockFileNames(),
] as const;

export function check(args: Args): void {
  const ignore = args.ignore ?? "";
  const verbose = args.verbose === true;

  let oneOrMoreErrors = false;
  const ignoreFileNames = ignore.split(",");
  const ignoreFileNamesSet = new Set(ignoreFileNames);

  for (const klawItem of klawSync(TEMPLATES_STATIC_DIR)) {
    const templateFilePath = klawItem.path;

    if (file.isDir(templateFilePath, verbose)) {
      continue;
    }

    const originalFileName = path.basename(templateFilePath);
    if (originalFileName === "main.ts") {
      continue;
    }

    const relativeTemplateFilePath = path.relative(
      TEMPLATES_STATIC_DIR,
      templateFilePath,
    );
    const templateFileName = path.basename(relativeTemplateFilePath);

    let projectFilePath = path.join(CWD, relativeTemplateFilePath);
    if (templateFileName === ".eslintrc.template.cjs") {
      projectFilePath = path.join(projectFilePath, "..", ".eslintrc.cjs");
    } else if (templateFileName === "cspell.template.json") {
      projectFilePath = path.join(projectFilePath, "..", "cspell.json");
    } else if (templateFileName === "gitattributes") {
      projectFilePath = path.join(projectFilePath, "..", ".gitattributes");
    }

    const projectFileName = path.basename(projectFilePath);
    if (ignoreFileNamesSet.has(projectFileName)) {
      continue;
    }

    if (
      !compareTextFiles(
        projectFilePath,
        templateFilePath,
        originalFileName,
        verbose,
      )
    ) {
      oneOrMoreErrors = true;
    }
  }

  {
    const templateFilePath = CI_YML_TEMPLATE_PATH;
    const relativeTemplateFilePath = path.relative(
      TEMPLATES_DYNAMIC_DIR,
      templateFilePath,
    );
    const projectFilePath = path.join(CWD, relativeTemplateFilePath);
    const originalFileName = path.basename(templateFilePath);
    if (
      !compareTextFiles(
        projectFilePath,
        templateFilePath,
        originalFileName,
        verbose,
      )
    ) {
      oneOrMoreErrors = true;
    }
  }

  if (oneOrMoreErrors) {
    error("The check command failed.");
  }
}

/** @returns Whether or not the project file is valid in reference to the template file. */
function compareTextFiles(
  projectFilePath: string,
  templateFilePath: string,
  originalFileName: string,
  verbose: boolean,
): boolean {
  if (!file.exists(projectFilePath, verbose)) {
    console.log(`Failed to find the following file: ${projectFilePath}`);
    printTemplateLocation(originalFileName);

    return false;
  }

  const [projectFileContents, ignoreLines] = getTruncatedFileText(
    projectFilePath,
    new Set(),
    verbose,
  );
  const [templateFileContents] = getTruncatedFileText(
    templateFilePath,
    ignoreLines,
    verbose,
  );

  if (templateFileContents === projectFileContents) {
    return true;
  }

  console.log(
    `The contents of the following file do not match: ${chalk.red(
      projectFilePath,
    )}`,
  );
  printTemplateLocation(originalFileName);

  const tempProjectFilePath = path.join(CWD, "tempProjectFile.txt");
  const tempTemplateFilePath = path.join(CWD, "tempTemplateFile.txt");

  file.write(tempProjectFilePath, projectFileContents, verbose);
  file.write(tempTemplateFilePath, templateFileContents, verbose);

  const [_exitStatus, stdout] = execShell(
    "diff",
    [tempProjectFilePath, tempTemplateFilePath, "--ignore-blank-lines"],
    verbose,
    true,
  );

  console.log(`${stdout}\n`);

  file.deleteFileOrDirectory(tempProjectFilePath, verbose);
  file.deleteFileOrDirectory(tempTemplateFilePath, verbose);

  return false;
}

/**
 * @returns The a tuple containing the text of the file with all text removed between any flagged
 *          markers (and other specific hard-coded exclusions), as well as an array of lines that
 *          had a ignore-next-line marker below them.
 */
function getTruncatedFileText(
  filePath: string,
  linesBeforeIgnore: Set<string>,
  verbose: boolean,
): [text: string, ignoredLines: Set<string>] {
  const fileName = path.basename(filePath);

  const projectFileContents = file.read(filePath, verbose);
  const lines = projectFileContents.split("\n");

  const newLines: string[] = [];
  const newLinesBeforeIgnore = new Set<string>();

  let currentlySkipping = false;
  let markToIgnoreNextLine = false;
  let previousLine = "";

  for (const line of lines) {
    if (line === "") {
      continue;
    }

    if (markToIgnoreNextLine) {
      markToIgnoreNextLine = false;
      continue;
    }

    if (linesBeforeIgnore.has(line)) {
      markToIgnoreNextLine = true;
    }

    // -------------
    // Marker checks
    // -------------

    if (line.includes(MARKER_CUSTOMIZATION_START)) {
      currentlySkipping = true;
      continue;
    }

    if (line.includes(MARKER_CUSTOMIZATION_END)) {
      currentlySkipping = false;
      continue;
    }

    if (line.includes(MARKER_IGNORE_NEXT_LINE)) {
      markToIgnoreNextLine = true;

      // We mark the previous line so that we know the next line to skip in the template.
      newLinesBeforeIgnore.add(previousLine);

      continue;
    }

    // --------------------
    // Specific file checks
    // --------------------

    // End-users can have different ignored words.
    if (
      (fileName === "cspell.json" || fileName === "cspell.template.json") &&
      line.includes('"words": [')
    ) {
      currentlySkipping = true;
      continue;
    }

    if (
      (fileName === "cspell.json" || fileName === "cspell.template.json") &&
      line.endsWith("]") &&
      currentlySkipping
    ) {
      currentlySkipping = false;
      continue;
    }

    // End-users can have different package managers.
    if (fileName === "ci.yml" && hasPackageManagerString(line)) {
      continue;
    }

    // Ignore comments, since end-users are expected to delete the explanation.
    if (fileName === "ci.yml" && line.match(/^\s*#/) !== null) {
      continue;
    }

    // ------------
    // Final checks
    // ------------

    if (!currentlySkipping) {
      newLines.push(line);
      previousLine = line;
    }
  }

  const newText = newLines.join("\n");
  return [newText, newLinesBeforeIgnore];
}

function printTemplateLocation(originalFileName: string) {
  console.log(
    `You can find the template at: ${chalk.green(
      `${URL_PREFIX}/${originalFileName}`,
    )}\n`,
  );
}

function hasPackageManagerString(line: string) {
  return PACKAGE_MANAGER_STRINGS.some((string) => line.includes(string));
}
