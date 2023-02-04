import chalk from "chalk";
import {
  removeLinesBetweenMarkers,
  removeLinesMatching,
  repeat,
} from "isaacscript-common-ts";
import path from "node:path";
import { Config } from "../../classes/Config.js";
import { createConfigFile } from "../../configFile.js";
import {
  CI_YML,
  CI_YML_TEMPLATE_PATH,
  GITIGNORE,
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
import * as file from "../../file.js";
import { initGitRepository } from "../../git.js";
import {
  getPackageManagerInstallCICommand,
  getPackageManagerInstallCommand,
  getPackageManagerLockFileName,
  getPackageManagerNPXCommand,
} from "../../packageManager.js";

const TEMPLATE_MOD_MARKER = "@template-mod";

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
  ts: boolean,
  dev: boolean,
  verbose: boolean,
): void {
  if (createNewDir) {
    file.makeDir(projectPath, verbose);
  }

  const config = new Config(modsDirectory, saveSlot, dev);
  createConfigFile(projectPath, config, ts, verbose);

  copyStaticFiles(projectPath, ts, verbose);
  copyDynamicFiles(
    projectName,
    authorName,
    projectPath,
    packageManager,
    dev,
    ts,
    verbose,
  );
  updateNodeModules(projectPath, packageManager, verbose);
  installNodeModules(projectPath, skipInstall, packageManager, verbose);
  formatFiles(projectPath, packageManager, verbose);

  // Only make the initial commit once all of the files have been copied and formatted.
  initGitRepository(projectPath, gitRemoteURL, verbose);

  const noun = ts ? "project" : "mod";
  console.log(`Successfully created ${noun}: ${chalk.green(projectName)}`);
}

/** Copy static files, like ".eslintrc.cjs", "tsconfig.json", etc. */
function copyStaticFiles(projectPath: string, ts: boolean, verbose: boolean) {
  // First, copy the static files that are shared between TypeScript projects and IsaacScript mods.
  copyTemplateDirectoryWithoutOverwriting(
    TEMPLATES_STATIC_DIR,
    projectPath,
    verbose,
  );

  // Second, copy files that are specific to either a TypeScript project or an IsaacScript mod.
  const staticDirSuffix = ts ? "ts" : "mod";
  const staticDirPath = path.join(TEMPLATES_DIR, `static-${staticDirSuffix}`);
  copyTemplateDirectoryWithoutOverwriting(staticDirPath, projectPath, verbose);

  // Rename ".eslintrc.template.cjs" to ".eslintrc.cjs". (If it is kept as ".eslintrc.cjs", then
  // local linting will fail.)
  const ESLintConfigPath = path.join(projectPath, ".eslintrc.template.cjs");
  const correctESLintConfigPath = path.join(projectPath, ".eslintrc.cjs");
  file.rename(ESLintConfigPath, correctESLintConfigPath, verbose);

  // Rename "gitattributes" to ".gitattributes". (If it is kept as ".gitattributes", then it won't
  // be committed to git.)
  const gitAttributesPath = path.join(projectPath, "gitattributes");
  const correctGitAttributesPath = path.join(projectPath, ".gitattributes");
  file.rename(gitAttributesPath, correctGitAttributesPath, verbose);

  // Rename "cspell.template.json" to "cspell.json". (If it is kept as "cspell.json", then local
  // spell checking will fail.)
  const cSpellConfigPath = path.join(projectPath, "cspell.template.json");
  const correctCSpellConfigPath = path.join(projectPath, "cspell.json");
  file.rename(cSpellConfigPath, correctCSpellConfigPath, verbose);
}

function copyTemplateDirectoryWithoutOverwriting(
  templateDirPath: string,
  projectPath: string,
  verbose: boolean,
) {
  const dirList = file.getDirList(templateDirPath, verbose);

  for (const fileName of dirList) {
    const templateFilePath = path.join(templateDirPath, fileName);
    const destinationFilePath = path.join(projectPath, fileName);
    if (!file.exists(destinationFilePath, verbose)) {
      file.copy(templateFilePath, destinationFilePath, verbose);
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
  ts: boolean,
  verbose: boolean,
) {
  const workflowsPath = path.join(projectPath, ".github", "workflows");
  file.makeDir(workflowsPath, verbose);

  // `.github/workflows/ci.yml`
  {
    const fileName = CI_YML;
    const templatePath = CI_YML_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);

    // There are two versions of the template, one for TypeScript, and one for IsaacScript mods.
    const modifiedTemplate = ts
      ? removeLinesBetweenMarkers(template, TEMPLATE_MOD_MARKER)
      : removeLinesMatching(template, TEMPLATE_MOD_MARKER);

    const lockFileName = getPackageManagerLockFileName(packageManager);
    const installCommand = getPackageManagerInstallCICommand(packageManager);
    const ciYML = modifiedTemplate
      .replaceAll("PACKAGE_MANAGER_NAME", packageManager)
      .replaceAll("PACKAGE_MANAGER_LOCK_FILE_NAME", lockFileName)
      .replaceAll("PACKAGE_MANAGER_INSTALL_COMMAND", installCommand);

    const destinationPath = path.join(workflowsPath, fileName);
    file.write(destinationPath, ciYML, verbose);
  }

  // `.gitignore`
  {
    const fileName = GITIGNORE;
    const templatePath = GITIGNORE_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);

    // There are two versions of the template, one for TypeScript, and one for IsaacScript mods.
    const modifiedTemplate = ts
      ? removeLinesBetweenMarkers(template, TEMPLATE_MOD_MARKER)
      : removeLinesMatching(template, TEMPLATE_MOD_MARKER);

    // Prepend a header with the project name.
    let separatorLine = "# ";
    repeat(projectName.length, () => {
      separatorLine += "-";
    });
    separatorLine += "\n";
    const gitignoreHeader = `${separatorLine}# ${projectName}\n${separatorLine}\n`;
    const gitignore = gitignoreHeader + modifiedTemplate;

    const destinationPath = path.join(projectPath, `.${fileName}`); // We need to prepend a period.
    file.write(destinationPath, gitignore, verbose);
  }

  // `package.json`
  {
    // There are two versions of the template, one for TypeScript, and one for IsaacScript mods.
    const packageJSONTemplateFileName = ts
      ? "package.ts.json"
      : "package.mod.json";
    const templatePath = path.join(
      TEMPLATES_DYNAMIC_DIR,
      packageJSONTemplateFileName,
    );
    const template = file.read(templatePath, verbose);

    const packageJSON = template
      .replaceAll("PROJECT_NAME", projectName)
      .replaceAll("AUTHOR_NAME", authorName ?? "unknown")
      .replaceAll("PACKAGE_MANAGER", packageManager);

    const destinationPath = path.join(projectPath, PACKAGE_JSON);
    file.write(destinationPath, packageJSON, verbose);
  }

  // `README.md`
  {
    // There are two versions of the template, one for TypeScript, and one for IsaacScript mods.
    const readmeMDTemplateFileName = ts ? "README.ts.json" : "README.mod.json";
    const templatePath = path.join(
      TEMPLATES_DYNAMIC_DIR,
      readmeMDTemplateFileName,
    );
    const template = file.read(templatePath, verbose);

    // "PROJECT-NAME" must be hyphenated, as using an underscore will break Prettier for some
    // reason.
    const readmeMD = template.replaceAll("PROJECT-NAME", projectName);
    const destinationPath = path.join(projectPath, README_MD);
    file.write(destinationPath, readmeMD, verbose);
  }

  // `mod/metadata.xml`
  if (!ts) {
    const modPath = path.join(projectPath, "mod");
    file.makeDir(modPath, verbose);

    const fileName = METADATA_XML;
    const templatePath = METADATA_XML_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);
    const metadataXML = template.replaceAll("PROJECT_NAME", projectName);
    const destinationPath = path.join(modPath, fileName);
    file.write(destinationPath, metadataXML, verbose);
  }

  const srcPath = path.join(projectPath, "src");
  file.makeDir(srcPath, verbose);

  // `src/main.ts` (TypeScript projects use the simple version from the "static-ts" directory.)
  if (!ts) {
    // Convert snake_case and kebab-case to camelCase. (Kebab-case in particular will make the
    // example TypeScript file fail to compile.)
    const fileName = MAIN_TS;
    const templatePath = MAIN_TS_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);
    const mainTS = template.replaceAll("PROJECT_NAME", projectName);
    const destinationPath = path.join(srcPath, fileName);
    file.write(destinationPath, mainTS, verbose);
  }

  // If we are initializing an IsaacScript project intended to be used for development, we can
  // include a better starter file.
  if (!ts && dev) {
    const fileName = MAIN_TS;
    const templatePath = MAIN_DEV_TS_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);
    const mainTS = template; // No replacements are necessary for this file.
    const destinationPath = path.join(srcPath, fileName);
    file.write(destinationPath, mainTS, verbose);
  }
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
  const packageManagerNPXCommand = getPackageManagerNPXCommand(packageManager);
  execShell(
    packageManagerNPXCommand,
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
  const packageManagerNPXCommand = getPackageManagerNPXCommand(packageManager);
  execShell(
    packageManagerNPXCommand,
    ["prettier", "--write", projectPath],
    verbose,
    false,
    projectPath,
  );
}
