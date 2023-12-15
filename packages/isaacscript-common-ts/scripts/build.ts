import { $s, buildScript } from "isaacscript-common-node";

await buildScript(() => {
  $s`tsup ./src/index.ts --format cjs,esm --dts --sourcemap`;
});
