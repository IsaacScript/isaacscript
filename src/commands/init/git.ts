import chalk from "chalk";
import commandExists from "command-exists";
import path from "path";
import yaml from "yaml";
import { PROJECT_NAME } from "../../constants";
import { execShell } from "../../exec";
import * as file from "../../file";
import { getInputString, getInputYesNo } from "../../prompt";
import { GitHubCLIHostsYAML } from "../../types/GitHubCLIHostsYAML";
import { error, parseSemVer } from "../../utils";

const REQUIRED_GIT_MAJOR_VERSION = 2;
const REQUIRED_GIT_MINOR_VERSION = 30;

export async function getGitRemoteURL(
  projectName: string,
  verbose: boolean,
): Promise<string | null> {
  // We do not need to prompt the user if they do not have Git installed
  if (!commandExists.sync("git")) {
    console.log(
      'Git does not seem to be installed. (The "git" command is not in the path.) Skipping Git-related things.',
    );
    return null;
  }

  checkOldGitVersion(verbose);

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

  const gitRemoteURL =
    await getInputString(`Paste in the remote Git URL for your project.
For example, if you have an SSH key, it would be something like:
${chalk.green("git@github.com:Alice/green-candle.git")}
If you don't have an SSH key, it would be something like:
${chalk.green("https://github.com/Alice/green-candle.git")}
If you don't want to initialize a Git repository for this project, press enter to skip.
`);
  return gitRemoteURL === "" ? null : gitRemoteURL;
}

function checkOldGitVersion(verbose: boolean) {
  const [, stdout] = execShell("git", ["--version"], verbose);

  const outputPrefix = "git version ";
  if (!stdout.startsWith(outputPrefix)) {
    error(
      `Failed to parse the output from the "git --version" command: ${stdout}`,
    );
  }

  const gitVersionString = stdout.slice(outputPrefix.length);
  const [majorVersion, minorVersion] = parseSemVer(gitVersionString);

  if (
    majorVersion >= REQUIRED_GIT_MAJOR_VERSION &&
    minorVersion >= REQUIRED_GIT_MINOR_VERSION
  ) {
    return;
  }

  console.error(`Your Git version is: ${chalk.red(gitVersionString)}`);
  console.error(
    `${PROJECT_NAME} requires a Git version of ${chalk.red(
      `${REQUIRED_GIT_MAJOR_VERSION}.${REQUIRED_GIT_MINOR_VERSION}.0`,
    )} or greater.`,
  );
  console.error(
    `Please upgrade your version of Git before using ${PROJECT_NAME}.`,
  );
  process.exit(1);
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

export function initGitRepository(
  projectPath: string,
  remoteURL: string | null,
  verbose: boolean,
): void {
  // We already checked to see if the "git" command is installed earlier on in the initialization
  // process
  if (remoteURL === null) {
    return;
  }

  execShell("git", ["init"], verbose, false, projectPath);
  execShell("git", ["branch", "-M", "main"], verbose, false, projectPath);
  execShell(
    "git",
    ["remote", "add", "origin", remoteURL],
    verbose,
    false,
    projectPath,
  );
  if (isGitNameAndEmailConfigured(verbose)) {
    execShell("git", ["add", "--all"], verbose, false, projectPath);
    execShell(
      "git",
      ["commit", "--message", `${PROJECT_NAME} template`],
      verbose,
      false,
      projectPath,
    );
  }
}

function isGitNameAndEmailConfigured(verbose: boolean) {
  const [nameExitStatus] = execShell(
    "git",
    ["config", "--global", "user.name"],
    verbose,
    true,
  );

  const [emailExitStatus] = execShell(
    "git",
    ["config", "--global", "user.email"],
    verbose,
    true,
  );

  return nameExitStatus === 0 && emailExitStatus === 0;
}
