import type { TSESTree } from "@typescript-eslint/utils";
import { ASTUtils, ESLintUtils } from "@typescript-eslint/utils";
import type { MyPluginDocs } from "./interfaces/MyPluginDocs.js";

/** Taken from ESLint: https://github.com/eslint/eslint/blob/main/lib/rules/max-len.js */
const URL_REGEXP = /[^:/?#]:\/\/[^?#]/u;

export function areStringsEqualExcludingTrailingSpaces(
  string1: string,
  string2: string,
): boolean {
  const string1Lines = string1.split("\n");
  const string2Lines = string2.split("\n");

  if (string1Lines.length !== string2Lines.length) {
    return false;
  }

  // eslint-disable-next-line unicorn/no-for-loop
  for (let i = 0; i < string1Lines.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const line1 = string1Lines[i]!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const line2 = string2Lines[i]!;

    if (line1.trimEnd() !== line2.trimEnd()) {
      return false;
    }
  }

  return true;
}

/** @see https://typescript-eslint.io/developers/custom-rules#extra-rule-docs-types */
// eslint-disable-next-line new-cap
export const createRule = ESLintUtils.RuleCreator<MyPluginDocs>(
  (ruleName) =>
    `https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/${ruleName}.md`,
);

/**
 * From: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
 */
export function getOrdinalSuffix(i: number): string {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
}

export function getParentFunction(
  node: TSESTree.Node,
):
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclarationWithName
  | TSESTree.FunctionDeclarationWithOptionalName
  | TSESTree.FunctionExpression
  | undefined {
  let parent: TSESTree.Node | undefined = node;

  while (parent !== undefined) {
    parent = parent.parent; // eslint-disable-line @typescript-eslint/prefer-destructuring

    if (ASTUtils.isFunction(parent)) {
      return parent;
    }
  }

  return undefined;
}

export function hasURL(text: string): boolean {
  return URL_REGEXP.test(text);
}
