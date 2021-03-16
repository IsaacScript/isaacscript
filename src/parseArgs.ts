import yargs from "yargs";

export default function parseArgs(): Record<string, unknown> {
  // TODO: How do I make it exit if a user passes an invalid flag?
  // https://stackoverflow.com/questions/66535902/how-do-i-make-yargs-exit-if-it-is-passed-an-invalid-flag
  // https://github.com/yargs/yargs/issues/1890
  const argv = yargs(process.argv.slice(2))
    .alias("h", "help") // By default, only "--help" is enabled
    .alias("v", "version") // By default, only "--version" is enabled

    .boolean("copy")
    .alias("c", "copy")
    .describe("c", "only compile & copy the mod")

    .boolean("publish")
    .alias("p", "publish")
    .describe("p", "bump the version number & launch the Nicalis mod uploader")

    .boolean("skip")
    .alias("s", "skip")
    .describe("s", "if publishing, skip incrementing the version number").argv;

  return argv;
}
