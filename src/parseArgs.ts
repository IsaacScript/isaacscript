import yargs from "yargs";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function parseArgs() {
  const yargsObject = yargs(process.argv.slice(2))
    .strict()
    .usage("usage: isaacscript <command> [options]")
    .scriptName("isaacscript")

    .command("monitor", "Monitor a project for changes. (default)")

    .command("init [name]", "Initialize a new IsaacScript mod.", (builder) => {
      return builder
        .option("use-current-dir", {
          alias: "u",
          type: "boolean",
          description: "Use the current directory as the root for the project",
        })
        .option("save-slot", {
          alias: "s",
          type: "number",
          choices: [1, 2, 3],
          description: "The save slot in-game that you use",
        })
        .option("vscode", {
          alias: "c",
          type: "boolean",
          description: "Open the project in VSCode after initialization",
        });
    })

    .command("copy", "Only compile & copy the mod.")

    .command(
      "publish",
      "Bump the version & launch the mod uploader.",
      (builder) => {
        return builder
          .option("skip", {
            alias: "s",
            type: "boolean",
            description: "skip incrementing the version number",
          })
          .option("setversion", {
            alias: "t",
            type: "number",
            description:
              "specify the version number instead of incrementing it",
          });
      },
    )

    .alias("h", "help") // By default, only "--help" is enabled
    .alias("v", "version"); // By default, only "--version" is enabled

  return yargsObject.argv;
}
