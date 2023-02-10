import { CONSOLE_COMMANDS_SET } from "../sets/consoleCommandsSet";

/**
 * Helper function to see if a particular command is a vanilla console command. This is useful
 * because the `EXECUTE_CMD` callback will not fire for any vanilla commands.
 */
export function isVanillaConsoleCommand(commandName: string): boolean {
  return CONSOLE_COMMANDS_SET.has(commandName);
}

/** Helper function to print whether something was enabled or disabled to the in-game console. */
export function printEnabled(enabled: boolean, description: string): void {
  const enabledText = enabled ? "Enabled" : "Disabled";
  print(`${enabledText} ${description}.`);
}
