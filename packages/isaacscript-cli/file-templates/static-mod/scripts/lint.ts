import { $, $s, commandExists, lintScript } from "isaacscript-common-node";

await lintScript(async () => {
  const promises: Array<Promise<unknown>> = [];

  promises.push(
    // Use Prettier to check formatting.
    // - "--log-level=warn" makes it only output errors.
    $`npx prettier --log-level=warn --check .`,

    // Type-check the code using the TypeScript compiler.
    $`tsc --noEmit`,

    // Use ESLint to lint the TypeScript.
    // - "--max-warnings 0" makes warnings fail, since we set all ESLint errors to warnings.
    $`eslint --max-warnings 0 .`,

    // Check for unused exports.
    // - "--error" makes it return an error code of 1 if unused exports are found.
    $`npx ts-prune --error`,

    // Spell check every file using CSpell.
    // - "--no-progress" and "--no-summary" make it only output errors.
    $`npx cspell --no-progress --no-summary .`,

    // Check for unused CSpell words.
    $`npx cspell-check-unused-words`,
  );

  if (commandExists("python")) {
    $s`pip install isaac-xml-validator --upgrade --quiet`;
    promises.push($`isaac-xml-validator --quiet`);
  }

  await Promise.all(promises);
});
