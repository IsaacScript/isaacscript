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
    readonly CanShoot: () => boolean;

    /** Returns an array of all of the achievements required for the challenge to be unlocked. */
    readonly GetAchievementList: () => Achievement[];

    readonly GetAddDamage: () => number;

    /** Returns the amount of black hearts the player starts with in the challenge. */
    readonly GetBlackHearts: () => int;

    /** Returns the amount of coins the player starts with in the challenge. */
    readonly GetCoins: () => int;

    /** Returns an array of collectibles the player starts with in the challenge. */
    readonly GetCollectibleList: () => CollectibleType[];

    /**
     * Returns an array of the collectibles that the player's twin (i.e. Esau) starts with in the
     * challenge.
     */
    readonly GetCollectibleTwinList: () => CollectibleType[];

    /** Returns a bit flag of all of the curses the challenge applies. */
    readonly GetCurse: () => BitFlags<LevelCurse>;

    /** Returns a bit flag of all of the curses that can't occur during the challenge. */
    readonly GetCurseFilter: () => BitFlags<LevelCurse>;

    /** Returns the challenge's difficulty. */
    readonly GetDifficulty: () => Difficulty;

    /** Returns the final stage of the challenge. */
    readonly GetEndStage: () => LevelStage;

    /** Returns the amount of red hearts the player starts with in the challenge. */
    readonly GetHearts: () => int;

    /** Returns the amount of red heart containers the player starts with in the challenge. */
    readonly GetMaxHearts: () => int;

    /** Returns the minimum fire rate the player has in the challenge. */
    readonly GetMinFireRate: () => number;

    /** Returns the name of the challenge. */
    readonly GetName: () => string;

    /** Returns the `PlayerType` the player starts off as in the challenge. */
    readonly GetPlayerType: () => PlayerType;

    /** Returns an array of the `RoomType` that cannot be generated during the challenge. */
    readonly GetRoomFilter: () => RoomType[];

    /** Returns the amount of soul hearts the player starts with in the challenge. */
    readonly GetSoulHearts: () => int;

    /** Returns the `CardType` the player starts with in the challenge. */
    readonly GetStartingCard: () => CardType;

    /** Returns the type of pill the player starts with in the challenge. */
    readonly GetStartingPill: () => PillEffect;

    /** Returns an array of trinkets that the player starts with in the challenge. */
    readonly GetTrinketList: () => TrinketType[];

    /** Returns whether the player must go through the Alt Path. */
    readonly IsAltPath: () => boolean;

    /** Returns whether the player must go through ascent and defeat The Beast. */
    readonly IsBeastPath: () => boolean;

    /** Returns whether the player's range is forced to be at its maximum value at 16.50. */
    readonly IsBigRangeEnabled: () => boolean;

    /** Returns whether the player's damage is forced to be at its maximum value at 100. */
    readonly IsMaxDamageEnabled: () => boolean;

    /** Returns true if the end-boss of the challenge is Mega Satan. */
    readonly IsMegaSatanRun: () => boolean;

    /** Returns whether the player has a minimum shot speed cap. */
    readonly IsMinShotSpeedEnabled: () => boolean;

    /** Returns whether the challenge takes the player through the Repentance path. */
    readonly IsSecretPath: () => boolean;
  }
}
