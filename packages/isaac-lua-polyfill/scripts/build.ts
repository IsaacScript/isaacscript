import { $s, buildScript } from "complete-node";

await buildScript(() => {
  $s`tsc`;
});
