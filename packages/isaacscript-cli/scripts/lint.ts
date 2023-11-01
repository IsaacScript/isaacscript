import chalk from "chalk";
import commandExists from "command-exists";
import {
  $,
  $s,
  diff,
  dirName,
  echo,
  exit,
  lintScript,
  readFile,
} from "isaacscript-common-node";
import path from "node:path";

const __dirname = dirName();

const REPO_ROOT = path.join(__dirname, "..");
const LOCAL_GITIGNORE_PATH = path.join(
  REPO_ROOT,
  "file-templates",
  "dynamic",
  "Node.gitignore",
);
const GITIGNORE_URL =
  "https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore";

await lintScript(async () => {
  const promises: Array<Promise<unknown>> = [];

  promises.push($`tsc`, $`eslint --max-warnings 0 .`, checkGitIgnoreUpdates());

  const pythonExists = commandExists.sync("python");
  if (pythonExists) {
    $s`pip install isaac-xml-validator --upgrade --quiet`;
    promises.push($`isaac-xml-validator --quiet`);
  }

  await Promise.all(promises);
});

async function checkGitIgnoreUpdates(): Promise<void> {
  const localGitIgnore = readFile(LOCAL_GITIGNORE_PATH);

  const response = await fetch(GITIGNORE_URL);
  const remoteGitIgnore = await response.text();

  if (localGitIgnore !== remoteGitIgnore) {
    echo('New "Node.gitignore" file:');
    diff(localGitIgnore, remoteGitIgnore);
    echo();
    echo(`Get it at: ${chalk.green(GITIGNORE_URL)}`);

    exit(1);
  }
}
