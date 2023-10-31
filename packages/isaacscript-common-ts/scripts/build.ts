import { buildScript, buildTypeScript } from "isaacscript-common-node";

await buildScript(async ({ packageRoot }) => {
  await buildTypeScript(packageRoot);
});
