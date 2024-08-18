import { $, exit, lintScript } from "isaacscript-common-node";
import { packageJSONLint } from "./packageJSONLint.js";

await lintScript(async () => {
  const promises = [
    // Use Prettier to check formatting.
    // - "--log-level=warn" makes it only output errors.
    $`prettier --log-level=warn --check .`,

    // Type-check the code using the TypeScript compiler.
    $`tsc --noEmit --project ./scripts/tsconfig.json`,

    // Use ESLint to lint the TypeScript.
    // - "--max-warnings 0" makes warnings fail, since we set all ESLint errors to warnings.
    $`eslint --max-warnings 0 scripts *.mjs`, // We have to exclude the packages directory.

    // Check for unused files, dependencies, and exports.
    // TODO: Re-enable knip
    // https://github.com/webpro/knip/issues/570
    /// $`knip --exclude dependencies`,
    // (Knip cannot handle Google-style monorepos, so we have to exclude dependencies.)

    // Spell check every file using CSpell.
    // - "--no-progress" and "--no-summary" make it only output errors.
    $`cspell --no-progress --no-summary .`,

    // Check for unused CSpell words.
    $`cspell-check-unused-words`,

    // Check for template updates.
    // TODO: Re-enable.
    /// $`tsx ./packages/isaacscript-cli/src/main.ts check --ignore .eslintrc.cjs,bundleEntry.ts,ci.yml,lint.ts,tsconfig.eslint.json,tsconfig.json`,
  ];

  await Promise.all(promises);

  // The "packageJSONLint.ts" script uses synchronous APIs, so we must run it separately.
  if (!packageJSONLint(false)) {
    exit(1);
  }
});
