import { LevelStage, StageType } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { STAGE_TYPE_TO_LETTER } from "../objects/stageTypeToLetter";

/**
 * Helper function to account for Repentance floors being offset by 1. For example, Downpour 2 is
 * the third level of the run, but the game considers it to have a stage of 2. This function will
 * consider Downpour 2 to have a stage of 3.
 */
export function getEffectiveStage(): int {
  const level = game.GetLevel();
  const stage = level.GetStage();

  if (onRepentanceStage()) {
    return stage + 1; // eslint-disable-line isaacscript/strict-enums
  }

  return stage;
}

/** Alias for the `Level.GetStage` method. */
export function getStage(): LevelStage {
  const level = game.GetLevel();

  return level.GetStage();
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

export function isRepentanceStage(stageType: StageType): boolean {
  return (
    stageType === StageType.REPENTANCE || stageType === StageType.REPENTANCE_B
  );
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
 * Helper function to convert a numerical `StageType` into the letter suffix supplied to the "stage"
 * console command. For example, `StageType.REPENTANCE` is the stage type for Downpour, and the
 * console command to go to Downpour is "stage 1c", so this function converts `StageType.REPENTANCE`
 * to "c".
 */
export function stageTypeToLetter(stageType: StageType): string {
  return STAGE_TYPE_TO_LETTER[stageType];
}
