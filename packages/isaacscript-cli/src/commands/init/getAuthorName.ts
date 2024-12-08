import { fatalError } from "complete-node";
import { getGitHubUsername } from "../../git.js";
import { getInputString } from "../../prompt.js";

export async function getAuthorName(
  typeScript: boolean,
): Promise<string | undefined> {
  const gitHubUsername = getGitHubUsername();
  if (gitHubUsername !== undefined) {
    return gitHubUsername;
  }

  if (!typeScript) {
    // In IsaacScript mods, putting the author in the "package.json" file is not necessary.
    return undefined;
  }

  return await getNewAuthorName();
}

async function getNewAuthorName(): Promise<string> {
  console.log(
    "The author name was not found from the GitHub CLI configuration file.",
  );
  const authorName = await getInputString("Enter the author of the project:");
  if (authorName === "") {
    fatalError("You must enter an author name.");
  }

  return authorName;
}
