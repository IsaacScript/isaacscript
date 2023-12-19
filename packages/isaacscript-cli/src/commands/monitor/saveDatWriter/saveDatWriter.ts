import {
  getArgs,
  isFile,
  makeDirectory,
  readFile,
} from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";
import * as JSONC from "jsonc-parser";
import fs from "node:fs";
import path from "node:path";
import { PROJECT_NAME } from "../../../constants.js";
import type { SaveDatMessage, SaveDatMessageType } from "./types.js";

const SUBPROCESS_NAME = "save#.dat writer";
const MAX_MESSAGES = 100;

let saveDatPath: string;
let saveDatFileName: string;

init();

function init() {
  const args = getArgs();

  const firstArg = args[0];
  assertDefined(
    firstArg,
    `The ${SUBPROCESS_NAME} process did not get a valid first argument.`,
  );

  saveDatPath = firstArg;
  saveDatFileName = path.basename(saveDatPath);

  // Check to see if the data directory exists.
  const watcherModDataPath = path.dirname(saveDatPath);
  if (!isFile(watcherModDataPath)) {
    makeDirectory(watcherModDataPath);
  }

  // Listen for messages from the parent process.
  process.on("message", (msg: SaveDatMessage) => {
    onMessage(msg.type, msg.data);
  });
}

function onMessage(type: SaveDatMessageType, data: string, numRetries = 0) {
  const saveDat = readSaveDatFromDisk();
  if (saveDat.length > MAX_MESSAGES) {
    // If IsaacScript is running and:
    // - the game is not open
    // - or the game is open but the IsaacScript Watcher mod is disabled

    // Then this process will continue to write to the "save#.dat" file, which can cause it to grow
    // arbitrarily large (since there is no-one on the other side removing the messages). If there
    // is N messages already in the queue, assume that no-one is listening and stop adding any more
    // messages.
    return;
  }
  addMessageToSaveDat(type, saveDat, data); // Mutates saveDat
  writeSaveDatToDisk(type, data, saveDat, numRetries);
}

// eslint-disable-next-line isaacscript/no-mutable-return
function readSaveDatFromDisk(): SaveDatMessage[] {
  let saveDat: SaveDatMessage[];
  if (isFile(saveDatPath)) {
    const saveDatRaw = readFile(saveDatPath);
    try {
      saveDat = JSONC.parse(saveDatRaw) as SaveDatMessage[];
    } catch (error) {
      send(`Failed to parse "${saveDatPath}": ${error}`);
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
  }
}

function writeSaveDatToDisk(
  type: SaveDatMessageType,
  data: string,
  saveDat: readonly SaveDatMessage[],
  numRetries: number,
) {
  const saveDatRaw = `${JSON.stringify(saveDat, undefined, 2)}\n`; // Prettify it for easier debugging.
  try {
    // We don't use the "writeFile" helper function here, since we want to allow for failure.
    fs.writeFileSync(saveDatPath, saveDatRaw);
  } catch (error) {
    if (numRetries > 4) {
      send(
        `Failed to write to the ${saveDatFileName} for 5 times in a row. Maybe the file got locked somehow. ${PROJECT_NAME} will now exit.\nThe writing error is as follows: ${error}`,
      );
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
