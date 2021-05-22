import syncDirectory from "sync-directory2";
import { FILE_SYNCED_MESSAGE } from "../../constants";

let modSourcePath: string;
let modTargetPath: string;
let timeInvoked: Date;

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

  timeInvoked = new Date();

  syncDirectory(modSourcePath, modTargetPath, {
    watch: true,
    type: "copy",
    afterSync,
    onError,
  });
}

function afterSync(params: { type: string; relativePath: string }) {
  const secondsPassed = (new Date().getTime() - timeInvoked.getTime()) / 1000;
  if (secondsPassed > 1) {
    send(`${FILE_SYNCED_MESSAGE} ${params.relativePath}`);
  }
}

function onError(err: Error) {
  console.error("The directory syncer encountered an error:", err);
}

function send(msg: string) {
  if (typeof process.send === "function") {
    process.send(msg);
  }
}
