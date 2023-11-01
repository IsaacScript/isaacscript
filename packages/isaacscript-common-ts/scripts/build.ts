import { $, buildScript, buildTypeScript } from "isaacscript-common-node";

await buildScript(async ({ packageRoot }) => {
  const promises: Array<Promise<unknown>> = [];

  promises.push(buildTypeScript(packageRoot), $`tsc --emitDeclarationOnly`);

  await Promise.all(promises);
});
