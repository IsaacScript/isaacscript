import chalk from "chalk";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fatalError } from "./utils.js";

/**
 * Helper function to synchronously copy a file or directory. If a path to a directory is specified,
 * the directory will be recursively copied.
 *
 * This will print an error message and exit the program if the file cannot be copied.
 */
export function copyFileOrDirectory(srcPath: string, dstPath: string): void {
  try {
    fs.cpSync(srcPath, dstPath, {
      recursive: true,
    });
  } catch (error) {
    fatalError(
      `Failed to copy file or directory "${chalk.green(
        srcPath,
      )}" to "${chalk.green(dstPath)}":`,
      error,
    );
  }
}

/** Alias for the `copyFileOrDirectory` function. Intended to be used in scripts. */
export function cp(srcPath: string, dstPath: string): void {
  copyFileOrDirectory(srcPath, dstPath);
}

/**
 * Helper function to synchronously delete a file or directory. If a path to a directory is
 * specified, the directory will be recursively deleted. If the path does not exist, this function
 * will be a no-op.
 *
 * This will print an error message and exit the program if the file cannot be deleted.
 */
export function deleteFileOrDirectory(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath, {
        recursive: true,
      });
    }
  } catch (error) {
    fatalError(
      `Failed to delete file or directory "${chalk.green(filePath)}":`,
      error,
    );
  }
}

/**
 * Helper function to synchronously get the file names inside of a directory. (If the full path is
 * required, you must manually join the file name with the path to the directory.)
 */
export function getDirectoryList(dirPath: string): string[] {
  let fileList: string[];
  try {
    fileList = fs.readdirSync(dirPath);
  } catch (error) {
    fatalError(
      `Failed to get the files in the "${chalk.green(dirPath)}" directory:`,
      error,
    );
  }

  return fileList;
}

/** Helper function to synchronously get a SHA256 hash of a file. */
export function getHashOfFile(filePath: string): string {
  // We do not use the `readFile` helper function because we want to read it as binary.
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex");
}

/** Helper function to synchronously check if the provided path exists and is a directory. */
export function isDirectory(filePath: string): boolean {
  return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();
}

/** Helper function to synchronously check if the provided path exists and is a file. */
export function isFile(filePath: string): boolean {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

/** Helper function to synchronously check if the provided path exists and is a symbolic link. */
export function isLink(filePath: string): boolean {
  return fs.existsSync(filePath) && fs.lstatSync(filePath).isSymbolicLink();
}

/** Helper function to see if a directory is a subdirectory of another one. */
export function isSubdirectoryOf(dir: string, parent: string): boolean {
  const relative = path.relative(parent, dir);
  return (
    relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative)
  );
}

/**
 * Helper function to synchronously make a new directory. Will recursively make as many
 * subdirectories as needed.
 *
 * If the recursive behavior is not desired, then use `fs.mkdirSync` directly.
 *
 * This will print an error message and exit the program if the directory cannot be created.
 */
export function makeDirectory(dirPath: string): void {
  try {
    fs.mkdirSync(dirPath, {
      recursive: true,
    });
  } catch (error) {
    fatalError(
      `Failed to delete file or directory "${chalk.green(dirPath)}":`,
      error,
    );
  }
}

/** Alias for the `makeDirectory` function. Intended to be used in scripts. */
export function mkdir(dirPath: string): void {
  makeDirectory(dirPath);
}

/**
 * Helper function to synchronously read a file.
 *
 * This assumes that the file is a text file and uses an encoding of "utf8".
 *
 * This will print an error message and exit the program if the file cannot be read.
 */
export function readFile(filePath: string): string {
  let fileContents: string;

  try {
    fileContents = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    fatalError(`Failed to read file "${chalk.green(filePath)}":`, error);
  }

  return fileContents;
}

/**
 * Helper function to synchronously rename a file.
 *
 * This will print an error message and exit the program if the file cannot be renamed.
 */
export function renameFile(srcPath: string, dstPath: string): void {
  try {
    fs.renameSync(srcPath, dstPath);
  } catch (error) {
    fatalError(
      `Failed to rename "${chalk.green(srcPath)}" to "${chalk.green(
        dstPath,
      )}":`,
      error,
    );
  }
}

/** Alias for the `deleteFileOrDirectory` function. Intended to be used in scripts. */
export function rm(filePath: string): void {
  deleteFileOrDirectory(filePath);
}

/**
 * Helper function to synchronously write 0 bytes to a file, similar to the `touch` command.
 *
 * This will print an error message and exit the program if the file cannot be written to.
 */
export function touch(filePath: string): void {
  if (isDirectory(filePath)) {
    fatalError(
      `Failed to touch the "${chalk.green(
        filePath,
      )}" file since it was a directory.`,
    );
  } else if (isFile(filePath)) {
    try {
      fs.accessSync(filePath);
      const now = new Date();
      fs.utimesSync(filePath, now, now);
    } catch (error) {
      fatalError(`Failed to touch the "${chalk.green(filePath)}" file:`, error);
    }
  } else {
    writeFile(filePath, "");
  }
}

/**
 * Helper function to synchronously write data to a file.
 *
 * This will print an error message and exit the program if the file cannot be written to.
 */
export function writeFile(filePath: string, data: string): void {
  try {
    fs.writeFileSync(filePath, data);
  } catch (error) {
    fatalError(
      `Failed to write to the "${chalk.green(filePath)}" file:`,
      error,
    );
  }
}
