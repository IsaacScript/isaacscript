import chalk from "chalk";
import klawSync from "klaw-sync";
import path from "node:path";
import {
  CI_YML,
  CI_YML_TEMPLATE_PATH,
  CWD,
  TEMPLATES_DIR,
  TEMPLATES_DYNAMIC_DIR,
  TEMPLATES_STATIC_DIR,
} from "../../constants.js";
import { PackageManager } from "../../enums/PackageManager.js";
import { execShell } from "../../exec.js";
import {
  deleteFileOrDirectory,
  fileExists,
  isDir,
  readFile,
  writeFile,
} from "../../file.js";
import {
  ReadonlySet,
  fatalError,
  getEnumValues,
} from "../../isaacScriptCommonTS.js";
import { getAllPackageManagerLockFileNames } from "../../packageManager.js";
import type { Args } from "../../parseArgs.js";

const URL_PREFIX =
  "https://raw.githubusercontent.com/IsaacScript/isaacscript/main/packages/isaacscript-cli/file-templates";

const MARKER_CUSTOMIZATION_START = "@template-customization-start";
const MARKER_CUSTOMIZATION_END = "@template-customization-end";
const MARKER_IGNORE_NEXT_LINE = "@template-ignore-next-line";

const PACKAGE_MANAGER_STRINGS = [
  "PACKAGE_MANAGER_NAME",
  "PACKAGE_MANAGER_INSTALL_COMMAND",
  "PACKAGE_MANAGER_LOCK_FILE_NAME",
  ...getEnumValues(PackageManager),
  ...getAllPackageManagerLockFileNames(),
] as const;

export function check(args: Args, typeScript: boolean): void {
  const ignore = args.ignore ?? "";
  const verbose = args.verbose === true;

  let oneOrMoreErrors = false;
  const ignoreFileNames = ignore.split(",");
  const ignoreFileNamesSet = new ReadonlySet(ignoreFileNames);

  // First, check the static files that are shared between TypeScript projects and IsaacScript mods.
  if (
    checkTemplateDirectory(TEMPLATES_STATIC_DIR, ignoreFileNamesSet, verbose)
  ) {
    oneOrMoreErrors = true;
  }

  // Second, check the files that are specific to either a TypeScript project or an IsaacScript mod.
  const staticDirSuffix = typeScript ? "ts" : "mod";
  const staticDirPath = path.join(TEMPLATES_DIR, `static-${staticDirSuffix}`);
  if (checkTemplateDirectory(staticDirPath, ignoreFileNamesSet, verbose)) {
    oneOrMoreErrors = true;
  }

  if (checkIndividualFiles(ignoreFileNamesSet, verbose)) {
    oneOrMoreErrors = true;
  }

  if (oneOrMoreErrors) {
    fatalError("The check command failed.");
  }
}

function checkTemplateDirectory(
  templateDirectory: string,
  ignoreFileNamesSet: ReadonlySet<string>,
  verbose: boolean,
): boolean {
  let oneOrMoreErrors = false;

  for (const klawItem of klawSync(templateDirectory)) {
    const templateFilePath = klawItem.path;

    if (isDir(templateFilePath, verbose)) {
      continue;
    }

    const originalFileName = path.basename(templateFilePath);
    if (originalFileName === "main.ts") {
      continue;
    }

    const relativeTemplateFilePath = path.relative(
      templateDirectory,
      templateFilePath,
    );
    const templateFileName = path.basename(relativeTemplateFilePath);

    let projectFilePath = path.join(CWD, relativeTemplateFilePath);
    if (templateFileName === "_eslintrc.cjs") {
      projectFilePath = path.join(projectFilePath, "..", ".eslintrc.cjs");
    } else if (templateFileName === "_cspell.json") {
      projectFilePath = path.join(projectFilePath, "..", "cspell.json");
    } else if (templateFileName === "_gitattributes") {
      projectFilePath = path.join(projectFilePath, "..", ".gitattributes");
    }

    const projectFileName = path.basename(projectFilePath);
    if (ignoreFileNamesSet.has(projectFileName)) {
      continue;
    }

    if (!compareTextFiles(projectFilePath, templateFilePath, verbose)) {
      oneOrMoreErrors = true;
    }
  }

  return oneOrMoreErrors;
}

function checkIndividualFiles(
  ignoreFileNamesSet: ReadonlySet<string>,
  verbose: boolean,
) {
  let oneOrMoreErrors = false;

  if (!ignoreFileNamesSet.has(CI_YML)) {
    const templateFilePath = CI_YML_TEMPLATE_PATH;
    const relativeTemplateFilePath = path.relative(
      TEMPLATES_DYNAMIC_DIR,
      templateFilePath,
    );
    const projectFilePath = path.join(CWD, relativeTemplateFilePath);
    if (!compareTextFiles(projectFilePath, templateFilePath, verbose)) {
      oneOrMoreErrors = true;
    }
  }

  return oneOrMoreErrors;
}

/** @returns Whether or not the project file is valid in reference to the template file. */
function compareTextFiles(
  projectFilePath: string,
  templateFilePath: string,
  verbose: boolean,
): boolean {
  if (!fileExists(projectFilePath, verbose)) {
    console.log(`Failed to find the following file: ${projectFilePath}`);
    printTemplateLocation(templateFilePath);

    return false;
  }

  const [projectFileContents, ignoreLines] = getTruncatedFileText(
    projectFilePath,
    new ReadonlySet(),
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
  printTemplateLocation(templateFilePath);

  if (verbose) {
    const originalTemplateFile = readFile(templateFilePath, verbose);
    const originalProjectFile = readFile(projectFilePath, verbose);

    console.log("--- Original template file: ---\n");
    console.log(originalTemplateFile);
    console.log();
    console.log("--- Original project file: ---\n");
    console.log(originalProjectFile);
    console.log();
    console.log("--- Parsed template file: ---\n");
    console.log(templateFileContents);
    console.log();
    console.log("--- Parsed project file: ---\n");
    console.log(projectFileContents);
    console.log();
  }

  const tempProjectFilePath = path.join(CWD, "tempProjectFile.txt");
  const tempTemplateFilePath = path.join(CWD, "tempTemplateFile.txt");

  writeFile(tempProjectFilePath, projectFileContents, verbose);
  writeFile(tempTemplateFilePath, templateFileContents, verbose);

  const { stdout } = execShell(
    "diff",
    [tempProjectFilePath, tempTemplateFilePath, "--ignore-blank-lines"],
    verbose,
    true,
  );

  console.log(`${stdout}\n`);

  deleteFileOrDirectory(tempProjectFilePath, verbose);
  deleteFileOrDirectory(tempTemplateFilePath, verbose);

  return false;
}

/**
 * @returns The a tuple containing the text of the file with all text removed between any flagged
 *          markers (and other specific hard-coded exclusions), as well as an array of lines that
 *          had a ignore-next-line marker below them.
 */
function getTruncatedFileText(
  filePath: string,
  linesBeforeIgnore: ReadonlySet<string>,
  verbose: boolean,
): [text: string, ignoredLines: ReadonlySet<string>] {
  const fileName = path.basename(filePath);

  const projectFileContents = readFile(filePath, verbose);
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
    if (fileName === "cspell.json" || fileName === "_cspell.json") {
      if (line.match(/"words": \[.*]/) !== null) {
        continue;
      }

      if (line.includes('"words": [')) {
        currentlySkipping = true;
        continue;
      }

      if ((line.endsWith("]") || line.endsWith("],")) && currentlySkipping) {
        currentlySkipping = false;
        continue;
      }
    }

    if (fileName === "ci.yml") {
      // End-users can have different package managers.
      if (hasPackageManagerString(line)) {
        continue;
      }

      // Ignore comments, since end-users are expected to delete the explanation.
      if (line.match(/^\s*#/) !== null) {
        continue;
      }
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

function printTemplateLocation(templateFilePath: string) {
  const unixPath = templateFilePath.split(path.sep).join(path.posix.sep);
  const match = unixPath.match(/.+\/file-templates\/(?<urlSuffix>.+)/);
  if (match === null || match.groups === undefined) {
    fatalError(`Failed to parse the template file path: ${templateFilePath}`);
  }
  const { urlSuffix } = match.groups;

  console.log(
    `You can find the template at: ${chalk.green(
      `${URL_PREFIX}/${urlSuffix}`,
    )}\n`,
  );
}

function hasPackageManagerString(line: string) {
  return PACKAGE_MANAGER_STRINGS.some((string) => line.includes(string));
}
