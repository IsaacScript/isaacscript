import { buildScript, bundleTypeScript } from "isaacscript-common-node";

await buildScript(async ({ packageRoot }) => {
  await bundleTypeScript(packageRoot);
});
