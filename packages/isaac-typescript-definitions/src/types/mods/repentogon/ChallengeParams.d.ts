import type { AchievementType } from "../../../enums/AchievementType";
import type { Difficulty } from "../../../enums/Difficulty";
import type { LevelStage } from "../../../enums/LevelStage";
import type { PillEffect } from "../../../enums/PillEffect";
import type { RoomType } from "../../../enums/RoomType";
import type {
  CardType,
  CollectibleType,
  PlayerType,
  TrinketType,
} from "../../../enums/collections/subTypes";
import type { LevelCurse } from "../../../enums/flags/LevelCurse";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  interface ChallengeParams extends IsaacAPIClass {
    CanShoot: () => boolean;
    GetAchievementList: () => AchievementType[];
    GetAddDamage: () => number;
    GetBlackHearts: () => int;
    GetCoins: () => int;
    GetCollectibleList: () => CollectibleType[];
    GetCollectibleTwinList: () => CollectibleType[];
    GetCurse: () => LevelCurse;
    GetCurseFilter: () => LevelCurse;
    GetDifficulty: () => Difficulty;
    GetEndStage: () => LevelStage;
    GetHearts: () => int;
    GetMaxHearts: () => int;
    GetMinFireRate: () => number;
    GetName: () => string;
    GetPlayerType: () => PlayerType;
    GetRoomFilter: () => RoomType[];
    GetSoulHearts: () => int;
    GetStartingCard: () => CardType;
    GetStartingPill: () => PillEffect;
    GetTrinketList: () => TrinketType[];
    IsAltPath: () => boolean;
    IsBigRangeEnabled: () => boolean;
    IsMaxDamageEnabled: () => boolean;
    IsMegaSatanRun: () => boolean;
    IsMinShotSpeedEnabled: () => boolean;
    IsSecretPath: () => boolean;
  }
}
