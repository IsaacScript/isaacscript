declare module "eslint-plugin-eslint-comments" {
  const ESLintPluginESLintComments: {
    readonly configs: {
      readonly recommended: { readonly rules: Record<string, unknown> };
    };
    readonly rules: Record<string, unknown>;
  };

  // eslint-disable-next-line import/no-default-export
  export default ESLintPluginESLintComments;
}
