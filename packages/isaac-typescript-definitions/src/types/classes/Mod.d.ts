import type { CallbackPriority } from "../../enums/CallbackPriority";

declare global {
  /**
   * The Lua object corresponding to this interface is defined as a local variable in the
   * "scripts/main.lua" file.
   */
  interface Mod {
    /**
     * Registers a function to be executed when an in-game event happens. For example, the
     * `ModCallback.POST_UPDATE` event corresponds to an in-game logic frame being finished.
     *
     * The different types of callbacks are represented in the `ModCallback` enum.
     *
     * Some callbacks take an optional third argument to specify that you only want it the function
     * to fire on a specific thing. For example:
     *
     * ```ts
     * mod.AddCallback(
     *   ModCallback.POST_EFFECT_UPDATE,
     *   postEffectUpdatePoof1,
     *   EffectVariant.POOF_1,
     * )
     * ```
     */
    AddCallback: <T extends keyof AddCallbackParameters | string>(
      modCallback: T,
      ...args: T extends keyof AddCallbackParameters
        ? AddCallbackParameters[T]
        : unknown[]
    ) => void;

    /**
     * The same as the `Mod.AddCallback` method, but allows setting a custom priority. By default,
     * callbacks are added with a priority of 0, so this allows you to add early or late callbacks
     * as necessary. See the `CallbackPriority` enum.
     */
    AddPriorityCallback: <T extends keyof AddCallbackParameters | string>(
      modCallback: T,
      priority: CallbackPriority | int,
      ...args: T extends keyof AddCallbackParameters
        ? AddCallbackParameters[T]
        : unknown[]
    ) => void;

    /** Returns whether a corresponding "save#.dat" file exists for the current mod. */
    HasData: () => boolean;

    /**
     * Returns a string containing all of the data inside of the corresponding "save#.dat" file for
     * this mod.
     */
    LoadData: () => string;

    /**
     * Unregisters a function that was previously registered with the `AddCallback` method.
     *
     * This method does not care about the tertiary argument. In other words, regardless of the
     * conditions of how you registered the callback, it will be removed.
     */
    RemoveCallback: <T extends keyof AddCallbackParameters>(
      modCallback: T,
      callback: AddCallbackParameters[T][0],
    ) => void;

    /** Deletes the corresponding "save#.dat" file for this mod, if it exists. */
    RemoveData: () => void;

    /**
     * Creates or updates the corresponding "save#.dat" file for this mod with the provided string.
     */
    SaveData: (data: string) => void;

    /**
     * The `RegisterMod` function stores the name of the mod on the mod object for some reason. (It
     * is never used or referenced.)
     */
    Name: string;
  }
}
