interface ESLintPlugin {
  readonly configs: {
    readonly recommended: {
      readonly rules: Record<string, unknown>;
    };
  };
  readonly rules: Record<string, unknown>;
}

/** @see https://github.com/eslint-community/eslint-plugin-eslint-comments/issues/214 */
declare module "@eslint-community/eslint-plugin-eslint-comments" {
  const ESLintPlugin: ESLintPlugin;
  export default ESLintPlugin;
}

/**
 * Does not support flat config. After it does, an issue should be opened to provide an official
 * TypeScript declaration file.
 */
declare module "eslint-plugin-import" {
  const ESLintPlugin: ESLintPlugin;
  export default ESLintPlugin;
}

/** @see https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2324 */
declare module "eslint-plugin-unicorn" {
  const ESLintPlugin: ESLintPlugin;
  export default ESLintPlugin;
}
