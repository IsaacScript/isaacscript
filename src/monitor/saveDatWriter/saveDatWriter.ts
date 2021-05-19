import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import path from "path";
import * as file from "../../file";
import { ensureAllCases } from "../../misc";
import { SaveDatMessage, SaveDatMessageType } from "./types";

let saveDatPath: string;
let saveDatFileName: string;

init();

function init() {
  const numArgs = 1;
  if (process.argv.length !== 2 + numArgs) {
    throw new Error(
      "The Save.dat writer process did not get the right amount of arguments.",
    );
  }

  saveDatPath = process.argv[2];
  saveDatFileName = path.basename(saveDatPath);

  // Check to see if the data directory exists
  const watcherModDataPath = path.dirname(saveDatPath);
  if (!file.exists(watcherModDataPath)) {
    file.makeDir(watcherModDataPath);
  }

  // Listen for messages from the parent process
  process.on("message", (msg: SaveDatMessage) => {
    onMessage(msg.type, msg.data);
  });
}

function onMessage(
  type: SaveDatMessageType,
  data: string,
  numRetries = 0,
): void {
  if (data === "Terminate batch job (Y/N)?") {
    return;
  }

  const saveDat = readSaveDatFromDisk();
  addMessageToSaveDat(type, saveDat, data); // Mutates saveDat
  writeSaveDatToDisk(type, data, numRetries, saveDat);
}

function readSaveDatFromDisk() {
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
      const lines = data.split("\n");
      for (const line of lines) {
        saveDat.push({
          type,
          data: line,
        });
      }

      break;
    }

    default: {
      ensureAllCases(type);
      break;
    }
  }
}

function writeSaveDatToDisk(
  type: SaveDatMessageType,
  data: string,
  numRetries = 0,
  saveDat: SaveDatMessage[],
) {
  const saveDatRaw = JSON.stringify(saveDat, null, 2);
  try {
    file.writeTry(saveDatPath, saveDatRaw);
  } catch (err) {
    if (numRetries > 4) {
      console.error(
        `Failed to write to the ${saveDatFileName} for 5 times in a row. Maybe the file got locked somehow. IsaacScript will now exit.`,
      );
      console.error("The writing error is as follows:");
      console.error(err);
      process.exit(1);
    }

    console.log(
      `Writing to "${saveDatFileName}" failed. (The number of retries so far is ${numRetries}.) Trying again in 0.1 seconds...`,
    );
    setTimeout(() => {
      onMessage(type, data, numRetries + 1);
    }, 100);
  }
}
