import {
  GameStateFlag,
  LevelStage,
  RoomType,
  StageID,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { ENGLISH_LEVEL_NAMES } from "../objects/englishLevelNames";
import { ROOM_TYPE_SPECIAL_GOTO_PREFIXES } from "../objects/roomTypeSpecialGotoPrefixes";
import { STAGE_TO_STAGE_ID } from "../objects/stageToStageID";
import { STAGE_TYPE_SUFFIXES } from "../objects/stageTypeSuffixes";
import { STAGE_TYPE_TO_LETTER } from "../objects/stageTypeToLetter";
import { asLevelStage, asNumber } from "./types";
import { inRange } from "./utils";

/**
 * Helper function that calculates what the stage type should be for the provided stage. This
 * emulates what the game's internal code does.
 */
export function calculateStageType(stage: LevelStage): StageType {
  // The following is the game's internal code to determine the floor type. (This came directly from
  // Spider.)

  /*
    u32 Seed = g_Game->GetSeeds().GetStageSeed(NextStage);
    if (!g_Game->IsGreedMode()) {
      StageType = ((Seed % 2) == 0 && (
        ((NextStage == STAGE1_1 || NextStage == STAGE1_2) && gd.Unlocked(ACHIEVEMENT_CELLAR)) ||
        ((NextStage == STAGE2_1 || NextStage == STAGE2_2) && gd.Unlocked(ACHIEVEMENT_CATACOMBS)) ||
        ((NextStage == STAGE3_1 || NextStage == STAGE3_2) && gd.Unlocked(ACHIEVEMENT_NECROPOLIS)) ||
        ((NextStage == STAGE4_1 || NextStage == STAGE4_2)))
      ) ? STAGE_TYPE_WOTL : STAGE_TYPE_ORIGINAL;
    if (Seed % 3 == 0 && NextStage < STAGE5)
      StageType = STAGE_TYPE_AFTERBIRTH;
  */

  const seeds = game.GetSeeds();
  const stageSeed = seeds.GetStageSeed(stage);

  if (stageSeed % 2 === 0) {
    return StageType.WRATH_OF_THE_LAMB;
  }

  if (stageSeed % 3 === 0) {
    return StageType.AFTERBIRTH;
  }

  return StageType.ORIGINAL;
}

/**
 * Helper function that calculates what the Repentance stage type should be for the provided stage.
 * This emulates what the game's internal code does.
 */
export function calculateStageTypeRepentance(stage: LevelStage): StageType {
  // There is no alternate floor for Corpse.
  if (stage === LevelStage.WOMB_1 || stage === LevelStage.WOMB_2) {
    return StageType.REPENTANCE;
  }

  // This algorithm is from Kilburn. We add one because the alt path is offset by 1 relative to the
  // normal path.
  const seeds = game.GetSeeds();
  const adjustedStage = asLevelStage(asNumber(stage) + 1);
  const stageSeed = seeds.GetStageSeed(adjustedStage);

  // Kilburn does not know why he divided the stage seed by 2 first.
  const halfStageSeed = Math.floor(stageSeed / 2);
  if (halfStageSeed % 2 === 0) {
    return StageType.REPENTANCE_B;
  }

  return StageType.REPENTANCE;
}

/**
 * Helper function to account for Repentance floors being offset by 1. For example, Downpour 2 is
 * the third level of the run, but the game considers it to have a stage of 2. This function will
 * consider Downpour 2 to have a stage of 3.
 */
export function getEffectiveStage(): LevelStage {
  const level = game.GetLevel();
  const stage = level.GetStage();

  if (onRepentanceStage()) {
    return asNumber(stage) + 1;
  }

  return stage;
}

/**
 * Helper function to get the English name of the level. For example, "Caves 1".
 *
 * This is useful because the `Level.GetName` method returns a localized version of the level name,
 * which will not display correctly on some fonts.
 *
 * Note that this returns "Blue Womb" instead of "???" for stage 9.
 *
 * @param stage Optional. If not specified, the current stage will be used.
 * @param stageType Optional. If not specified, the current stage type will be used.
 */
export function getEnglishLevelName(
  stage?: LevelStage,
  stageType?: StageType,
): string {
  const level = game.GetLevel();

  if (stage === undefined) {
    stage = level.GetStage();
  }

  if (stageType === undefined) {
    stageType = level.GetStageType();
  }

  const stageNames = ENGLISH_LEVEL_NAMES[stage];
  return stageNames[stageType];
}

/**
 * Helper function to get the corresponding "goto" console command that would correspond to the
 * provided room type and room variant.
 *
 * @param roomType The `RoomType` of the destination room.
 * @param roomVariant The variant of the destination room.
 * @param useSpecialRoomsForRoomTypeDefault Optional. Whether to use `s.default` as the prefix for
 *                                 the `goto` command (instead of `d`) if the room type is
 *                                 `RoomType.DEFAULT` (1). False by default.
 */
export function getGotoCommand(
  roomType: RoomType,
  roomVariant: int,
  useSpecialRoomsForRoomTypeDefault = false,
): string {
  const isNormalRoom =
    roomType === RoomType.DEFAULT && !useSpecialRoomsForRoomTypeDefault;
  const roomTypeSpecialGotoPrefix = ROOM_TYPE_SPECIAL_GOTO_PREFIXES[roomType];
  const prefix = isNormalRoom ? `d` : `s.${roomTypeSpecialGotoPrefix}`;

  return `goto ${prefix}.${roomVariant}`;
}

/** Alias for the `Level.GetStage` method. */
export function getStage(): LevelStage {
  const level = game.GetLevel();

  return level.GetStage();
}

/**
 * Helper function to get the stage ID that corresponds to a particular floor. It does this by
 * manually converting `LevelStage` and `StageType` into `StageID`. This is useful because
 * `getRoomStageID` will not correctly return the `StageID` if the player is in a special room.
 *
 * @param stage Optional. If not specified, the stage corresponding to the current floor will be
 *              used.
 * @param stageType Optional. If not specified, the stage type corresponding to the current floor
 *                  will be used.
 */
export function getStageID(stage?: LevelStage, stageType?: StageType): StageID {
  const level = game.GetLevel();

  if (stage === undefined) {
    stage = level.GetStage();
  }

  if (stageType === undefined) {
    stageType = level.GetStageType();
  }

  const stageTypeToStageID = STAGE_TO_STAGE_ID[stage];
  return stageTypeToStageID[stageType];
}

/** Alias for the `Level.GetStageType` method. */
export function getStageType(): StageType {
  const level = game.GetLevel();

  return level.GetStageType();
}

/** Helper function to directly warp to a specific stage using the "stage" console command. */
export function goToStage(stage: LevelStage, stageType: StageType): void {
  const stageTypeLetterSuffix = stageTypeToLetter(stageType);
  const command = `stage ${stage}${stageTypeLetterSuffix}`;
  Isaac.ExecuteCommand(command);
}

/**
 * Helper function to check if the provided stage type is equal to `StageType.REPENTANCE` or
 * `StageType.REPENTANCE_B`.
 */
export function isRepentanceStage(stageType: StageType): boolean {
  return (
    stageType === StageType.REPENTANCE || stageType === StageType.REPENTANCE_B
  );
}

export function onAscent(): boolean {
  return game.GetStateFlag(GameStateFlag.BACKWARDS_PATH);
}

export function onCathedral(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return (
    stage === LevelStage.SHEOL_CATHEDRAL &&
    stageType === StageType.WRATH_OF_THE_LAMB
  );
}

export function onChest(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return (
    stage === LevelStage.DARK_ROOM_CHEST &&
    stageType === StageType.WRATH_OF_THE_LAMB
  );
}

export function onDarkRoom(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return (
    stage === LevelStage.DARK_ROOM_CHEST && stageType === StageType.ORIGINAL
  );
}

/**
 * Returns whether or not the player is on the "final floor" of the particular run. The final floor
 * is defined as one that prevents the player from entering the I AM ERROR room on.
 *
 * For example, when using Undefined on The Chest, it has a 50% chance of teleporting the player to
 * the Secret Room and a 50% chance of teleporting the player to the Super Secret Room, because the
 * I AM ERROR room is never entered into the list of possibilities.
 */
export function onFinalFloor(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();

  return (
    stage === LevelStage.DARK_ROOM_CHEST ||
    stage === LevelStage.THE_VOID ||
    stage === LevelStage.HOME ||
    (stage === LevelStage.WOMB_2 && onRepentanceStage()) // Corpse 2
  );
}

/**
 * Returns whether or not the player is on the first floor of the particular run.
 *
 * This is tricky to determine because we have to handle the cases of Downpour/Dross 1 not being the
 * first floor and The Ascent.
 */
export function onFirstFloor(): boolean {
  const effectiveStage = getEffectiveStage();
  const isOnAscent = onAscent();

  return effectiveStage === LevelStage.BASEMENT_1 && !isOnAscent;
}

/**
 * Helper function to check if the current stage type is equal to `StageType.REPENTANCE` or
 * `StageType.REPENTANCE_B`.
 */
export function onRepentanceStage(): boolean {
  const level = game.GetLevel();
  const stageType = level.GetStageType();

  return isRepentanceStage(stageType);
}

export function onSheol(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return (
    stage === LevelStage.SHEOL_CATHEDRAL && stageType === StageType.ORIGINAL
  );
}

/**
 * Helper function to check if the current stage is one that has the possibility to grant a natural
 * Devil Room or Angel Room after killing the boss.
 */
export function onStageWithNaturalDevilRoom(): boolean {
  const effectiveStage = getEffectiveStage();
  return (
    inRange(effectiveStage, LevelStage.BASEMENT_2, LevelStage.WOMB_2) &&
    effectiveStage !== LevelStage.BLUE_WOMB
  );
}

/**
 * Helper function to warp to a new stage/level.
 *
 * @param stage The stage number to warp to.
 * @param stageType The stage type to warp to.
 * @param reseed Optional. Whether or not to reseed the floor upon arrival. Default is false. Set
 *               this to true if you are warping to the same stage but a different stage type (or
 *               else the floor layout will be identical to the old floor).
 */
export function setStage(
  stage: LevelStage,
  stageType: StageType,
  reseed = false,
): void {
  // Build the command that will take us to the next floor.
  const stageTypeSuffix = STAGE_TYPE_SUFFIXES[stageType];
  const command = `stage ${stage}${stageTypeSuffix}`;
  Isaac.ExecuteCommand(command);

  if (reseed) {
    // Doing a "reseed" immediately after a "stage" command won't mess anything up.
    Isaac.ExecuteCommand("reseed");
  }
}

/**
 * Helper function to convert a numerical `StageType` into the letter suffix supplied to the "stage"
 * console command. For example, `StageType.REPENTANCE` is the stage type for Downpour, and the
 * console command to go to Downpour is "stage 1c", so this function converts `StageType.REPENTANCE`
 * to "c".
 */
export function stageTypeToLetter(stageType: StageType): string {
  return STAGE_TYPE_TO_LETTER[stageType];
}
