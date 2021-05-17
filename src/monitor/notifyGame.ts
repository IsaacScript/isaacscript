import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import path from "path";
import { Config } from "../Config";
import { WATCHER_MOD_NAME } from "../constants";
import * as file from "../file";
import { ensureAllCases, getTime } from "../misc";

type SaveDatMessageType = "command" | "msg" | "ping";
interface SaveDatMessage {
  type: SaveDatMessageType;
  data: string;
}

export function msg(data: string, config: Config, addTime: boolean): void {
  notify("msg", data, config, addTime);
}

export function command(data: string, config: Config): void {
  notify("command", data, config, false);
}

export function ping(config: Config): void {
  notify("ping", "", config, false);
}

function notify(
  type: SaveDatMessageType,
  data: string,
  config: Config,
  addTime: boolean, // Whether or not to prefix the message with a timestamp
): void {
  if (data === "Terminate batch job (Y/N)?") {
    return;
  }

  // Check to see if the data directory exists
  const modDataPath = path.join(config.modsDirectory, "..", "data");
  const watcherModDataPath = path.join(modDataPath, WATCHER_MOD_NAME);
  if (!file.exists(watcherModDataPath)) {
    file.makeDir(watcherModDataPath);
  }

  // Read the existing "save#.dat" file
  const saveDatPath = path.join(
    watcherModDataPath,
    `save${config.saveSlot}.dat`,
  );
  const saveDat = readSaveDat(saveDatPath);

  addMessageToSaveDat(type, saveDat, data, addTime);

  // Write it back to the file
  const saveDatRaw = JSON.stringify(saveDat, null, 2);
  file.write(saveDatPath, saveDatRaw);
}

function readSaveDat(saveDatPath: string) {
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

  return saveDat;
}

function addMessageToSaveDat(
  type: SaveDatMessageType,
  saveDat: SaveDatMessage[],
  data: string,
  addTime: boolean,
) {
  switch (type) {
    case "command":
    case "ping": {
      saveDat.push({
        type,
        data,
      });

      break;
    }

    case "msg": {
      const prefix = addTime ? `${getTime()} - ` : "";
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

      break;
    }

    default: {
      ensureAllCases(type);
      break;
    }
  }
}
