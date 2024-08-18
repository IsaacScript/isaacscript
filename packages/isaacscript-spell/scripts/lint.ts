import chalk from "chalk";
import {
  $,
  diff,
  echo,
  exit,
  getFileNamesInDirectory,
  isDirectory,
  lintScript,
  readFile,
} from "isaacscript-common-node";
import { sortCaseInsensitive } from "isaacscript-common-ts";
import path from "node:path";

await lintScript(async ({ packageRoot }) => {
  const promises = [
    $`tsc --noEmit --project ./scripts/tsconfig.json`,
    $`eslint --max-warnings 0 .`,
  ];
  await Promise.all(promises);

  checkDictionaries(packageRoot);
});

function checkDictionaries(packageRoot: string) {
  const dictionariesPath = path.join(packageRoot, "dictionaries");
  const dictionaryNames = getFileNamesInDirectory(dictionariesPath);

  const allWordsSet = new Set<string>();
  let oneOrMoreFailures = false;

  // Check for alphabetically sorted and unique.
  for (const dictionaryName of dictionaryNames) {
    const dictionaryDirectoryPath = path.join(dictionariesPath, dictionaryName);
    if (!isDirectory(dictionaryDirectoryPath)) {
      continue;
    }

    const fileNames = getFileNamesInDirectory(dictionaryDirectoryPath);
    for (const fileName of fileNames) {
      if (!fileName.endsWith(".txt")) {
        continue;
      }

      const filePath = path.join(dictionaryDirectoryPath, fileName);
      const fileContent = readFile(filePath);
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
        echo(`The "${chalk.green(filePath)}" is not sorted:`);
        diff(wordsString, sortedWordsString);
        echo();
      }
    }
  }

  if (oneOrMoreFailures) {
    exit(1);
  }
}
