import chalk from "chalk";
import { trimSuffix } from "isaacscript-common-ts";
import fs from "node:fs";
import path from "node:path";
import { fatalError } from "./utils.js";

/**
 * Helper function to synchronously append data to a file.
 *
 * This will print an error message and exit the program if the file cannot be appended to.
 */
export function appendFile(filePath: string, data: string): void {
  try {
    fs.appendFileSync(filePath, data);
  } catch (error) {
    fatalError(
      `Failed to append to the "${chalk.green(filePath)}" file:`,
      error,
    );
  }
}

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
 *
 * This function is variadic, meaning that you can pass as many file paths as you want to delete.
 */
export function deleteFileOrDirectory(...filePaths: readonly string[]): void {
  for (const filePath of filePaths) {
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
}

/**
 * Helper function to synchronously check if a file exists.
 *
 * This will print an error message and exit the program if there is an error when checking the file
 * path.
 */
export function fileOrDirectoryExists(filePath: string): boolean {
  let exists: boolean;

  try {
    exists = fs.existsSync(filePath);
  } catch (error) {
    fatalError(
      `Failed to check if file or directory "${chalk.green(filePath)}" exists:`,
      error,
    );
  }

  return exists;
}

/**
 * Helper function to synchronously get the file names inside of a directory. (If the full path is
 * required, you must manually join the file name with the path to the directory.)
 */
export function getFileNamesInDirectory(
  directoryPath: string,
): readonly string[] {
  let fileList: string[];
  try {
    fileList = fs.readdirSync(directoryPath);
  } catch (error) {
    fatalError(
      `Failed to get the files in the "${chalk.green(
        directoryPath,
      )}" directory:`,
      error,
    );
  }

  return fileList;
}

/**
 * Helper function to get the path to file, given either a file path, a directory path, or
 * `undefined`. This will print an error message and exit the program if the file cannot be found.
 *
 * @param fileName The name of the file to find.
 * @param filePathOrDirPath Either the path to a file or the path to a directory which contains the
 *                          file. If undefined is passed, the current working directory will be
 *                          used.
 */
export function getFilePath(
  fileName: string,
  filePathOrDirPath: string | undefined,
): string {
  if (filePathOrDirPath === undefined) {
    filePathOrDirPath = process.cwd(); // eslint-disable-line no-param-reassign
  }

  let filePath: string;
  if (isFile(filePathOrDirPath)) {
    filePath = filePathOrDirPath;
  } else if (isDirectory(filePathOrDirPath)) {
    filePath = path.join(filePathOrDirPath, fileName);
    if (!fs.existsSync(filePath)) {
      fatalError(
        `Failed to find a "${chalk.green(
          fileName,
        )}" file at the following directory: ${chalk.green(filePathOrDirPath)}`,
      );
    }
  } else {
    fatalError(
      `Failed to find a "${chalk.green(
        fileName,
      )}" file at the following path: ${chalk.green(filePathOrDirPath)}`,
    );
  }

  return filePath;
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
 * Helper function to synchronously move a file.
 *
 * This will print an error message and exit the program if the file cannot be moved.
 *
 * (This is simply an alias for the `renameFile` function, since the Node.js API uses the same thing
 * for both operations.)
 */
export function moveFile(srcPath: string, dstPath: string): void {
  renameFile(srcPath, dstPath);
}

/** Alias for the `moveFile` function. Intended to be used in scripts. */
export function mv(srcPath: string, dstPath: string): void {
  moveFile(srcPath, dstPath);
}

/**
 * Helper function to synchronously prepend data to a file.
 *
 * This will print an error message and exit the program if the file cannot be prepended to.
 */
export function prependFile(filePath: string, data: string): void {
  const fileContents = readFile(filePath);
  const newFileContents = data + fileContents;
  writeFile(filePath, newFileContents);
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

/**
 * Helper function to recursively rename all of the files in a directory from one file extension to
 * another.
 *
 * @param directoryPath The path to the directory to crawl.
 * @param srcFileExtension The file extension to change from. Do not include a period in the string.
 * @param dstFileExtension The file extension to change to. Do not include a period in the string.
 */
export async function renameFileExtensions(
  directoryPath: string,
  srcFileExtension: string,
  dstFileExtension: string,
): Promise<void> {
  const files = await fs.promises.readdir(directoryPath, {
    withFileTypes: true,
  });

  const promises: Array<Promise<unknown>> = [];

  for (const file of files) {
    if (file.isDirectory()) {
      const subDirectoryPath = path.join(directoryPath, file.name);
      const promise = renameFileExtensions(
        subDirectoryPath,
        srcFileExtension,
        dstFileExtension,
      );
      promises.push(promise);
    } else {
      const fileExtension = path.extname(file.name);

      if (fileExtension === `.${srcFileExtension}`) {
        const filePath = path.join(directoryPath, file.name);
        const fileNameWithoutExt = trimSuffix(file.name, fileExtension);
        const newFileName = `${fileNameWithoutExt}.${dstFileExtension}`;
        const newFilePath = path.join(directoryPath, newFileName);
        const promise = fs.promises.rename(filePath, newFilePath);
        promises.push(promise);
      }
    }
  }

  await Promise.all(promises);
}

/** Alias for the `deleteFileOrDirectory` function. Intended to be used in scripts. */
export function rm(...filePaths: readonly string[]): void {
  deleteFileOrDirectory(...filePaths);
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
