import { Command, Option } from "@commander-js/extra-typings";
import chalk from "chalk";
import commandExists from "command-exists";
import type { PackageManager } from "isaacscript-common-node";
import { getPackageManagerExecCommand } from "isaacscript-common-node";
import path from "node:path";
import { printBanner } from "../../banner.js";
import { CWD, PROJECT_NAME } from "../../constants.js";
import { promptGitHubRepoOrGitRemoteURL } from "../../git.js";
import { getPackageManagerUsedForNewProject } from "../../packageManager.js";
import { checkIfProjectPathExists } from "./checkIfProjectPathExists.js";
import { checkModSubdirectory } from "./checkModSubdirectory.js";
import { checkModTargetDirectory } from "./checkModTargetDirectory.js";
import { createProject } from "./createProject.js";
import { getAuthorName } from "./getAuthorName.js";
import { getModsDirectory } from "./getModsDirectory.js";
import { getProjectPath } from "./getProjectPath.js";
import { getSaveSlot } from "./getSaveSlot.js";
import { installVSCodeExtensions } from "./installVSCodeExtensions.js";
import { promptVSCode } from "./promptVSCode.js";

export const initCommand = new Command()
  .command("init [name]")
  .description(`Initialize a new ${PROJECT_NAME} mod.`)
  .helpOption("-h, --help", "Display the list of options for this command.")
  .option(
    "-y, --yes",
    'Answer yes to every dialog option, similar to how "npm init --yes" works.',
    false,
  )
  .option(
    "--use-current-dir",
    "Use the current directory as the root for the project.",
    false,
  )
  .option(
    "-m, --mods-directory <directory>",
    "The directory where Isaac mods live on your system.",
  )
  .addOption(
    new Option(
      "-s, --save-slot <slot>",
      "The in-game save slot that you use to test the mod.",
    ).choices(["1", "2", "3"]),
  )
  .option("--vscode", "Open the project in VSCode after initialization.", false)
  .option("--npm", "Use npm as the package manager.", false)
  .option("--yarn", "Use Yarn as the package manager.", false)
  .option("--pnpm", "Use pnpm as the package manager.", false)
  .option("--no-git", "Do not initialize Git.", false)
  .option(
    "--skip-install",
    "Do not automatically install the dependencies after initializing the project.",
    false,
  )
  .option(
    "-f, --force-name",
    "Allow project names that are normally illegal",
    false,
  )
  .option(
    "-d, --dev",
    "Link the resulting mod to the local development version of isaacscript-common.",
    false,
  )
  .option("-v, --verbose", "Enable verbose output.", false)
  .action(async (name, options) => {
    await init(name, options, false);
  });

export const initTSCommand = new Command()
  .command("init-ts [name]")
  .description("Initialize a new TypeScript project.")
  .helpOption("-h, --help", "Display the list of options for this command.")
  .option(
    "-y, --yes",
    'Answer yes to every dialog option, similar to how "npm init --yes" works.',
    false,
  )
  .option(
    "--use-current-dir",
    "Use the current directory as the root for the project.",
    false,
  )
  .option("--vscode", "Open the project in VSCode after initialization.", false)
  .option("--npm", "Use npm as the package manager.", false)
  .option("--yarn", "Use Yarn as the package manager.", false)
  .option("--pnpm", "Use pnpm as the package manager.", false)
  .option("--no-git", "Do not initialize Git.", false)
  .option(
    "--skip-install",
    "Do not automatically install the dependencies after initializing the project.",
    false,
  )
  .option(
    "-f, --force-name",
    "Allow project names that are normally illegal",
    false,
  )
  .option("-v, --verbose", "Enable verbose output.", false)
  .action(async (name, options) => {
    await init(name, options, true);
  });

const initOptions = initCommand.opts();
const initTSOptions = initTSCommand.opts();
type InitOptions = typeof initOptions | typeof initTSOptions;

export async function init(
  name: string | undefined,
  options: InitOptions,
  typeScript: boolean,
): Promise<void> {
  const { forceName, git, skipInstall, useCurrentDir, verbose, vscode, yes } =
    options;

  printBanner();

  const packageManager = getPackageManagerUsedForNewProject(options);

  // Prompt the end-user for some information (and validate it as we go).
  const [projectPath, createNewDir] = await getProjectPath(
    name,
    useCurrentDir,
    yes,
    forceName,
  );
  await checkIfProjectPathExists(projectPath, yes);

  const projectName = path.basename(projectPath);
  const authorName = await getAuthorName(typeScript);
  const dev = "dev" in options ? options.dev : false;
  const gitRemoteURL = await promptGitHubRepoOrGitRemoteURL(
    projectName,
    yes,
    git,
    dev,
    verbose,
  );

  const modsDirectoryOption =
    "modsDirectory" in options ? options.modsDirectory : undefined;
  const modsDirectory = typeScript
    ? undefined
    : await getModsDirectory(modsDirectoryOption);
  if (modsDirectory !== undefined) {
    checkModSubdirectory(projectPath, modsDirectory);
    await checkModTargetDirectory(modsDirectory, projectName, yes);
  }

  const saveSlotOption = "saveSlot" in options ? options.saveSlot : undefined;
  const saveSlot = typeScript
    ? undefined
    : await getSaveSlot(saveSlotOption, yes);

  // Now that we have asked the user all of the questions we need, we can create the project.
  await createProject(
    projectName,
    authorName,
    projectPath,
    createNewDir,
    modsDirectory,
    saveSlot,
    gitRemoteURL,
    skipInstall,
    packageManager,
    typeScript,
    dev,
    verbose,
  );

  await openVSCode(projectPath, vscode, yes, verbose);
  printFinishMessage(projectPath, projectName, packageManager, typeScript);
}

async function openVSCode(
  projectPath: string,
  vscode: boolean,
  yes: boolean,
  verbose: boolean,
) {
  const VSCodeCommand = getVSCodeCommand();
  if (VSCodeCommand === undefined) {
    console.log(
      'VSCode does not seem to be installed. (The "code" command is not in the path.) Skipping VSCode-related things.',
    );
    return;
  }

  installVSCodeExtensions(projectPath, VSCodeCommand, verbose);
  await promptVSCode(projectPath, VSCodeCommand, vscode, yes, verbose);
}

function getVSCodeCommand(): string | undefined {
  for (const VSCodeCommand of ["code", "codium", "code-oss", "code-insiders"]) {
    if (commandExists.sync(VSCodeCommand)) {
      return VSCodeCommand;
    }
  }

  return undefined;
}

function printFinishMessage(
  projectPath: string,
  projectName: string,
  packageManager: PackageManager,
  typeScript: boolean,
) {
  if (typeScript) {
    return;
  }

  let commandsToType = "";
  if (projectPath !== CWD) {
    commandsToType += `"${chalk.green(`cd ${projectName}`)}" and `;
  }
  const command = getPackageManagerExecCommand(packageManager);
  commandsToType += `"${chalk.green(`${command} isaacscript`)}"`;
  console.log(`Now, start ${PROJECT_NAME} by typing ${commandsToType}.`);
}
