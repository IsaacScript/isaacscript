import type { AutocompleteType } from "../../enums/AutocompleteType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace Console {
    /** Returns an array of the previously executed commands in the console. */
    function GetCommandHistory(): string[];

    /**
     * Returns an array of all text output to the console, including user input and command outputs.
     *
     * The order is reversed chronologically, with them most recent input first. The final entry is
     * always "Repentance Console".
     */
    function GetHistory(): string[];

    /**
     * Deletes lines from the console's recorded history.
     *
     * @param amount The amount of entries to remove. Default is 1.
     */
    function PopHistory(amount?: number): void;

    /** Logs an error message to the console, displayed in red text. */
    function PrintError(error: string): void;

    /** Logs a warning message to the console, displayed in yellow text. */
    function PrintWarning(warning: string): void;

    /**
     * Registers a command in the new console with autocomplete support.
     *
     * @param name The command's unique name.
     * @param desc A brief description shown in the output of the `help` command.
     * @param helpText Extended help information shown with `help (name)`.
     * @param showOnMenu
     * @param autocompleteType Determines the autocomplete behavior for this command.
     */
    function RegisterCommand(
      name: string,
      desc: string,
      helpText: string,
      showOnMenu: boolean,
      autocompleteType: AutocompleteType,
    ): void;

    /**
     * Registers a macro to execute a sequence of commands. Macros are accessible via the "macro"
     * command.
     */
    function RegisterMacro(name: string, commands: string[]): void;
  }
}
