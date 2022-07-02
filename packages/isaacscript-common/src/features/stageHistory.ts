import { LevelStage, StageType } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "stage history";

const v = {
  run: {
    stageHistory: [] as Array<[stage: LevelStage, stageType: StageType]>,
  },
};

/** @internal */
export function stageHistoryInit(mod: ModUpgraded): void {
  saveDataManager("stageHistory", v);

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_LEVEL_REORDERED,
    postNewLevelReordered,
  );
}

// ModCallbackCustom.POST_NEW_LEVEL_REORDERED
function postNewLevelReordered() {
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  v.run.stageHistory.push([stage, stageType]);
}

/** Helper function to get all of the stages that a player has visited thus far on this run. */
export function getStageHistory(): ReadonlyArray<
  [stage: LevelStage, stageType: StageType]
> {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  return v.run.stageHistory;
}

/**
 * Helper function to check if a player has previous visited a particular stage (or stage + stage
 * type combination) on this run.
 *
 * @param stage The stage to check for.
 * @param stageType Optional. If provided, will check for a specific stage and stage type
 *                  combination.
 */
export function hasVisitedStage(
  stage: LevelStage,
  stageType?: StageType,
): boolean {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  if (stageType === undefined) {
    return v.run.stageHistory.some(
      ([previousStage]) => previousStage === stage,
    );
  }

  return v.run.stageHistory.some(
    ([previousStage, previousStageType]) =>
      previousStage === stage && previousStageType === stageType,
  );
}
