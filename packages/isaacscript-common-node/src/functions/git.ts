import { $op } from "./execa.js";

export function isGitRepository(gitRepositoryDirectoryPath: string): boolean {
  const $$ = $op({ cwd: gitRepositoryDirectoryPath });
  const returnBase = $$.sync`git rev-parse --is-inside-work-tree`;
  return returnBase.exitCode === 0;
}

export function isGitRepositoryClean(
  gitRepositoryDirectoryPath: string,
): boolean {
  const $$ = $op({ cwd: gitRepositoryDirectoryPath });
  const gitStatus = $$.sync`git status --porcelain`.stdout;
  return gitStatus === "";
}

export function isGitRepositoryLatestCommit(
  gitRepositoryDirectoryPath: string,
): boolean {
  const $$ = $op({ cwd: gitRepositoryDirectoryPath });
  $$.sync`git fetch`;

  const output1 = $$.sync`git rev-parse HEAD`.stdout;
  const output2 = $$.sync`git rev-parse @{u}`.stdout;

  return output1 === output2;
}
