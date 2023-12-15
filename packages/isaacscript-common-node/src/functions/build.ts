// Contains helper functions for build scripts.

import { assertDefined } from "isaacscript-common-ts";
import fs from "node:fs";
import { $s } from "./execa.js";
import { getMatchingFilePaths, renameFileExtensions, rm } from "./file.js";

/**
 * Helper function to invoke `tsc` twice, producing both CommonJS (CJS) and ECMAScript modules (ESM)
 * output.
 */
export async function buildCJSAndESM(outDir: string): Promise<void> {
  rm(outDir);

  // `tsc` will create the following files:
  // - foo.d.ts
  // - foo.d.ts.map
  // - foo.js
  // - foo.js.map

  $s`tsc`;

  await renameFileExtensions(outDir, "d.ts", "d.mts");
  await renameFileExtensions(outDir, "d.ts.map", "d.mts.map");
  await renameFileExtensions(outDir, "js", "mjs");
  await renameFileExtensions(outDir, "js.map", "mjs.map");

  await rewriteDeclarationFiles(outDir, true);
  await rewriteDeclarationMapFiles(outDir, true);
  await rewriteSourceFiles(outDir, true);
  await rewriteSourceMapFiles(outDir, true);

  $s`tsc --module CommonJS`;

  await renameFileExtensions(outDir, "d.ts", "d.cts");
  await renameFileExtensions(outDir, "d.ts.map", "d.cts.map");
  await renameFileExtensions(outDir, "js", "cjs");
  await renameFileExtensions(outDir, "js.map", "cjs.map");

  await rewriteDeclarationFiles(outDir, false);
  await rewriteDeclarationMapFiles(outDir, false);
  await rewriteSourceFiles(outDir, false);
  await rewriteSourceMapFiles(outDir, false);
}

/**
 * After renaming `foo.d.ts` to `foo.d.mts`, the declaration map path will be messed up.
 *
 * For example:
 *
 * ```ts
 * //# sourceMappingURL=foo.d.ts.map
 * ```
 *
 * Needs to be rewritten to:
 *
 * ```ts
 * //# sourceMappingURL=foo.d.mts.map
 * ```
 */
async function rewriteDeclarationFiles(
  directoryPath: string,
  esm: boolean,
): Promise<void> {
  const extensionFinalWord = esm ? "mts" : "cts";
  const extension = `.d.${extensionFinalWord}`;
  const matchFunc = (filePath: string) => filePath.endsWith(extension);
  const filePaths = await getMatchingFilePaths(directoryPath, matchFunc);

  const readPromises: Array<Promise<string>> = [];

  for (const filePath of filePaths) {
    const promise = fs.promises.readFile(filePath, "utf8");
    readPromises.push(promise);
  }

  const filesContents = await Promise.all(readPromises);

  const writePromises: Array<Promise<void>> = [];

  for (const [i, fileContents] of filesContents.entries()) {
    const filePath = filePaths[i];
    assertDefined(
      filePath,
      `Failed to get the file path corresponding to index: ${i}`,
    );

    const newFileContents = fileContents.replace(
      /\/\/# sourceMappingURL=(.+?)\.d\.ts.map/,
      `//# sourceMappingURL=$1.d.${extensionFinalWord}.map`,
    );
    const promise = fs.promises.writeFile(filePath, newFileContents);
    writePromises.push(promise);
  }

  await Promise.all(writePromises);
}

/**
 * After renaming `foo.d.ts.map` to `foo.d.mts.map`, the backwards reference path will be messed up.
 *
 * For example:
 *
 * ```json
 * {"version":3,"file":"foo.d.ts",
 * ```
 *
 * Needs to be rewritten to:
 *
 * ```json
 * {"version":3,"file":"foo.d.mts",
 * ```
 */
async function rewriteDeclarationMapFiles(
  directoryPath: string,
  esm: boolean,
): Promise<void> {
  const extensionFinalWord = esm ? "mts" : "cts";
  const extension = `.d.${extensionFinalWord}.map`;
  const matchFunc = (filePath: string) => filePath.endsWith(extension);
  const filePaths = await getMatchingFilePaths(directoryPath, matchFunc);

  const readPromises: Array<Promise<string>> = [];

  for (const filePath of filePaths) {
    const promise = fs.promises.readFile(filePath, "utf8");
    readPromises.push(promise);
  }

  const filesContents = await Promise.all(readPromises);

  const writePromises: Array<Promise<void>> = [];

  for (const [i, fileContents] of filesContents.entries()) {
    const filePath = filePaths[i];
    assertDefined(
      filePath,
      `Failed to get the file path corresponding to index: ${i}`,
    );

    const newFileContents = fileContents.replace(
      /"file":"(.+?)\.d\.ts",/,
      `"file":"$1.d.${extensionFinalWord}",`,
    );
    const promise = fs.promises.writeFile(filePath, newFileContents);
    writePromises.push(promise);
  }

  await Promise.all(writePromises);
}

/**
 * After renaming `foo.js` to `foo.mjs`, the source map path will be messed up.
 *
 * For example:
 *
 * ```ts
 * //# sourceMappingURL=foo.js.map
 * ```
 *
 * Needs to be rewritten to:
 *
 * ```ts
 * //# sourceMappingURL=foo.mjs.map
 * ```
 */
async function rewriteSourceFiles(
  directoryPath: string,
  esm: boolean,
): Promise<void> {
  const extensionFinalWord = esm ? "mjs" : "cjs";
  const extension = `.${extensionFinalWord}`;
  const matchFunc = (filePath: string) => filePath.endsWith(extension);
  const filePaths = await getMatchingFilePaths(directoryPath, matchFunc);

  const readPromises: Array<Promise<string>> = [];

  for (const filePath of filePaths) {
    const promise = fs.promises.readFile(filePath, "utf8");
    readPromises.push(promise);
  }

  const filesContents = await Promise.all(readPromises);

  const writePromises: Array<Promise<void>> = [];

  for (const [i, fileContents] of filesContents.entries()) {
    const filePath = filePaths[i];
    assertDefined(
      filePath,
      `Failed to get the file path corresponding to index: ${i}`,
    );

    const newFileContents = fileContents.replace(
      /\/\/# sourceMappingURL=(.+?)\.js.map/,
      `//# sourceMappingURL=$1.${extensionFinalWord}.map`,
    );
    const promise = fs.promises.writeFile(filePath, newFileContents);
    writePromises.push(promise);
  }

  await Promise.all(writePromises);
}

/**
 * After renaming `foo.js.map` to `foo.mjs.map`, the backwards reference path will be messed up.
 *
 * For example:
 *
 * ```json
 * {"version":3,"file":"foo.js",
 * ```
 *
 * Needs to be rewritten to:
 *
 * ```json
 * {"version":3,"file":"foo.mjs",
 * ```
 */
async function rewriteSourceMapFiles(
  directoryPath: string,
  esm: boolean,
): Promise<void> {
  const extensionFinalWord = esm ? "mjs" : "cjs";
  const extension = `.${extensionFinalWord}.map`;
  const matchFunc = (filePath: string) => filePath.endsWith(extension);
  const filePaths = await getMatchingFilePaths(directoryPath, matchFunc);

  const readPromises: Array<Promise<string>> = [];

  for (const filePath of filePaths) {
    const promise = fs.promises.readFile(filePath, "utf8");
    readPromises.push(promise);
  }

  const filesContents = await Promise.all(readPromises);

  const writePromises: Array<Promise<void>> = [];

  for (const [i, fileContents] of filesContents.entries()) {
    const filePath = filePaths[i];
    assertDefined(
      filePath,
      `Failed to get the file path corresponding to index: ${i}`,
    );

    const newFileContents = fileContents.replace(
      /"file":"(.+?)\.js",/,
      `"file":"$1.${extensionFinalWord}",`,
    );
    const promise = fs.promises.writeFile(filePath, newFileContents);
    writePromises.push(promise);
  }

  await Promise.all(writePromises);
}
