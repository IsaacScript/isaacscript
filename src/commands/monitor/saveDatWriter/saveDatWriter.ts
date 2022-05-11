import * as JSONC from "jsonc-parser";
import path from "path";
import { PROJECT_NAME } from "../../../constants";
import * as file from "../../../file";
import { ensureAllCases } from "../../../utils";
import { SaveDatMessage, SaveDatMessageType } from "./types";

const SUBPROCESS_NAME = "save#.dat writer";
const BASE_ARGV_LENGTH = 2;
const MAX_MESSAGES = 100;
const VERBOSE = false;

let saveDatPath: string;
let saveDatFileName: string;

init(VERBOSE);

function init(verbose: boolean) {
  const firstArg = process.argv[BASE_ARGV_LENGTH];
  if (firstArg === undefined) {
    throw new Error(
      `The ${SUBPROCESS_NAME} process did not get a valid first argument.`,
    );
  }

  saveDatPath = firstArg;
  saveDatFileName = path.basename(saveDatPath);

  // Check to see if the data directory exists
  const watcherModDataPath = path.dirname(saveDatPath);
  if (!file.exists(watcherModDataPath, verbose)) {
    file.makeDir(watcherModDataPath, verbose);
  }

  // Listen for messages from the parent process
  process.on("message", (msg: SaveDatMessage) => {
    onMessage(msg.type, msg.data);
  });
}

function onMessage(type: SaveDatMessageType, data: string, numRetries = 0) {
  const saveDat = readSaveDatFromDisk(VERBOSE);
  if (saveDat.length > MAX_MESSAGES) {
    // If IsaacScript is running and
    // - the game is not open
    // - or the game is open but the IsaacScript Watcher mod is disabled
    //
    // Then this process will continue to write to the "save#.dat" file, which can cause it to grow
    // arbitrarily large (since there is no-one on the other side removing the messages). If there
    // is N messages already in the queue, assume that no-one is listening and stop adding any more
    // messages.
    return;
  }
  addMessageToSaveDat(type, saveDat, data); // Mutates saveDat
  writeSaveDatToDisk(type, data, saveDat, numRetries, VERBOSE);
}

function readSaveDatFromDisk(verbose: boolean) {
  let saveDat: SaveDatMessage[];
  if (file.exists(saveDatPath, verbose)) {
    const saveDatRaw = file.read(saveDatPath, verbose);
    try {
      saveDat = JSONC.parse(saveDatRaw) as SaveDatMessage[];
    } catch (err) {
      send(`Failed to parse "${saveDatPath}": ${err}`);
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
  saveDat: SaveDatMessage[],
  numRetries: number,
  verbose: boolean,
) {
  const saveDatRaw = JSON.stringify(saveDat, null, 2);
  try {
    file.writeTry(saveDatPath, saveDatRaw, verbose);
  } catch (err) {
    if (numRetries > 4) {
      send(
        `Failed to write to the ${saveDatFileName} for 5 times in a row. Maybe the file got locked somehow. ${PROJECT_NAME} will now exit.`,
      );
      send(`The writing error is as follows: ${err}`);
      process.exit(1);
    }

    send(
      `Writing to "${saveDatFileName}" failed. (The number of retries so far is ${numRetries}.) Trying again in 0.1 seconds...`,
    );
    setTimeout(() => {
      onMessage(type, data, numRetries + 1);
    }, 100);
  }
}

function send(msg: string) {
  if (process.send !== undefined) {
    process.send(msg);
  }
}
