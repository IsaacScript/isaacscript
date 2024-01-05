import type { AutocompleteType } from "../../../enums/mods/repentogon/AutocompleteType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace Console {
    /** Returns an array containing current command history. */
    function GetCommandHistory(): string[];

    /**
     * Returns an array containing every previous entry printed to the console this run.
     *
     * This is ordered last-to-first- the first entry will be the currently blank line awaiting user
     * input, followed by the previous print, and so on. The last line will always be Repentance
     * Console.
     */
    function GetHistory(): string[];

    /**
     * Removes previous lines from history. Optionally, use amount to define how many entries should
     * be removed. The line currently awaiting user input in the console counts as a part of the
     * history, but this is already accounted for.
     *
     * @param amount Default is 1.
     */
    function PopHistory(amount?: number): void;

    /** Prints an error to the console in red text. */
    function PrintError(error: string): void;

    /** Prints a warning in the console in yellow text. */
    function PrintWarning(warning: string): void;

    /**
     * Registers a command in the new console. These will show up in the console's autocomplete.
     *
     * @param name
     * @param desc Shows up when typing the `help` command.
     * @param helpText Shows when typing `help (Name)`.
     * @param showOnMenu
     * @param autocompleteType
     */
    function RegisterCommand(
      name: string,
      desc: string,
      helpText: string,
      showOnMenu: boolean,
      autocompleteType: AutocompleteType,
    ): void;

    /**
     * Registers a macro in the new console. These will show up in the new console's autocomplete
     * for the macro command.
     */
    function RegisterMacro(name: string, commands: string[]): void;
  }
}
