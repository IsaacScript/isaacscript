/* eslint-disable unicorn/no-unreadable-new-expression */

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
// - cac (2.7K stars)
//   - https://github.com/cacjs/cac
//   - Last release in 2022.
// - arg [X] (1.2K stars)
//   - https://github.com/vercel/arg
//   - Does not support commands (i.e. positional arguments).
// - clipanion (1.1K stars)
//   - https://github.com/arcanis/clipanion
//   - Written in TypeScript.
//   - Used by Yarn.
//   - Class-based.
// - mri [X] (638 stars)
//   - https://github.com/lukeed/mri
//   - Written in JavaScript, no types.
// - cmd-ts (193 stars)
//   - https://github.com/Schniz/cmd-ts
//   - Written in TypeScript.
//   - Last release in 2023.

import { Command } from "@commander-js/extra-typings";
import { checkCommand } from "./commands/check/check.js";
import { copyCommand } from "./commands/copy/copy.js";
import { initCommand } from "./commands/init/init.js";
import { monitorCommand } from "./commands/monitor/monitor.js";
import { nukeCommand } from "./commands/nuke/nuke.js";
import { publishCommand } from "./commands/publish/publish.js";
import { updateCommand } from "./commands/update/update.js";
import { PROJECT_DESCRIPTION, PROJECT_VERSION } from "./constants.js";

export async function parseArgs(): Promise<void> {
  const program = new Command()
    .name("isaacscript")
    .description(`${PROJECT_DESCRIPTION}.`)
    .version(PROJECT_VERSION, "-V, --version", "Output the version number.")
    .helpOption("-h, --help", "Display the list of commands and options.")
    .helpCommand(false)
    .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
    .addCommand(monitorCommand, { isDefault: true })
    .addCommand(checkCommand)
    .addCommand(copyCommand)
    .addCommand(initCommand)
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
