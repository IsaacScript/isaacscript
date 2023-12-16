import { $s, buildScript } from "isaacscript-common-node";

await buildScript(() => {
  $s`unbuild`; // We use the `unbuild` library to output both ESM and CJS.
});
