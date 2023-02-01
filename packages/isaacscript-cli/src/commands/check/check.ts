import chalk from "chalk";
import { error } from "isaacscript-common-ts";
import klawSync from "klaw-sync";
import path from "path";
import { CWD, TEMPLATES_STATIC_DIR } from "../../constants.js";
import { execShell } from "../../exec";
import * as file from "../../file";
import { Args } from "../../parseArgs";

const URL_PREFIX =
  "https://raw.githubusercontent.com/IsaacScript/isaacscript/main/packages/isaacscript-cli/file-templates/static";

const CUSTOM_TEXT_MARKER_START = "@template-customization-start";
const CUSTOM_TEXT_MARKER_END = "@template-customization-end";

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

    if (file.exists(projectFilePath, verbose)) {
      if (!compareFiles(templateFilePath, projectFilePath, verbose)) {
        oneOrMoreErrors = true;
        console.log(
          `The contents of the following file do not match: ${chalk.red(
            projectFilePath,
          )}`,
        );
        printTemplateLocation(originalFileName);
      }
    } else {
      oneOrMoreErrors = true;
      console.log(`Failed to find the following file: ${projectFilePath}`);
      printTemplateLocation(originalFileName);
    }
  }

  if (oneOrMoreErrors) {
    error("The check command failed.");
  }
}

/** @returns Whether or the file was valid. */
function compareFiles(
  templateFilePath: string,
  projectFilePath: string,
  verbose: boolean,
): boolean {
  const templateFileContents = getTruncatedFileText(templateFilePath, verbose);
  const projectFileContents = getTruncatedFileText(projectFilePath, verbose);

  if (templateFileContents === projectFileContents) {
    return true;
  }

  const tempProjectFilePath = path.join(CWD, "temp.txt");
  file.write(tempProjectFilePath, projectFileContents, verbose);
  const [_exitStatus, stdout] = execShell(
    "diff",
    [tempProjectFilePath, templateFilePath],
    verbose,
    true,
  );
  file.deleteFileOrDirectory(tempProjectFilePath, verbose);
  console.log(stdout);

  return false;
}

/**
 * @returns The text of the file with all text removed between any flagged markers (and other
 *          specific hard-coded exclusions).
 */
function getTruncatedFileText(filePath: string, verbose: boolean): string {
  const fileName = path.basename(filePath);

  const projectFileContents = file.read(filePath, verbose);
  const lines = projectFileContents.split("\n");

  const newLines: string[] = [];

  let currentlySkipping = false;
  for (const line of lines) {
    if (line === "") {
      continue;
    }

    if (line.includes(CUSTOM_TEXT_MARKER_START)) {
      currentlySkipping = true;
      continue;
    }

    if (line.includes(CUSTOM_TEXT_MARKER_END)) {
      currentlySkipping = false;
      continue;
    }

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

    if (!currentlySkipping) {
      newLines.push(line);
    }
  }

  return newLines.join("\n");
}

function printTemplateLocation(originalFileName: string) {
  console.log(
    `You can find the template at: ${chalk.green(
      `${URL_PREFIX}/${originalFileName}`,
    )}`,
  );
}
