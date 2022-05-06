/* eslint-disable import/no-extraneous-dependencies */

import { TSESLint } from "@typescript-eslint/utils";
import * as prettier from "prettier";
import { rules } from "../src/rules";
import { PROJECT_NAME } from "./constants";

export type RuleDefinition = TSESLint.RuleModule<string, unknown[]>;

const RULE_NAME_PREFIX = `${PROJECT_NAME}/`;
const PRETTIER_CONFIG = prettier.resolveConfig.sync(__dirname);

export function kebabCaseToCamelCase(text: string) {
  return text.replace(/-./g, (match) => {
    const firstLetterOfWord = match[1];
    return firstLetterOfWord === undefined
      ? ""
      : firstLetterOfWord.toUpperCase();
  });
}

export function formatWithPrettier(
  text: string,
  language: "typescript" | "markdown",
) {
  return prettier.format(text, {
    parser: language,
    ...PRETTIER_CONFIG,
  });
}

export function getAlphabeticalRuleEntries(): Array<[string, RuleDefinition]> {
  return Object.entries(rules).sort((a, b) => a[0].localeCompare(b[0]));
}

export function getFullRuleName(ruleName: string) {
  return `${RULE_NAME_PREFIX}${ruleName}`;
}

export function isRecommendedRule(rule: RuleDefinition) {
  if (rule.meta.docs === undefined) {
    return false;
  }

  return rule.meta.docs.recommended !== false;
}

/** Intended to be used on file content that needs to have a trailing newline. */
export function removeFirstAndLastLine(text: string) {
  const lines = text.trim().split("\n");
  lines.shift(); // Remove first line
  lines.pop(); // Remove last line
  lines.push(""); // Add a trailing newline
  return lines.join("\n");
}
