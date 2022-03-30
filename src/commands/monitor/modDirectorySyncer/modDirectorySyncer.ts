import syncDirectory from "sync-directory";
import { FILE_SYNCED_MESSAGE } from "../../../constants";

let modSourcePath: string;
let modTargetPath: string;

init();

function init() {
  const numArgs = 2;
  if (process.argv.length !== 2 + numArgs) {
    throw new Error(
      "The directory syncer process did not get the right amount of arguments.",
    );
  }

  modSourcePath = process.argv[2];
  modTargetPath = process.argv[3];

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
  send(`The directory syncer encountered an error: ${err}`);
}

function send(msg: string) {
  if (process.send !== undefined) {
    process.send(msg);
  }
}
