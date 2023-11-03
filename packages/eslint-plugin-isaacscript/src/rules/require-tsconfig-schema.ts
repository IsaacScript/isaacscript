import { createRule } from "../utils";

export const requireTsconfigSchema = createRule({
  name: "require-tsconfig-schema",
  meta: {
    type: "problem",
    docs: {
      description:
        'Requires that all "tsconfig.json" files have a "@schema" field',
      recommended: "recommended",
    },
    schema: [],
    messages: {
      noSchema:
        '"tsconfig.json" files must have a "$schema" field to help prevent typos.',
    },
  },
  defaultOptions: [],
  create(_context) {
    return {
      "Program:exit"() {
        /// console.log(`LOL:${context.sourceCode.text}LOL2`);
      },
    };
  },
});
