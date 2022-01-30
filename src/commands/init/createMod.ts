import chalk from "chalk";
import commandExists from "command-exists";
import path from "path";
import yaml from "yaml";
import * as configFile from "../../configFile";
import {
  GITIGNORE,
  GITIGNORE_TEMPLATE_PATH,
  MAIN_TS,
  MAIN_TS_TEMPLATE_PATH,
  METADATA_VDF,
  METADATA_VDF_TEMPLATE_PATH,
  METADATA_XML,
  METADATA_XML_TEMPLATE_PATH,
  PACKAGE_JSON,
  PACKAGE_JSON_TEMPLATE_PATH,
  PROJECT_NAME,
  README_MD,
  README_MD_TEMPLATES_PATH,
  TEMPLATES_STATIC_DIR,
} from "../../constants";
import * as file from "../../file";
import { getInputString, getInputYesNo } from "../../prompt";
import { GitHubCLIHostsYAML } from "../../types/GitHubCLIHostsYAML";
import { execShell } from "../../util";

export async function createMod(
  projectName: string,
  projectPath: string,
  createNewDir: boolean,
  modsDirectory: string,
  saveSlot: number,
  skipNPMInstall: boolean,
): Promise<void> {
  if (createNewDir) {
    file.makeDir(projectPath);
  }

  const config = configFile.createObject(modsDirectory, saveSlot);
  configFile.createFile(projectPath, config);
  const targetModDirectory = path.join(config.modsDirectory, projectName);

  makeSubdirectories(projectPath);
  copyStaticFiles(projectPath);
  copyDynamicFiles(projectName, projectPath, targetModDirectory);
  updateNodeModules(projectPath);
  await initGitRepository(projectPath, projectName);
  installNodeModules(projectPath, skipNPMInstall);

  console.log(`Successfully created mod: ${chalk.green(projectName)}`);
}

function makeSubdirectories(projectPath: string) {
  // The "src" directory is created during copying of static files
  for (const subdirectory of ["mod"]) {
    const srcPath = path.join(projectPath, subdirectory);
    file.makeDir(srcPath);
  }
}

// Copy static files, like ".eslintrc.js", "tsconfig.json", etc.
function copyStaticFiles(projectPath: string) {
  const staticFileList = file.getDirList(TEMPLATES_STATIC_DIR);
  staticFileList.forEach((fileName: string) => {
    const templateFilePath = path.join(TEMPLATES_STATIC_DIR, fileName);
    const destinationFilePath = path.join(projectPath, fileName);
    if (!file.exists(destinationFilePath)) {
      file.copy(templateFilePath, destinationFilePath);
    }
  });
}

// Copy files that need to have text replaced inside of them
function copyDynamicFiles(
  projectName: string,
  projectPath: string,
  targetModDirectory: string,
) {
  // ".gitignore"
  {
    const fileName = GITIGNORE;
    const templatePath = GITIGNORE_TEMPLATE_PATH;
    const template = file.read(templatePath);

    // Prepend a header with the project name
    let separatorLine = "# ";
    for (let i = 0; i < projectName.length; i++) {
      separatorLine += "-";
    }
    separatorLine += "\n";
    const gitignoreHeader = `${separatorLine}# ${projectName}\n${separatorLine}\n`;
    const gitignore = gitignoreHeader + template;

    const destinationPath = path.join(projectPath, `.${fileName}`); // We need to prepend a period
    file.write(destinationPath, gitignore);
  }

  // "package.json"
  {
    // Modify and copy the file
    const fileName = PACKAGE_JSON;
    const templatePath = PACKAGE_JSON_TEMPLATE_PATH;
    const template = file.read(templatePath);
    const packageJSON = template.replace(/MOD_NAME_TO_REPLACE/g, projectName);
    const destinationPath = path.join(projectPath, fileName);
    file.write(destinationPath, packageJSON);
  }

  // "README.md"
  {
    const fileName = README_MD;
    const templatePath = README_MD_TEMPLATES_PATH;
    const template = file.read(templatePath);
    const readmeMD = template.replace(/MOD_NAME_TO_REPLACE/g, projectName);
    const destinationPath = path.join(projectPath, fileName);
    file.write(destinationPath, readmeMD);
  }

  // "mod/metadata.xml"
  {
    const fileName = METADATA_XML;
    const templatePath = METADATA_XML_TEMPLATE_PATH;
    const template = file.read(templatePath);
    const metadataXML = template.replace(/MOD_NAME_TO_REPLACE/g, projectName);
    const modPath = path.join(projectPath, "mod");
    const destinationPath = path.join(modPath, fileName);
    file.write(destinationPath, metadataXML);
  }

  // "mod/metadata.vdf"
  {
    const fileName = METADATA_VDF;
    const templatePath = METADATA_VDF_TEMPLATE_PATH;
    const template = file.read(templatePath);
    const metadataVDF = template.replace(/MOD_TARGET_DIR/g, targetModDirectory);
    const modPath = path.join(projectPath, "mod");
    const destinationPath = path.join(modPath, fileName);
    file.write(destinationPath, metadataVDF);
  }

  // "src/main.ts"
  {
    // Convert snake_case and kebab-case to camelCase
    // (kebab-case in particular will make the example TypeScript file fail to compile)
    const srcPath = path.join(projectPath, "src");
    const fileName = MAIN_TS;
    const templatePath = MAIN_TS_TEMPLATE_PATH;
    const template = file.read(templatePath);
    const mainTS = template.replace(/MOD_NAME_TO_REPLACE/g, projectName);
    const destinationPath = path.join(srcPath, fileName);
    file.write(destinationPath, mainTS);
  }
}

async function initGitRepository(projectPath: string, projectName: string) {
  if (!commandExists.sync("git")) {
    console.log(
      'Git does not seem to be installed. (The "git" command is not in the path.) Skipping Git-related things.',
    );
    return;
  }

  const remoteURL = await getGitRemoteURL(projectName);
  if (remoteURL === "") {
    return;
  }

  execShell("git", ["init"], false, projectPath);
  execShell("git", ["branch", "-M", "main"], false, projectPath);
  execShell("git", ["remote", "add", "origin", remoteURL], false, projectPath);
  if (isGitNameAndEmailConfigured()) {
    execShell("git", ["add", "--all"], false, projectPath);
    execShell(
      "git",
      ["commit", "--message", `${PROJECT_NAME} template`],
      false,
      projectPath,
    );
  }
}

async function getGitRemoteURL(projectName: string) {
  const guessedRemoteURL = guessRemoteURL(projectName);
  if (guessedRemoteURL !== undefined) {
    const shouldUseGuessedURL = await getInputYesNo(
      `Do you want to use a Git remote URL of: ${chalk.green(
        guessedRemoteURL,
      )}`,
    );
    if (shouldUseGuessedURL) {
      return guessedRemoteURL;
    }
  }

  return getInputString(`Paste in the remote Git URL for your project.
For example, if you have an SSH key, it would be something like:
${chalk.green("git@github.com:Alice/green-candle.git")}
If you don't have an SSH key, it would be something like:
${chalk.green("https://github.com/Alice/green-candle.git")}
If you don't want to initialize a Git repository for this project, press enter to skip.
`);
}

function guessRemoteURL(projectName: string) {
  const gitHubUsername = getGitHubUsername();
  if (gitHubUsername === undefined) {
    return undefined;
  }

  return `git@github.com:${gitHubUsername}/${projectName}.git`;
}

function getGitHubUsername() {
  // If the GitHub CLI is installed, we can derive the user's GitHub username
  if (
    !commandExists.sync("gh") ||
    process.env.APPDATA === undefined ||
    process.env.APPDATA === ""
  ) {
    return undefined;
  }

  const githubCLIHostsPath = path.join(
    process.env.APPDATA,
    "GitHub CLI",
    "hosts.yml",
  );
  if (!file.exists(githubCLIHostsPath)) {
    return undefined;
  }

  const configYAMLRaw = file.read(githubCLIHostsPath);
  const configYAML = yaml.parse(configYAMLRaw) as GitHubCLIHostsYAML;

  const githubCom = configYAML["github.com"];
  if (githubCom === undefined) {
    return undefined;
  }

  const { user } = githubCom;
  if (user === "") {
    return undefined;
  }

  return user;
}

function isGitNameAndEmailConfigured() {
  const [nameExitStatus] = execShell(
    "git",
    ["config", "--global", "user.name"],
    true,
  );

  const [emailExitStatus] = execShell(
    "git",
    ["config", "--global", "user.email"],
    true,
  );

  return nameExitStatus === 0 && emailExitStatus === 0;
}

function updateNodeModules(projectPath: string) {
  console.log("Finding out the latest versions of the NPM packages...");
  execShell(
    "npx",
    ["npm-check-updates", "--upgrade", "--packageFile", "package.json"],
    false,
    projectPath,
  );
}

function installNodeModules(projectPath: string, skipNPMInstall: boolean) {
  if (skipNPMInstall) {
    return;
  }

  console.log("Installing node modules... (This can take a long time.)");
  execShell("npm", ["install"], false, projectPath);
}
