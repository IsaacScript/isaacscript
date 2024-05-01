import type {
  Challenge,
  CollectibleType,
  EntityType,
} from "isaac-typescript-definitions";
import type { Achievement } from "../../enums/Achievement";
import type { EventCounter } from "../../enums/EventCounter";

declare global {
  /**
   * It is not safe calling the methods of this class until the game fully loads. It's best to only
   * call them inside of callbacks.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface PersistentGameData {
    /** Returns the number of times a specific entity has been killed, according to the bestiary. */
    GetBestiaryDeathCount: (entityType: EntityType, variant: int) => int;

    /**
     * Returns the number of times a specific entity has been encountered, according to the
     * bestiary.
     */
    GetBestiaryEncounterCount: (entityType: EntityType, variant: int) => int;

    /**
     * Returns the number of times a specific entity has killed a player, according to the bestiary.
     */
    GetBestiaryKillCount: (entityType: EntityType, variant: int) => int;

    /** Returns the current value of the specified persistent event counter. */
    GetEventCounter: (event: EventCounter) => int;

    /** Increases the value of a specified persistent event counter by the provided amount. */
    IncreaseEventCounter: (event: EventCounter, count: int) => void;

    /** Returns whether the provided `Challenge` has been completed. */
    IsChallengeComplete: (challenge: Challenge) => boolean;

    /** Returns whether the provided collectible is in the items page in the stats menu. */
    IsItemInCollection: (collectible: CollectibleType) => void;

    /**
     * Tries to unlock the provided `Achievement`. Returns whether the achievement was unlocked
     * successfully.
     */
    TryUnlock: (unlock: Achievement) => boolean;

    /** Returns whether the provided `Achievement` is unlocked. */
    Unlocked: (unlock: Achievement) => boolean;
  }
}
