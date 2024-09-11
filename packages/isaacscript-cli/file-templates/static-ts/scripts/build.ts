import { $s, buildScript } from "complete-node"; // eslint-disable-line import-x/no-extraneous-dependencies

await buildScript(() => {
  $s`tsc`;
});
