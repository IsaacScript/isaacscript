import syncDirectory from "@zamiell/sync-directory";
import { getArgs } from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";
import { FILE_SYNCED_MESSAGE } from "../../../constants.js";

const SUBPROCESS_NAME = "directory syncer";

let modSourcePath: string;
let modTargetPath: string;

init();

function init() {
  const args = getArgs();

  const firstArg = args[0];
  assertDefined(
    firstArg,
    `The ${SUBPROCESS_NAME} process did not get a valid first argument.`,
  );

  const secondArg = args[1];
  assertDefined(
    secondArg,
    `The ${SUBPROCESS_NAME} process did not get a valid second argument.`,
  );

  modSourcePath = firstArg;
  modTargetPath = secondArg;

  syncDirectory(modSourcePath, modTargetPath, {
    watch: true,
    type: "copy",
    afterEachSync,
    onError,
    chokidarWatchOptions: {
      awaitWriteFinish: {
        stabilityThreshold: 1000,
      },
    },
  });
}

function afterEachSync(params?: {
  eventType: string;
  nodeType: string;
  relativePath: string;
  srcPath: string;
  targetPath: string;
}) {
  if (params === undefined) {
    return;
  }

  if (params.eventType !== "init:copy") {
    send(`${FILE_SYNCED_MESSAGE} ${params.relativePath}`);
  }
}

function onError(err: Error) {
  send(`The directory syncer encountered an error: ${err.message}`);
}

function send(msg: string) {
  if (process.send !== undefined) {
    process.send(msg);
  }
}
