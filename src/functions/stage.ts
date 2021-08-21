export function getEffectiveStage(): int {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();

  if (onRepentanceStage()) {
    return stage + 1;
  }

  return stage;
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
