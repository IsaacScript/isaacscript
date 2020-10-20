import * as worker from "monaco-editor/esm/vs/editor/editor.worker";
import { TypeScriptWorker } from "monaco-editor/esm/vs/language/typescript/tsWorker";
import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

// Mock unsupported in path-browserify@0.0.1 parse and format functions used for normalization in
// https://github.com/TypeScriptToLua/TypeScriptToLua/blob/3ebc76745f74ce709bf0ba39f830a8f5cf94c473/src/transformation/visitors/modules/import.ts#L25-L28
require("path").parse = (x: any) => x;
require("path").format = (x: any) => x;

const libContext = require.context(`raw-loader!typescript-to-lua/dist/lualib`, true, /(.+)(?<!lualib_bundle)\.lua$/);
const emitHost: tstl.EmitHost = {
    getCurrentDirectory: () => "",
    readFile: (fileName: string) => {
        const [, featureName] = fileName.match(/\/dist\/lualib\/(.+)\.lua$/) || [];
        if (featureName === undefined) {
            throw new Error(`Unexpected file to read: ${fileName}`);
        }

        return libContext(`./${featureName}.lua`).default;
    },
    writeFile() {},
};

const transpiler = new tstl.Transpiler({ emitHost });

export class CustomTypeScriptWorker extends TypeScriptWorker {
    public async getTranspileOutput(fileName: string) {
        const { ast, lua, sourceMap } = this.transpileLua(fileName);
        return { ast, lua, sourceMap };
    }

    public async getSemanticDiagnostics(fileName: string) {
        const diagnostics = await super.getSemanticDiagnostics(fileName);
        const { diagnostics: transpileDiagnostics } = this.transpileLua(fileName);
        return [
            ...diagnostics,
            ...TypeScriptWorker.clearFiles(transpileDiagnostics.map((diag) => ({ ...diag, code: diag.source as any }))),
        ];
    }

    private transpileLua(fileName: string) {
        const program = this._languageService.getProgram()!;
        const sourceFile = program.getSourceFile(fileName)!;

        const compilerOptions: tstl.CompilerOptions = program.getCompilerOptions();
        compilerOptions.rootDir = "inmemory://model/";
        compilerOptions.luaLibImport = tstl.LuaLibImportKind.Inline;
        compilerOptions.luaTarget = tstl.LuaTarget.Lua53;
        compilerOptions.sourceMap = true;

        let ast!: tstl.Block;
        let lua!: string;
        let sourceMap!: string;
        const { diagnostics } = transpiler.emit({
            program,
            sourceFiles: [sourceFile],
            writeFile(fileName, data, _writeBOM, _onError, sourceFiles = []) {
                if (!sourceFiles.includes(sourceFile)) return;
                if (fileName.endsWith(".lua")) lua = data;
                if (fileName.endsWith(".lua.map")) sourceMap = data;
            },
            plugins: [
                {
                    visitors: {
                        [ts.SyntaxKind.SourceFile](node, context) {
                            const [file] = context.superTransformNode(node) as [tstl.Block];

                            if (node === sourceFile) {
                                ast = file;
                            }

                            return file;
                        },
                    },
                },
            ],
        });

        return { diagnostics, ast, lua, sourceMap };
    }
}

globalThis.onmessage = () => {
    worker.initialize((context, createData) => new CustomTypeScriptWorker(context, createData));
};
