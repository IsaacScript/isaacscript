import chalk from "chalk";
import path from "path";
import * as configFile from "../../configFile";
import {
  CI_YML,
  CI_YML_TEMPLATE_PATH,
  GITIGNORE,
  GITIGNORE_TEMPLATE_PATH,
  MAIN_TS,
  MAIN_TS_TEMPLATE_PATH,
  METADATA_XML,
  METADATA_XML_TEMPLATE_PATH,
  PACKAGE_JSON,
  PACKAGE_JSON_TEMPLATE_PATH,
  README_MD,
  README_MD_TEMPLATES_PATH,
  TEMPLATES_STATIC_DIR,
} from "../../constants";
import { PackageManager } from "../../enums/PackageManager";
import { execShell } from "../../exec";
import * as file from "../../file";
import {
  getPackageManagerInstallCICommand,
  getPackageManagerInstallCommand,
  getPackageManagerLockFileName,
} from "../../packageManager";
import { repeat } from "../../utils";
import { initGitRepository } from "./git";

export function createMod(
  projectName: string,
  projectPath: string,
  createNewDir: boolean,
  modsDirectory: string,
  saveSlot: number,
  gitRemoteURL: string | undefined,
  skipInstall: boolean,
  packageManager: PackageManager,
  verbose: boolean,
): void {
  if (createNewDir) {
    file.makeDir(projectPath, verbose);
  }

  const config = configFile.createObject(modsDirectory, saveSlot);
  configFile.createFile(projectPath, config, verbose);

  copyStaticFiles(projectPath, verbose);
  copyDynamicFiles(projectName, projectPath, packageManager, verbose);
  updateNodeModules(projectPath, verbose);
  installNodeModules(projectPath, skipInstall, packageManager, verbose);
  formatFiles(projectPath, verbose);

  // Only make the initial commit once all of the files have been copied and formatted.
  initGitRepository(projectPath, gitRemoteURL, verbose);

  console.log(`Successfully created mod: ${chalk.green(projectName)}`);
}

/** Copy static files, like ".eslintrc.js", "tsconfig.json", etc. */
function copyStaticFiles(projectPath: string, verbose: boolean) {
  const staticFileList = file.getDirList(TEMPLATES_STATIC_DIR, verbose);
  staticFileList.forEach((fileName: string) => {
    const templateFilePath = path.join(TEMPLATES_STATIC_DIR, fileName);
    const destinationFilePath = path.join(projectPath, fileName);
    if (!file.exists(destinationFilePath, verbose)) {
      file.copy(templateFilePath, destinationFilePath, verbose);
    }
  });

  // Rename ".eslintrc.js.template" to ".eslintrc.js". (If it is kept as ".eslintrc.js", then local
  // linting will fail.)
  const ESLintConfigPath = path.join(projectPath, ".eslintrc.js.template");
  const correctESLintConfigPath = path.join(projectPath, ".eslintrc.js");
  file.rename(ESLintConfigPath, correctESLintConfigPath, verbose);

  // Rename "gitattributes" to ".gitattributes". (If it is kept as ".gitattributes", then it won't
  // be committed to git.)
  const gitAttributesPath = path.join(projectPath, "gitattributes");
  const correctGitAttributesPath = path.join(projectPath, ".gitattributes");
  file.rename(gitAttributesPath, correctGitAttributesPath, verbose);

  // Rename "cspell.json.template" to "cspell.json". (If it is kept as "cspell.json", then local
  // spell checking will fail.)
  const cSpellConfigPath = path.join(projectPath, "cspell.json.template");
  const correctCSpellConfigPath = path.join(projectPath, "cspell.json");
  file.rename(cSpellConfigPath, correctCSpellConfigPath, verbose);
}

/** Copy files that need to have text replaced inside of them. */
function copyDynamicFiles(
  projectName: string,
  projectPath: string,
  packageManager: PackageManager,
  verbose: boolean,
) {
  const workflowsPath = path.join(projectPath, ".github", "workflows");
  file.makeDir(workflowsPath, verbose);

  // `.github/workflows/ci.yml`
  {
    const fileName = CI_YML;
    const templatePath = CI_YML_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);

    const lockFileName = getPackageManagerLockFileName(packageManager);
    const installCommand = getPackageManagerInstallCICommand(packageManager);
    const ciYML = template
      .replace(/PACKAGE-MANAGER-NAME/g, packageManager)
      .replace(/PACKAGE-MANAGER-LOCK-FILE-NAME/, lockFileName)
      .replace(/PACKAGE-MANAGER-INSTALL/, installCommand);

    const destinationPath = path.join(workflowsPath, fileName);
    file.write(destinationPath, ciYML, verbose);
  }

  // `.gitignore`
  {
    const fileName = GITIGNORE;
    const templatePath = GITIGNORE_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);

    // Prepend a header with the project name.
    let separatorLine = "# ";
    repeat(projectName.length, () => {
      separatorLine += "-";
    });
    separatorLine += "\n";
    const gitignoreHeader = `${separatorLine}# ${projectName}\n${separatorLine}\n`;
    const gitignore = gitignoreHeader + template;

    const destinationPath = path.join(projectPath, `.${fileName}`); // We need to prepend a period
    file.write(destinationPath, gitignore, verbose);
  }

  // `package.json`
  {
    // Modify and copy the file.
    const fileName = PACKAGE_JSON;
    const templatePath = PACKAGE_JSON_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);
    const packageJSON = template.replace(/MOD-NAME-TO-REPLACE/g, projectName);
    const destinationPath = path.join(projectPath, fileName);
    file.write(destinationPath, packageJSON, verbose);
  }

  // `README.md`
  {
    const fileName = README_MD;
    const templatePath = README_MD_TEMPLATES_PATH;
    const template = file.read(templatePath, verbose);
    const readmeMD = template.replace(/MOD-NAME-TO-REPLACE/g, projectName);
    const destinationPath = path.join(projectPath, fileName);
    file.write(destinationPath, readmeMD, verbose);
  }

  const modPath = path.join(projectPath, "mod");
  file.makeDir(modPath, verbose);

  // `mod/metadata.xml`
  {
    const fileName = METADATA_XML;
    const templatePath = METADATA_XML_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);
    const metadataXML = template.replace(/MOD-NAME-TO-REPLACE/g, projectName);
    const destinationPath = path.join(modPath, fileName);
    file.write(destinationPath, metadataXML, verbose);
  }

  const srcPath = path.join(projectPath, "src");
  file.makeDir(srcPath, verbose);

  // `src/main.ts`
  {
    // Convert snake_case and kebab-case to camelCase. (Kebab-case in particular will make the
    // example TypeScript file fail to compile.)
    const fileName = MAIN_TS;
    const templatePath = MAIN_TS_TEMPLATE_PATH;
    const template = file.read(templatePath, verbose);
    const mainTS = template.replace(/MOD-NAME-TO-REPLACE/g, projectName);
    const destinationPath = path.join(srcPath, fileName);
    file.write(destinationPath, mainTS, verbose);
  }
}

/** The "package.json" file has to be copied first before this step. */
function updateNodeModules(projectPath: string, verbose: boolean) {
  console.log(
    'Finding out the latest versions of the packages with "npm-check-updates"...',
  );
  execShell(
    "npx",
    ["npm-check-updates", "--upgrade", "--packageFile", "package.json"],
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

  const [command, args] = getPackageManagerInstallCommand(packageManager);
  const commandString = `${command} ${args.join(" ")}`;
  console.log(
    `Installing node modules with "${commandString}"... (This can take a long time.)`,
  );
  execShell(command, args, verbose, false, projectPath);
}

function formatFiles(projectPath: string, verbose: boolean) {
  execShell(
    "npx",
    ["prettier", "--write", projectPath],
    verbose,
    false,
    projectPath,
  );
}
