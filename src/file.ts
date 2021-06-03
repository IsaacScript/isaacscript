import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

export function copy(srcPath: string, dstPath: string): void {
  try {
    // "copySync()" is a "fs-extra" method for copying directories recursively
    fs.copySync(srcPath, dstPath, {
      recursive: true,
    });
  } catch (err) {
    console.error(
      `Failed to copy directory "${chalk.green(srcPath)}" to "${chalk.green(
        dstPath,
      )}":`,
      err,
    );
    process.exit(1);
  }
}

export function deleteDir(dirPath: string): void {
  try {
    fs.rmSync(dirPath, {
      recursive: true,
    });
  } catch (err) {
    console.error(`Failed to delete directory "${chalk.green(dirPath)}":`, err);
    process.exit(1);
  }
}

export function deleteFile(filePath: string): void {
  try {
    fs.rmSync(filePath);
  } catch (err) {
    console.error(`Failed to delete file "${chalk.green(filePath)}":`, err);
    process.exit(1);
  }
}

export function exists(filePath: string): boolean {
  let pathExists: boolean;
  try {
    pathExists = fs.existsSync(filePath);
  } catch (err) {
    console.error(
      `Failed to check to see if "${chalk.green(filePath)}" exists:`,
      err,
    );
    process.exit(1);
  }

  return pathExists;
}

export function getDirList(dirPath: string): string[] {
  let fileList: string[];
  try {
    fileList = fs.readdirSync(dirPath);
  } catch (err) {
    console.error(
      `Failed to get the files in the "${chalk.green(dirPath)}" directory:`,
      err,
    );
    process.exit(1);
  }

  return fileList;
}

function getFileStats(filePath: string): fs.Stats {
  let fileStats: fs.Stats;
  try {
    fileStats = fs.lstatSync(filePath);
  } catch (err) {
    console.error(
      `Failed to get the file stats for "${chalk.green(filePath)}":`,
      err,
    );
    process.exit(1);
  }

  return fileStats;
}

export function isDir(filePath: string): boolean {
  const fileStats = getFileStats(filePath);
  return fileStats.isDirectory();
}

export function isFile(filePath: string): boolean {
  const fileStats = getFileStats(filePath);
  return fileStats.isFile();
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
    console.error(
      `Failed to create the "${chalk.green(dirPath)}" directory:`,
      err,
    );
    process.exit(1);
  }
}

export function read(filePath: string): string {
  let fileContents: string;
  try {
    fileContents = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(`Failed to read the "${chalk.green(filePath)}" file:`, err);
    process.exit(1);
  }

  return fileContents;
}

export function write(filePath: string, data: string): void {
  try {
    fs.writeFileSync(filePath, data);
  } catch (err) {
    console.error(
      `Failed to write to the "${chalk.green(filePath)}" file:`,
      err,
    );
    process.exit(1);
  }
}

export function writeTry(filePath: string, data: string): void {
  fs.writeFileSync(filePath, data);
}
