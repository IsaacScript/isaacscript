import { $, buildScript, copyToMonorepoNodeModules } from "complete-node";

await buildScript(import.meta.dirname, async (packageRoot) => {
  await $`tsc`;
  await copyToMonorepoNodeModules(packageRoot);
});
