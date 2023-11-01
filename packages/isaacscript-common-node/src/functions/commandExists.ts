import commandExistsPackage from "command-exists";

/**
 * Helper function to check if a command exists, like "git".
 *
 * This is a wrapper around the `commandExists.sync` function from the `commandExists` library.
 */
export function commandExists(commandName: string): boolean {
  return commandExistsPackage.sync(commandName);
}
