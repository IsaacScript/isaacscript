import yargs from "yargs";
import { PROJECT_NAME } from "./constants";

export function parseArgs(): Record<string, unknown> {
  const yargsObject = yargs(process.argv.slice(2))
    .strict()
    .usage("usage: isaacscript <command> [options]")
    .scriptName("isaacscript")

    .command("monitor", "Monitor a project for changes. (default)", (builder) =>
      builder
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
        })
        .option("verbose", {
          alias: "v",
          type: "boolean",
          description: "Enable verbose output",
        }),
    )

    .command(
      "init [name]",
      `Initialize a new ${PROJECT_NAME} mod.`,
      (builder) =>
        builder
          .option("yes", {
            alias: "y",
            type: "boolean",
            description:
              'Answer yes to every dialog option, similar to how "npm init --yes" works.',
          })
          .option("use-current-dir", {
            alias: "u",
            type: "boolean",
            description:
              "Use the current directory as the root for the project",
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
          })
          .option("skip-npm-install", {
            alias: "i",
            type: "boolean",
            description:
              'Don\'t automatically run "npm install" after initializing the project',
          })
          .option("verbose", {
            alias: "v",
            type: "boolean",
            description: "Enable verbose output",
          }),
    )

    .command("copy", "Only compile & copy the mod.", (builder) =>
      builder.option("verbose", {
        alias: "v",
        type: "boolean",
        description: "Enable verbose output",
      }),
    )

    .command(
      "publish",
      "Bump the version & automatically publish the new files using the steamcmd tool.",
      (builder) =>
        builder
          .option("skip", {
            alias: "s",
            type: "boolean",
            description: "skip incrementing the version number",
          })
          .option("set-version", {
            alias: "t",
            type: "string",
            description:
              "specify the version number instead of incrementing it",
          })
          .option("dry-run", {
            alias: "d",
            type: "boolean",
            description: "skip invoking steamcmd",
          })
          .option("only-upload", {
            alias: "u",
            type: "boolean",
            description:
              "only upload the mod to the Steam Workshop (without doing anything else)",
          })
          .option("verbose", {
            alias: "v",
            type: "boolean",
            description: "Enable verbose output",
          }),
    )

    .alias("h", "help") // By default, only "--help" is enabled
    .alias("v", "version"); // By default, only "--version" is enabled

  return yargsObject.argv as Record<string, unknown>;
}
