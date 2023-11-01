import type { BuildOptions, BuildResult } from "esbuild";
import esbuild from "esbuild";
import path from "node:path";
import { isFile } from "./file.js";
import { getPackageJSONDependencies } from "./packageJSON.js";
import { getTSConfigJSONOutDir } from "./tsconfigJSON.js";
import { fatalError } from "./utils.js";

const BASE_OPTIONS = {
  // `esbuild` is a bundler; it does not output many .js files like `tsc` does:
  // https://github.com/evanw/esbuild/issues/708
  // https://github.com/evanw/esbuild/issues/944
  // Thus, we must bundle all the TypeScript into a single output file. Even though this is not
  // desired, this is a fair trade-off in order to get the speedup of `esbuild` over `tsc`.
  // Additionally, note that setting this option automatically enables tree-shaking:
  // https://esbuild.github.io/api/#tree-shaking
  // Additionally, note that `esbuild` cannot generate ".d.ts" files, so we also have to invoke
  // `tsc` for libraries:
  // https://esbuild.github.io/content-types/#no-type-system
  bundle: true,

  // The default is "false". If we are bundling everything into one file, we might as well minify
  // the output in order to slightly reduce the package size.
  minify: true,

  // The default is "info". We only want to see output when there are warnings or errors.
  logLevel: "warning",

  // The default is "browser".
  platform: "node",

  // The default is "cjs". We want to use the more modern format.
  format: "esm",

  // Source maps are useful when debugging. "linked" is the default mode.
  sourcemap: "linked",
} as const satisfies BuildOptions;

/**
 * Helper function to use `esbuild` to bundle a TypeScript project into a single minified JavaScript
 * file for end-user consumption.
 *
 * This assumes that the file should be created in the "dist" directory.
 *
 * @param packageRoot The path to the root of the TypeScript project.
 * @param options Optional. Additional options to use beyond the default options that will be merged
 *                with the default options.
 */
export async function buildTypeScript(
  packageRoot: string,
  options?: BuildOptions,
): Promise<BuildResult> {
  const entryPoints = options?.entryPoints ?? getEntryPoints(packageRoot);
  if (entryPoints === undefined) {
    fatalError(
      'Failed to derive the "entryPoints" for the TypeScript project. Provide the "buildTypeScript" function with custom options that contain an "entryPoints" array.',
    );
  }

  const outdir = options?.outdir ?? getTSConfigJSONOutDir(packageRoot);
  if (outdir === undefined) {
    fatalError(
      'Failed to derive the "outdir" for the TypeScript project from the "tsconfig.json" file. Provide the "buildTypeScript" function with custom options that contain a "outdir" property.',
    );
  }

  const outDirPath = path.join(packageRoot, outdir);

  // By default, ESBuild will bundle dependencies, which is not desired. (For Node.js libraries and
  // applications, the end-user is supposed to install dependencies using a package manager.
  const dependencies =
    getPackageJSONDependencies(packageRoot, "dependencies") ?? {};
  const peerDependencies =
    getPackageJSONDependencies(packageRoot, "peerDependencies") ?? {};

  const dependencyNames = Object.keys(dependencies);
  const peerDependencyNames = Object.keys(peerDependencies);

  const allDependencyNames = [...dependencyNames, ...peerDependencyNames];

  const defaultOptions = {
    ...BASE_OPTIONS,
    entryPoints,
    outdir: outDirPath,
    external: allDependencyNames,
    ...options,
  };

  return esbuild.build(defaultOptions);
}

function getEntryPoints(projectRoot: string): string[] | undefined {
  const srcPath = path.join(projectRoot, "src");

  const indexTSPath = path.join(srcPath, "index.ts");
  if (isFile(indexTSPath)) {
    return [indexTSPath];
  }

  const mainTSPath = path.join(srcPath, "main.ts");
  if (isFile(mainTSPath)) {
    return [mainTSPath];
  }

  return undefined;
}
