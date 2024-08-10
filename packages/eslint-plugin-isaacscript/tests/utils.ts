import { RuleTester } from "@typescript-eslint/rule-tester"; // eslint-disable-line import-x/no-extraneous-dependencies
import path from "node:path";

/** @see https://typescript-eslint.io/packages/rule-tester */
export const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    /**
     * Switching the below `__dirname` to `import.meta.dirname` causes test errors:
     *
     * The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020',
     * 'es2022', 'esnext', 'system', 'node16', or 'NodeNext'.
     */
    // eslint-disable-next-line unicorn/prefer-module
    tsconfigRootDir: path.join(__dirname, "fixtures"),
    project: true,
  },
});
