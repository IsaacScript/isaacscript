import type {
  Dimension,
  DoorSlot,
  LevelStage,
  StageType,
} from "isaac-typescript-definitions";
import type { SpecialQuest } from "../../enums/SpecialQuest";

declare interface Level extends IsaacAPIClass {
  /** Returns whether the Red Door outline can spawn at the specified `DoorSlot`. */
  CanSpawnDoorOutline: (roomIndex: int, doorSlot: DoorSlot) => boolean;

  /** Returns the current dimension the player is in. */
  GetDimension: () => Dimension;

  /** Returns whether the special quest is forced. */
  GetForceSpecialQuest: () => SpecialQuest;

  GetGreedWavesClearedWithoutRedHeartDamage: () => int;

  /** Returns whether the floor has the mineshaft room used for the second Knife Piece puzzle. */
  HasAbandonedMineshaft: () => boolean;

  /** Returns whether the floor has the mirror dimension used for the first Knife Piece puzzle. */
  HasMirrorDimension: () => boolean;

  /**
   * Returns whether the floor has the mysterious door used to enter Mausoleum/Gehenna leading to
   * the Ascent sequence.
   */
  HasPhotoDoor: () => boolean;

  /**
   * Returns whether the specified level and stage combination can be generated in any given run and
   * is not locked behind an achievement.
   */
  IsStageAvailable: (level: LevelStage, stage: StageType) => void;

  /**
   * Attempts to place a room.
   *
   * Returns whether room placement was successful.
   */
  PlaceRoom: (
    room: LevelGeneratorEntry,
    roomConfig: RoomConfig,
    seed: Seed,
  ) => boolean;

  SetGreedWavesClearedWithoutRedHeartDamage: (waves: int) => void;
  SetForceSpecialQuest: (quest: SpecialQuest) => void;

  /** Sets the display name of the level. */
  SetName: (name: string) => void;
}
