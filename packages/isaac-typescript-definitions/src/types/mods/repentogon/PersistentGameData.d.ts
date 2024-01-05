import type { AchievementType } from "../../../enums/AchievementType";
import type { Challenge } from "../../../enums/Challenge";
import type { EntityType } from "../../../enums/EntityType";
import type { CollectibleType } from "../../../enums/collections/subTypes";
import type { EventCounter } from "../../../enums/mods/repentogon/EventCounter";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface PersistentGameData {
    GetBestiaryDeathCount: (entityType: EntityType, variant: int) => int;
    GetBestiaryEncounterCount: (entityType: EntityType, variant: int) => int;
    GetBestiaryKillCount: (entityType: EntityType, variant: int) => int;
    GetEventCounter: (eventCounter: EventCounter) => int;
    IsChallengeCompleted: (challenge: Challenge) => boolean;
    IsItemInCollection: (collectible: CollectibleType) => boolean;

    /**
     * Returns true if the unlock was successful, false if unlocking failed or the item was already
     * unlocked.
     */
    TryUnlock: (achievement: AchievementType) => boolean;

    /** Returns true if the achievement is unlocked. */
    Unlocked: (achievement: AchievementType) => boolean;
  }
}
