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

    /** Returns the familiar's pathfinder. */
    GetPathFinder: () => PathFinder;

    /**
     * Returns the familiar's `WeaponType`. Returns undefined for familiars that don't mimic the
     * player's attacks (Incubus, etc.).
     */
    GetWeapon: () => WeaponType;

    /** Returns whether the familiar is charmed. */
    IsCharmed: () => boolean;

    /** Removes the familiar from the player. */
    RemoveFromPlayer: () => void;

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

    UpdateDirtColor: () => void;
  }
}
