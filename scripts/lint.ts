import { $, exit, lintScript } from "isaacscript-common-node";
import { packageJSONLint } from "./packageJSONLint.js";

await lintScript(async () => {
  const promises = [
    // Use TypeScript to type-check the code.
    $`tsc --noEmit`,

    // Use ESLint to lint the TypeScript code.
    // - "--max-warnings 0" makes warnings fail, since we set all ESLint errors to warnings.
    $`eslint --max-warnings 0 scripts *.mjs`, // We have to exclude the packages directory.

    // Use Prettier to check formatting.
    // - "--log-level=warn" makes it only output errors.
    $`prettier --log-level=warn --check .`,

    // Use Knip to check for unused files, exports, and dependencies.
    // TODO: Re-enable knip
    // https://github.com/webpro/knip/issues/570
    /// $`knip --exclude dependencies`,
    // (Knip cannot handle Google-style monorepos, so we have to exclude dependencies.)

    // Use CSpell to spell check every file.
    // - "--no-progress" and "--no-summary" make it only output errors.
    $`cspell --no-progress --no-summary .`,

    // Check for unused words in the CSpell configuration file.
    $`cspell-check-unused-words`,

    // Check for template updates.
    /// TODO
    /// $`tsx ./packages/isaacscript-cli/src/main.ts check --ignore bundleEntry.ts,ci.yml,eslint.config.mjs,lint.ts,tsconfig.eslint.json,tsconfig.json`,
  ];

  await Promise.all(promises);

  // The "packageJSONLint.ts" script uses synchronous APIs, so we must run it separately.
  if (!packageJSONLint(false)) {
    exit(1);
  }
});
