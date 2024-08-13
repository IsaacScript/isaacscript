import { RuleTester } from "@typescript-eslint/rule-tester"; // eslint-disable-line import-x/no-extraneous-dependencies

/** @see https://typescript-eslint.io/packages/rule-tester */
export const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectServices: {
        allowDefaultProject: ["*.ts*"],
        defaultProject: "tsconfig.json",
      },
      tsconfigRootDir: "./fixtures",
    },
  },
});
