declare module "eslint-plugin-import" {
  const ESLintPluginImport: {
    readonly configs: {
      readonly recommended: { readonly rules: Record<string, unknown> };
    };
    readonly rules: Record<string, unknown>;
  };

  // eslint-disable-next-line import/no-default-export
  export default ESLintPluginImport;
}
