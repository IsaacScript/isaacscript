import { caller, filePath } from "@arktype/fs";
import path from "node:path";

// We re-export some functions from "@arktype/fs" so that end-users do not have to depend on it. (We
// cannot wrap them in a helper function since they works with the call stack.)
// See: https://github.com/arktypeio/arktype/blob/beta/ark/fs/fs.ts
export { dirName, findPackageRoot } from "@arktype/fs";

/**
 * Helper function to get the directory of a calling function.
 *
 * This is re-implemented from the "@arktype/fs" package so that we can have an arbitrary
 * `upStackBy` position.
 *
 * @see https://github.com/arktypeio/arktype/blob/beta/ark/fs/fs.ts
 */
export function dirOfCaller(upStackBy = 1): string {
  const callerFile = caller({ methodName: "dirOfCaller", upStackBy }).file;
  const filePathString = filePath(callerFile);
  return path.dirname(filePathString);
}
