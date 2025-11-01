import { sortCaseInsensitive } from "complete-common";
import {
  diff,
  echo,
  exit,
  getFileNamesInDirectory,
  isDirectory,
  lintCommands,
  readFile,
} from "complete-node";
import path from "node:path";

const PACKAGE_ROOT = path.resolve(import.meta.dirname, "..");

await lintCommands(import.meta.dirname, [
  "tsc --noEmit",
  "eslint --max-warnings 0 .",
  // eslint-disable-next-line unicorn/prefer-top-level-await
  ["checkDictionaries", checkDictionaries(PACKAGE_ROOT)],
]);

async function checkDictionaries(packageRoot: string) {
  const dictionariesPath = path.join(packageRoot, "dictionaries");
  const dictionaryNames = await getFileNamesInDirectory(dictionariesPath);

  const allWordsSet = new Set<string>();
  let oneOrMoreFailures = false;

  // Check for alphabetically sorted and unique.
  for (const dictionaryName of dictionaryNames) {
    const dictionaryDirectoryPath = path.join(dictionariesPath, dictionaryName);
    // eslint-disable-next-line no-await-in-loop
    const directory = await isDirectory(dictionaryDirectoryPath);
    if (!directory) {
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    const fileNames = await getFileNamesInDirectory(dictionaryDirectoryPath);
    for (const fileName of fileNames) {
      if (!fileName.endsWith(".txt")) {
        continue;
      }

      const filePath = path.join(dictionaryDirectoryPath, fileName);
      // eslint-disable-next-line no-await-in-loop
      const fileContent = await readFile(filePath);
      const lines = fileContent.split("\n");
      const words = lines.filter(
        (line) => line !== "" && !line.startsWith("#"),
      );

      for (const word of words) {
        if (allWordsSet.has(word)) {
          oneOrMoreFailures = true;
          echo(
            `The following word is present in two or more dictionaries: ${word}`,
          );
        }
        allWordsSet.add(word);
      }

      const sortedWords = sortCaseInsensitive(words);
      const wordsString = words.join("\n");
      const sortedWordsString = sortedWords.join("\n");
      if (wordsString !== sortedWordsString) {
        oneOrMoreFailures = true;
        echo(`The "${filePath}" file is not sorted:`);
        diff(wordsString, sortedWordsString);
        echo();
      }
    }
  }

  if (oneOrMoreFailures) {
    exit(1);
  }
}
