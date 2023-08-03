import ESLintJS from "@eslint/js";
import TypeScriptESLintPlugin from "@typescript-eslint/eslint-plugin";
import type { Linter } from "eslint";
import ESLintConfigPrettier from "eslint-config-prettier";
import ESLintPluginESLintComments from "eslint-plugin-eslint-comments";
import extractComments from "extract-comments";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import baseCommentsConfig from "../configs/base-comments.js";
import baseESLintConfig from "../configs/base-eslint.js";
import baseNoAutoFixConfig from "../configs/base-no-autofix.js";
import baseTypeScriptESLintConfig from "../configs/base-typescript-eslint.js";

type ParentConfig =
  | "eslint/recommended"
  | "@typescript-eslint/eslint-recommended"
  | "@typescript-eslint/recommended-type-checked"
  | "@typescript-eslint/recommended"
  | "@typescript-eslint/strict-type-checked"
  | "@typescript-eslint/strict"
  | "@typescript-eslint/stylistic"
  | "@typescript-eslint/stylistic-type-checked"
  | "eslint-config-prettier";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const REPO_ROOT = path.join(__dirname, "..", "..", "..");

const MARKDOWN_HEADER = `# \`eslint-config-isaacscript\`

## Introduction

This is a sharable configuration for [ESLint](https://eslint.org/) that is intended to be used in TypeScript projects.

This package is consumed by the [\`isaacscript-lint\`](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaacscript-lint) meta-linting package. It is recommended that instead of consuming this package directly, you instead list \`isaacscript-lint\` as a dependency, as that will includes all of the plugins that this config depends on.

<br />

## Installation

See the [\`isaacscript-lint\`](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaacscript-lint#installation-instructions-for-typescript-projects) page.

<br />

## Philosophy

We want to enable as many lint rules as possible, so that we can catch as many bugs as possible. Of course, this is a tradeoff: with more lint rules, we get more false positives. But in general, a few false positives are worth the time saved from investigating and squashing bugs. False positives can be taken care of by adding a \`// eslint-disable-next-line insert-rule-name-here\` comment. (You can automatically add the comment by selecting "Quick Fix" in VSCode, which is mapped to \`Ctrl + .\` by default.)

In line with this philosophy, our linting config enables nearly all of the recommended rules from both the core ESLint team and the TypeScript ESLint team, as well as some additional custom rules that catch even more bugs. The full rule list is below.

<br />

## Rule List
`;

// -------------------------------------------------------------------------------------------------

const ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH = path.join(
  REPO_ROOT,
  "packages",
  "docs",
  "docs",
  "eslint-config-isaacscript",
);
const README_PATH = path.join(ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH, "README.md");

// -------------------------------------------------------------------------------------------------

const BASE_CONFIGS_PATH = path.join(__dirname, "..", "configs");

const BASE_ESLINT_JS_PATH = path.join(BASE_CONFIGS_PATH, "base-eslint.js");
const BASE_ESLINT_JS = fs.readFileSync(BASE_ESLINT_JS_PATH, "utf8");

const BASE_NO_AUTOFIX_JS_PATH = path.join(
  BASE_CONFIGS_PATH,
  "base-no-autofix.js",
);
const BASE_NO_AUTOFIX_JS = fs.readFileSync(BASE_NO_AUTOFIX_JS_PATH, "utf8");

const BASE_TYPESCRIPT_ESLINT_JS_PATH = path.join(
  BASE_CONFIGS_PATH,
  "base-typescript-eslint.js",
);
const BASE_TYPESCRIPT_ESLINT_JS = fs.readFileSync(
  BASE_TYPESCRIPT_ESLINT_JS_PATH,
  "utf8",
);

const BASE_COMMENTS_RULES_JS_PATH = path.join(
  BASE_CONFIGS_PATH,
  "base-comments.js",
);
const BASE_COMMENTS_RULES_JS = fs.readFileSync(
  BASE_COMMENTS_RULES_JS_PATH,
  "utf8",
);

// -------------------------------------------------------------------------------------------------

/** https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js */
const ESLINT_RECOMMENDED_RULES_SET: ReadonlySet<string> = new Set(
  Object.keys(ESLintJS.configs.recommended.rules),
);

/**
 * https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/src/configs
 */
const TYPESCRIPT_ESLINT_RULES = {
  all: getTypeScriptESLintConfigRules("all"),
  "eslint-recommended": getTypeScriptESLintConfigRules("eslint-recommended"),
  "recommended-type-checked": getTypeScriptESLintConfigRules(
    "recommended-type-checked",
  ),
  recommended: getTypeScriptESLintConfigRules("recommended"),
  "strict-type-checked": getTypeScriptESLintConfigRules("strict-type-checked"),
  strict: getTypeScriptESLintConfigRules("strict"),
  "stylistic-type-checked": getTypeScriptESLintConfigRules(
    "stylistic-type-checked",
  ),
  stylistic: getTypeScriptESLintConfigRules("stylistic"),
} as const;

const TYPESCRIPT_ESLINT_RULES_SET = {
  all: new Set(Object.keys(TYPESCRIPT_ESLINT_RULES.all)),
  "eslint-recommended": new Set(
    Object.keys(TYPESCRIPT_ESLINT_RULES["eslint-recommended"]),
  ),
  "recommended-type-checked": new Set(
    Object.keys(TYPESCRIPT_ESLINT_RULES["recommended-type-checked"]),
  ),
  recommended: new Set(Object.keys(TYPESCRIPT_ESLINT_RULES.recommended)),
  "strict-type-checked": new Set(
    Object.keys(TYPESCRIPT_ESLINT_RULES["strict-type-checked"]),
  ),
  strict: new Set(Object.keys(TYPESCRIPT_ESLINT_RULES.strict)),
  "stylistic-type-checked": new Set(
    Object.keys(TYPESCRIPT_ESLINT_RULES["stylistic-type-checked"]),
  ),
  stylistic: new Set(Object.keys(TYPESCRIPT_ESLINT_RULES.stylistic)),
} as const;

/** https://github.com/prettier/eslint-config-prettier/blob/main/index.js */
const ESLINT_CONFIG_PRETTIER_RULES_SET: ReadonlySet<string> = new Set(
  Object.keys(ESLintConfigPrettier.rules),
);

function getTypeScriptESLintConfigRules(configName: string) {
  const config = TypeScriptESLintPlugin.configs[configName];
  if (config === undefined) {
    throw new Error(
      `Failed to parse the "@typescript-eslint/${configName}" config.`,
    );
  }

  // Unlike the other configs, the "eslint-recommended" rules are contained within an "overrides"
  // directive.
  if (configName === "eslint-recommended") {
    const { overrides } = config;
    if (overrides === undefined) {
      throw new Error(
        `Failed to parse the "@typescript-eslint/${configName}" config overrides.`,
      );
    }

    const firstElement = overrides[0];
    if (firstElement === undefined) {
      throw new Error(
        `Failed to parse the "@typescript-eslint/${configName}" config overrides first element.`,
      );
    }

    const { rules } = firstElement;
    if (rules === undefined) {
      throw new Error(
        `Failed to parse the "@typescript-eslint/${configName}" config rules.`,
      );
    }

    return rules;
  }

  const { rules } = config;
  if (rules === undefined) {
    throw new Error(
      `Failed to parse the "@typescript-eslint/${configName}" config rules.`,
    );
  }

  return rules;
}

// -------------------------------------------------------------------------------------------------

const PARENT_CONFIG_LINKS = {
  "eslint/recommended":
    "[`eslint/recommended`](https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js)",
  "@typescript-eslint/eslint-recommended":
    "[`@typescript-eslint/eslint-recommended`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts)",
  "@typescript-eslint/recommended-type-checked":
    "[`@typescript-eslint/recommended-type-checked`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-type-checked.ts)",
  "@typescript-eslint/recommended":
    "[`@typescript-eslint/recommended`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts)",
  "@typescript-eslint/strict-type-checked":
    "[`@typescript-eslint/strict-type-checked`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict-type-checked.ts)",
  "@typescript-eslint/strict":
    "[`@typescript-eslint/strict`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts)",
  "@typescript-eslint/stylistic-type-checked":
    "[`@typescript-eslint/stylistic-type-checked`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic-type-checked.ts)",
  "@typescript-eslint/stylistic":
    "[`@typescript-eslint/stylistic`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic.ts)",
  "eslint-config-prettier":
    "[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier/blob/main/index.js)",
} as const satisfies Record<ParentConfig, string>;

main();

function main() {
  let markdownOutput = MARKDOWN_HEADER;

  markdownOutput += getESLintMarkdownSection();
  markdownOutput += getNoAutoFixMarkdownSection();
  markdownOutput += getTypeScriptESLintMarkdownSection();
  markdownOutput += getCommentsMarkdownSection();

  if (!fs.existsSync(ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH)) {
    fs.mkdirSync(ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH);
  }
  fs.writeFileSync(README_PATH, markdownOutput);

  console.log(`Successfully created: ${README_PATH}`);
}

function getESLintMarkdownSection(): string {
  let markdownOutput = getMarkdownHeader(
    "Core ESLint Rules",
    "https://eslint.org/docs/latest/rules/",
  );

  const baseESLintRules = baseESLintConfig.rules;
  if (baseESLintRules === undefined) {
    throw new Error("Failed to parse the base core ESLint rules.");
  }

  // First, audit the config to ensure that we have an entry for each rule.
  const allESLintRuleNames = Object.keys(ESLintJS.configs.all.rules);
  for (const ruleName of allESLintRuleNames) {
    const baseRuleEntry = baseESLintRules[ruleName];
    if (baseRuleEntry === undefined) {
      throw new Error(
        `Failed to find an entry for core ESLint rule: ${ruleName}`,
      );
    }
  }

  const alphabeticalRuleNames = Object.keys(baseESLintRules).sort();
  for (const ruleName of alphabeticalRuleNames) {
    const rule = baseESLintRules[ruleName];
    if (rule === undefined) {
      throw new Error(`Failed to find rule: ${ruleName}`);
    }

    const ruleURL = "https://eslint.org/docs/latest/rules/__RULE_NAME__";
    const baseJSText = BASE_ESLINT_JS;
    const sourceFileName = "base-eslint.js";

    markdownOutput += getMarkdownTableRow(
      ruleName,
      rule,
      ruleURL,
      baseJSText,
      sourceFileName,
    );
  }

  return markdownOutput;
}

function getNoAutoFixMarkdownSection(): string {
  let markdownOutput = getMarkdownHeader(
    "`eslint-plugin-no-autofix` Rules",
    "https://github.com/aladdin-add/eslint-plugin/tree/master/packages/no-autofix",
  );

  const baseNoAutoFixRules = baseNoAutoFixConfig.rules;
  if (baseNoAutoFixRules === undefined) {
    throw new Error("Failed to parse the `eslint-plugin-no-autofix` rules.");
  }

  const alphabeticalRuleNames = Object.keys(baseNoAutoFixRules).sort();
  for (const ruleName of alphabeticalRuleNames) {
    const rule = baseNoAutoFixRules[ruleName];
    if (rule === undefined) {
      throw new Error(`Failed to find rule: ${ruleName}`);
    }

    // This plugin does not have individual pages for each rule.
    const ruleURL =
      "https://github.com/aladdin-add/eslint-plugin/tree/master/packages/no-autofix";
    const baseJSText = BASE_NO_AUTOFIX_JS;
    const sourceFileName = "base-no-autofix.js";

    markdownOutput += getMarkdownTableRow(
      ruleName,
      rule,
      ruleURL,
      baseJSText,
      sourceFileName,
    );
  }

  return markdownOutput;
}

function getTypeScriptESLintMarkdownSection(): string {
  let markdownOutput = getMarkdownHeader(
    "`@typescript-eslint` Rules",
    "https://typescript-eslint.io/rules/",
  );

  const baseTypeScriptESLintRules = baseTypeScriptESLintConfig.rules;
  if (baseTypeScriptESLintRules === undefined) {
    throw new Error("Failed to parse the base TypeScript ESLint rules.");
  }

  // First, audit the config to ensure that we have an entry for each rule.
  const allTypeScriptESLintRuleNames = Object.keys(TYPESCRIPT_ESLINT_RULES.all);
  for (const ruleName of allTypeScriptESLintRuleNames) {
    const baseRuleEntry = baseTypeScriptESLintRules[ruleName];
    if (
      baseRuleEntry === undefined &&
      // We must check for a "@typescript-eslint" prefix because this config turns off some core
      // ESLint rules.
      ruleName.startsWith("@typescript-eslint")
    ) {
      throw new Error(
        `Failed to find an entry for TypeScript ESLint rule: ${ruleName}`,
      );
    }
  }

  const alphabeticalRuleNames = Object.keys(baseTypeScriptESLintRules).sort();
  for (const ruleName of alphabeticalRuleNames) {
    const rule = baseTypeScriptESLintRules[ruleName];
    if (rule === undefined) {
      throw new Error(`Failed to find rule: ${ruleName}`);
    }

    const ruleURL = "https://typescript-eslint.io/rules/__RULE_NAME__/";
    const baseJSText = BASE_TYPESCRIPT_ESLINT_JS;
    const sourceFileName = "base-typescript-eslint.js";

    markdownOutput += getMarkdownTableRow(
      ruleName,
      rule,
      ruleURL,
      baseJSText,
      sourceFileName,
    );
  }

  return markdownOutput;
}

function getCommentsMarkdownSection(): string {
  let markdownOutput = getMarkdownHeader(
    "`eslint-plugin-eslint-comments` Rules",
    "https://github.com/mysticatea/eslint-plugin-eslint-comments",
  );

  const baseCommentsRules = baseCommentsConfig.rules;
  if (baseCommentsRules === undefined) {
    throw new Error(
      "Failed to parse the `eslint-config-eslint-comments` rules.",
    );
  }

  // First, audit the config to ensure that we have an entry for each rule.
  const allESLintRuleNames = Object.keys(ESLintPluginESLintComments.rules);
  for (const ruleName of allESLintRuleNames) {
    const baseRuleEntry = baseCommentsRules[`eslint-comments/${ruleName}`];
    if (baseRuleEntry === undefined) {
      throw new Error(
        `Failed to find an entry for "eslint-plugin-eslint-comments" rule: ${ruleName}`,
      );
    }
  }

  const alphabeticalRuleNames = Object.keys(baseCommentsRules).sort();
  for (const ruleName of alphabeticalRuleNames) {
    const rule = baseCommentsRules[ruleName];
    if (rule === undefined) {
      throw new Error(`Failed to find rule: ${ruleName}`);
    }

    const ruleURL =
      "https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/__RULE_NAME__.md";
    const baseJSText = BASE_COMMENTS_RULES_JS;
    const sourceFileName = "base-comments.js";

    markdownOutput += getMarkdownTableRow(
      ruleName,
      rule,
      ruleURL,
      baseJSText,
      sourceFileName,
    );
  }

  return markdownOutput;
}

function getMarkdownHeader(headerTitle: string, headerLink: string): string {
  return `
### [${headerTitle}](${headerLink})

| Rule Name | Enabled | Parent Configs | Notes | Source File
| --------- | ------- | -------------- | ----- | -----------
`;
}

function getRuleEnabled(ruleName: string, rule: Linter.RuleEntry): boolean {
  const severity = getRuleSeverity(ruleName, rule);

  if (severity !== "error" && severity !== "off") {
    throw new Error(
      `Unknown value of "${severity}" when parsing rule: ${ruleName}`,
    );
  }

  return severity !== "off";
}

function getRuleSeverity(ruleName: string, rule: Linter.RuleEntry): string {
  if (typeof rule === "string") {
    return rule;
  }

  if (Array.isArray(rule)) {
    const firstElement = rule[0];
    if (typeof firstElement !== "string") {
      throw new Error(`Failed to parse the first element of rule: ${ruleName}`);
    }

    return firstElement;
  }

  throw new Error(`Failed to parse the type of rule: ${ruleName}`);
}

function getParentConfigsLinks(ruleName: string): string {
  const parentConfigs = getParentConfigs(ruleName);

  if (parentConfigs.length === 0) {
    return "";
  }

  const parentConfigLinks = parentConfigs.map(
    (parentConfig) => PARENT_CONFIG_LINKS[parentConfig],
  );

  return `<ul><li>${parentConfigLinks.join("</li><li>")}</li></ul>`;
}

function getParentConfigs(ruleName: string): ParentConfig[] {
  const parentConfigs: ParentConfig[] = [];

  if (ESLINT_RECOMMENDED_RULES_SET.has(ruleName)) {
    parentConfigs.push("eslint/recommended");
  }

  // -----------------------------------------------------------------------------------------------

  if (TYPESCRIPT_ESLINT_RULES_SET["eslint-recommended"].has(ruleName)) {
    parentConfigs.push("@typescript-eslint/eslint-recommended");
  }

  if (
    TYPESCRIPT_ESLINT_RULES_SET["recommended-type-checked"].has(ruleName) &&
    !TYPESCRIPT_ESLINT_RULES_SET.recommended.has(ruleName)
  ) {
    parentConfigs.push("@typescript-eslint/recommended-type-checked");
  }

  if (TYPESCRIPT_ESLINT_RULES_SET.recommended.has(ruleName)) {
    parentConfigs.push("@typescript-eslint/recommended");
  }

  if (
    TYPESCRIPT_ESLINT_RULES_SET["strict-type-checked"].has(ruleName) &&
    !TYPESCRIPT_ESLINT_RULES_SET.strict.has(ruleName) &&
    !TYPESCRIPT_ESLINT_RULES_SET["recommended-type-checked"].has(ruleName)
  ) {
    parentConfigs.push("@typescript-eslint/strict-type-checked");
  }

  if (
    TYPESCRIPT_ESLINT_RULES_SET.strict.has(ruleName) &&
    !TYPESCRIPT_ESLINT_RULES_SET.recommended.has(ruleName)
  ) {
    parentConfigs.push("@typescript-eslint/strict");
  }

  if (
    TYPESCRIPT_ESLINT_RULES_SET["stylistic-type-checked"].has(ruleName) &&
    !TYPESCRIPT_ESLINT_RULES_SET.stylistic.has(ruleName)
  ) {
    parentConfigs.push("@typescript-eslint/stylistic-type-checked");
  }

  if (TYPESCRIPT_ESLINT_RULES_SET.stylistic.has(ruleName)) {
    parentConfigs.push("@typescript-eslint/stylistic");
  }

  // -----------------------------------------------------------------------------------------------

  if (ESLINT_CONFIG_PRETTIER_RULES_SET.has(ruleName)) {
    parentConfigs.push("eslint-config-prettier");
  }

  return parentConfigs;
}

function getRuleComments(
  ruleName: string,
  rule: Linter.RuleEntry,
  baseJSText: string,
): string {
  if (isRuleHandledByTypeScriptCompiler(ruleName) && rule === "off") {
    return "Disabled because this is [handled by the TypeScript compiler](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts).";
  }

  if (isRuleHandledByPrettier(ruleName) && rule === "off") {
    return "Disabled because this is [handled by Prettier](https://github.com/prettier/eslint-config-prettier/blob/main/index.js).";
  }

  const comments = extractComments(baseJSText);

  for (const comment of comments) {
    // Ignore comments that are not "attached" to code.
    if (comment.codeStart === undefined) {
      continue;
    }

    const line = getLineOfCodeStartingAtPos(comment.codeStart, baseJSText);

    // Ignore comments that are not "attached" to rule definitions.
    if (line.startsWith("const ") || !line.includes(":")) {
      continue;
    }

    const lineWithNoQuotes = line.replaceAll('"', "");
    const colonIndex = lineWithNoQuotes.indexOf(":");
    const lineRuleName = lineWithNoQuotes.substring(0, colonIndex);

    if (lineRuleName !== ruleName) {
      continue;
    }

    return comment.value.replaceAll("\n", " ");
  }

  return "";
}

function isRuleHandledByTypeScriptCompiler(ruleName: string): boolean {
  const rule = TYPESCRIPT_ESLINT_RULES["eslint-recommended"][ruleName];
  if (rule === undefined) {
    return false;
  }

  if (typeof rule !== "string") {
    throw new Error(
      `Failed to parse rule in "@typescript-eslint/eslint-recommended": ${ruleName}`,
    );
  }

  return rule === "off";
}

function isRuleHandledByPrettier(ruleName: string): boolean {
  const rule = ESLintConfigPrettier.rules[ruleName];

  // In the config, some rules are disabled with 0 and some are disabled with "off".
  return rule === 0 || rule === "off";
}

function getLineOfCodeStartingAtPos(pos: number, code: string) {
  const codeStartingAtPos = code.slice(pos);
  const newlineIndex = codeStartingAtPos.indexOf("\n");

  if (newlineIndex !== -1) {
    return codeStartingAtPos.substring(0, newlineIndex);
  }

  return codeStartingAtPos;
}

function getMarkdownTableRow(
  ruleName: string,
  rule: Linter.RuleEntry,
  ruleURL: string,
  baseJSText: string,
  sourceFileName: string,
): string {
  const baseRuleName = trimCharactersUntilLastCharacter(ruleName, "/");
  const filledRuleURL = ruleURL.replace("__RULE_NAME__", baseRuleName);
  const ruleNameWithLink = `[\`${ruleName}\`](${filledRuleURL})`;
  const enabled = getRuleEnabled(ruleName, rule);
  const enabledEmoji = enabled ? "✅" : "❌";
  const parentConfigsLinks = getParentConfigsLinks(ruleName);
  const ruleComments = getRuleComments(ruleName, rule, baseJSText);
  const sourceFileLink = `[\`${sourceFileName}\`](https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/configs/${sourceFileName})`;

  return `| ${ruleNameWithLink} | ${enabledEmoji} | ${parentConfigsLinks} | ${ruleComments} | ${sourceFileLink}\n`;
}

function trimCharactersUntilLastCharacter(
  string: string,
  character: string,
): string {
  const index = string.lastIndexOf(character);
  return index === -1 ? string : string.slice(index + 1);
}
