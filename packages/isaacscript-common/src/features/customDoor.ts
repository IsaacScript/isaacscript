import { DoorSlot, EffectVariant } from "isaac-typescript-definitions";
import {
  initCustomDoorInternal,
  spawnCustomDoorInternal,
} from "../callbacks/postCustomDoorEnter";
import { ModUpgraded } from "../classes/ModUpgraded";

/**
 * `isaacscript-common` provides custom doors that can be spawned where any wall segment is. If you
 * use this feature, you must first call this initialization function at the beginning of your mod.
 *
 * Each kind of custom door that you create must have an entry in the "content/entities2.xml" file,
 * like so:
 *
 * ```xml
 * <entity id="1000" name="Foo Custom Door" anm2path="grid/door_foo.anm2" />
 * ```
 *
 * (Custom door entities must have an id of "1000", which corresponds to an effect. If you do not
 * specify the variant, then the game will automatically assign it.)
 *
 * Next, pass the variant into this function:
 *
 * ```ts
 * const modVanilla = RegisterMod("My Mod", 1);
 * const mod = upgradeMod(modVanilla);
 * const fooEffectVariant = Isaac.GetEntityVariantByName("Foo Custom Door");
 * initCustomDoor(mod, fooEffectVariant);
 * ```
 *
 * Also see the `spawnCustomDoor` function.
 */
export function initCustomDoor(
  mod: ModUpgraded,
  effectVariant: EffectVariant,
): void {
  initCustomDoorInternal(mod, effectVariant);
}

/**
 * Helper function to spawn a custom door. This is intended to be called from the `POST_NEW_ROOM`
 * callback when the player enters a room that should have a custom door. (You could also call it
 * from another callback if you want the door to appear e.g. after clearing all enemies.)
 *
 * Like other entities, the door is not persistent, so you must spawn it every time when re-entering
 * the room.
 *
 * Handle when a player enters the door by hooking the custom `POST_CUSTOM_DOOR_ENTER` callback.
 *
 * The custom door is an `EntityEffect`. You can manually open or close the door by modifying its
 * state. (The values to use correspond to the `DoorState` enum.)
 *
 * This function will throw a run-time error if:
 * - the door slot already has a vanilla door
 * - the door slot already has a custom door
 * - the tile at the door slot does not have a wall
 *
 * Before using this function, you must first initialize the effect/door variant with the
 * `initCustomDoor` function.
 */
export function spawnCustomDoor(
  effectVariant: EffectVariant,
  doorSlot: DoorSlot,
): EntityEffect {
  return spawnCustomDoorInternal(effectVariant, doorSlot);
}
