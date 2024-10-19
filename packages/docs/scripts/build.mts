import { $, $op, $s, buildScript, rm } from "complete-node";
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

await buildScript(async (packageRoot) => {
  if (!DOCS_BUILD_ENABLED) {
    return;
  }

  const generatedDocPaths = GENERATED_DOC_DIRECTORY_NAMES.map((directoryName) =>
    path.join(packageRoot, "docs", directoryName),
  );
  rm(...generatedDocPaths);

  const repoRoot = path.join(packageRoot, "..", "..");

  await Promise.all([makeITDDocs(repoRoot), makeISCDocs(repoRoot)]);

  // Format the Markdown output with Prettier, which will remove superfluous backslash escape
  // characters that cause issues with search engine indexing. (However, we must change directories
  // to avoid creating a spurious "node_modules" folder.)
  const $$ = $op({ cwd: repoRoot });
  await $$`prettier ./packages/docs/docs --write`;

  $s`docusaurus build`;
});

async function makeITDDocs(repoRoot: string): Promise<void> {
  const packagePath = path.join(
    repoRoot,
    "packages",
    "isaac-typescript-definitions",
  );
  const $$ = $op({ cwd: packagePath });
  await $$`npm run docs`;
  await $`tsx --tsconfig ./scripts/tsconfig.json ./scripts/fixIsaacTypeScriptDefinitions.mts`;
}

async function makeISCDocs(repoRoot: string): Promise<void> {
  const packagePath = path.join(repoRoot, "packages", "isaacscript-common");
  const $$ = $op({ cwd: packagePath });
  await $$`npm run docs`;
  await $`tsx --tsconfig ./scripts/tsconfig.json ./scripts/fixIsaacScriptCommon.mts`;
}
