import chalk from "chalk";
import {
  parseSemanticVersion,
  removeLinesBetweenMarkers,
  removeLinesMatching,
  repeat,
} from "complete-common";
import {
  PackageManager,
  copyFileOrDirectory,
  deleteFileOrDirectory,
  fatalError,
  getFileNamesInDirectory,
  getPackageManagerExecCommand,
  getPackageManagerInstallCICommand,
  getPackageManagerInstallCommand,
  getPackageManagerLockFileName,
  isFile,
  makeDirectory,
  readFile,
  renameFile,
  updatePackageJSONDependencies,
  writeFile,
} from "complete-node";
import path from "node:path";
import { Config } from "../../classes/Config.js";
import { createConfigFile } from "../../configFile.js";
import {
  ACTION_YML,
  ACTION_YML_TEMPLATE_PATH,
  GITIGNORE_TEMPLATE_PATH,
  MAIN_DEV_TS_TEMPLATE_PATH,
  MAIN_TS,
  MAIN_TS_TEMPLATE_PATH,
  METADATA_XML,
  METADATA_XML_TEMPLATE_PATH,
  README_MD,
  TEMPLATES_DIR,
  TEMPLATES_DYNAMIC_DIR,
  TEMPLATES_STATIC_DIR,
} from "../../constants.js";
import { execShell, execShellString } from "../../exec.js";
import { initGitRepository } from "../../git.js";

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
    makeDirectory(projectPath);
  }

  if (!typeScript) {
    const config = new Config(modsDirectory, saveSlot, dev);
    createConfigFile(projectPath, config);
  }

  copyStaticFiles(projectPath, typeScript);
  copyDynamicFiles(
    projectName,
    authorName,
    projectPath,
    packageManager,
    dev,
    typeScript,
  );
  upgradeYarn(projectPath, packageManager, verbose);

  // There is no package manager lock files yet, so we have to pass "false" to this function.
  const updated = updatePackageJSONDependencies(projectPath, false, true);
  if (!updated) {
    fatalError('Failed to update the dependencies in the "package.json" file.');
  }

  installNodeModules(projectPath, skipInstall, packageManager, verbose);
  formatFiles(projectPath, packageManager, verbose);

  // Only make the initial commit once all of the files have been copied and formatted.
  initGitRepository(projectPath, gitRemoteURL, verbose);

  const noun = typeScript ? "project" : "mod";
  console.log(`Successfully created ${noun}: ${chalk.green(projectName)}`);
}

/** Copy static files, like "eslint.config.mjs", "tsconfig.json", etc. */
function copyStaticFiles(projectPath: string, typeScript: boolean) {
  // First, copy the static files that are shared between TypeScript projects and IsaacScript mods.
  copyTemplateDirectoryWithoutOverwriting(TEMPLATES_STATIC_DIR, projectPath);

  // Second, copy the files that are specific to either a TypeScript project or an IsaacScript mod.
  const staticDirSuffix = typeScript ? "ts" : "mod";
  const staticDirPath = path.join(TEMPLATES_DIR, `static-${staticDirSuffix}`);
  copyTemplateDirectoryWithoutOverwriting(staticDirPath, projectPath);

  // Rename "_gitattributes" to ".gitattributes". (If it is kept as ".gitattributes", then it won't
  // be committed to git.)
  const gitAttributesPath = path.join(projectPath, "_gitattributes");
  const correctGitAttributesPath = path.join(projectPath, ".gitattributes");
  renameFile(gitAttributesPath, correctGitAttributesPath);

  // Rename "_cspell.jsonc" to "cspell.jsonc". (If it is kept as "cspell.jsonc", then local spell
  // checking will fail.)
  const cSpellConfigPath = path.join(projectPath, "_cspell.jsonc");
  const correctCSpellConfigPath = path.join(projectPath, "cspell.jsonc");
  renameFile(cSpellConfigPath, correctCSpellConfigPath);
}

function copyTemplateDirectoryWithoutOverwriting(
  templateDirPath: string,
  projectPath: string,
) {
  const fileNames = getFileNamesInDirectory(templateDirPath);
  for (const fileName of fileNames) {
    const templateFilePath = path.join(templateDirPath, fileName);
    const destinationFilePath = path.join(projectPath, fileName);
    if (!isFile(destinationFilePath)) {
      copyFileOrDirectory(templateFilePath, destinationFilePath);
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
) {
  // `.github/workflows/setup/action.yml`
  {
    const fileName = ACTION_YML;
    const templatePath = ACTION_YML_TEMPLATE_PATH;
    const templateRaw = readFile(templatePath);
    const template = parseTemplate(templateRaw, typeScript);

    const lockFileName = getPackageManagerLockFileName(packageManager);
    const installCommand = getPackageManagerInstallCICommand(packageManager);
    const actionYML = template
      .replaceAll("PACKAGE_MANAGER_NAME", packageManager)
      .replaceAll("PACKAGE_MANAGER_LOCK_FILE_NAME", lockFileName)
      .replaceAll("PACKAGE_MANAGER_INSTALL_COMMAND", installCommand);

    const setupPath = path.join(projectPath, ".github", "workflows", "setup");
    makeDirectory(setupPath);
    const destinationPath = path.join(setupPath, fileName);
    writeFile(destinationPath, actionYML);
  }

  // `.gitignore`
  {
    const templatePath = GITIGNORE_TEMPLATE_PATH;
    const templateRaw = readFile(templatePath);
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
    const nodeGitIgnore = readFile(nodeGitIgnorePath);

    // eslint-disable-next-line prefer-template
    const gitignore = gitIgnoreHeader + template + "\n" + nodeGitIgnore;

    // We need to replace the underscore with a period.
    const destinationPath = path.join(projectPath, ".gitignore");
    writeFile(destinationPath, gitignore);
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
    const template = readFile(templatePath);

    const packageJSON = template
      .replaceAll("PROJECT_NAME", projectName)
      .replaceAll("AUTHOR_NAME", authorName ?? "unknown");

    const destinationPath = path.join(projectPath, "package.json");
    writeFile(destinationPath, packageJSON);
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
    const template = readFile(templatePath);

    // "PROJECT-NAME" must be hyphenated, as using an underscore will break Prettier for some
    // reason.
    const command = getPackageManagerInstallCICommand(packageManager);
    const readmeMD = template
      .replaceAll("PROJECT-NAME", projectName)
      .replaceAll("PACKAGE-MANAGER-INSTALL-COMMAND", command);
    const destinationPath = path.join(projectPath, README_MD);
    writeFile(destinationPath, readmeMD);
  }

  // `mod/metadata.xml`
  if (!typeScript) {
    const modPath = path.join(projectPath, "mod");
    makeDirectory(modPath);

    const fileName = METADATA_XML;
    const templatePath = METADATA_XML_TEMPLATE_PATH;
    const template = readFile(templatePath);
    const metadataXML = template.replaceAll("PROJECT_NAME", projectName);
    const destinationPath = path.join(modPath, fileName);
    writeFile(destinationPath, metadataXML);
  }

  const srcPath = path.join(projectPath, "src");
  makeDirectory(srcPath);

  // `src/main.ts` (TypeScript projects use the simple version from the "static-ts" directory.)
  if (!typeScript) {
    // Convert snake_case and kebab-case to camelCase. (Kebab-case in particular will make the
    // example TypeScript file fail to compile.)
    const fileName = MAIN_TS;
    const templatePath = MAIN_TS_TEMPLATE_PATH;
    const template = readFile(templatePath);
    const mainTS = template.replaceAll("PROJECT_NAME", projectName);
    const destinationPath = path.join(srcPath, fileName);
    writeFile(destinationPath, mainTS);
  }

  // If we are initializing an IsaacScript project intended to be used for development, we can
  // include a better starter file.
  if (!typeScript && dev) {
    const fileName = MAIN_TS;
    const templatePath = MAIN_DEV_TS_TEMPLATE_PATH;
    const template = readFile(templatePath);
    const mainTS = template; // No replacements are necessary for this file.
    const destinationPath = path.join(srcPath, fileName);
    writeFile(destinationPath, mainTS);
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

  // First, check to see if they have already done "corepack enable". If they have not, then yarn
  // might still be on version 1. Otherwise it will be version 3.
  const { stdout } = execShellString("yarn --version", verbose);
  const yarnVersion = parseSemanticVersion(stdout);
  if (yarnVersion === undefined) {
    fatalError(
      `Failed to parse the Yarn version when running the "yarn --version" command: ${stdout}`,
    );
  }
  if (yarnVersion.majorVersion === 1) {
    // They have not done a "corepack enable", so let them use Yarn 1 to reduce the complexity.
    if (verbose) {
      console.log('Yarn 1 detected; skipping ".yarnrc.yml" configuration.');
    }

    return;
  }

  // Yarn v3.5.1 is the default in Node.js v20 (once corepack has been enabled). On this version of
  // node, the command will do two things:
  // - It creates `./.yarn/releases/yarn-#.#.#.cjs`.
  // - It creates the following string in the "package.json" file: `"packageManager": "yarn@#.#.#"`
  execShellString("yarn set version latest", verbose, false, projectPath);

  // Having the "yarn-#.#.#.cjs" file inside of the repository is now discouraged in Yarn 4+, so we
  // can safely delete this directory.
  const yarnDirectoryPath = path.join(projectPath, ".yarn");
  deleteFileOrDirectory(yarnDirectoryPath);

  // - The ".yarnrc.yml" file will now look like this: `yarnPath: .yarn/releases/yarn-4.0.1.cjs`
  // - As mentioned above, we do not need the "yarnPath" setting if the "yarn-#.#.#.cjs" file is not
  //   inside of the repository, so we need to delete it.
  // - Additionally, since there is not a setting specified for "nodeLinker", it will use `pnp`,
  //   which is not desired:
  // https://yarnpkg.com/features/linkers
  //   - `pnp` is the default, but it requires a VSCode extension.
  //   - `pnpm` is fast, but it does not work with a D drive:
  // https://github.com/yarnpkg/berry/issues/5326
  // - Thus, we use `node-modules`, which can be set with: `yarn config set nodeLinker node-modules`
  // - However, in order to fix both of these at the same time, we just overwrite the file, which is
  //   simpler than running commands or manually editing the file.
  const yarnConfigPath = path.join(projectPath, ".yarnrc.yml");
  writeFile(yarnConfigPath, "nodeLinker: node-modules\n");
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
  const command = getPackageManagerExecCommand(packageManager);
  execShell(
    command,
    ["prettier", "--write", projectPath],
    verbose,
    false,
    projectPath,
  );
}
