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

export async function promptGitHubRepoOrGitRemoteURL(
  projectName: string,
  yes: boolean,
  verbose: boolean,
): Promise<string | undefined> {
  // We do not need to prompt the user if they do not have Git installed
  if (!commandExists.sync("git")) {
    console.log(
      'Git does not seem to be installed. (The "git" command is not in the path.) Skipping Git-related things.',
    );
    return undefined;
  }

  validateNewGitVersion(verbose);

  const gitHubUsername = getGitHubUsername(verbose);
  if (gitHubUsername !== undefined) {
    const [exitStatus] = execShell(
      "gh",
      ["repo", "view", projectName],
      verbose,
      true,
    );
    const gitHubRepoExists = exitStatus === 0;
    const url = `https://github.com/${gitHubUsername}/${projectName}`;

    if (gitHubRepoExists) {
      console.log(
        `Detected an existing GitHub repository at: ${chalk.green(url)}`,
      );
      const guessedRemoteURL = getGitRemoteURL(projectName, gitHubUsername);

      if (yes) {
        console.log(
          `Using a Git remote URL of: ${chalk.green(guessedRemoteURL)}`,
        );
        return guessedRemoteURL;
      }

      const shouldUseGuessedURL = await getInputYesNo(
        `Do you want to use a Git remote URL of: ${chalk.green(
          guessedRemoteURL,
        )}`,
      );
      if (shouldUseGuessedURL) {
        return guessedRemoteURL;
      }

      // Assume that since they do not want to connect this project to the existing GitHub
      // repository, they do not want to initialize a remote Git URL at all
      return undefined;
    }

    if (yes) {
      execShell("gh", ["repo", "create", projectName, "--public"]);
      console.log(`Created a new GitHub repository at: ${chalk.green(url)}`);
      return getGitRemoteURL(projectName, gitHubUsername);
    }

    const createNewGitHubRepo = await getInputYesNo(
      `Would you like to create a new GitHub repository at: ${chalk.green(
        url,
      )}`,
    );
    if (createNewGitHubRepo) {
      execShell("gh", ["repo", "create", projectName, "--public"]);
      console.log("Successfully created a new GitHub repository.");
      return getGitRemoteURL(projectName, gitHubUsername);
    }

    // Assume that since they do not want to create a new GitHub repository, they do not want to
    // initialize a remote Git URL at all
    return undefined;
  }

  const gitRemoteURL =
    await getInputString(`Paste in the remote Git URL for your project.
For example, if you have an SSH key, it would be something like:
${chalk.green("git@github.com:Alice/green-candle.git")}
If you don't have an SSH key, it would be something like:
${chalk.green("https://github.com/Alice/green-candle.git")}
If you don't want to initialize a Git repository for this project, press enter to skip.
`);

  return gitRemoteURL === "" ? undefined : gitRemoteURL;
}

function validateNewGitVersion(verbose: boolean) {
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

function getGitHubUsername(verbose: boolean) {
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
  if (!file.exists(githubCLIHostsPath, verbose)) {
    return undefined;
  }

  const configYAMLRaw = file.read(githubCLIHostsPath, verbose);
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

function getGitRemoteURL(projectName: string, gitHubUsername: string) {
  return `git@github.com:${gitHubUsername}/${projectName}.git`;
}

export function initGitRepository(
  projectPath: string,
  gitRemoteURL: string | undefined,
  verbose: boolean,
): void {
  if (!commandExists.sync("git")) {
    return;
  }

  execShell("git", ["init"], verbose, false, projectPath);
  execShell("git", ["branch", "-M", "main"], verbose, false, projectPath);

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

  if (gitRemoteURL !== undefined) {
    execShell(
      "git",
      ["remote", "add", "origin", gitRemoteURL],
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

export function isGitDirty(verbose: boolean): boolean {
  // From: https://remarkablemark.org/blog/2017/10/12/check-git-dirty/
  const [, stdout] = execShell("git", ["status", "--porcelain"], verbose);
  return stdout !== "";
}

export function gitCommitIfChanges(version: string, verbose: boolean): void {
  // Throw an error if this is not a git repository
  execShell("git", ["status"], verbose);

  if (!isGitDirty(verbose)) {
    console.log("There are no changes to commit.");
    return;
  }

  const commitMessage = `v${version}`;
  execShell("git", ["add", "-A"], verbose);
  execShell("git", ["commit", "-m", commitMessage], verbose);
  execShell("git", ["push"], verbose);

  console.log(
    `Committed and pushed to the git repository with a message of: ${commitMessage}`,
  );
}
