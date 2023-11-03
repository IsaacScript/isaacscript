import { $s, buildScript } from "isaacscript-common-node";

await buildScript(() => {
  $s`tsc`;
});
