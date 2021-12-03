import { ensureAllCases } from "./util";

/**
 * Helper function to account for Repentance floors being offset by 1. For example, Downpour 2 is
 * the third level of the run, but the game considers it to have a stage of 2. This function will
 * consider Downpour 2 to have a stage of 3.
 */
export function getEffectiveStage(): int {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();

  if (onRepentanceStage()) {
    return stage + 1;
  }

  return stage;
}

/** Helper function to get the current stage. */
export function getStage(): LevelStage {
  const game = Game();
  const level = game.GetLevel();

  return level.GetStage();
}

/** Helper function to get the current stage. */
export function getStageType(): StageType {
  const game = Game();
  const level = game.GetLevel();

  return level.GetStageType();
}

/** Helper function to directly warp to a specific stage using the "stage" console command. */
export function goToStage(stage: LevelStage, stageType: StageType): void {
  const stageTypeLetterSuffix = stageTypeToLetter(stageType);
  const command = `stage ${stage}${stageTypeLetterSuffix}`;
  Isaac.ExecuteCommand(command);
}

export function onCathedral(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return stage === 10 && stageType === 1;
}

export function onChest(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return stage === 11 && stageType === 1;
}

export function onDarkRoom(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return stage === 11 && stageType === 0;
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
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();

  return (
    stage === 11 || // The Chest / Dark Room
    stage === 12 || // The Void
    stage === 13 || // Home
    (stage === 8 && onRepentanceStage()) // Corpse 2
  );
}

export function onRepentanceStage(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const stageType = level.GetStageType();

  return (
    stageType === StageType.STAGETYPE_REPENTANCE ||
    stageType === StageType.STAGETYPE_REPENTANCE_B
  );
}

export function onSheol(): boolean {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  return stage === 10 && stageType === 0;
}

/**
 * Helper function to convert a numerical `StageType` into the letter suffix supplied to the "stage"
 * console command. For example, `StageType.STAGETYPE_REPENTANCE` is the stage type for Downpour,
 * and the console command to go to Downpour is "stage 1c", so this function converts
 * `StageType.STAGETYPE_REPENTANCE` to "c".
 */
export function stageTypeToLetter(stageType: StageType): string {
  switch (stageType) {
    // 0
    case StageType.STAGETYPE_ORIGINAL: {
      // e.g. To go to Basement 2, the command is simply "stage 2"
      return "";
    }

    // 1
    case StageType.STAGETYPE_WOTL: {
      return "a";
    }

    // 2
    case StageType.STAGETYPE_AFTERBIRTH: {
      return "b";
    }

    // 3
    case StageType.STAGETYPE_GREEDMODE: {
      // There is no corresponding suffix
      return "";
    }

    // 4
    case StageType.STAGETYPE_REPENTANCE: {
      return "c";
    }

    // 5
    case StageType.STAGETYPE_REPENTANCE_B: {
      return "d";
    }

    default: {
      ensureAllCases(stageType);
      return "";
    }
  }
}
