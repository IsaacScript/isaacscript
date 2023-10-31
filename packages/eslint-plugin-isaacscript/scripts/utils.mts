import type { TSESLint } from "@typescript-eslint/utils";
import { kebabCaseToCamelCase } from "isaacscript-common-ts";
import * as prettier from "prettier";
import { PLUGIN_NAME, REPO_ROOT } from "./constants.mjs";

export type RuleDefinition = TSESLint.RuleModule<string, unknown[]>;

const RULE_NAME_PREFIX = `${PLUGIN_NAME}/`;

export async function formatWithPrettier(
  text: string,
  language: "typescript" | "markdown",
): Promise<string> {
  const prettierConfig = await prettier.resolveConfig(REPO_ROOT);

  return prettier.format(text, {
    parser: language,
    ...prettierConfig,
  });
}

export async function getRuleEntries(): Promise<
  ReadonlyArray<[string, RuleDefinition]>
> {
  // We have to dynamically import the "rules.ts" file because the scripts use ESM (so that they can
  // leverage other helper functions in the monorepo) and the plugin uses CJS.
  const rulesFiles = await import("../src/rules.js");
  const { rules } = rulesFiles;

  return Object.entries(rules).sort((a, b) => a[0].localeCompare(b[0]));
}

export function getAutoGeneratedComment(): string {
  return `/* eslint-disable isaacscript/format-line-comments */

// THIS CODE WAS AUTOMATICALLY GENERATED.
// DO NOT EDIT THIS FILE BY HAND.
// YOU CAN REGENERATE IT USING:
// npm run generate

`;
}

export function getCamelCaseRuleName(kebabCaseName: string): string {
  const ruleNameCamelCase = kebabCaseToCamelCase(kebabCaseName);
  return ruleNameCamelCase.replace("Jsdoc", "JSDoc");
}

export function getRuleNameWithPluginNamePrefix(ruleName: string): string {
  return `${RULE_NAME_PREFIX}${ruleName}`;
}

export function isRecommendedRule(rule: RuleDefinition): boolean {
  return rule.meta.docs?.recommended !== undefined;
}
