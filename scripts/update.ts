import { assertArrayString, assertObject } from "complete-common";
import { updatePackageJSONDependencies } from "complete-node";
import path from "node:path";

const MONOREPO_ROOT = path.resolve(import.meta.dirname, "..");
const BUNFIG_PATH = path.join(MONOREPO_ROOT, "bunfig.toml");

// The packages from this monorepo are exempt from Bun's minimum release age. They are also exempt
// from the update cooldown so that new versions can be used immediately.
const packagesWithoutCooldown = await getMinimumReleaseAgeExcludes();
await updatePackageJSONDependencies(
  MONOREPO_ROOT,
  true,
  false,
  packagesWithoutCooldown,
);

async function getMinimumReleaseAgeExcludes(): Promise<readonly string[]> {
  // A variable is used for the path so that TypeScript does not try to resolve the TOML module.
  const bunfigModule: unknown = await import(BUNFIG_PATH, {
    with: {
      type: "toml",
    },
  });
  assertObject(bunfigModule, `Failed to import: ${BUNFIG_PATH}`);

  const bunfig = bunfigModule["default"];
  assertObject(bunfig, `Failed to parse: ${BUNFIG_PATH}`);

  const { install } = bunfig;
  assertObject(install, `The "install" table is missing in: ${BUNFIG_PATH}`);

  const { minimumReleaseAgeExcludes } = install;
  assertArrayString(
    minimumReleaseAgeExcludes,
    `The "install.minimumReleaseAgeExcludes" array is missing in: ${BUNFIG_PATH}`,
  );

  return minimumReleaseAgeExcludes;
}
