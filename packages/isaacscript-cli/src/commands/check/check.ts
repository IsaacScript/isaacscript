import { Command } from "@commander-js/extra-typings";
import chalk from "chalk";
import {
  PACKAGE_MANAGER_LOCK_FILE_NAMES,
  PackageManager,
  deleteFileOrDirectory,
  fatalError,
  isDirectory,
  isFile,
  readFile,
  writeFile,
} from "isaacscript-common-node";
import { ReadonlySet, getEnumValues, trimPrefix } from "isaacscript-common-ts";
import klawSync from "klaw-sync";
import path from "node:path";
import {
  ACTION_YML,
  ACTION_YML_TEMPLATE_PATH,
  CWD,
  TEMPLATES_DIR,
  TEMPLATES_DYNAMIC_DIR,
  TEMPLATES_STATIC_DIR,
  YARNRC_TEMPLATE_PATH,
  YARNRC_YML,
} from "../../constants.js";
import { execShell } from "../../exec.js";
import { getPackageManagerUsedForExistingProject } from "../../packageManager.js";

const URL_PREFIX =
  "https://raw.githubusercontent.com/IsaacScript/isaacscript/main/packages/isaacscript-cli/file-templates";

const MARKER_CUSTOMIZATION_START = "@template-customization-start";
const MARKER_CUSTOMIZATION_END = "@template-customization-end";
const MARKER_IGNORE_BLOCK_START = "@template-ignore-block-start";
const MARKER_IGNORE_BLOCK_END = "@template-ignore-block-end";
const MARKER_IGNORE_NEXT_LINE = "@template-ignore-next-line";

const PACKAGE_MANAGER_STRINGS = [
  "PACKAGE_MANAGER_NAME",
  "PACKAGE_MANAGER_INSTALL_COMMAND",
  "PACKAGE_MANAGER_LOCK_FILE_NAME",
  ...getEnumValues(PackageManager),
  ...PACKAGE_MANAGER_LOCK_FILE_NAMES,
] as const;

export const checkCommand = new Command()
  .command("check")
  .description(
    "Check the template files of the current IsaacScript mod to see if they are up to date.",
  )
  .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
  .helpOption("-h, --help", "Display the list of options for this command.")
  .option(
    "--ignore <ignoreList>",
    "Comma separated list of file names to ignore.",
  )
  .option("-v, --verbose", "Enable verbose output.", false)
  .action((options) => {
    check(options, false);
  });

/**
 * Even though all of the options are identical, we make a "-ts" version of the command to keep the
 * symmetry with the "init" and "init-ts" commands.
 */
export const checkTSCommand = new Command()
  .command("check-ts")
  .description(
    "Check the template files of the current TypeScript project to see if they are up to date.",
  )
  .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
  .helpOption("-h, --help", "Display the list of options for this command.")
  .option(
    "--ignore <ignoreList>",
    "Comma separated list of file names to ignore.",
  )
  .option("-v, --verbose", "Enable verbose output.", false)
  .action((options) => {
    check(options, true);
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkOptions = checkCommand.opts();
// The options are identical for both, so we do not create a union.
type CheckOptions = typeof checkOptions;

function check(options: CheckOptions, typeScript: boolean) {
  const { verbose } = options;

  const packageManager = getPackageManagerUsedForExistingProject();

  let oneOrMoreErrors = false;
  const ignore = options.ignore ?? "";
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

  // Third, check dynamic files that require specific logic.
  if (checkIndividualFiles(ignoreFileNamesSet, packageManager, verbose)) {
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

    if (isDirectory(templateFilePath)) {
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
    switch (templateFileName) {
      case "_eslintrc.cjs": {
        projectFilePath = path.join(projectFilePath, "..", ".eslintrc.cjs");
        break;
      }

      case "_cspell.jsonc": {
        projectFilePath = path.join(projectFilePath, "..", "cspell.jsonc");
        break;
      }

      case "_gitattributes": {
        projectFilePath = path.join(projectFilePath, "..", ".gitattributes");
        break;
      }

      default: {
        break;
      }
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
  packageManager: PackageManager,
  verbose: boolean,
) {
  let oneOrMoreErrors = false;

  if (!ignoreFileNamesSet.has(ACTION_YML)) {
    const templateFilePath = ACTION_YML_TEMPLATE_PATH;
    const relativeTemplateFilePath = path.relative(
      TEMPLATES_DYNAMIC_DIR,
      templateFilePath,
    );
    const projectFilePath = path.join(CWD, relativeTemplateFilePath);
    if (!compareTextFiles(projectFilePath, templateFilePath, verbose)) {
      oneOrMoreErrors = true;
    }
  }

  if (
    packageManager === PackageManager.yarn &&
    !ignoreFileNamesSet.has(YARNRC_YML)
  ) {
    const templateFilePath = YARNRC_TEMPLATE_PATH;
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

/** @returns Whether the project file is valid in reference to the template file. */
function compareTextFiles(
  projectFilePath: string,
  templateFilePath: string,
  verbose: boolean,
): boolean {
  if (!isFile(projectFilePath)) {
    console.log(`Failed to find the following file: ${projectFilePath}`);
    printTemplateLocation(templateFilePath);

    return false;
  }

  const projectFileObject = getTruncatedFileText(
    projectFilePath,
    new Set(),
    new Set(),
  );

  const templateFileObject = getTruncatedFileText(
    templateFilePath,
    projectFileObject.ignoreLines,
    projectFileObject.linesBeforeIgnore,
  );

  if (projectFileObject.text === templateFileObject.text) {
    return true;
  }

  console.log(
    `The contents of the following file do not match: ${chalk.red(
      projectFilePath,
    )}`,
  );
  printTemplateLocation(templateFilePath);

  if (verbose) {
    const originalTemplateFile = readFile(templateFilePath);
    const originalProjectFile = readFile(projectFilePath);

    console.log("--- Original template file: ---\n");
    console.log(originalTemplateFile);
    console.log();
    console.log("--- Original project file: ---\n");
    console.log(originalProjectFile);
    console.log();
    console.log("--- Parsed template file: ---\n");
    console.log(templateFileObject.text);
    console.log();
    console.log("--- Parsed project file: ---\n");
    console.log(projectFileObject.text);
    console.log();
  }

  const tempProjectFilePath = path.join(CWD, "tempProjectFile.txt");
  const tempTemplateFilePath = path.join(CWD, "tempTemplateFile.txt");

  writeFile(tempProjectFilePath, projectFileObject.text);
  writeFile(tempTemplateFilePath, templateFileObject.text);

  const { stdout } = execShell(
    "diff",
    [tempProjectFilePath, tempTemplateFilePath, "--ignore-blank-lines"],
    verbose,
    true,
  );

  console.log(`${stdout}\n`);

  deleteFileOrDirectory(tempProjectFilePath);
  deleteFileOrDirectory(tempTemplateFilePath);

  return false;
}

function getTruncatedFileText(
  filePath: string,
  ignoreLines: ReadonlySet<string>,
  linesBeforeIgnore: ReadonlySet<string>,
) {
  const fileName = path.basename(filePath);
  const fileContents = readFile(filePath);

  return getTruncatedText(
    fileName,
    fileContents,
    ignoreLines,
    linesBeforeIgnore,
  );
}

/**
 * @param fileName Used to perform some specific rules based on the template file name.
 * @param text The text to parse.
 * @param ignoreLines A set of lines to remove from the text.
 * @param linesBeforeIgnore A set of lines that will trigger the subsequent line to be ignored.
 * @returns The text of the file with all text removed between any flagged markers (and other
 *          specific hard-coded exclusions), as well as an array of lines that had a
 *          "ignore-next-line" marker below them.
 */
export function getTruncatedText(
  fileName: string,
  text: string,
  ignoreLines: ReadonlySet<string>,
  linesBeforeIgnore: ReadonlySet<string>,
): {
  text: string;
  ignoreLines: ReadonlySet<string>;
  linesBeforeIgnore: ReadonlySet<string>;
} {
  const lines = text.split("\n");

  const newLines: string[] = [];
  const newIgnoreLines = new Set<string>();
  const newLinesBeforeIgnore = new Set<string>();

  let isSkipping = false;
  let isIgnoring = false;
  let shouldIgnoreNextLine = false;
  let previousLine = "";

  for (const line of lines) {
    if (line.trim() === "") {
      continue;
    }

    if (ignoreLines.has(line.trim())) {
      continue;
    }

    if (shouldIgnoreNextLine) {
      shouldIgnoreNextLine = false;
      continue;
    }

    if (linesBeforeIgnore.has(line)) {
      shouldIgnoreNextLine = true;
    }

    // -------------
    // Marker checks
    // -------------

    if (line.includes(MARKER_CUSTOMIZATION_START)) {
      isSkipping = true;
      continue;
    }

    if (line.includes(MARKER_CUSTOMIZATION_END)) {
      isSkipping = false;
      continue;
    }

    if (line.includes(MARKER_IGNORE_BLOCK_START)) {
      isIgnoring = true;
      continue;
    }

    if (line.includes(MARKER_IGNORE_BLOCK_END)) {
      isIgnoring = false;
      continue;
    }

    if (line.includes(MARKER_IGNORE_NEXT_LINE)) {
      shouldIgnoreNextLine = true;

      // We mark the previous line so that we know the next line to skip in the template.
      if (previousLine.trim() === "") {
        fatalError(
          `You cannot have a "${MARKER_IGNORE_NEXT_LINE}" marker before a blank line in the "${fileName}" file.`,
        );
      }
      newLinesBeforeIgnore.add(previousLine);

      continue;
    }

    if (isIgnoring) {
      const baseLine = trimPrefix(line.trim(), "// ");
      newIgnoreLines.add(baseLine);
      continue;
    }

    // --------------------
    // Specific file checks
    // --------------------

    // We should ignore imports in JavaScript or TypeScript files.
    if (fileName.endsWith(".js") || fileName.endsWith(".ts")) {
      if (line === "import {") {
        isSkipping = true;
        continue;
      }

      if (line.startsWith("} from ")) {
        isSkipping = false;
        continue;
      }

      if (line.startsWith("import ")) {
        continue;
      }
    }

    // End-users can have different ignored words.
    if (fileName === "cspell.jsonc" || fileName === "_cspell.jsonc") {
      if (line.match(/"words": \[.*]/) !== null) {
        continue;
      }

      if (line.includes('"words": [')) {
        isSkipping = true;
        continue;
      }

      if ((line.endsWith("]") || line.endsWith("],")) && isSkipping) {
        isSkipping = false;
        continue;
      }
    }

    if (fileName === "ci.yml" || fileName === "action.yml") {
      // End-users can have different package managers.
      if (hasPackageManagerString(line)) {
        continue;
      }

      // Ignore comments, since end-users are expected to delete the explanations.
      if (line.match(/^\s*#/) !== null) {
        continue;
      }
    }

    // ------------
    // Final checks
    // ------------

    if (!isSkipping) {
      newLines.push(line);
      previousLine = line;
    }
  }

  const newText = newLines.join("\n");
  return {
    text: newText,
    ignoreLines: newIgnoreLines,
    linesBeforeIgnore: newLinesBeforeIgnore,
  };
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
