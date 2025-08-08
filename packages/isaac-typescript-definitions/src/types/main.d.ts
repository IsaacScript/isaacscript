/**
 * These are functions and constants from the "main.lua" file, which is located at:
 *
 * ```text
 * C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\main.lua
 * ```
 *
 * @noSelfInFile
 * @module
 */

/**
 * This is a global function used to create a `Mod` object. Every mod needs to use this function in
 * order to subscribe to the game's various callbacks.
 *
 * @param name The name is stored locally in the `Mod.Name` field, but is otherwise not used for
 *             anything.
 * @param apiVersion In both Afterbirth and Repentance, the only valid API version is 1.
 */
declare function RegisterMod(name: string, apiVersion: APIVersion): Mod;

/**
 * This starts a debug session with ZeroBrane Studio. For more information, see the
 * [documentation](https://wofsauge.github.io/IsaacDocs/rep/tutorials/ZeroBraneStudio.html).
 */
declare function StartDebug(): void;

/**
 * This can be overwritten by other mods, so it is not safe to use. Use the `isRepentance` helper
 * function instead.
 *
 * @deprecated
 */
declare const REPENTANCE: never;

/**
 * This can be overwritten by other mods, so it is not safe to use. Use the `isRepentancePlus`
 * helper function instead.
 *
 * @deprecated
 */
declare const REPENTANCE_PLUS: never;
