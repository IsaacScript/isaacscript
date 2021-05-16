import yargs from "yargs";

export default function parseArgs(): Record<string, unknown> {
  const yargsObject = yargs(process.argv.slice(2))
    .strict()

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
    })

    .alias("h", "help") // By default, only "--help" is enabled
    .alias("v", "version") // By default, only "--version" is enabled

    .usage("usage: create-isaacscript-mod [project name]");

  return yargsObject.argv;
}
