// Other potential args libraries:
// - util.parseArgs [X]
//   - https://nodejs.org/api/util.html#utilparseargsconfig
//   - Too bare bones; does not support numbers.
// - commander (25.4K stars)
//   - https://github.com/tj/commander.js
//   - ?
// - yargs [X] (10.7K stars)
//   - https://github.com/yargs/yargs
//   - Sucks in TypeScript.
//   - "commander" allows for more module command building.
// - clack (4.3K stars)
//   - https://github.com/natemoo-re/clack
//   - ?
// - arg [X} (1.2K stars)
//   - https://github.com/vercel/arg
//   - Does not support commands (i.e. positional arguments).
// - cmd-ts (193 stars)
//   - https://github.com/Schniz/cmd-ts
//   - ?

import { Command } from "@commander-js/extra-typings";
import {
  dirName,
  getPackageJSONVersion,
  nukeDependencies,
  updatePackageJSON,
} from "isaacscript-common-node";
import path from "node:path";
import { checkCommand, checkTSCommand } from "./commands/check/check.js";
import { copyCommand } from "./commands/copy/copy.js";
import { initCommand, initTSCommand } from "./commands/init/init.js";
import { monitorCommand } from "./commands/monitor/monitor.js";
import {
  publishCommand,
  publishTSCommand,
} from "./commands/publish/publish.js";
import { CWD, PROJECT_NAME } from "./constants.js";

const __dirname = dirName();

export async function parseArgs(): Promise<void> {
  const packageJSONPath = path.join(__dirname, "..", "package.json");
  const version = getPackageJSONVersion(packageJSONPath);

  const program = new Command()
    .name(PROJECT_NAME.toLowerCase())
    .description("The CLI for the IsaacScript framework.")
    .version(version, "-V, --version", "Output the version number.")
    .helpOption("-h, --help", "Display the list of commands and options.")
    .addHelpCommand(false)
    .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
    .addCommand(monitorCommand, { isDefault: true })
    .addCommand(checkCommand)
    .addCommand(checkTSCommand)
    .addCommand(copyCommand)
    .addCommand(initCommand)
    .addCommand(initTSCommand)
    .addCommand(nukeCommand)
    .addCommand(publishCommand)
    .addCommand(publishTSCommand)
    .addCommand(updateCommand)
    .hook("postAction", (_thisCommand, actionCommand) => {
      if (actionCommand.name() !== "monitor") {
        process.exit();
      }
    });

  // The `parseAsync` method must be used instead of the `parse` method if any of the command
  // handlers are async.
  await program.parseAsync();
}

const nukeCommand = new Command()
  .command("nuke")
  .description("Delete and reinstall the dependencies in the current project.")
  .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
  .helpOption("-h, --help", "Display the list of options for this command.")
  .option("-v, --verbose", "Enable verbose output.", false)
  .action(() => {
    nukeDependencies(CWD);
    console.log("Successfully reinstalled dependencies from npm.");
  });

const updateCommand = new Command()
  .command("update")
  .description("Update the npm dependencies in the current project.")
  .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
  .helpOption("-h, --help", "Display the list of options for this command.")
  .action(async () => {
    const hasNewDependencies = await updatePackageJSON(CWD);
    const msg = hasNewDependencies
      ? "Successfully installed new Node.js dependencies."
      : "There were no new dependency updates from npm.";
    console.log(msg);
  });
