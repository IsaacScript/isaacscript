import yargs from "yargs";
import { PROJECT_NAME } from "./constants";

export interface Args {
  _: string[];

  // monitor
  modsDirectory?: string;
  saveSlot?: number;
  skipProjectChecks?: boolean;

  // init
  name?: string;
  yes?: boolean;
  useCurrentDir?: boolean;
  vscode?: boolean;
  npm?: boolean;
  yarn?: boolean;
  pnpm?: boolean;
  noGit?: boolean;
  skipInstall?: boolean;
  forceName?: boolean;

  // publish
  skip?: boolean;
  setVersion?: string;
  dryRun?: boolean;
  onlyUpload?: boolean;

  // shared
  dev?: boolean;
  verbose?: boolean;
}

export function parseArgs(): Args {
  const yargsObject = yargs(process.argv.slice(2))
    .strict()
    .usage(`usage: ${PROJECT_NAME.toLowerCase()} <command> [options]`)
    .scriptName(PROJECT_NAME.toLowerCase())

    .alias("h", "help") // By default, only "--help" is enabled.
    .alias("V", "version") // By default, only "--version" is enabled.

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
        .option("skip-project-checks", {
          type: "boolean",
          description: 'Skip checking for "package.json" and "node_modules"',
        })
        .option("dev", {
          alias: "d",
          type: "boolean",
          description:
            "Link the mod to the local development version of isaacscript-common",
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
          .option("npm", {
            alias: "n",
            type: "boolean",
            description: "Use npm as the package manager",
          })
          .option("yarn", {
            type: "boolean",
            description: "Use yarn as the package manager",
          })
          .option("pnpm", {
            alias: "p",
            type: "boolean",
            description: "Use pnpm as the package manager",
          })
          .option("no-git", {
            alias: "g",
            type: "boolean",
            description: "Do not initialize Git",
          })
          .option("skip-install", {
            alias: "i",
            type: "boolean",
            description:
              "Don't automatically install the dependencies after initializing the project",
          })
          .option("force-name", {
            alias: "f",
            type: "boolean",
            description: "Allow project names that are normally illegal",
          })
          .option("dev", {
            alias: "d",
            type: "boolean",
            description:
              "Link the resulting mod to the local development version of isaacscript-common",
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

    .parseSync();

  return yargsObject as Args;
}
