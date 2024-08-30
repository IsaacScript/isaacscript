import { caller, filePath } from "@arktype/fs";
import { capitalizeFirstLetter } from "isaacscript-common-ts";
import path from "node:path";

/**
 * Helper function to get the directory of a calling function.
 *
 * This is re-implemented from the "@arktype/fs" package so that we can have an arbitrary
 * `upStackBy` position.
 *
 * @param upStackBy Optional. How far to look up the stack. Default is 1.
 * @see https://github.com/arktypeio/arktype/blob/main/ark/fs/fs.ts
 */
export function dirOfCaller(upStackBy = 1): string {
  const filePathString = fileOfCaller(upStackBy + 1);
  return path.dirname(filePathString);
}

/**
 * Helper function to get the file of a calling function.
 *
 * This is re-implemented from the "@arktype/fs" package so that we can have an arbitrary
 * `upStackBy` position.
 *
 * We also fix a bug on Windows with an uncapitalized drive letter.
 *
 * @param upStackBy Optional. How far to look up the stack. Default is 1.
 * @see https://github.com/arktypeio/arktype/blob/main/ark/fs/fs.ts
 */
export function fileOfCaller(upStackBy = 1): string {
  const callerFile = caller({ methodName: "fileOfCaller", upStackBy }).file;
  let filePathString = filePath(callerFile);

  // Fix the bug on Windows where the drive letter will not be capitalized.
  if (filePathString.match(/^\w:\\/) !== null) {
    filePathString = capitalizeFirstLetter(filePathString);
  }

  return filePathString;
}

// We re-export "findPackageRoot" from "@arktype/fs" so that end-users do not have to depend on it.
// (We cannot wrap it in a helper function since it works with the call stack.)
// See: https://github.com/arktypeio/arktype/blob/main/ark/fs/fs.ts
export { findPackageRoot } from "@arktype/fs";
