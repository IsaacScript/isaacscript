import yargs from "yargs";

export default function parseArgs(): Record<string, unknown> {
  const yargsObject = yargs(process.argv.slice(2))
    .strict()

    .option("copy", {
      alias: "c",
      type: "boolean",
      description: "only compile & copy the mod",
    })

    .option("publish", {
      alias: "p",
      type: "boolean",
      description: "bump the version number & launch the mod uploader",
    })

    .option("skip", {
      alias: "s",
      type: "boolean",
      description: "if publishing, skip incrementing the version number",
    })

    .alias("h", "help") // By default, only "--help" is enabled
    .alias("v", "version") // By default, only "--version" is enabled

    .usage("usage: isaacscript");

  return yargsObject.argv;
}
