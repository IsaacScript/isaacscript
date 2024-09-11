import { RuleTester } from "@typescript-eslint/rule-tester";
import path from "node:path";

/** @see https://typescript-eslint.io/packages/rule-tester */
export const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      // TODO: Try changing this to "projectServices" as explained in the TSESLint documentation.
      project: true,

      /**
       * Switching the below `__dirname` to `import.meta.dirname` causes test errors:
       *
       * SyntaxError: Cannot use 'import.meta' outside a module
       */
      // eslint-disable-next-line unicorn/prefer-module
      tsconfigRootDir: path.join(__dirname, "fixtures"),
    },
  },
});
