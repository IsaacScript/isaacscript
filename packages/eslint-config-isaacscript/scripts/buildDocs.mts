import ESLintJS from "@eslint/js";
import TypeScriptESLintPlugin from "@typescript-eslint/eslint-plugin";
import type { Linter } from "eslint";
import ESLintConfigPrettier from "eslint-config-prettier";
import extractComments from "extract-comments";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import baseESLintConfig from "../configs/base-eslint.js";

type ParentConfig =
  | "eslint/recommended"
  | "@typescript-eslint/eslint-recommended"
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

const ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH = path.join(
  REPO_ROOT,
  "packages",
  "docs",
  "docs",
  "eslint-config-isaacscript",
);
const README_PATH = path.join(ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH, "README.md");

const ESLINT_RECOMMENDED_RULES_SET: ReadonlySet<string> = new Set(
  Object.keys(ESLintJS.configs.recommended.rules),
);
const BASE_ESLINT_RULES_JS_PATH = path.join(
  __dirname,
  "..",
  "configs",
  "base-eslint.js",
);
const BASE_ESLINT_RULES_JS = fs.readFileSync(BASE_ESLINT_RULES_JS_PATH, "utf8");

const TYPESCRIPT_ESLINT_ESLINT_RECOMMENDED_RULES = (() => {
  const TypeScriptESLintESLintRecommended =
    TypeScriptESLintPlugin.configs["eslint-recommended"];
  if (TypeScriptESLintESLintRecommended === undefined) {
    throw new Error(
      'Failed to parse the "@typescript-eslint/eslint-recommended" config.',
    );
  }

  const { overrides } = TypeScriptESLintESLintRecommended;
  if (overrides === undefined) {
    throw new Error(
      'Failed to parse the "@typescript-eslint/eslint-recommended" config overrides.',
    );
  }

  const firstElement = overrides[0];
  if (firstElement === undefined) {
    throw new Error(
      'Failed to parse the "@typescript-eslint/eslint-recommended" config overrides first element.',
    );
  }

  const { rules } = firstElement;
  if (rules === undefined) {
    throw new Error(
      'Failed to parse the "@typescript-eslint/eslint-recommended" config rules.',
    );
  }

  return rules;
})();

const TYPESCRIPT_ESLINT_ESLINT_RECOMMENDED_RULES_SET: ReadonlySet<string> =
  new Set(Object.keys(TYPESCRIPT_ESLINT_ESLINT_RECOMMENDED_RULES));

const ESLINT_CONFIG_PRETTIER_RULES_SET: ReadonlySet<string> = new Set(
  Object.keys(ESLintConfigPrettier.rules),
);

const PARENT_CONFIG_LINKS = {
  "eslint/recommended":
    "[`eslint/recommended`](https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js)",
  "@typescript-eslint/eslint-recommended":
    "[`@typescript-eslint/eslint-recommended`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts)",
  "eslint-config-prettier":
    "[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier/blob/main/index.js)",
} as const satisfies Record<ParentConfig, string>;

main();

function main() {
  let markdownOutput = MARKDOWN_HEADER;

  markdownOutput += getESLintMarkdownSection();

  if (!fs.existsSync(ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH)) {
    fs.mkdirSync(ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH);
  }
  fs.writeFileSync(README_PATH, markdownOutput);

  console.log(`Successfully created: ${README_PATH}`);
}

function getESLintMarkdownSection(): string {
  let markdownOutput = getMarkdownHeader("Core ESLint Rules");

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

    const ruleNameWithLink = `[\`${ruleName}\`](https://eslint.org/docs/latest/rules/${ruleName})`;
    const enabled = getRuleEnabled(ruleName, rule);
    const enabledEmoji = enabled ? "✅" : "❌";
    const parentConfigsLinks = getParentConfigsLinks(ruleName);
    const notes = getNotes(ruleName, rule);
    const sourceFileLink = getSourceFileLink();

    markdownOutput += `| ${ruleNameWithLink} | ${enabledEmoji} | ${parentConfigsLinks} | ${notes} | ${sourceFileLink}\n`;
  }

  return markdownOutput;
}

function getMarkdownHeader(headerTitle: string): string {
  return `### ${headerTitle}

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

  if (TYPESCRIPT_ESLINT_ESLINT_RECOMMENDED_RULES_SET.has(ruleName)) {
    parentConfigs.push("@typescript-eslint/eslint-recommended");
  }

  if (ESLINT_CONFIG_PRETTIER_RULES_SET.has(ruleName)) {
    parentConfigs.push("eslint-config-prettier");
  }

  return parentConfigs;
}

function getNotes(ruleName: string, rule: Linter.RuleEntry): string {
  if (isRuleHandledByTypeScriptCompiler(ruleName) && rule === "off") {
    return "Disabled because this is [handled by the TypeScript compiler](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts).";
  }

  if (isRuleHandledByPrettier(ruleName) && rule === "off") {
    return "Disabled because this is [handled by Prettier](https://github.com/prettier/eslint-config-prettier/blob/main/index.js).";
  }

  const comments = extractComments(BASE_ESLINT_RULES_JS);

  for (const comment of comments) {
    // Ignore comments that are not "attached" to code.
    if (comment.codeStart === undefined) {
      continue;
    }

    const line = getLineOfCodeStartingAtPos(
      comment.codeStart,
      BASE_ESLINT_RULES_JS,
    );

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
  const rule = TYPESCRIPT_ESLINT_ESLINT_RECOMMENDED_RULES[ruleName];
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
  return ESLINT_CONFIG_PRETTIER_RULES_SET.has(ruleName);
}

function getLineOfCodeStartingAtPos(pos: number, code: string) {
  const codeStartingAtPos = code.slice(pos);
  const newlineIndex = codeStartingAtPos.indexOf("\n");

  if (newlineIndex !== -1) {
    return codeStartingAtPos.substring(0, newlineIndex);
  }

  return codeStartingAtPos;
}

function getSourceFileLink(): string {
  return "[`base-eslint.js`](https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/configs/base-eslint.js)";
}
