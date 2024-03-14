import type {
  Achievement,
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

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface ChallengeParams extends IsaacAPIClass {
    /** Returns true if the player does not start off blindfolded in the challenge. */
    CanShoot: () => boolean;

    /**
     * Returns an array of all of the achievements that are granted upon completing the challenge.
     */
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

    /** Returns true if the challenge goes through the alt path. */
    IsAltPath: () => boolean;

    IsBigRangeEnabled: () => boolean;
    IsMaxDamageEnabled: () => boolean;

    /** Returns true if the end-boss of the challenge is Mega Satan. */
    IsMegaSatanRun: () => boolean;
    IsMinShotSpeedEnabled: () => boolean;
    IsSecretPath: () => boolean;
  }
}
