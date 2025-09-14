import { $, buildScript, deleteFileOrDirectory } from "complete-node";
import path from "node:path";

const DOCS_BUILD_ENABLED = false as boolean;

const TYPEDOC_PACKAGES = [
  "isaac-typescript-definitions",
  "isaacscript-common",
] as const;

const GENERATED_DOC_DIRECTORY_NAMES = [
  ...TYPEDOC_PACKAGES,
  "eslint-config-isaacscript",
] as const;

await buildScript(import.meta.dirname, async (packageRoot) => {
  if (!DOCS_BUILD_ENABLED) {
    return;
  }

  const generatedDocPaths = GENERATED_DOC_DIRECTORY_NAMES.map((directoryName) =>
    path.join(packageRoot, "docs", directoryName),
  );
  await deleteFileOrDirectory(...generatedDocPaths);

  const repoRoot = path.resolve(packageRoot, "..", "..");

  await Promise.all([makeITDDocs(repoRoot), makeISCDocs(repoRoot)]);

  // Format the Markdown output with Prettier, which will remove superfluous backslash escape
  // characters that cause issues with search engine indexing. (However, we must change directories
  // to avoid creating a spurious "node_modules" folder.)
  const $$ = $({ cwd: repoRoot });
  await $$`prettier ./packages/docs/docs --write`;

  await $`docusaurus build`;
});

async function makeITDDocs(repoRoot: string) {
  const packagePath = path.join(
    repoRoot,
    "packages",
    "isaac-typescript-definitions",
  );
  const $$ = $({ cwd: packagePath });
  await $$`npm run docs`;
  await $`tsx --tsconfig ./scripts/tsconfig.json ./scripts/fixIsaacTypeScriptDefinitions.mts`;
}

async function makeISCDocs(repoRoot: string) {
  const packagePath = path.join(repoRoot, "packages", "isaacscript-common");
  const $$ = $({ cwd: packagePath });
  await $$`npm run docs`;
  await $`tsx --tsconfig ./scripts/tsconfig.json ./scripts/fixIsaacScriptCommon.mts`;
}
