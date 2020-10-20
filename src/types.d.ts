declare const __LUA_SYNTAX_KIND__: typeof import("typescript-to-lua").SyntaxKind;

declare module "fengari-web";
declare module "renderjson";

declare module "@docusaurus/*";
declare module "@theme/*";

declare module "*.module.css" {
    const _default: Record<string, string>;
    export default _default;
}

declare module "*.module.scss" {
    const _default: Record<string, string>;
    export default _default;
}

declare module "!!raw-loader*" {
    const _default: string;
    export default _default;
}

declare module "worker-loader*" {
    class WebpackWorker extends Worker {
        constructor();
    }

    export default WebpackWorker;
}

declare module "monaco-editor/esm/vs/editor/editor.worker" {
    namespace worker {
        function initialize(callback: (context: any, createData: any) => any): void;
    }

    export = worker;
}

declare module "monaco-editor/esm/vs/language/typescript/tsWorker" {
    import monaco from "monaco-editor/esm/vs/editor/editor.api";
    import * as ts from "typescript";

    export interface TypeScriptWorker extends monaco.languages.typescript.TypeScriptWorker {}
    export class TypeScriptWorker {
        static clearFiles(diagnostics: ts.Diagnostic[]): monaco.languages.typescript.Diagnostic[];
        constructor(context: any, createData: any);
        protected _languageService: ts.LanguageService;
    }
}
