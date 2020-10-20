import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import path from "path";
import Config from "./Config";
import { PROJECT_NAME, WATCHER_MOD_NAME } from "./constants";
import * as misc from "./misc";

type SaveDatMessageTypes = "command" | "msg";
interface SaveDatMessage {
  type: SaveDatMessageTypes;
  data: string;
}

export default function notifyGame(
  type: SaveDatMessageTypes,
  data: string,
  config: Config,
): void {
  if (data === "Terminate batch job (Y/N)?") {
    return;
  }

  // Read the existing "save#.dat" file
  const saveDatPath = path.join(
    config.modTargetPath,
    "..",
    WATCHER_MOD_NAME,
    `save${config.saveSlot}.dat`,
  );
  let saveDat: SaveDatMessage[];
  if (misc.exists(saveDatPath)) {
    const saveDatRaw = misc.read(saveDatPath);
    try {
      saveDat = JSONC.parse(saveDatRaw) as SaveDatMessage[];
    } catch (err) {
      console.error(`Failed to parse "${chalk.green(saveDatPath)}":`, err);
      process.exit(1);
    }
  } else {
    saveDat = [];
  }
  if (!Array.isArray(saveDat)) {
    saveDat = [];
  }

  // Add the new message
  if (type === "command") {
    saveDat.push({
      type,
      data,
    });
    console.log(`Successfully compiled "${PROJECT_NAME}".`);
  } else if (type === "msg") {
    const newData = data.replace(/\r\n/g, "\n"); // Replace Windows newlines with Unix newlines
    for (const line of newData.split("\n")) {
      saveDat.push({
        type,
        data: line,
      });
      console.log(data);
    }
  }

  // Write it back to the file
  const saveDatRaw = JSON.stringify(saveDat, null, 2);
  misc.write(saveDatPath, saveDatRaw);
}
