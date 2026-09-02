import { Command } from "@commander-js/extra-typings";
import { updatePackageJSONDependencies } from "complete-node";
import { CWD } from "../../constants.js";

const INTERNAL_PACKAGES = [
  "eslint-config-isaacscript",
  "eslint-plugin-isaacscript",
  "isaac-lua-polyfill",
  "isaac-typescript-definitions",
  "isaac-typescript-definitions-repentogon",
  "isaacscript-cli",
  "isaacscript-common",
  "isaacscript-lint",
  "isaacscript-spell",
  "isaacscript-tsconfig",
] as const;

export const updateCommand = new Command()
  // eslint-disable-next-line unicorn/no-unreadable-new-expression
  .command("update")
  .description("Update the npm dependencies in the current project.")
  .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
  .helpOption("-h, --help", "Display the list of options for this command.")
  .action(async () => {
    const hasNewDependencies = await updatePackageJSONDependencies(
      CWD,
      undefined,
      undefined,
      INTERNAL_PACKAGES,
    );
    const msg = hasNewDependencies
      ? "Successfully installed new Node.js dependencies."
      : "There were no new dependency updates from npm.";
    console.log(msg);
  });
