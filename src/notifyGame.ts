import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import path from "path";
import Config from "./Config";
import { WATCHER_MOD_NAME } from "./constants";
import * as file from "./file";
import * as misc from "./misc";

type SaveDatMessageTypes = "command" | "msg";
interface SaveDatMessage {
  type: SaveDatMessageTypes;
  data: string;
}

export function msg(data: string, config: Config, addTime: boolean): void {
  notify("msg", data, config, addTime);
}

export function command(data: string, config: Config): void {
  notify("command", data, config, false);
}

function notify(
  type: SaveDatMessageTypes,
  data: string,
  config: Config,
  addTime: boolean,
): void {
  if (data === "Terminate batch job (Y/N)?") {
    return;
  }

  // Read the existing "save#.dat" file
  const saveDatPath = path.join(
    config.modDirectory,
    "..",
    WATCHER_MOD_NAME,
    `save${config.saveSlot}.dat`,
  );
  let saveDat: SaveDatMessage[];
  if (file.exists(saveDatPath)) {
    const saveDatRaw = file.read(saveDatPath);
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
  } else if (type === "msg") {
    const prefix = addTime ? `${misc.getTime()} - ` : "";
    // Replace Windows newlines with Unix newlines
    const newData = `${prefix}${data}`.replace(/\r\n/g, "\n");
    const lines = newData.split("\n");
    for (const line of lines) {
      saveDat.push({
        type,
        data: line,
      });
      console.log(newData);
    }
  }

  // Write it back to the file
  const saveDatRaw = JSON.stringify(saveDat, null, 2);
  file.write(saveDatPath, saveDatRaw);
}
