import { $o } from "./execa.js";

export function isGitClean(): boolean {
  const gitStatus = $o`git status --porcelain`;
  return gitStatus === "";
}
