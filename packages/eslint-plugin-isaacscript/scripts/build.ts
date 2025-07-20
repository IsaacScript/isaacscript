import { $, buildScript, copyToMonorepoNodeModules } from "complete-node";

await buildScript(async (packageRoot) => {
  await $`tsc`;
  await copyToMonorepoNodeModules(packageRoot);
});
