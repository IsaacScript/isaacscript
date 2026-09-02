import type {
  CollectibleType,
  Direction,
  WeaponType,
} from "isaac-typescript-definitions";
import type { FollowerPriority } from "../../../enums/FollowerPriority";

declare global {
  interface EntityFamiliar extends Entity {
    /** Returns whether the familiar can be damaged by enemies. */
    readonly CanBeDamagedByEnemies: () => boolean;

    /** Returns whether the familiar can be damaged by enemy lasers. */
    readonly CanBeDamagedByLasers: () => boolean;

    /** Returns whether the familiar can be damaged by enemy projectiles. */
    readonly CanBeDamagedByProjectiles: () => boolean;

    /** Returns whether the familiar can block projectiles. */
    readonly CanBlockProjectiles: () => boolean;

    /** Returns whether the familiar can charm enemies. */
    readonly CanCharm: () => boolean;

    /**
     * Returns the weapon entity the familiar is holding. Returns undefined if the familiar has no
     * weapon.
     */
    readonly GetActiveWeaponEntity: () => Entity | undefined;

    /**
     * Returns how many times the familiar has attacked with its current weapon. Returns undefined
     * for familiars that do not attack with a weapon.
     */
    readonly GetActiveWeaponNumFired: () => int | undefined;

    /** Returns the familiar's dirt color. */
    readonly GetDirtColor: () => Color;

    /** Returns the familiar's follower priority. */
    readonly GetFollowerPriority: () => FollowerPriority;

    /**
     * Returns the `ItemConfigItem` corresponding to the collectible that granted the familiar.
     * Returns undefined if the familiar was not spawned by a collectible.
     */
    readonly GetItemConfig: () => ItemConfigItem | undefined;

    /** Returns the familiar's move delay. */
    readonly GetMoveDelayNum: () => int;

    /**
     * Returns the familiar's multiplier.
     *
     * Triggers `ModCallbackRepentogon.EVALUATE_FAMILIAR_MULTIPLIER` only if the familiar's
     * multiplier has changed between subsequent calls to this method. If you wish for the callback
     * to trigger no matter what, call the `EntityFamiliar.InvalidateCachedMultiplier` method.
     */
    readonly GetMultiplier: () => number;

    /** Returns the familiar's pathfinder. */
    readonly GetPathFinder: () => PathFinder;

    /**
     * Returns the familiar's `WeaponType`. Returns undefined for familiars that don't mimic the
     * player's attacks (Incubus, etc.).
     */
    readonly GetWeapon: () => WeaponType;

    /**
     * Causes `ModCallbackRepentogon.EVALUATE_FAMILIAR_MULTIPLIER` to run next time
     * `EntityFamiliar.GetMultiplier` is ran, regardless of if the value has changed or not.
     */
    readonly InvalidateCachedMultiplier: () => void;

    /** Returns whether the familiar is charmed. */
    readonly IsCharmed: () => boolean;

    /** Returns whether the familiar is one of Lil Delirium's morphs. */
    readonly IsLilDelirium: () => boolean;

    /** Removes the familiar from the player. */
    readonly RemoveFromPlayer: () => void;

    /** Sets whether the familiar is one of Lil Delirium's forms. */
    readonly SetLilDelirium: (isLilDelirium: boolean) => void;

    /** Sets the familiar's move delay. */
    readonly SetMoveDelayNum: (delay: int) => void;

    /** Triggers the familiar's room clear events. */
    readonly TriggerRoomClear: () => void;

    /**
     * Makes the familiar attempt to aim at the marked target effect if the player has the Marked
     * collectible.
     *
     * When called with exactly 2 arguments (aimDirection, direction): Returns the position of the
     * effect if the familiar successfully targeted it, otherwise undefined is returned.
     */
    readonly TryAimAtMarkedTarget: ((
      aimDirection: Vector,
      direction: Direction,
    ) => Vector | undefined)
      & ((
        /**
         * @param aimDirection
         * @param direction
         * @param targetPosBuffer
         * @returns 2 values:
         * - success: Whether the targeting was successful.
         * - result: An array containing the modified aim direction Vector, the modified direction
         *   integer, and the modified target position buffer Vector.
         */
        aimDirection?: Vector,
        direction?: int,
        targetPosBuffer?: Vector,
      ) => LuaMultiReturn<[success: boolean, result: [Vector, int, Vector]]>);

    /** Updates the familiar's dirt color. */
    readonly UpdateDirtColor: () => void;
  }
}

/** @noSelf */
declare namespace EntityFamiliar {
  function GetRandomWisp(rng: RNG): CollectibleType;
}
