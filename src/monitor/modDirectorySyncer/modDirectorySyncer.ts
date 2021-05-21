import syncDirectory from "sync-directory";

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
    afterSync,
    onError,
  });
}

function afterSync(filePath: string) {
  send(`File synced: ${filePath}`);
}

function onError(err: Error) {
  console.error("The directory syncer encountered an error:", err);
}

function send(msg: string) {
  if (typeof process.send === "function") {
    process.send(msg);
  }
}
