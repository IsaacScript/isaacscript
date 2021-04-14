import yargs from "yargs";

export default function parseArgs(): Record<string, unknown> {
  const argv = yargs(process.argv.slice(2))
    .strict()

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
    .describe("s", "if publishing, skip incrementing the version number")

    .argv; // prettier-ignore

  return argv;
}
