import type { Direction, WeaponType } from "isaac-typescript-definitions";
import type { FollowerPriority } from "../../../enums/FollowerPriority";

declare global {
  interface EntityFamiliar extends Entity {
    /** Returns whether the familiar can be damaged by enemies. */
    CanBeDamagedByEnemies: () => boolean;

    /** Returns whether the familiar can be damaged by enemy lasers. */
    CanBeDamagedByLasers: () => boolean;

    /** Returns whether the familiar can be damaged by enemy projectiles. */
    CanBeDamagedByProjectiles: () => boolean;

    /** Returns whether the familiar can charm enemies. */
    CanCharm: () => boolean;

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
     * Attempts to aim at the marked target effect if the player has the Marked collectible.
     *
     * Returns the position of the effect if the familiar successfully targeted it, otherwise
     * undefined is returned.
     */
    TryAimAtMarkedTarget: (
      aimDirection: Vector,
      direction: Direction,
    ) => Vector | undefined;

    /** Updates the familiar's dirt color. */
    UpdateDirtColor: () => void;
  }
}
