// Other potential args libraries:
// - util.parseArgs
//   - https://nodejs.org/api/util.html#utilparseargsconfig
//   - Too bare bones; does not support numbers.
// - arg (1.2K stars)
//   - https://github.com/vercel/arg
//   - Does not support commands (i.e. positional arguments).
// - cmd-ts (193 stars)
//   - https://github.com/Schniz/cmd-ts
//   - ?
// - clack (4.3K stars)
//   - https://github.com/natemoo-re/clack
//   - ?
// - commander (25.4K stars)
//   - https://github.com/tj/commander.js
//   - ?

import { getArgs } from "isaacscript-common-node";
import yargs from "yargs";
import { PROJECT_NAME } from "./constants.js";

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
  major?: boolean;
  minor?: boolean;
  patch?: boolean;
  skipIncrement?: boolean;
  setVersion?: string;
  dryRun?: boolean;
  skipUpdate?: boolean;
  skipLint?: boolean;
  otp?: boolean;

  // check
  ignore?: string;

  // shared
  dev?: boolean;
  verbose?: boolean;
}

/** Parse command-line arguments. */
export function parseArgs(): Args {
  const args = getArgs();
  const yargsObject = yargs(args)
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
              'Answer yes to every dialog option, similar to how "npm init --yes" works',
          })
          .option("use-current-dir", {
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
            description: "Use Yarn as the package manager",
          })
          .option("pnpm", {
            alias: "p",
            type: "boolean",
            description: "Use pnpm as the package manager",
          })
          .option("no-git", {
            type: "boolean",
            description: "Do not initialize Git",
          })
          .option("skip-install", {
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

    .command(
      "init-ts [name]",
      `Initialize a new ${PROJECT_NAME} TypeScript project.`,
      (builder) =>
        builder
          .option("yes", {
            alias: "y",
            type: "boolean",
            description:
              'Answer yes to every dialog option, similar to how "npm init --yes" works',
          })
          .option("use-current-dir", {
            type: "boolean",
            description:
              "Use the current directory as the root for the project",
          })
          .option("vscode", {
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
            description: "Use Yarn as the package manager",
          })
          .option("pnpm", {
            alias: "p",
            type: "boolean",
            description: "Use pnpm as the package manager",
          })
          .option("no-git", {
            type: "boolean",
            description: "Do not initialize Git",
          })
          .option("skip-install", {
            type: "boolean",
            description:
              "Don't automatically install the dependencies after initializing the project",
          })
          .option("force-name", {
            alias: "f",
            type: "boolean",
            description: "Allow project names that are normally illegal",
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
      "Bump the version & prepare for a new release.",
      (builder) =>
        builder
          .option("major", {
            type: "boolean",
            description: "Perform a major version bump",
          })
          .option("minor", {
            type: "boolean",
            description: "Perform a minor version bump",
          })
          .option("patch", {
            type: "boolean",
            description: "Perform a patch version bump",
          })
          .option("skip-increment", {
            type: "boolean",
            description: "Skip incrementing the version number",
          })
          .option("set-version", {
            type: "string",
            description:
              "Specify the version number instead of incrementing it",
          })
          .option("dry-run", {
            alias: "d",
            type: "boolean",
            description:
              "Skip committing/uploading & perform a Git reset afterward",
          })
          .option("skip-update", {
            type: "boolean",
            description: "Skip updating dependencies",
          })
          .option("skip-lint", {
            type: "boolean",
            description: "Skip linting before publishing",
          })
          .option("verbose", {
            alias: "v",
            type: "boolean",
            description: "Enable verbose output",
          }),
    )

    .command(
      "publish-ts",
      "Bump the version & publish the project to npm.",
      (builder) =>
        builder
          .option("major", {
            type: "boolean",
            description: "Perform a major version bump",
          })
          .option("minor", {
            type: "boolean",
            description: "Perform a minor version bump",
          })
          .option("patch", {
            type: "boolean",
            description: "Perform a patch version bump",
          })
          .option("skip-increment", {
            type: "boolean",
            description: "Skip incrementing the version number",
          })
          .option("set-version", {
            type: "string",
            description:
              "Specify the version number instead of incrementing it",
          })
          .option("dry-run", {
            alias: "d",
            type: "boolean",
            description:
              "Skip committing/uploading & perform a Git reset afterward",
          })
          .option("skip-lint", {
            type: "boolean",
            description: "Skip linting before publishing",
          })
          .option("otp", {
            type: "boolean",
            description:
              "Provide a two-factor OTP code tied to the npm account",
          })
          .option("verbose", {
            alias: "v",
            type: "boolean",
            description: "Enable verbose output",
          }),
    )

    .command(
      "check",
      "Check the template files of the current IsaacScript mod to see if they are up to date.",
      (builder) =>
        builder
          .option("ignore", {
            alias: "i",
            type: "string",
            description: "Comma separated list of file names to ignore",
          })
          .option("verbose", {
            alias: "v",
            type: "boolean",
            description: "Enable verbose output",
          }),
    )

    .command(
      "check-ts",
      "Check the template files of the current TypeScript project to see if they are up to date.",
      (builder) =>
        builder
          .option("ignore", {
            alias: "i",
            type: "string",
            description: "Comma separated list of file names to ignore",
          })
          .option("verbose", {
            alias: "v",
            type: "boolean",
            description: "Enable verbose output",
          }),
    )

    .command(
      "update",
      "Update the dependencies in the current project.",
      (builder) =>
        builder.option("verbose", {
          alias: "v",
          type: "boolean",
          description: "Enable verbose output",
        }),
    )

    .command(
      "nuke",
      "Delete and reinstall the dependencies in the current project.",
      (builder) =>
        builder.option("verbose", {
          alias: "v",
          type: "boolean",
          description: "Enable verbose output",
        }),
    )

    .parseSync();

  return yargsObject as Args;
}
