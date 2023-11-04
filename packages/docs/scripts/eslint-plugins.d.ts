interface ESLintPlugin {
  readonly configs: {
    readonly recommended: {
      readonly rules: Record<string, unknown>;
    };
  };
  readonly rules: Record<string, unknown>;
}

declare module "eslint-plugin-eslint-comments" {
  const ESLintPlugin: ESLintPlugin;
  export default ESLintPlugin;
}

declare module "eslint-plugin-import" {
  const ESLintPlugin: ESLintPlugin;
  export default ESLintPlugin;
}

declare module "eslint-plugin-jsdoc" {
  const ESLintPlugin: ESLintPlugin;
  export default ESLintPlugin;
}

declare module "eslint-plugin-n" {
  const ESLintPlugin: ESLintPlugin;
  export default ESLintPlugin;
}

declare module "eslint-plugin-unicorn" {
  const ESLintPlugin: ESLintPlugin;
  export default ESLintPlugin;
}
