// A script used to check to see if a rule is being used in a particular linting config.

import { echo, exit, getArgs } from "isaacscript-common-node";
import path from "node:path";

const CONFIG_URLS = [
  // eslint:recommended
  "https://raw.githubusercontent.com/eslint/eslint/main/packages/js/src/configs/eslint-recommended.js",

  // @typescript-eslint
  "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/src/configs/eslint-recommended.ts",
  "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/src/configs/recommended-type-checked.ts",
  "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/src/configs/recommended.ts",
  "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/src/configs/strict-type-checked.ts",
  "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/src/configs/strict.ts",
  "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/src/configs/stylistic-type-checked.ts",
  "https://raw.githubusercontent.com/typescript-eslint/typescript-eslint/main/packages/eslint-plugin/src/configs/stylistic.ts",

  // eslint-config-prettier
  "https://raw.githubusercontent.com/prettier/eslint-config-prettier/main/index.js",

  // airbnb-base
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/best-practices.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/errors.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/es6.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/imports.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/node.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/strict.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/style.js",
  "https://raw.githubusercontent.com/airbnb/javascript/master/packages/eslint-config-airbnb-base/rules/variables.js",

  // airbnb-typescript/base
  "https://raw.githubusercontent.com/iamturns/eslint-config-airbnb-typescript/master/lib/shared.js",
] as const;

const args = getArgs();

const ruleName = args[0];
if (ruleName === undefined || ruleName === "") {
  const scriptPath = process.argv[1] ?? "unknown";
  const scriptName = path.basename(scriptPath);
  echo(`usage: ${scriptName} [rule-name]`);
  exit(1);
}

const fetchPromises = CONFIG_URLS.map(async (configURL) => fetch(configURL));
const responses = await Promise.all(fetchPromises);

for (const response of responses) {
  if (!response.ok) {
    echo(`Failed to get URL: ${response.url}`);
    exit(1);
  }
}

const configPromises = responses.map(async (response) => response.text());
const configs = await Promise.all(configPromises);

let found = false;
for (const [i, config] of configs.entries()) {
  if (config.includes(ruleName)) {
    found = true;
    const url = CONFIG_URLS[i] ?? "unknown";
    echo(`Found rule "${ruleName}": ${url}`);
  }
}

if (!found) {
  echo(`No results for: ${ruleName}`);
}
