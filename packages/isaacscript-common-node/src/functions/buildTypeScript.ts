import type { BuildOptions, BuildResult } from "esbuild";
import esbuild from "esbuild";
import path from "node:path";
import { isFile } from "./file.js";
import { getPackageJSONDependencies } from "./packageJSON.js";
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
 * @param entryPoint Optional. The path to the TypeScript file entry point.
 * @param outDirName Optional. The name of the output directory. Defaults to "dist".
 */
export async function buildTypeScript(
  packageRoot: string,
  entryPoint?: string,
  outDirName = "dist",
): Promise<BuildResult> {
  const tsPath = entryPoint ?? getEntryPoint(packageRoot);
  if (tsPath === undefined) {
    fatalError("Failed to derive the entry point for the TypeScript project.");
  }

  const outDirPath = path.join(packageRoot, outDirName);

  // By default, ESBuild will bundle peer dependencies, which is not desired. (The end-user is
  // supposed to control which versions of the peer dependencies are installed.)
  const peerDependencies =
    getPackageJSONDependencies(packageRoot, "peerDependencies") ?? {};
  const peerDependencyNames = Object.keys(peerDependencies);

  return esbuild.build({
    ...BASE_OPTIONS,
    entryPoints: [tsPath],
    outdir: outDirPath,
    external: peerDependencyNames,
  });
}

function getEntryPoint(projectRoot: string): string | undefined {
  const srcPath = path.join(projectRoot, "src");

  const indexTSPath = path.join(srcPath, "index.ts");
  if (isFile(indexTSPath)) {
    return indexTSPath;
  }

  const mainTSPath = path.join(srcPath, "main.ts");
  if (isFile(mainTSPath)) {
    return mainTSPath;
  }

  return undefined;
}
