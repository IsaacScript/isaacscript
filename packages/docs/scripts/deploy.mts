import {
  $op,
  appendFile,
  cp,
  echo,
  exit,
  fatalError,
  getArgs,
  isGitRepositoryClean,
  isGitRepositoryLatestCommit,
  mv,
  rm,
  sleep,
} from "complete-node";
import path from "node:path";

const DOCS_REPO_NAME = "isaacscript.github.io";
const GITHUB_PAGES_URL = `https://${DOCS_REPO_NAME}/isaacscript-common/core/constants/index.html`;
const SECONDS_TO_SLEEP = 10;

const PACKAGE_ROOT = path.resolve(import.meta.dirname, "..");
const BUILD_DIRECTORY_PATH = path.join(PACKAGE_ROOT, "build");
const REPO_ROOT = path.resolve(PACKAGE_ROOT, "..", "..");
const DOCS_REPO = path.join(REPO_ROOT, DOCS_REPO_NAME);
const DOCS_REPO_GIT = path.join(DOCS_REPO, ".git");
const DOCS_REPO_GIT_BACKUP = `/tmp/${DOCS_REPO_NAME}.git`;

// Validate environment variables.
const GITHUB_OUTPUT_FILE = process.env["GITHUB_OUTPUT"];
if (GITHUB_OUTPUT_FILE === undefined || GITHUB_OUTPUT_FILE === "") {
  fatalError("Failed to read the environment variable: GITHUB_OUTPUT");
}

// Validate command-line arguments.
const args = getArgs();
const commitSHA1 = args[0];
if (commitSHA1 === undefined || commitSHA1 === "") {
  echo("Error: The SHA1 of the commit is required as an argument.");
  exit(1);
}

// The website repository will be already cloned at this point by the previous GitHub action,
// including switching to the "gh-pages" branch. See "ci.yml" for more information.
mv(DOCS_REPO_GIT, DOCS_REPO_GIT_BACKUP);
rm(DOCS_REPO);
cp(BUILD_DIRECTORY_PATH, DOCS_REPO);
mv(DOCS_REPO_GIT_BACKUP, DOCS_REPO_GIT);

if (isGitRepositoryClean(DOCS_REPO)) {
  echo("There are no documentation website changes to deploy.");
  exit();
}

// Ensure that the checked out version of this repository is the latest version. (It is possible
// that another commit has been pushed in the meantime, in which case we should do nothing and wait
// for the CI on that commit to finish.)
// https://stackoverflow.com/questions/3258243/check-if-pull-needed-in-git
if (!isGitRepositoryLatestCommit(REPO_ROOT)) {
  echo(
    "A more recent commit was found in the repository; skipping website deployment.",
  );
  exit();
}

echo(`Deploying changes to the documentation website: ${DOCS_REPO_NAME}`);
const $$ = $op({ cwd: DOCS_REPO });
$$.sync`git config --global user.email "github-actions@users.noreply.github.com"`;
$$.sync`git config --global user.name "github-actions"`;
// We overwrite the previous commit instead of adding a new one in order to keep the size of the
// repository as small as possible. This speeds up deployment because with thousands of commits, it
// takes a very long time to clone.
$$.sync`git add --all`;
$$.sync`git commit --message deploy --amend`;
$$.sync`git push --force-with-lease`;

// Wait for the website to be be live (which usually takes around 5 minutes).
const shortCommitSHA1 = commitSHA1.slice(0, 7);
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
while (true) {
  if (!isGitRepositoryLatestCommit(REPO_ROOT)) {
    echo(
      "A more recent commit was found in the repository; skipping website scraping.",
    );
    exit(0);
  }

  const request = await fetch(GITHUB_PAGES_URL); // eslint-disable-line no-await-in-loop
  const text = await request.text(); // eslint-disable-line no-await-in-loop
  if (text.includes(shortCommitSHA1)) {
    echo(
      'Found a link on "$GITHUB_PAGES_URL" matching the short commit of: $SHORT_COMMIT_SHA1',
    );
    break;
  }

  echo(
    `The latest version of the site (${shortCommitSHA1}) has not yet been deployed to GitHub Pages. Sleeping for ${SECONDS_TO_SLEEP} seconds.`,
  );
  await sleep(SECONDS_TO_SLEEP); // eslint-disable-line no-await-in-loop
}

appendFile(GITHUB_OUTPUT_FILE, "SHOULD_SCRAPE=1\n");
