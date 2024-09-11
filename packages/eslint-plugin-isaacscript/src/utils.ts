import { ESLintUtils } from "@typescript-eslint/utils";
import type { MyPluginDocs } from "./interfaces/MyPluginDocs.js";

/** @see https://typescript-eslint.io/developers/custom-rules#extra-rule-docs-types */
// eslint-disable-next-line new-cap
export const createRule = ESLintUtils.RuleCreator<MyPluginDocs>(
  (ruleName) =>
    `https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/${ruleName}.md`,
);
