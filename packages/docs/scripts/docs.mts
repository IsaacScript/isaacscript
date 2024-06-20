// This script also checks for missing rules from all of the ESLint plugins.

import ESLintPluginESLintComments from "@eslint-community/eslint-plugin-eslint-comments";
import ESLintJS from "@eslint/js";
import TypeScriptESLintPlugin from "@typescript-eslint/eslint-plugin";
import type { Linter } from "eslint";
import ESLintConfigPrettier from "eslint-config-prettier";
import ESLintPluginImport from "eslint-plugin-import";
import ESLintPluginJSDoc from "eslint-plugin-jsdoc";
import ESLintPluginN from "eslint-plugin-n";
import ESLintPluginUnicorn from "eslint-plugin-unicorn";
import extractComments from "extract-comments";
import {
  echo,
  fatalError,
  isDirectory,
  isMain,
  mkdir,
  readFile,
  writeFile,
} from "isaacscript-common-node";
import type { ReadonlyRecord } from "isaacscript-common-ts";
import { assertDefined, isArray, isObject } from "isaacscript-common-ts";
import path from "node:path";
import url from "node:url";

type ParentConfig =
  | "eslint/recommended"
  | "@typescript-eslint/eslint-recommended"
  | "@typescript-eslint/recommended-type-checked"
  | "@typescript-eslint/recommended"
  | "@typescript-eslint/strict-type-checked"
  | "@typescript-eslint/strict"
  | "@typescript-eslint/stylistic"
  | "@typescript-eslint/stylistic-type-checked"
  | "eslint-comments/recommended"
  | "import/recommended"
  | "jsdoc/recommended"
  | "n/recommended"
  | "unicorn/recommended"
  | "eslint-config-prettier";

const FAIL_ON_MISSING_RULES = false as boolean;

const MARKDOWN_HEADER = `# \`eslint-config-isaacscript\`

## Introduction

This is a sharable configuration for [ESLint](https://eslint.org/) that is intended to be used in TypeScript projects.

The config is environment-agnostic, meaning that it will work in client-side projects (e.g. React), server-side projects (e.g. Node.js), and so on.

<br />

## Installation

This package is part of the [\`isaacscript-lint\`](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaacscript-lint) meta-linting package. It is recommended that instead of consuming this package directly, you instead list \`isaacscript-lint\` as a dependency, as that will install both this config and all of the rule plugins that it depends on.

For installation instructions, see [the \`isaacscript-lint\` page](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaacscript-lint#installation-instructions-for-typescript-projects).

<br />

## Why Do I Need To Use ESLint?

Presumably, you are a TypeScript user who has used the language for a while. At this point, you have already realized that TypeScript saves you an enormous amount of time. The hours spent troubleshooting run-time errors from typos have become a thing of the past. Good riddance!

But there are many other code problems that do not have to do with types. In the same way that you want to use TypeScript to catch as many bugs as possible, you also want to use ESLint with a config that enables as many good linting rules as possible.

ESLint rules can help catch bugs, but they can also help to make your codebase more consistent and adhere to best-practices within the TypeScript ecosystem. Remember that [code is read more often than it is written](https://skeptics.stackexchange.com/questions/48560/is-code-read-more-often-than-its-written). If you care about your code being the best that it can possibly be, then using ESLint is a no-brainer!

<br />

## Why Do I Need \`eslint-config-isaacscript\`?

Your codebase deserves to be safe as possible and \`eslint-config-isaacscript\` is the most comprehensive ESLint config out there.

Building an ESLint config from scratch takes many, many hours. ESLint has [over 250 rules](https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-all.js). \`typescript-eslint\` has [over 125 rules](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/all.ts). And that's just the beginning.

Don't bother creating and maintaining a huge ESLint config yourself. We've done the work to:

- Enable every ESLint rule that we can find from trusted sources that provides value.
- Weed out the rules that don't apply to TypeScript codebases (because many ESLint rules were written before TypeScript existed).
- Weed out the rules covered by [Prettier](https://prettier.io/) (because many ESLint rules were written before Prettier existed).
- Weed out the rules that are too noisy to provide value (and document them below).

<br />

## Our Config Philosophy

We want to enable as many lint rules as possible, so that we can catch as many bugs as possible. Of course, this is a tradeoff: with more lint rules, we get more false positives. But in general, a few false positives are worth the time saved from investigating and squashing bugs. (More on false positives [later](#dealing-with-false-positives).)

In line with this philosophy, our linting config enables nearly all of the recommended rules from both the core ESLint team and the TypeScript ESLint team, as well as some additional rules that catch even more bugs.

This config also assumes that you are using [Prettier](https://prettier.io/) to format your TypeScript code, which is considered to be best-practice in the ecosystem. Subsequently, all formatting-related rules that conflict with Prettier are disabled. (However, we use a few formatting-related rules that are not handled by Prettier.)

<br />

## Auto-Fixing

Deploying this ESLint config on an existing codebase can generate a ton of warnings. Fixing them all might seem overwhelming. While some warnings need to be fixed manually, a ton of ESLint rules have "auto-fixers". This means that the code will fix itself if you run ESLint with the \`--fix\` flag. So, by running \`npx eslint --fix .\` in the root of your project, you can take care of a lot of the warnings automatically.

Additionally, we recommend that you [configure your IDE (i.e. VSCode) to automatically run \`--fix\` whenever you save a file](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaacscript-lint#integration-with-vscode).

<br />

## Dealing with False Positives

Your first reaction to having a bunch of yellow squiggly lines might be to disable any rule that gets in your way. However, even if you think an ESLint warning is superfluous, it is often a sign that your codebase is structured in a bug-prone or non-idiomatic way. Before simply disabling a rule, sometimes it is good to do some research and think carefully if your code can be refactored in some way to be cleaner.

Additionally, some ESLint rules are not about catching bugs, but are about code style and code consistency. If you find the new style to be foreign and weird, it can be tempting to ignore or disable the rule. But before you do that, consider the cost: your codebase will be deviating from others in the TypeScript ecosystem. It is [really nice for everyone's code to adhere to the same look and the same standards](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaacscript-lint#why-code-formatting-is-important)!

With that said, with so many ESLint rules turned on, you will undoubtedly come across some false positives. You can quickly take care of these by adding a \`// eslint-disable-next-line insert-rule-name-here\` comment. And you can automatically add the comment by selecting "Quick Fix" in VSCode, which is mapped to \`Ctrl + .\` by default.

If you find yourself adding a lot of disable comments for a specific rule, then turn the rule off for the entire project by adding an entry for it in your \`.eslintrc.cjs\` file. Some rules won't make sense for every project and that's okay!

<br />

## Rule List

Below, we provide documentation for every rule that is disabled. (We take a blacklist approach rather than a whitelist approach.)
`;

// -------------------------------------------------------------------------------------------------

const REPO_ROOT = path.join(import.meta.dirname, "..", "..", "..");

const BASE_CONFIGS_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
  "configs",
);

const ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH = path.join(
  REPO_ROOT,
  "packages",
  "docs",
  "docs",
  "eslint-config-isaacscript",
);
const README_PATH = path.join(ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH, "README.md");

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
  assertDefined(
    config,
    `Failed to parse the "@typescript-eslint/${configName}" config.`,
  );

  // Unlike the other configs, the "eslint-recommended" rules are contained within an "overrides"
  // directive.
  if (configName === "eslint-recommended") {
    const { overrides } = config;
    assertDefined(
      overrides,
      `Failed to parse the "@typescript-eslint/${configName}" config overrides.`,
    );

    const firstElement = overrides[0];
    assertDefined(
      firstElement,
      `Failed to parse the "@typescript-eslint/${configName}" config overrides first element.`,
    );

    const { rules } = firstElement;
    assertDefined(
      rules,
      `Failed to parse the "@typescript-eslint/${configName}" config rules.`,
    );

    return rules;
  }

  const { rules } = config;
  assertDefined(
    rules,
    `Failed to parse the "@typescript-eslint/${configName}" config rules.`,
  );

  return rules;
}

const COMMENTS_RECOMMENDED_RULES_SET: ReadonlySet<string> = new Set(
  Object.keys(ESLintPluginESLintComments.configs.recommended.rules),
);

const IMPORT_RECOMMENDED_RULES_SET: ReadonlySet<string> = new Set(
  Object.keys(ESLintPluginImport.configs.recommended.rules),
);

assertDefined(
  ESLintPluginJSDoc.configs.recommended.rules,
  "Failed to parse the rules from the following plugin: eslint-plugin-jsdoc",
);
const JSDOC_RECOMMENDED_RULES_SET: ReadonlySet<string> = new Set(
  Object.keys(ESLintPluginJSDoc.configs.recommended.rules),
);

assertDefined(
  ESLintPluginN.configs.recommended.rules,
  "Failed to parse the rules from the following plugin: eslint-plugin-n",
);
const N_RECOMMENDED_RULES_SET: ReadonlySet<string> = new Set(
  Object.keys(ESLintPluginN.configs.recommended.rules),
);

// -------------------------------------------------------------------------------------------------

const PARENT_CONFIG_LINKS = {
  "eslint/recommended":
    "https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js",
  "@typescript-eslint/eslint-recommended":
    "https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts",
  "@typescript-eslint/recommended-type-checked":
    "https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-type-checked.ts",
  "@typescript-eslint/recommended":
    "https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts",
  "@typescript-eslint/strict-type-checked":
    "https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict-type-checked.ts",
  "@typescript-eslint/strict":
    "https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts",
  "@typescript-eslint/stylistic-type-checked":
    "https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic-type-checked.ts",
  "@typescript-eslint/stylistic":
    "https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic.ts",
  "eslint-comments/recommended":
    "https://github.com/eslint-community/eslint-plugin-eslint-comments/blob/master/lib/configs/recommended.js",
  "import/recommended":
    "https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js",
  "jsdoc/recommended":
    "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/src/index.js",
  "n/recommended":
    "https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/configs/_commons.js",
  "unicorn/recommended":
    "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/configs/recommended.js",
  "eslint-config-prettier":
    "https://github.com/prettier/eslint-config-prettier/blob/main/index.js",
} as const satisfies Record<ParentConfig, string>;

if (isMain()) {
  await makeECIDocs(false);
}

export async function makeECIDocs(quiet: boolean): Promise<void> {
  let markdownOutput = MARKDOWN_HEADER;

  markdownOutput += await getMarkdownRuleSection(
    "eslint",
    "Core ESLint Rules",
    "https://eslint.org/docs/latest/rules/",
    "https://eslint.org/docs/latest/rules/__RULE_NAME__",
    ESLintJS,
  );

  markdownOutput += await getMarkdownRuleSection(
    "disable-autofix",
    getPluginHeaderTitle("disable-autofix"),
    "https://github.com/chiefmikey/eslint-plugin-disable-autofix",
    // This plugin does not have individual documentation pages for each rule.
    "https://github.com/chiefmikey/eslint-plugin-disable-autofix",
    undefined,
  );

  markdownOutput += await getMarkdownRuleSection(
    "typescript-eslint",
    "`@typescript-eslint` Rules",
    "https://typescript-eslint.io/rules/",
    "https://typescript-eslint.io/rules/__RULE_NAME__/",
    TypeScriptESLintPlugin,
  );

  markdownOutput += await getMarkdownRuleSection(
    "eslint-comments",
    getPluginHeaderTitle("eslint-comments"),
    "https://github.com/eslint-community/eslint-plugin-eslint-comments",
    "https://github.com/eslint-community/eslint-plugin-eslint-comments/blob/master/docs/rules/__RULE_NAME__.md",
    ESLintPluginESLintComments,
  );

  markdownOutput += await getMarkdownRuleSection(
    "import",
    getPluginHeaderTitle("import"),
    "https://github.com/import-js/eslint-plugin-import",
    "https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/__RULE_NAME__.md",
    ESLintPluginImport,
  );

  markdownOutput += await getMarkdownRuleSection(
    "jsdoc",
    getPluginHeaderTitle("jsdoc"),
    "https://github.com/gajus/eslint-plugin-jsdoc",
    "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/__RULE_NAME__.md",
    ESLintPluginJSDoc,
  );

  markdownOutput += await getMarkdownRuleSection(
    "n",
    getPluginHeaderTitle("n"),
    "https://github.com/eslint-community/eslint-plugin-n",
    "https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/__RULE_NAME__.md",
    ESLintPluginN,
  );

  markdownOutput += await getMarkdownRuleSection(
    "unicorn",
    getPluginHeaderTitle("unicorn"),
    "https://github.com/sindresorhus/eslint-plugin-unicorn",
    "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/__RULE_NAME__.md",
    ESLintPluginUnicorn,
  );

  if (!isDirectory(ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH)) {
    mkdir(ESLINT_CONFIG_ISAACSCRIPT_DOCS_PATH);
  }
  writeFile(README_PATH, markdownOutput);

  if (!quiet) {
    echo(`Successfully created: ${README_PATH}`);
  }
}

function getPluginHeaderTitle(pluginName: string) {
  return `\`eslint-plugin-${pluginName}\` Rules`;
}

async function getMarkdownRuleSection(
  configName: string,
  headerTitle: string,
  pluginURL: string,
  ruleURL: string,
  upstreamImport: unknown,
): Promise<string> {
  let markdownOutput = getMarkdownHeader(headerTitle, pluginURL);

  const baseConfigFileName = `base-${configName}.js`;
  const baseConfigPath = path.join(BASE_CONFIGS_PATH, baseConfigFileName);
  const baseConfigURL = url.pathToFileURL(baseConfigPath).toString();
  const baseConfig = (await import(baseConfigURL)) as unknown;

  if (!isObject(baseConfig)) {
    fatalError(`Failed to parse the base config: ${baseConfigPath}`);
  }

  const firstExport = Object.values(baseConfig)[0];
  if (!isArray(firstExport)) {
    fatalError(
      `Failed to parse the base config first export: ${baseConfigPath}`,
    );
  }

  const firstConfig = firstExport[0];
  if (!isObject(firstConfig)) {
    fatalError(
      `Failed to parse the base config first config: ${baseConfigPath}`,
    );
  }

  const { rules } = firstConfig;
  if (!isObject(rules)) {
    fatalError(`Failed to parse the base rules in: ${baseConfigPath}`);
  }

  const baseRules = rules as Record<string, Linter.RuleEntry>;
  auditBaseConfigRules(configName, upstreamImport, baseRules);

  const alphabeticalRuleNames = Object.keys(baseRules).sort();
  for (const ruleName of alphabeticalRuleNames) {
    const rule = baseRules[ruleName];
    assertDefined(rule, `Failed to find base rule: ${ruleName}`);

    const baseConfigText = readFile(baseConfigPath);

    markdownOutput += getMarkdownTableRow(
      ruleName,
      rule,
      ruleURL,
      baseConfigText,
      baseConfigFileName,
    );
  }

  return markdownOutput;
}

/**
 * Audit the base config to ensure that we have an entry for each rule corresponding to the upstream
 * code.
 */
function auditBaseConfigRules(
  configName: string,
  upstreamImport: unknown,
  baseRules: ReadonlyRecord<string, Linter.RuleEntry>,
) {
  if (upstreamImport === undefined) {
    return;
  }

  const allRules = getAllRulesFromImport(configName, upstreamImport);
  const allRuleNames = Object.keys(allRules);

  for (const ruleName of allRuleNames) {
    let fullRuleName: string;
    if (configName === "eslint") {
      fullRuleName = ruleName;
    } else if (configName === "typescript-eslint") {
      fullRuleName = `@${configName}/${ruleName}`;
    } else {
      fullRuleName = `${configName}/${ruleName}`;
    }

    const rule = baseRules[fullRuleName];
    if (rule === undefined) {
      const msg = `Failed to find a rule in the base config for config "${configName}": ${fullRuleName}`;
      if (FAIL_ON_MISSING_RULES) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }
    }
  }
}

function getAllRulesFromImport(
  configName: string,
  upstreamImport: unknown,
): Record<string, unknown> {
  // The core ESLint rules are a special case.
  if (configName === "eslint") {
    return getAllRulesFromImportCoreESLint(configName, upstreamImport);
  }

  if (typeof upstreamImport !== "object" || upstreamImport === null) {
    fatalError(`Failed to parse the import for: ${configName}`);
  }

  if (!("rules" in upstreamImport)) {
    fatalError(`Failed to find the rules in the import for: ${configName}`);
  }

  const { rules } = upstreamImport;
  if (typeof rules !== "object" || rules === null) {
    fatalError(`Failed to parse the import rules for: ${configName}`);
  }

  return rules as Record<string, unknown>;
}

function getAllRulesFromImportCoreESLint(
  configName: string,
  upstreamImport: unknown,
): Record<string, unknown> {
  if (!isObject(upstreamImport)) {
    fatalError(`Failed to parse the import for: ${configName}`);
  }

  const { configs } = upstreamImport;
  if (!isObject(configs)) {
    fatalError(`Failed to parse the configs for: ${configName}`);
  }

  const { all } = configs;
  if (!isObject(all)) {
    fatalError(`Failed to parse the "all" configs for: ${configName}`);
  }

  const { rules } = all;
  if (!isObject(rules)) {
    fatalError(`Failed to parse the "all" config rules for: ${configName}`);
  }

  return rules;
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
    fatalError(`Unknown value of "${severity}" when parsing rule: ${ruleName}`);
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
      throw new TypeError(
        `Failed to parse the first element of rule: ${ruleName}`,
      );
    }

    return firstElement;
  }

  fatalError(`Failed to parse the type of rule: ${ruleName}`);
}

function getParentConfigsLinks(ruleName: string): string {
  const parentConfigs = getParentConfigs(ruleName);

  if (parentConfigs.length === 0) {
    return "";
  }

  const parentConfigLinks = parentConfigs.map(
    (parentConfig) =>
      `[\`${parentConfig}\`](${PARENT_CONFIG_LINKS[parentConfig]})`,
  );

  return `<ul><li>${parentConfigLinks.join("</li><li>")}</li></ul>`;
}

function getParentConfigs(ruleName: string): readonly ParentConfig[] {
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

  if (COMMENTS_RECOMMENDED_RULES_SET.has(ruleName)) {
    parentConfigs.push("eslint-comments/recommended");
  }

  if (IMPORT_RECOMMENDED_RULES_SET.has(ruleName)) {
    parentConfigs.push("import/recommended");
  }

  if (JSDOC_RECOMMENDED_RULES_SET.has(ruleName)) {
    parentConfigs.push("jsdoc/recommended");
  }

  if (N_RECOMMENDED_RULES_SET.has(ruleName)) {
    parentConfigs.push("n/recommended");
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
    const lineRuleName = lineWithNoQuotes.slice(0, Math.max(0, colonIndex));

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
    throw new TypeError(
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
    return codeStartingAtPos.slice(0, Math.max(0, newlineIndex));
  }

  return codeStartingAtPos;
}

function getMarkdownTableRow(
  ruleName: string,
  rule: Linter.RuleEntry,
  ruleURL: string,
  baseConfigText: string,
  baseConfigFileName: string,
): string {
  const baseRuleName = trimCharactersUntilLastCharacter(ruleName, "/");
  const filledRuleURL = ruleURL.replace("__RULE_NAME__", baseRuleName);
  const ruleNameWithLink = `[\`${ruleName}\`](${filledRuleURL})`;
  const enabled = getRuleEnabled(ruleName, rule);
  const enabledEmoji = enabled ? "✅" : "❌";
  const parentConfigsLinks = getParentConfigsLinks(ruleName);
  const ruleComments = getRuleComments(ruleName, rule, baseConfigText);
  const sourceFileLink = `[\`${baseConfigFileName}\`](https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/configs/${baseConfigFileName})`;

  return `| ${ruleNameWithLink} | ${enabledEmoji} | ${parentConfigsLinks} | ${ruleComments} | ${sourceFileLink}\n`;
}

function trimCharactersUntilLastCharacter(
  string: string,
  character: string,
): string {
  const index = string.lastIndexOf(character);
  return index === -1 ? string : string.slice(index + 1);
}
