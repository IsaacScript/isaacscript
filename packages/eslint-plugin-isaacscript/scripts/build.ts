import { $s, buildScript, copyToMonorepoNodeModules } from "complete-node";

await buildScript((packageRoot) => {
  $s`tsc`;
  copyToMonorepoNodeModules(packageRoot);
});
