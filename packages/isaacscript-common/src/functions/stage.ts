import type { StageID } from "isaac-typescript-definitions";
import {
  GameStateFlag,
  LevelStage,
  RoomType,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { LEVEL_NAMES } from "../objects/levelNames";
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
  const prefix = isNormalRoom ? "d" : `s.${roomTypeSpecialGotoPrefix}`;

  return `goto ${prefix}.${roomVariant}`;
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
export function getLevelName(
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

  const stageNames = LEVEL_NAMES[stage];
  return stageNames[stageType];
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
 * Returns whether the provided stage and stage type represent a "final floor". This is defined as a
 * floor that prevents the player from entering the I AM ERROR room on.
 *
 * For example, when using Undefined on The Chest, it has a 50% chance of teleporting the player to
 * the Secret Room and a 50% chance of teleporting the player to the Super Secret Room, because the
 * I AM ERROR room is never entered into the list of possibilities.
 */
export function isFinalFloor(stage: LevelStage, stageType: StageType): boolean {
  return (
    stage === LevelStage.DARK_ROOM_CHEST ||
    stage === LevelStage.VOID ||
    stage === LevelStage.HOME ||
    (stage === LevelStage.WOMB_2 && isRepentanceStage(stageType)) // Corpse 2
  );
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

/**
 * Helper function to check if the provided effective stage is one that has the possibility to grant
 * a natural Devil Room or Angel Room after killing the boss.
 *
 * Note that in order for this function to work properly, you must provide it with the effective
 * stage (e.g. from the `getEffectiveStage` helper function) and not the absolute stage (e.g. from
 * the `Level.GetStage` method).
 */
export function isStageWithNaturalDevilRoom(
  effectiveStage: LevelStage,
): boolean {
  return (
    inRange(effectiveStage, LevelStage.BASEMENT_2, LevelStage.WOMB_2) &&
    effectiveStage !== LevelStage.BLUE_WOMB
  );
}

/**
 * Helper function to check if the provided stage is one that will have a random collectible drop
 * upon defeating the boss of the floor.
 *
 * This happens on most stages but will not happen on Depths 2, Womb 2, Sheol, Cathedral, Dark Room,
 * The Chest, and Home (due to the presence of a story boss).
 *
 * Note that even though Delirium does not drop a random boss collectible, The Void is still
 * considered to be a stage that has a random boss collectible since all of the non-Delirium Boss
 * Rooms will drop random boss collectibles.
 */
export function isStageWithRandomBossCollectible(stage: LevelStage): boolean {
  return !isStageWithStoryBoss(stage) || stage === LevelStage.VOID;
}

/**
 * Helper function to check if the provided stage will spawn a locked door to Downpour/Dross after
 * defeating the boss.
 */
export function isStageWithSecretExitToDownpour(stage: LevelStage): boolean {
  return stage === LevelStage.BASEMENT_1 || stage === LevelStage.BASEMENT_2;
}

/**
 * Helper function to check if the provided stage and stage type will spawn a spiked door to
 * Mausoleum/Gehenna after defeating the boss.
 */
export function isStageWithSecretExitToMausoleum(
  stage: LevelStage,
  stageType: StageType,
): boolean {
  const repentanceStage = isRepentanceStage(stageType);

  return (
    (stage === LevelStage.DEPTHS_1 && !repentanceStage) ||
    (stage === LevelStage.CAVES_2 && repentanceStage)
  );
}

/**
 * Helper function to check if the provided stage and stage type will spawn a wooden door to
 * Mines/Ashpit after defeating the boss.
 */
export function isStageWithSecretExitToMines(
  stage: LevelStage,
  stageType: StageType,
): boolean {
  const repentanceStage = isRepentanceStage(stageType);

  return (
    (stage === LevelStage.CAVES_1 && !repentanceStage) ||
    (stage === LevelStage.BASEMENT_2 && repentanceStage)
  );
}

/**
 * Helper function to check if the current stage is one that would create a trapdoor if We Need to
 * Go Deeper was used.
 */
export function isStageWithShovelTrapdoors(
  stage: LevelStage,
  stageType: StageType,
): boolean {
  const repentanceStage = isRepentanceStage(stageType);

  return (
    stage < LevelStage.WOMB_2 ||
    (stage === LevelStage.WOMB_2 && !repentanceStage)
  );
}

/**
 * Helper function to check if the provided stage is one with a story boss. Specifically, this is
 * Depths 2 (Mom), Womb 2 (Mom's Heart / It Lives), Blue Womb (Hush), Sheol (Satan), Cathedral
 * (Isaac), Dark Room (Lamb), The Chest (Blue Baby), The Void (Delirium), and Home (Dogma / The
 * Beast).
 */
export function isStageWithStoryBoss(stage: LevelStage): boolean {
  return stage === LevelStage.DEPTHS_2 || stage >= LevelStage.WOMB_2;
}

/**
 * Helper function to check if the player has taken Dad's Note. This sets the game state flag of
 * `GameStateFlag.BACKWARDS_PATH` and causes floor generation to change.
 */
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
 * Helper function to check if the current stage matches one of the given stages. This uses the
 * `getEffectiveStage` helper function so that the Repentance floors are correctly adjusted.
 *
 * This function is variadic, which means you can pass as many stages as you want to match for.
 */
export function onEffectiveStage(...effectiveStages: LevelStage[]): boolean {
  const thisEffectiveStage = getEffectiveStage();
  return effectiveStages.includes(thisEffectiveStage);
}

/**
 * Returns whether the player is on the "final floor" of the particular run. The final floor is
 * defined as one that prevents the player from entering the I AM ERROR room on.
 *
 * For example, when using Undefined on The Chest, it has a 50% chance of teleporting the player to
 * the Secret Room and a 50% chance of teleporting the player to the Super Secret Room, because the
 * I AM ERROR room is never entered into the list of possibilities.
 */
export function onFinalFloor(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return isFinalFloor(stage, stageType);
}

/**
 * Returns whether the player is on the first floor of the particular run.
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
 * Helper function to check if the current stage matches one of the given stages.
 *
 * This function is variadic, which means you can pass as many stages as you want to match for.
 */
export function onStage(...stages: LevelStage[]): boolean {
  const level = game.GetLevel();
  const thisStage = level.GetStage();
  return stages.includes(thisStage);
}

/** Helper function to check if the current stage is equal to or higher than the given stage. */
export function onStageOrHigher(stage: LevelStage): boolean {
  const level = game.GetLevel();
  const thisStage = level.GetStage();
  return thisStage >= stage;
}

/** Helper function to check if the current stage is equal to or higher than the given stage. */
export function onStageOrLower(stage: LevelStage): boolean {
  const level = game.GetLevel();
  const thisStage = level.GetStage();
  return thisStage <= stage;
}

/**
 * Helper function to check if the current stage matches one of the given stage types.
 *
 * This function is variadic, which means you can pass as many room types as you want to match for.
 */
export function onStageType(...stageTypes: StageType[]): boolean {
  const level = game.GetLevel();
  const thisStageType = level.GetStageType();
  return stageTypes.includes(thisStageType);
}

/**
 * Helper function to check if the current stage is one that has the possibility to grant a natural
 * Devil Room or Angel Room after killing the boss.
 */
export function onStageWithNaturalDevilRoom(): boolean {
  const effectiveStage = getEffectiveStage();
  return isStageWithNaturalDevilRoom(effectiveStage);
}

/**
 * Helper function to check if the current stage is one that will have a random collectible drop
 * upon defeating the boss of the floor.
 *
 * This happens on most stages but will not happen on Depths 2, Womb 2, Sheol, Cathedral, Dark Room,
 * The Chest, and Home (due to the presence of a story boss).
 *
 * Note that even though Delirium does not drop a random boss collectible, The Void is still
 * considered to be a stage that has a random boss collectible since all of the non-Delirium Boss
 * Rooms will drop random boss collectibles.
 */
export function onStageWithRandomBossCollectible(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();

  return isStageWithRandomBossCollectible(stage);
}

/**
 * Helper function to check if the current stage will spawn a locked door to Downpour/Dross after
 * defeating the boss.
 */
export function onStageWithSecretExitToDownpour(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();

  return isStageWithSecretExitToDownpour(stage);
}

/**
 * Helper function to check if the current stage will spawn a spiked door to Mausoleum/Gehenna after
 * defeating the boss.
 */
export function onStageWithSecretExitToMausoleum(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return isStageWithSecretExitToMausoleum(stage, stageType);
}

/**
 * Helper function to check if the current stage will spawn a wooden door to Mines/Ashpit after
 * defeating the boss.
 */
export function onStageWithSecretExitToMines(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return isStageWithSecretExitToMines(stage, stageType);
}

/**
 * Helper function to check if the current stage is one that would create a trapdoor if We Need to
 * Go Deeper was used.
 */
export function onStageWithShovelTrapdoors(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return isStageWithShovelTrapdoors(stage, stageType);
}

/**
 * Helper function to check if the current stage is one with a story boss. Specifically, this is
 * Depths 2 (Mom), Womb 2 (Mom's Heart / It Lives), Blue Womb (Hush), Sheol (Satan), Cathedral
 * (Isaac), Dark Room (Lamb), The Chest (Blue Baby), The Void (Delirium), and Home (Dogma / The
 * Beast).
 */
export function onStageWithStoryBoss(): boolean {
  const level = game.GetLevel();
  const stage = level.GetStage();

  return isStageWithStoryBoss(stage);
}

/**
 * Helper function to warp to a new stage/level.
 *
 * Note that this is different from the `Level.SetStage` method, which will change the stage and/or
 * stage type of the current floor without moving the player to a new floor.
 *
 * @param stage The stage number to warp to.
 * @param stageType The stage type to warp to.
 * @param reseed Optional. Whether to reseed the floor upon arrival. Default is false. Set this to
 *               true if you are warping to the same stage but a different stage type (or else the
 *               floor layout will be identical to the old floor).
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
