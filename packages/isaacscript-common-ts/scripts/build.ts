import { $s, buildScript } from "isaacscript-common-node";

await buildScript(() => {
  // We use the `unbuild` library to output both ESM and CJS.
  /// $s`unbuild`;

  $s`tsc --project ./tsconfig.cjs.json`;
  $s`mv dist/**/*.js`;
});
