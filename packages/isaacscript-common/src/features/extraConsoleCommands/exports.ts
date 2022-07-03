import { ModUpgraded } from "../../classes/ModUpgraded";
import { isVanillaConsoleCommand } from "../../functions/utils";
import { extraConsoleCommandsInit } from "./init";
import {
  extraConsoleCommandsFunctionMap,
  isExtraConsoleCommandsInitialized,
} from "./v";

/**
 * Enables extra console commands which are useful for debugging. See [the
 * docs](https://isaacscript.github.io/isaacscript-common/features/extraConsoleCommands_listCommands)
 * for the specific commands that are added.
 */
export function enableExtraConsoleCommands(mod: ModUpgraded): void {
  extraConsoleCommandsInit(mod);
}

/**
 * Helper function to add a custom console command.
 *
 * The standard library comes with many existing console commands that are useful for debugging, but
 * you can also add your own commands that are useful for your particular mod. It's easier to add
 * commands to the existing command system than to add logic manually to the ExecuteCmd callback.
 *
 * Before using this function, you must first invoke `enableExtraConsoleCommands`.
 */
export function addConsoleCommand(
  commandName: string,
  commandFunction: (params: string) => void,
): void {
  if (!isExtraConsoleCommandsInitialized()) {
    error(
      'The "extraConsoleCommands" feature is not initialized. Before adding extra console commands, you must first enable the feature by invoking the "enableExtraConsoleCommands" function.',
    );
  }

  if (isVanillaConsoleCommand(commandName)) {
    error(
      `Failed to add a new console command of "${commandName}" because that name already belongs to a vanilla command. You must pick a non-colliding name.`,
    );
  }

  if (extraConsoleCommandsFunctionMap.has(commandName)) {
    error(
      `Failed to add a new console command of "${commandName}" because there is already an existing custom command by that name. If you want to overwrite a command from the standard library, you can use the "removeExtraConsoleCommand" function.`,
    );
  }

  extraConsoleCommandsFunctionMap.set(commandName, commandFunction);
}

/**
 * Helper function to remove a custom console command.
 *
 * The standard library comes with many existing console commands that are useful for debugging. If
 * you want to disable one of them, use this function.
 *
 * Before using this function, you must first invoke `enableExtraConsoleCommands`.
 */
export function removeConsoleCommand(commandName: string): void {
  if (!isExtraConsoleCommandsInitialized()) {
    error(
      'The "extraConsoleCommands" feature is not initialized. Before removing console commands, you must first enable the feature by invoking the "enableExtraConsoleCommands" function.',
    );
  }

  if (!extraConsoleCommandsFunctionMap.has(commandName)) {
    error(
      `Failed to remove the console command of "${commandName}", since it does not already exist in the map.`,
    );
  }

  extraConsoleCommandsFunctionMap.delete(commandName);
}
