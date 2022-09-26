import { ModCallback } from "../../enums/ModCallback";

declare global {
  /**
   * The Lua object corresponding to this interface is defined as a local variable in the
   * "scripts/main.lua" file.
   */
  interface Mod {
    /**
     * Registers a function to be executed when an in-game event happens. For example, the
     * `ModCallback.POST_UPDATE` event corresponds to being executed once at the end of every game
     * logic frame.
     */
    AddCallback<T extends ModCallback>(
      modCallback: T,
      ...args: AddCallbackParameters[T]
    ): void;

    /** Returns whether or not a corresponding "save#.dat" file exists for the current mod. */
    HasData(): boolean;

    /**
     * Returns a string containing all of the data inside of the corresponding "save#.dat" file for
     * this mod.
     */
    LoadData(): string;

    /**
     * Unregisters a function that was previously registered with the `AddCallback` method.
     *
     * This method does not care about the tertiary argument. In other words, regardless of the
     * conditions of how you registered the callback, it will be removed.
     */
    RemoveCallback<T extends ModCallback>(
      modCallback: T,
      callback: AddCallbackParameters[T][0],
    ): void;

    /** Deletes the corresponding "save#.dat" file for this mod, if it exists. */
    RemoveData(): void;

    /**
     * Creates or updates the corresponding "save#.dat" file for this mod with the provided string.
     */
    SaveData(data: string): void;

    /**
     * The `RegisterMod` function stores the name of the mod on the mod object for some reason. (It
     * is never used or referenced.)
     */
    Name: string;
  }
}
