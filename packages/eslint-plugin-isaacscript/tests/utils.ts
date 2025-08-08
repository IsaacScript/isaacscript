import { RuleTester } from "@typescript-eslint/rule-tester";
import path from "node:path";

/** @see https://typescript-eslint.io/packages/rule-tester */
export const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      // In the future, this should be converted to "projectServices" as explained in the TSESLint
      // documentation.
      // https://discord.com/channels/1026804805894672454/1274783430785241220/1274783430785241220
      // https://github.com/typescript-eslint/typescript-eslint/issues/9906
      project: true,

      /**
       * Switching the below `__dirname` to `import.meta.dirname` causes test errors:
       *
       * SyntaxError: Cannot use 'import.meta' outside a module
       */
      tsconfigRootDir: path.join(__dirname, "fixtures"),
    },
  },
});
