import type {
  CollectibleType,
  Direction,
  WeaponType,
} from "isaac-typescript-definitions";
import type { FollowerPriority } from "../../../enums/FollowerPriority";

declare global {
  interface EntityFamiliar extends Entity {
    /** Returns whether the familiar can be damaged by enemies. */
    CanBeDamagedByEnemies: () => boolean;

    /** Returns whether the familiar can be damaged by enemy lasers. */
    CanBeDamagedByLasers: () => boolean;

    /** Returns whether the familiar can be damaged by enemy projectiles. */
    CanBeDamagedByProjectiles: () => boolean;

    /** Returns whether the familiar can block projectiles. */
    CanBlockProjectiles: () => boolean;

    /** Returns whether the familiar can charm enemies. */
    CanCharm: () => boolean;

    /**
     * Returns the weapon entity the familiar is holding. Returns undefined if the familiar has
     * no weapon.
     */
    GetActiveWeaponEntity: () => Entity | undefined;

    /**
     * Returns how many times the familiar has attacked with its current weapon. Returns undefined
     * for familiars that do not attack with a weapon.
     */
    GetActiveWeaponNumFired: () => int | undefined;

    /** Returns the familiar's dirt color. */
    GetDirtColor: () => Color;

    /** Returns the familiar's follower priority. */
    GetFollowerPriority: () => FollowerPriority;

    /**
     * Returns the `ItemConfigItem` corresponding to the collectible that granted the familiar.
     * Returns undefined if the familiar was not spawned by a collectible.
     */
    GetItemConfig: () => ItemConfigItem | undefined;

    /** Returns the familiar's move delay. */
    GetMoveDelayNum: () => int;

    /**
     * Returns the familiar's multiplier.
     *
     * Triggers `ModCallbackRepentogon.EVALUATE_FAMILIAR_MULTIPLIER` only if the familiar's
     * multiplier has changed between subsequent calls to this method. If you wish for the callback
     * to trigger no matter what, call the `EntityFamiliar.InvalidateCachedMultiplier` method.
     */
    GetMultiplier: () => number;

    /** Returns the familiar's pathfinder. */
    GetPathFinder: () => PathFinder;

    /**
     * Returns the familiar's `WeaponType`. Returns undefined for familiars that don't mimic the
     * player's attacks (Incubus, etc.).
     */
    GetWeapon: () => WeaponType;

    /**
     * Causes `ModCallbackRepentogon.EVALUATE_FAMILIAR_MULTIPLIER` to run next time
     * `EntityFamiliar.GetMultiplier` is ran, regardless of if the value has changed or not.
     */
    InvalidateCachedMultiplier: () => void;

    /** Returns whether the familiar is charmed. */
    IsCharmed: () => boolean;

    /** Returns whether the familiar is one of Lil Delirium's morphs. */
    IsLilDelirium: () => boolean;

    /** Removes the familiar from the player. */
    RemoveFromPlayer: () => void;

    /** Sets whether the familiar is one of Lil Delirium's forms. */
    SetLilDelirium: (isLilDelirium: boolean) => void;

    /** Sets the familiar's move delay. */
    SetMoveDelayNum: (delay: int) => void;

    /** Triggers the familiar's room clear events. */
    TriggerRoomClear: () => void;

    /**
     * Makes the familiar attempt to aim at the marked target effect if the player has the Marked
     * collectible.
     *
     * When called with exactly 2 arguments (aimDirection, direction):
     * Returns the position of the effect if the familiar successfully targeted it, otherwise
     * undefined is returned.
     *
     * When called with 0, 1, or 3 arguments:
     * Returns a boolean indicating success and a table containing the modified aim direction,
     * direction, and target position.
     */
    TryAimAtMarkedTarget(
      aimDirection: Vector,
      direction: Direction,
    ): Vector | undefined;

    /**
     * Attempts to aim at the marked target effect if the player has the Marked collectible.
     *
     * @param aimDirection
     * @param direction
     * @param targetPosBuffer
     * @returns 2 values:
     * - success: Whether the targeting was successful.
     * - An array containing the modified aim direction Vector, the modified shoot Direction, and
     *   the modified target position buffer.
     */
    TryAimAtMarkedTarget(
      aimDirection?: Vector,
      direction?: Direction,
      targetPosBuffer?: Vector,
    ): LuaMultiReturn<[success: boolean, result: [Vector, Direction, Vector]]>;

    /** Updates the familiar's dirt color. */
    UpdateDirtColor: () => void;
  }
}

/** @noSelf */
declare namespace EntityFamiliar {
  function GetRandomWisp(rng: RNG): CollectibleType;
}
