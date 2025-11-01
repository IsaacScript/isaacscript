import chalk from "chalk";
import { $, diff, echo, exit, lintCommands, readFile } from "complete-node";
import path from "node:path";

const PACKAGE_ROOT = path.resolve(import.meta.dirname, "..");
const LOCAL_GITIGNORE_PATH = path.join(
  PACKAGE_ROOT,
  "file-templates",
  "dynamic",
  "Node.gitignore",
);
const GITIGNORE_URL =
  "https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore";

await $`pip install isaac-xml-validator --upgrade --quiet`;

await lintCommands(import.meta.dirname, [
  "tsc --noEmit",
  "tsc --noEmit --project ./scripts/tsconfig.json",
  "eslint --max-warnings 0 .",
  "isaac-xml-validator --quiet",
  // eslint-disable-next-line unicorn/prefer-top-level-await
  ["checkGitIgnoreUpdates", checkGitIgnoreUpdates()],
]);

async function checkGitIgnoreUpdates() {
  const localGitIgnore = await readFile(LOCAL_GITIGNORE_PATH);

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
