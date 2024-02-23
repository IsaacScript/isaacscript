// Other potential args libraries:
// - util.parseArgs [X]
//   - https://nodejs.org/api/util.html#utilparseargsconfig
//   - Too bare bones; does not support numbers.
// - commander (25.4K stars)
//   - https://github.com/tj/commander.js
//   - Has good TypeScript support with "@commander-js/extra-typings".
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
  findPackageRoot,
  getPackageJSONFieldsMandatory,
  nukeDependencies,
  updatePackageJSON,
} from "isaacscript-common-node";
import { checkCommand, checkTSCommand } from "./commands/check/check.js";
import { copyCommand } from "./commands/copy/copy.js";
import { initCommand, initTSCommand } from "./commands/init/init.js";
import { monitorCommand } from "./commands/monitor/monitor.js";
import { publishCommand } from "./commands/publish/publish.js";
import { CWD } from "./constants.js";

const packageRoot = findPackageRoot();
const { name, version, description } = getPackageJSONFieldsMandatory(
  packageRoot,
  "name",
  "version",
  "description",
);

export async function parseArgs(): Promise<void> {
  const program = new Command()
    .name(name)
    .description(`${description}.`)
    .version(version, "-V, --version", "Output the version number.")
    .helpOption("-h, --help", "Display the list of commands and options.")
    .helpCommand(false)
    .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
    .addCommand(monitorCommand, { isDefault: true })
    .addCommand(checkCommand)
    .addCommand(checkTSCommand)
    .addCommand(copyCommand)
    .addCommand(initCommand)
    .addCommand(initTSCommand)
    .addCommand(nukeCommand)
    .addCommand(publishCommand)
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
  .action(() => {
    const hasNewDependencies = updatePackageJSON(CWD);
    const msg = hasNewDependencies
      ? "Successfully installed new Node.js dependencies."
      : "There were no new dependency updates from npm.";
    console.log(msg);
  });
