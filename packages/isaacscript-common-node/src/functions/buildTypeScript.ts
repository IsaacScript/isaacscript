import type { BuildOptions, BuildResult } from "esbuild";
import esbuild from "esbuild";
import path from "node:path";
import { isFile } from "./file.js";
import { getPackageJSONDependencies } from "./packageJSON.js";
import { getTSConfigJSONOutDir } from "./tsconfigJSON.js";
import { fatalError } from "./utils.js";

const BASE_OPTIONS = {
  bundle: true,
  minify: true,
  logLevel: "warning",
  platform: "node",
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

  // By default, ESBuild will bundle peer dependencies, which is not desired. (The end-user is
  // supposed to control which versions of the peer dependencies are installed.)
  const peerDependencies =
    getPackageJSONDependencies(packageRoot, "peerDependencies") ?? {};
  const peerDependencyNames = Object.keys(peerDependencies);

  const defaultOptions = {
    ...BASE_OPTIONS,
    entryPoints,
    outdir: outDirPath,
    external: peerDependencyNames,
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
