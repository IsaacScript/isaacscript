import { isTypeFlagSet } from "@typescript-eslint/type-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import * as ts from "typescript";

const urlCreator = (name: string) =>
  `https://github.com/IsaacScript/eslint-plugin-isaacscript/blob/main/docs/rules/${name}.md`;
export const createRule = ESLintUtils.RuleCreator(urlCreator);

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

export function isAny(type: ts.Type): boolean {
  return isTypeFlagSet(type, ts.TypeFlags.Any);
}
