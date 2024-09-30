import type {
  CardType,
  CollectibleType,
  Difficulty,
  LevelCurse,
  LevelStage,
  PillEffect,
  PlayerType,
  RoomType,
  TrinketType,
} from "isaac-typescript-definitions";
import type { Achievement } from "../../enums/Achievement";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface ChallengeParams extends IsaacAPIClass {
    /** Returns true if the player does not start off blindfolded in the challenge. */
    CanShoot: () => boolean;

    /** Returns an array of all of the Achievements required for the challenge to be unlocked. */
    GetAchievementList: () => Achievement[];

    GetAddDamage: () => number;

    /** Returns the amount of black hearts the player starts with in the challenge. */
    GetBlackHearts: () => int;

    /** Returns the amount of coins the player starts with in the challenge. */
    GetCoins: () => int;

    /** Returns an array of collectibles the player starts with in the challenge. */
    GetCollectibleList: () => CollectibleType[];

    /**
     * Returns an array of the collectibles that the player's twin (i.e. Esau) starts with in the
     * challenge.
     */
    GetCollectibleTwinList: () => CollectibleType[];

    /** Returns a bit flag of all of the curses the challenge applies. */
    GetCurse: () => BitFlags<LevelCurse>;

    /** Returns a bit flag of all of the curses that can't occur during the challenge. */
    GetCurseFilter: () => BitFlags<LevelCurse>;

    /** Returns the challenge's difficulty. */
    GetDifficulty: () => Difficulty;

    /** Returns the final stage of the challenge. */
    GetEndStage: () => LevelStage;

    /** Returns the amount of red hearts the player starts with in the challenge. */
    GetHearts: () => int;

    /** Returns the amount of red heart containers the player starts with in the challenge. */
    GetMaxHearts: () => int;

    /** Returns the minimum fire rate the player has in the challenge. */
    GetMinFireRate: () => number;

    /** Returns the name of the challenge. */
    GetName: () => string;

    /** Returns the `PlayerType` the player starts off as in the challenge. */
    GetPlayerType: () => PlayerType;

    /** Returns an array of the `RoomType` that cannot be generated during the challenge. */
    GetRoomFilter: () => RoomType[];

    /** Returns the amount of soul hearts the player starts with in the challenge. */
    GetSoulHearts: () => int;

    /** Returns the `CardType` the player starts with in the challenge. */
    GetStartingCard: () => CardType;

    /** Returns the type of pill the player starts with in the challenge. */
    GetStartingPill: () => PillEffect;

    /** Returns an array of trinkets that the player starts with in the challenge. */
    GetTrinketList: () => TrinketType[];

    IsAltPath: () => boolean;

    /** Returns whether the player's range is forced to be at its maximum value at 16.50. */
    IsBigRangeEnabled: () => boolean;

    /** Returns whether the player's damage is forced to be at its maximum value at 100. */
    IsMaxDamageEnabled: () => boolean;

    /** Returns true if the end-boss of the challenge is Mega Satan. */
    IsMegaSatanRun: () => boolean;

    /** Returns whether the player has a minimum shot speed cap. */
    IsMinShotSpeedEnabled: () => boolean;

    /** Returns whether the challenge takes the player through the Repentance path. */
    IsSecretPath: () => boolean;
  }
}
