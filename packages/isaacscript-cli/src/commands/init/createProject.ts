import chalk from "chalk";
import {
  isObject,
  removeLinesBetweenMarkers,
  removeLinesMatching,
  repeat,
} from "complete-common";
import type { PackageManager } from "complete-node";
import {
  copyFileOrDirectory,
  fatalError,
  getFileNamesInDirectory,
  getPackageManagerExecCommand,
  getPackageManagerInstallCICommand,
  getPackageManagerInstallCommand,
  getPackageManagerLockFileName,
  isFile,
  makeDirectory,
  readFile,
  renameFileOrDirectory,
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
  TEMPLATES_DYNAMIC_DIR,
  TEMPLATES_STATIC_DIR,
} from "../../constants.js";
import { execShell, execShellString } from "../../exec.js";
import { initGitRepository } from "../../git.js";

export async function createProject(
  projectName: string,
  projectPath: string,
  createNewDir: boolean,
  modsDirectory: string | undefined,
  saveSlot: number | undefined,
  gitRemoteURL: string | undefined,
  skipInstall: boolean,
  packageManager: PackageManager,
  dev: boolean,
  verbose: boolean,
): Promise<void> {
  if (createNewDir) {
    await makeDirectory(projectPath);
  }

  const config = new Config(modsDirectory, saveSlot, dev);
  await createConfigFile(projectPath, config);

  await copyStaticFiles(projectPath);
  await copyDynamicFiles(projectName, projectPath, packageManager, dev);

  // There is no package manager lock files yet, so we have to pass "false" to this function.
  const updated = await updatePackageJSONDependencies(projectPath, false, true);
  if (!updated) {
    fatalError('Failed to update the dependencies in the "package.json" file.');
  }

  await fixTypeScriptVersionInPackageJSON(projectPath);

  installNodeModules(projectPath, skipInstall, packageManager, verbose);
  formatFiles(projectPath, packageManager, verbose);

  // Only make the initial commit once all of the files have been copied and formatted.
  await initGitRepository(projectPath, gitRemoteURL, verbose);

  console.log(`Successfully created mod: ${chalk.green(projectName)}`);
}

/** Copy static files, like "eslint.config.mjs", "tsconfig.json", etc. */
async function copyStaticFiles(projectPath: string) {
  // First, copy the static files that are shared between TypeScript projects and IsaacScript mods.
  await copyTemplateDirectoryWithoutOverwriting(
    TEMPLATES_STATIC_DIR,
    projectPath,
  );

  // Rename "_gitattributes" to ".gitattributes". (If it is kept as ".gitattributes", then it won't
  // be committed to git.)
  const gitAttributesPath = path.join(projectPath, "_gitattributes");
  const correctGitAttributesPath = path.join(projectPath, ".gitattributes");
  await renameFileOrDirectory(gitAttributesPath, correctGitAttributesPath);

  // Rename "_cspell.config.jsonc" to "cspell.config.jsonc". (If it is kept as
  // "cspell.config.jsonc", then local spell checking will fail.)
  const cSpellConfigPath = path.join(projectPath, "_cspell.config.jsonc");
  const correctCSpellConfigPath = path.join(projectPath, "cspell.config.jsonc");
  await renameFileOrDirectory(cSpellConfigPath, correctCSpellConfigPath);
}

async function copyTemplateDirectoryWithoutOverwriting(
  templateDirPath: string,
  projectPath: string,
) {
  const fileNames = await getFileNamesInDirectory(templateDirPath);
  for (const fileName of fileNames) {
    const templateFilePath = path.join(templateDirPath, fileName);
    const destinationFilePath = path.join(projectPath, fileName);
    // eslint-disable-next-line no-await-in-loop
    const file = await isFile(destinationFilePath);
    if (!file) {
      // eslint-disable-next-line no-await-in-loop
      await copyFileOrDirectory(templateFilePath, destinationFilePath);
    }
  }
}

/** Copy files that need to have text replaced inside of them. */
async function copyDynamicFiles(
  projectName: string,
  projectPath: string,
  packageManager: PackageManager,
  dev: boolean,
) {
  // `.github/workflows/setup/action.yml`
  {
    const fileName = ACTION_YML;
    const templatePath = ACTION_YML_TEMPLATE_PATH;
    const templateRaw = await readFile(templatePath);
    const template = parseTemplate(templateRaw);

    const lockFileName = getPackageManagerLockFileName(packageManager);
    const installCommand = getPackageManagerInstallCICommand(packageManager);
    const actionYML = template
      .replaceAll("PACKAGE_MANAGER_NAME", packageManager)
      .replaceAll("PACKAGE_MANAGER_LOCK_FILE_NAME", lockFileName)
      .replaceAll("PACKAGE_MANAGER_INSTALL_COMMAND", installCommand);

    const setupPath = path.join(projectPath, ".github", "workflows", "setup");
    await makeDirectory(setupPath);
    const destinationPath = path.join(setupPath, fileName);
    await writeFile(destinationPath, actionYML);
  }

  // `.gitignore`
  {
    const templatePath = GITIGNORE_TEMPLATE_PATH;
    const templateRaw = await readFile(templatePath);
    const template = parseTemplate(templateRaw);

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
    const nodeGitIgnore = await readFile(nodeGitIgnorePath);

    // eslint-disable-next-line prefer-template
    const gitignore = gitIgnoreHeader + template + "\n" + nodeGitIgnore;

    // We need to replace the underscore with a period.
    const destinationPath = path.join(projectPath, ".gitignore");
    await writeFile(destinationPath, gitignore);
  }

  // `package.json`
  {
    const packageJSONTemplateFileName = "package.json";
    const templatePath = path.join(
      TEMPLATES_DYNAMIC_DIR,
      packageJSONTemplateFileName,
    );
    const template = await readFile(templatePath);

    const packageJSON = template.replaceAll("project-name", projectName);

    const destinationPath = path.join(projectPath, "package.json");
    await writeFile(destinationPath, packageJSON);
  }

  // `README.md`
  {
    const readmeMDTemplateFileName = "README.md";
    const templatePath = path.join(
      TEMPLATES_DYNAMIC_DIR,
      readmeMDTemplateFileName,
    );
    const template = await readFile(templatePath);

    // "PROJECT-NAME" must be hyphenated, as using an underscore will break Prettier for some
    // reason.
    const installCommand = getPackageManagerInstallCICommand(packageManager);
    const execCommand = getPackageManagerExecCommand(packageManager);
    const readmeMD = template
      .replaceAll("PROJECT-NAME", projectName)
      .replaceAll("PACKAGE-MANAGER-INSTALL-COMMAND", installCommand)
      .replaceAll("PACKAGE-MANAGER-EXEC-COMMAND", execCommand);

    const destinationPath = path.join(projectPath, README_MD);
    await writeFile(destinationPath, readmeMD);
  }

  // `mod/metadata.xml`
  {
    const modPath = path.join(projectPath, "mod");
    await makeDirectory(modPath);

    const fileName = METADATA_XML;
    const templatePath = METADATA_XML_TEMPLATE_PATH;
    const template = await readFile(templatePath);
    const metadataXML = template.replaceAll("PROJECT_NAME", projectName);
    const destinationPath = path.join(modPath, fileName);
    await writeFile(destinationPath, metadataXML);
  }

  const srcPath = path.join(projectPath, "src");
  await makeDirectory(srcPath);

  // `src/main.ts` (TypeScript projects use the simple version from the "static-ts" directory.)
  {
    // Convert snake_case and kebab-case to camelCase. (Kebab-case in particular will make the
    // example TypeScript file fail to compile.)
    const fileName = MAIN_TS;
    const templatePath = MAIN_TS_TEMPLATE_PATH;
    const template = await readFile(templatePath);
    const mainTS = template.replaceAll("PROJECT_NAME", projectName);
    const destinationPath = path.join(srcPath, fileName);
    await writeFile(destinationPath, mainTS);
  }

  // If we are initializing an IsaacScript project intended to be used for development, we can
  // include a better starter file.
  if (dev) {
    const fileName = MAIN_TS;
    const templatePath = MAIN_DEV_TS_TEMPLATE_PATH;
    const template = await readFile(templatePath);
    const mainTS = template; // No replacements are necessary for this file.
    const destinationPath = path.join(srcPath, fileName);
    await writeFile(destinationPath, mainTS);
  }
}

function parseTemplate(template: string): string {
  const otherTemplateKind = "ts";
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
 * Since TypeScriptToLua needs a specific version of TypeScript, the latest version of TypeScript at
 * the time of mod initialization may not work. Thus, we manually retrieve the correct version and
 * manually set it.
 */
async function fixTypeScriptVersionInPackageJSON(projectPath: string) {
  // We need the get the version of TypeScript that corresponds to the latest version of
  // TypeScriptToLua.
  const response = await fetch(
    "https://raw.githubusercontent.com/TypeScriptToLua/TypeScriptToLua/refs/heads/master/package.json",
  );
  const TSTLPackageJSON = await response.json();
  if (!isObject(TSTLPackageJSON)) {
    throw new Error("Failed to parse the TSTL package.json file.");
  }
  const { peerDependencies } = TSTLPackageJSON;
  if (!isObject(peerDependencies)) {
    throw new Error(
      "Failed to parse the peer dependencies in the TSTL package.json file.",
    );
  }

  const TSTLTypeScriptVersion = peerDependencies["typescript"];
  if (typeof TSTLTypeScriptVersion !== "string") {
    throw new TypeError(
      'Failed to parse the "typescript" peer dependency in the TSTL package.json file.',
    );
  }

  const packageJSONPath = path.join(projectPath, "package.json");
  const packageJSON = await readFile(packageJSONPath);
  const updatedPackageJSON = packageJSON.replace(
    /"typescript": "[^"]*"/,
    `"typescript": "${TSTLTypeScriptVersion}"`,
  );
  await writeFile(packageJSONPath, updatedPackageJSON);
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
