import { $o, $s } from "./execa.js";

export function isGitRepository(): boolean {
  const returnBase = $s`git rev-parse --is-inside-work-tree`;
  return returnBase.exitCode === 0;
}

export function isGitRepositoryClean(): boolean {
  const gitStatus = $o`git status --porcelain`;
  return gitStatus === "";
}

export function isGitRepositoryLatestCommit(): boolean {
  $s`git fetch`;

  const output1 = $o`git rev-parse HEAD`;
  const output2 = $o`git rev-parse @{u}`;

  return output1 === output2;
}
