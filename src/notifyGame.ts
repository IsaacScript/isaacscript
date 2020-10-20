import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import path from "path";
import Config from "./Config";
import { WATCHER_MOD_NAME } from "./constants";
import * as misc from "./misc";

export function msg(rawMsg: string, config: Config): void {
  if (rawMsg === "Terminate batch job (Y/N)?") {
    return;
  }

  // Read the existing "save#.dat" file
  const saveDatPath = path.join(
    config.modTargetPath,
    "..",
    WATCHER_MOD_NAME,
    `save${config.saveSlot}.dat`,
  );
  let saveDat: Array<string>;
  if (misc.exists(saveDatPath)) {
    const saveDatRaw = misc.read(saveDatPath);
    try {
      saveDat = JSONC.parse(saveDatRaw) as string[];
    } catch (err) {
      console.error(`Failed to parse "${chalk.green(saveDatPath)}":`, err);
      process.exit(1);
    }
  } else {
    saveDat = [];
  }

  // Add the new message
  const replacedMsg = rawMsg.replace(/\r\n/g, "\n"); // Replace Windows newlines with Unix newlines
  for (const line of replacedMsg.split("\n")) {
    saveDat.push(line);
  }

  // Write it back to the file
  const saveDatRaw = JSON.stringify(saveDat, null, 2);
  misc.write(saveDatPath, saveDatRaw);

  // Also display the message on the standard out
  console.log(replacedMsg);
}

export function command(rawCommand: string, config: Config): void {
  console.log(rawCommand, config);
}
