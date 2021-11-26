import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { error } from "./util";

export function copy(srcPath: string, dstPath: string): void {
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
}

export function deleteFileOrDirectory(filePath: string): void {
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
}

export function exists(filePath: string): boolean {
  let pathExists: boolean;
  try {
    pathExists = fs.existsSync(filePath);
  } catch (err) {
    error(`Failed to check to see if "${chalk.green(filePath)}" exists:`, err);
  }

  return pathExists;
}

export function getDirList(dirPath: string): string[] {
  let fileList: string[];
  try {
    fileList = fs.readdirSync(dirPath);
  } catch (err) {
    error(
      `Failed to get the files in the "${chalk.green(dirPath)}" directory:`,
      err,
    );
  }

  return fileList;
}

function getFileStats(filePath: string): fs.Stats {
  let fileStats: fs.Stats;
  try {
    fileStats = fs.statSync(filePath);
  } catch (err) {
    error(`Failed to get the file stats for "${chalk.green(filePath)}":`, err);
  }

  return fileStats;
}

export function isDir(filePath: string): boolean {
  const fileStats = getFileStats(filePath);
  return fileStats.isDirectory();
}

export function isSubDirOf(dir: string, parent: string): boolean {
  const relative = path.relative(parent, dir);
  return (
    relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative)
  );
}

export function makeDir(dirPath: string): void {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    error(`Failed to create the "${chalk.green(dirPath)}" directory:`, err);
  }
}

export function read(filePath: string): string {
  let fileContents: string;
  try {
    fileContents = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    error(`Failed to read the "${chalk.green(filePath)}" file:`, err);
  }

  return fileContents;
}

export function touch(filePath: string): void {
  try {
    const fileHandle = fs.openSync(filePath, "w");
    fs.closeSync(fileHandle);
  } catch (err) {
    error(`Failed to touch the "${chalk.green(filePath)}" file:`, err);
  }
}

export function write(filePath: string, data: string): void {
  try {
    fs.writeFileSync(filePath, data);
  } catch (err) {
    error(`Failed to write to the "${chalk.green(filePath)}" file:`, err);
  }
}

export function writeTry(filePath: string, data: string): void {
  fs.writeFileSync(filePath, data);
}
