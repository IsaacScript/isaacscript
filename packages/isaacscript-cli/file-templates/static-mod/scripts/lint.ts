import { $, $s, commandExists, lintScript } from "complete-node"; // eslint-disable-line import-x/no-extraneous-dependencies

await lintScript(async () => {
  const promises = [
    // Use TypeScript to type-check the code.
    $`tsc --noEmit`,

    // Use ESLint to lint the TypeScript code.
    // - "--max-warnings 0" makes warnings fail, since we set all ESLint errors to warnings.
    $`eslint --max-warnings 0 .`,

    // Use Prettier to check formatting.
    // - "--log-level=warn" makes it only output errors.
    $`prettier --log-level=warn --check .`,

    // Use ts-prune to check for unused exports.
    // - "--error" makes it return an error code of 1 if unused exports are found.
    $`ts-prune --error`,

    // Use CSpell to spell check every file.
    // - "--no-progress" and "--no-summary" make it only output errors.
    $`cspell --no-progress --no-summary .`,

    // Check for unused words in the CSpell configuration file.
    $`cspell-check-unused-words`,
  ];

  if (commandExists("python")) {
    $s`pip install isaac-xml-validator --upgrade --quiet`;
    promises.push($`isaac-xml-validator --quiet`);
  }

  await Promise.all(promises);
});
