import { Command } from "@commander-js/extra-typings";
import { nukeDependencies } from "complete-node";
import { CWD } from "../../constants.js";

export const nukeCommand = new Command()
  // eslint-disable-next-line unicorn/no-unreadable-new-expression
  .command("nuke")
  .description("Delete and reinstall the dependencies in the current project.")
  .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
  .helpOption("-h, --help", "Display the list of options for this command.")
  .option("-v, --verbose", "Enable verbose output.", false)
  .action(async () => {
    await nukeDependencies(CWD);
    console.log("Successfully reinstalled dependencies from npm.");
  });
