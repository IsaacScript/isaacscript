import chalk from "chalk";
import fs from "fs";
import { error } from "isaacscript-common-ts";
import path from "path";

export function copy(srcPath: string, dstPath: string, verbose: boolean): void {
  if (verbose) {
    console.log(`Copying: ${srcPath} --> ${dstPath}`);
  }

  try {
    fs.cpSync(srcPath, dstPath);
  } catch (err) {
    error(
      `Failed to copy file or directory "${chalk.green(
        srcPath,
      )}" to "${chalk.green(dstPath)}":`,
      err,
    );
  }

  if (verbose) {
    console.log(`Copied: ${srcPath} --> ${dstPath}`);
  }
}

export function deleteFileOrDirectory(
  filePath: string,
  verbose: boolean,
): void {
  if (verbose) {
    console.log(`Deleting: ${filePath}`);
  }

  try {
    fs.rmSync(filePath, {
      recursive: true,
    });
  } catch (err) {
    error(
      `Failed to delete file or directory "${chalk.green(filePath)}":`,
      err,
    );
  }

  if (verbose) {
    console.log(`Deleted: ${filePath}`);
  }
}

export function exists(filePath: string, verbose: boolean): boolean {
  if (verbose) {
    console.log(`Checking to see if the following path exists: ${filePath}`);
  }

  let pathExists: boolean;
  try {
    pathExists = fs.existsSync(filePath);
  } catch (err) {
    error(`Failed to check if "${chalk.green(filePath)}" exists:`, err);
  }

  if (verbose) {
    console.log(`Path exists: ${pathExists}`);
  }

  return pathExists;
}

/**
 * Returns an array of the file names inside of the directory. (If the full path is required, you
 * must manually join it with the path to the directory.)
 */
export function getDirList(dirPath: string, verbose: boolean): string[] {
  if (verbose) {
    console.log(`Getting a directory list from: ${dirPath}`);
  }

  let fileList: string[];
  try {
    fileList = fs.readdirSync(dirPath);
  } catch (err) {
    error(
      `Failed to get the files in the "${chalk.green(dirPath)}" directory:`,
      err,
    );
  }

  if (verbose) {
    console.log(`Got a directory list from: ${dirPath}`);
  }

  return fileList;
}

function getFileStats(filePath: string, verbose: boolean): fs.Stats {
  if (verbose) {
    console.log(`Getting file stats from: ${filePath}`);
  }

  let fileStats: fs.Stats;
  try {
    fileStats = fs.statSync(filePath);
  } catch (err) {
    error(`Failed to get the file stats for "${chalk.green(filePath)}":`, err);
  }

  if (verbose) {
    console.log(`Got file stats from: ${filePath}`);
  }

  return fileStats;
}

/**
 * `fs.lstatSync` is necessary (instead of `fs.statSync`) for the situations where we do not want to
 * follow symbolic links.
 */
function getLinkedFileStats(filePath: string, verbose: boolean): fs.Stats {
  if (verbose) {
    console.log(`Getting linked file stats from: ${filePath}`);
  }

  let fileStats: fs.Stats;
  try {
    fileStats = fs.lstatSync(filePath);
  } catch (err) {
    error(
      `Failed to get the linked file stats for "${chalk.green(filePath)}":`,
      err,
    );
  }

  if (verbose) {
    console.log(`Got linked file stats from: ${filePath}`);
  }

  return fileStats;
}

export function isDir(filePath: string, verbose: boolean): boolean {
  const fileStats = getFileStats(filePath, verbose);
  return fileStats.isDirectory();
}

export function isFile(filePath: string, verbose: boolean): boolean {
  const fileStats = getFileStats(filePath, verbose);
  return fileStats.isFile();
}

export function isLink(filePath: string, verbose: boolean): boolean {
  // We must use `getLinkedFileStats` instead of `getFileStats`.
  const fileStats = getLinkedFileStats(filePath, verbose);
  return fileStats.isSymbolicLink();
}

export function isSubDirOf(dir: string, parent: string): boolean {
  const relative = path.relative(parent, dir);
  return (
    relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative)
  );
}

export function makeDir(dirPath: string, verbose: boolean): void {
  if (verbose) {
    console.log(`Making a directory: ${dirPath}`);
  }

  try {
    fs.mkdirSync(dirPath, {
      recursive: true,
    });
  } catch (err) {
    error(`Failed to create the "${chalk.green(dirPath)}" directory:`, err);
  }

  if (verbose) {
    console.log(`Made a directory: ${dirPath}`);
  }
}

export function read(filePath: string, verbose: boolean): string {
  if (verbose) {
    console.log(`Reading a file: ${filePath}`);
  }

  let fileContents: string;
  try {
    fileContents = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    error(`Failed to read the "${chalk.green(filePath)}" file:`, err);
  }

  if (verbose) {
    console.log(`Read a file: ${filePath}`);
  }

  return fileContents;
}

export function rename(
  srcPath: string,
  dstPath: string,
  verbose: boolean,
): void {
  if (verbose) {
    console.log(`Renaming: ${srcPath} --> ${dstPath}`);
  }

  try {
    fs.renameSync(srcPath, dstPath);
  } catch (err) {
    error(
      `Failed to rename "${chalk.green(srcPath)}" to "${chalk.green(
        dstPath,
      )}":`,
      err,
    );
  }

  if (verbose) {
    console.log(`Renamed: ${srcPath} --> ${dstPath}`);
  }
}

export function touch(filePath: string, verbose: boolean): void {
  if (verbose) {
    console.log(`Touching: ${filePath}`);
  }

  try {
    const fileHandle = fs.openSync(filePath, "w");
    fs.closeSync(fileHandle);
  } catch (err) {
    error(`Failed to touch the "${chalk.green(filePath)}" file:`, err);
  }

  if (verbose) {
    console.log(`Touched: ${filePath}`);
  }
}

export function write(filePath: string, data: string, verbose: boolean): void {
  if (verbose) {
    console.log(`Writing data to: ${filePath}`);
  }

  try {
    fs.writeFileSync(filePath, data);
  } catch (err) {
    error(`Failed to write to the "${chalk.green(filePath)}" file:`, err);
  }

  if (verbose) {
    console.log(`Wrote data to: ${filePath}`);
  }
}

/**
 * Intended to be used in a try/catch block so that you can catch the error and handle it
 * accordingly.
 */
export function writeTry(
  filePath: string,
  data: string,
  verbose: boolean,
): void {
  if (verbose) {
    console.log(`Writing data to: ${filePath}`);
  }

  fs.writeFileSync(filePath, data);

  if (verbose) {
    console.log(`Wrote data to: ${filePath}`);
  }
}
