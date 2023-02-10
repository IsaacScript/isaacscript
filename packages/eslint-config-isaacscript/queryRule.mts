// A script used to check to see if a rule is being used in one of the parent linting configs.

import fetch from "node-fetch";
import * as path from "node:path";

const CONFIG_URLS = [
  // eslint:recommended
  // https://github.com/eslint/eslint/blob/main/conf/eslint-recommended.js
  "https://raw.githubusercontent.com/eslint/eslint/main/conf/eslint-recommended.js",

  // airbnb-base
  // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/best-practices.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/errors.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/es6.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/imports.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/node.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/strict.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/style.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/variables.js",

  // airbnb-typescript/base
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
  "https://raw.githubusercontent.com/iamturns/eslint-config-airbnb-typescript/master/lib/shared.js",

  // @typescript-eslint
  // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/src/configs
  "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/src/configs/eslint-recommended.ts",
  "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts",
  "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/src/configs/recommended.ts",
  "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/src/configs/strict.ts",
] as const;

const args = process.argv.slice(2);
const ruleName = args[0];
if (ruleName === undefined || ruleName === "") {
  const scriptPath = process.argv[1] ?? "unknown";
  const scriptName = path.basename(scriptPath);
  console.error(`usage: ${scriptName} [rule-name]`);
  process.exit(1);
}

const fetchPromises = CONFIG_URLS.map((configURL) => fetch(configURL));
const responses = await Promise.all(fetchPromises);
const configPromises = responses.map((response) => response.text());
const configs = await Promise.all(configPromises);

configs.forEach((config, i) => {
  if (config.includes(ruleName)) {
    const url = CONFIG_URLS[i] ?? "unknown";
    console.log(`Found rule "${ruleName}": ${url}`);
  }
});
