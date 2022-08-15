/* eslint-disable jsdoc/check-param-names */

/**
 * These are functions and constants from the "main.lua" file, which is located at:
 *
 * ```text
 * C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\main.lua
 * ```
 *
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
declare function RegisterMod(
  this: void,
  name: string,
  apiVersion: APIVersion,
): Mod;

/**
 * This starts a debug session with ZeroBrane Studio. For more information, see the
 * [documentation](https://wofsauge.github.io/IsaacDocs/rep/tutorials/ZeroBraneStudio.html).
 */
declare function StartDebug(this: void): void;

/**
 * This will be set to true if the end-user has the Repentance DLC installed. You can use this
 * constant to create conditional logic for your mod so that it is cross-compatible with both
 * Afterbirth+ and Repentance.
 */
declare const REPENTANCE: boolean | undefined;
