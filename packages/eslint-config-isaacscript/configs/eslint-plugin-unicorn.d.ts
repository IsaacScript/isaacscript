import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

// https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2324
declare module "eslint-plugin-unicorn" {
  const ESLintPlugin: FlatConfig.Plugin;
  export default ESLintPlugin;
}
