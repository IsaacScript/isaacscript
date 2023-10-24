import chalk from "chalk";
import path from "node:path";
import { Config } from "../../classes/Config.js";
import { createConfigFile } from "../../configFile.js";
import {
  CI_YML,
  CI_YML_TEMPLATE_PATH,
  GITIGNORE_TEMPLATE_PATH,
  MAIN_DEV_TS_TEMPLATE_PATH,
  MAIN_TS,
  MAIN_TS_TEMPLATE_PATH,
  METADATA_XML,
  METADATA_XML_TEMPLATE_PATH,
  PACKAGE_JSON,
  README_MD,
  TEMPLATES_DIR,
  TEMPLATES_DYNAMIC_DIR,
  TEMPLATES_STATIC_DIR,
} from "../../constants.js";
import { PackageManager } from "../../enums/PackageManager.js";
import { execShell, execShellString } from "../../exec.js";
import {
  copyFile,
  fileExists,
  getDirList,
  makeDir,
  readFile,
  renameFile,
  writeFile,
} from "../../file.js";
import { initGitRepository } from "../../git.js";
import {
  removeLinesBetweenMarkers,
  removeLinesMatching,
  repeat,
} from "../../isaacScriptCommonTS.js";
import {
  getPackageManagerExecCommand,
  getPackageManagerInstallCICommand,
  getPackageManagerInstallCommand,
  getPackageManagerLockFileName,
} from "../../packageManager.js";

export function createProject(
  projectName: string,
  authorName: string | undefined,
  projectPath: string,
  createNewDir: boolean,
  modsDirectory: string | undefined,
  saveSlot: number | undefined,
  gitRemoteURL: string | undefined,
  skipInstall: boolean,
  packageManager: PackageManager,
  typeScript: boolean,
  dev: boolean,
  verbose: boolean,
): void {
  if (createNewDir) {
    makeDir(projectPath, verbose);
  }

  const config = new Config(modsDirectory, saveSlot, dev);
  createConfigFile(projectPath, config, typeScript, verbose);

  copyStaticFiles(projectPath, typeScript, verbose);
  copyDynamicFiles(
    projectName,
    authorName,
    projectPath,
    packageManager,
    dev,
    typeScript,
    verbose,
  );
  upgradeYarn(projectPath, packageManager, verbose);
  updateNodeModules(projectPath, packageManager, verbose);
  installNodeModules(projectPath, skipInstall, packageManager, verbose);
  formatFiles(projectPath, packageManager, verbose);

  // Only make the initial commit once all of the files have been copied and formatted.
  initGitRepository(projectPath, gitRemoteURL, verbose);

  const noun = typeScript ? "project" : "mod";
  console.log(`Successfully created ${noun}: ${chalk.green(projectName)}`);
}

/** Copy static files, like ".eslintrc.cjs", "tsconfig.json", etc. */
function copyStaticFiles(
  projectPath: string,
  typeScript: boolean,
  verbose: boolean,
) {
  // First, copy the static files that are shared between TypeScript projects and IsaacScript mods.
  copyTemplateDirectoryWithoutOverwriting(
    TEMPLATES_STATIC_DIR,
    projectPath,
    verbose,
  );

  // Second, copy the files that are specific to either a TypeScript project or an IsaacScript mod.
  const staticDirSuffix = typeScript ? "ts" : "mod";
  const staticDirPath = path.join(TEMPLATES_DIR, `static-${staticDirSuffix}`);
  copyTemplateDirectoryWithoutOverwriting(staticDirPath, projectPath, verbose);

  // Rename "_eslintrc.cjs" to ".eslintrc.cjs". (If it is kept as ".eslintrc.cjs", then local
  // linting will fail.)
  const ESLintConfigPath = path.join(projectPath, "_eslintrc.cjs");
  const correctESLintConfigPath = path.join(projectPath, ".eslintrc.cjs");
  renameFile(ESLintConfigPath, correctESLintConfigPath, verbose);

  // Rename "_gitattributes" to ".gitattributes". (If it is kept as ".gitattributes", then it won't
  // be committed to git.)
  const gitAttributesPath = path.join(projectPath, "_gitattributes");
  const correctGitAttributesPath = path.join(projectPath, ".gitattributes");
  renameFile(gitAttributesPath, correctGitAttributesPath, verbose);

  // Rename "_cspell.json" to "cspell.json". (If it is kept as "cspell.json", then local spell
  // checking will fail.)
  const cSpellConfigPath = path.join(projectPath, "_cspell.json");
  const correctCSpellConfigPath = path.join(projectPath, "cspell.json");
  renameFile(cSpellConfigPath, correctCSpellConfigPath, verbose);
}

function copyTemplateDirectoryWithoutOverwriting(
  templateDirPath: string,
  projectPath: string,
  verbose: boolean,
) {
  const dirList = getDirList(templateDirPath, verbose);

  for (const fileName of dirList) {
    const templateFilePath = path.join(templateDirPath, fileName);
    const destinationFilePath = path.join(projectPath, fileName);
    if (!fileExists(destinationFilePath, verbose)) {
      copyFile(templateFilePath, destinationFilePath, verbose);
    }
  }
}

/** Copy files that need to have text replaced inside of them. */
function copyDynamicFiles(
  projectName: string,
  authorName: string | undefined,
  projectPath: string,
  packageManager: PackageManager,
  dev: boolean,
  typeScript: boolean,
  verbose: boolean,
) {
  const workflowsPath = path.join(projectPath, ".github", "workflows");
  makeDir(workflowsPath, verbose);

  // `.github/workflows/ci.yml`
  {
    const fileName = CI_YML;
    const templatePath = CI_YML_TEMPLATE_PATH;
    const templateRaw = readFile(templatePath, verbose);
    const template = parseTemplate(templateRaw, typeScript);

    const lockFileName = getPackageManagerLockFileName(packageManager);
    const installCommand = getPackageManagerInstallCICommand(packageManager);
    const ciYML = template
      .replaceAll("PACKAGE_MANAGER_NAME", packageManager)
      .replaceAll("PACKAGE_MANAGER_LOCK_FILE_NAME", lockFileName)
      .replaceAll("PACKAGE_MANAGER_INSTALL_COMMAND", installCommand);

    const destinationPath = path.join(workflowsPath, fileName);
    writeFile(destinationPath, ciYML, verbose);
  }

  // `.gitignore`
  {
    const templatePath = GITIGNORE_TEMPLATE_PATH;
    const templateRaw = readFile(templatePath, verbose);
    const template = parseTemplate(templateRaw, typeScript);

    // Prepend a header with the project name.
    let separatorLine = "# ";
    repeat(projectName.length, () => {
      separatorLine += "-";
    });
    separatorLine += "\n";
    const gitIgnoreHeader = `${separatorLine}# ${projectName}\n${separatorLine}\n`;
    const nodeGitIgnorePath = path.join(
      TEMPLATES_DYNAMIC_DIR,
      "Node.gitignore",
    );
    const nodeGitIgnore = readFile(nodeGitIgnorePath, verbose);

    // eslint-disable-next-line prefer-template
    const gitignore = gitIgnoreHeader + template + "\n" + nodeGitIgnore;

    // We need to replace the underscore with a period.
    const destinationPath = path.join(projectPath, ".gitignore");
    writeFile(destinationPath, gitignore, verbose);
  }

  // `package.json`
  {
    // There are two versions of the template, one for TypeScript, and one for IsaacScript mods.
    const packageJSONTemplateFileName = typeScript
      ? "package.ts.json"
      : "package.mod.json";
    const templatePath = path.join(
      TEMPLATES_DYNAMIC_DIR,
      packageJSONTemplateFileName,
    );
    const template = readFile(templatePath, verbose);

    const packageJSON = template
      .replaceAll("PROJECT_NAME", projectName)
      .replaceAll("AUTHOR_NAME", authorName ?? "unknown")
      .replaceAll("PACKAGE_MANAGER", packageManager);

    const destinationPath = path.join(projectPath, PACKAGE_JSON);
    writeFile(destinationPath, packageJSON, verbose);
  }

  // `README.md`
  {
    // There are two versions of the template, one for TypeScript, and one for IsaacScript mods.
    const readmeMDTemplateFileName = typeScript
      ? "README.ts.md"
      : "README.mod.md";
    const templatePath = path.join(
      TEMPLATES_DYNAMIC_DIR,
      readmeMDTemplateFileName,
    );
    const template = readFile(templatePath, verbose);

    // "PROJECT-NAME" must be hyphenated, as using an underscore will break Prettier for some
    // reason.
    const readmeMD = template.replaceAll("PROJECT-NAME", projectName);
    const destinationPath = path.join(projectPath, README_MD);
    writeFile(destinationPath, readmeMD, verbose);
  }

  // `mod/metadata.xml`
  if (!typeScript) {
    const modPath = path.join(projectPath, "mod");
    makeDir(modPath, verbose);

    const fileName = METADATA_XML;
    const templatePath = METADATA_XML_TEMPLATE_PATH;
    const template = readFile(templatePath, verbose);
    const metadataXML = template.replaceAll("PROJECT_NAME", projectName);
    const destinationPath = path.join(modPath, fileName);
    writeFile(destinationPath, metadataXML, verbose);
  }

  const srcPath = path.join(projectPath, "src");
  makeDir(srcPath, verbose);

  // `src/main.ts` (TypeScript projects use the simple version from the "static-ts" directory.)
  if (!typeScript) {
    // Convert snake_case and kebab-case to camelCase. (Kebab-case in particular will make the
    // example TypeScript file fail to compile.)
    const fileName = MAIN_TS;
    const templatePath = MAIN_TS_TEMPLATE_PATH;
    const template = readFile(templatePath, verbose);
    const mainTS = template.replaceAll("PROJECT_NAME", projectName);
    const destinationPath = path.join(srcPath, fileName);
    writeFile(destinationPath, mainTS, verbose);
  }

  // If we are initializing an IsaacScript project intended to be used for development, we can
  // include a better starter file.
  if (!typeScript && dev) {
    const fileName = MAIN_TS;
    const templatePath = MAIN_DEV_TS_TEMPLATE_PATH;
    const template = readFile(templatePath, verbose);
    const mainTS = template; // No replacements are necessary for this file.
    const destinationPath = path.join(srcPath, fileName);
    writeFile(destinationPath, mainTS, verbose);
  }
}

function parseTemplate(template: string, typeScript: boolean): string {
  const otherTemplateKind = typeScript ? "mod" : "ts";
  const otherTemplateMarker = `@template-${otherTemplateKind}`;
  const templateWithoutMarkers = removeLinesBetweenMarkers(
    template,
    otherTemplateMarker,
  );
  const templateWithoutTemplateComments = removeLinesMatching(
    templateWithoutMarkers,
    "@template",
  );
  const templateWithoutMultipleLineBreaks =
    templateWithoutTemplateComments.replaceAll(/\n\s*\n\s*\n/g, "\n\n");

  return templateWithoutMultipleLineBreaks;
}

/**
 * If we are using yarn, assume that we want to use the latest version, which requires some
 * additional commands to be performed.
 */
function upgradeYarn(
  projectPath: string,
  packageManager: PackageManager,
  verbose: boolean,
) {
  if (packageManager !== PackageManager.yarn) {
    return;
  }

  execShell("yarn", ["set", "version", "latest"], verbose, false, projectPath);
  execShell(
    "yarn",
    ["config", "set", "nodeLinker", "node-modules"],
    verbose,
    false,
    projectPath,
  );
}

/** The "package.json" file has to be copied first before this step. */
function updateNodeModules(
  projectPath: string,
  packageManager: PackageManager,
  verbose: boolean,
) {
  console.log(
    'Finding out the latest versions of the packages with "npm-check-updates"...',
  );
  const packageManagerExecCommand =
    getPackageManagerExecCommand(packageManager);
  execShell(
    packageManagerExecCommand,
    [
      "npm-check-updates",
      "--upgrade",
      "--packageFile",
      "package.json",
      "--filterVersion",
      "^*",
    ],
    verbose,
    false,
    projectPath,
  );
}

function installNodeModules(
  projectPath: string,
  skipInstall: boolean,
  packageManager: PackageManager,
  verbose: boolean,
) {
  if (skipInstall) {
    return;
  }

  const command = getPackageManagerInstallCommand(packageManager);
  console.log(
    `Installing node modules with "${command}"... (This can take a long time.)`,
  );
  execShellString(command, verbose, false, projectPath);
}

function formatFiles(
  projectPath: string,
  packageManager: PackageManager,
  verbose: boolean,
) {
  const packageManagerExecCommand =
    getPackageManagerExecCommand(packageManager);
  execShell(
    packageManagerExecCommand,
    ["prettier", "--write", projectPath],
    verbose,
    false,
    projectPath,
  );
}
