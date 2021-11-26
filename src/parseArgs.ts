import yargs from "yargs";

export function parseArgs() {
  const yargsObject = yargs(process.argv.slice(2))
    .strict()
    .usage("usage: isaacscript <command> [options]")
    .scriptName("isaacscript")

    .command(
      "monitor",
      "Monitor a project for changes. (default)",
      (builder) => {
        return builder
          .option("mods-directory", {
            alias: "m",
            type: "string",
            description: "The directory where Isaac mods live on your system",
          })
          .option("save-slot", {
            alias: "s",
            type: "number",
            choices: [1, 2, 3],
            description: "The save slot in-game that you use",
          });
      },
    )

    .command("init [name]", "Initialize a new IsaacScript mod.", (builder) => {
      return builder
        .option("use-current-dir", {
          alias: "u",
          type: "boolean",
          description: "Use the current directory as the root for the project",
        })
        .option("mods-directory", {
          alias: "m",
          type: "string",
          description: "The directory where Isaac mods live on your system",
        })
        .option("save-slot", {
          alias: "s",
          type: "number",
          choices: [1, 2, 3],
          description: "The in-game save slot that you use",
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
      "Bump the version & automatically publish the new files using the steamcmd tool.",
      (builder) => {
        return builder
          .option("skip", {
            alias: "s",
            type: "boolean",
            description: "skip incrementing the version number",
          })
          .option("setversion", {
            alias: "t",
            type: "string",
            description:
              "specify the version number instead of incrementing it",
          })
          .option("dryrun", {
            alias: "d",
            type: "boolean",
            description: "skip invoking steamcmd",
          });
      },
    )

    .alias("h", "help") // By default, only "--help" is enabled
    .alias("v", "version"); // By default, only "--version" is enabled

  return yargsObject.argv;
}
