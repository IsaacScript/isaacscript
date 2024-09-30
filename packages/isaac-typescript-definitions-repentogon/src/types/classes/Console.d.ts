import type { AutocompleteType } from "../../enums/AutocompleteType";

declare global {
  /**
   * This class is used for handling the functionality of the debug console.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   * @noSelf
   */
  namespace Console {
    /** Returns an array of the previously executed commands in the console. */
    function GetCommandHistory(): string[];

    /**
     * Returns an array of all text output to the console, including user input and command outputs.
     *
     * The elements in the returned array are ordered last-to-first. The first element is always an
     * empty string and the last element is always "Repentance Console".
     */
    function GetHistory(): string[];

    /**
     * Deletes lines from the console's recorded history.
     *
     * @param amount Optional. The amount of entries to remove. Default is 1.
     */
    function PopHistory(amount?: number): void;

    /**
     * Logs an error message to the console, displayed in red text.
     *
     * This method is purely for looks; the method does not include the stack trace and the current
     * callback does not stop running. If this is undesired, use the `error` global function
     * instead.
     */
    function PrintError(error: string): void;

    /**
     * Logs a warning message to the console, displayed in yellow text.
     *
     * This method is purely for looks; the method does not include the stack trace.
     */
    function PrintWarning(warning: string): void;

    /**
     * Registers a command to the console with autocomplete support.
     *
     * @param name
     * @param desc A brief description shown in the output of the `help` command.
     * @param helpText Extended help information shown with `help (name)`.
     * @param showOnMenu Whether the command will show up in the autofill while on the main menu.
     * @param autocompleteType Determines the autocomplete behavior for this command. If it's set to
     *                         `AutocompleteType.CUSTOM`, you will need to use the
     *                         `ModCallbackRepentogon.CONSOLE_AUTOCOMPLETE` callback to handle
     *                         which autocomplete entries show up.
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
