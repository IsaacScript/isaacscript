import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { error } from "./utils";

export function copy(srcPath: string, dstPath: string, verbose: boolean): void {
  if (verbose) {
    console.log(`Copying: ${srcPath} --> ${dstPath}`);
  }

  try {
    // "copySync()" is a "fs-extra" method for copying directories recursively
    fs.copySync(srcPath, dstPath, {
      recursive: true,
    });
  } catch (err) {
    error(
      `Failed to copy directory "${chalk.green(srcPath)}" to "${chalk.green(
        dstPath,
      )}":`,
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

export function isDir(filePath: string, verbose: boolean): boolean {
  const fileStats = getFileStats(filePath, verbose);
  return fileStats.isDirectory();
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
