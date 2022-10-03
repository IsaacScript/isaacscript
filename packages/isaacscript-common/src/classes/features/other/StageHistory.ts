import { LevelStage, StageType } from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { Feature } from "../../private/Feature";

export class StageHistory extends Feature {
  public override v = {
    run: {
      stageHistory: [] as Array<[stage: LevelStage, stageType: StageType]>,
    },
  };

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_NEW_LEVEL_REORDERED,
        [this.postNewLevelReordered],
      ],
    ];
  }

  // ModCallbackCustom.POST_NEW_LEVEL_REORDERED
  private postNewLevelReordered = () => {
    const level = game.GetLevel();
    const stage = level.GetStage();
    const stageType = level.GetStageType();

    this.v.run.stageHistory.push([stage, stageType]);
  };

  /** Helper function to get all of the stages that a player has visited thus far on this run. */
  @Exported
  public getStageHistory(): ReadonlyArray<
    [stage: LevelStage, stageType: StageType]
  > {
    return this.v.run.stageHistory;
  }

  /**
   * Helper function to check if a player has previous visited a particular stage (or stage + stage
   * type combination) on this run.
   *
   * @param stage The stage to check for.
   * @param stageType Optional. If provided, will check for a specific stage and stage type
   *                  combination.
   */
  @Exported
  public hasVisitedStage(stage: LevelStage, stageType?: StageType): boolean {
    if (stageType === undefined) {
      return this.v.run.stageHistory.some(
        ([previousStage]) => previousStage === stage,
      );
    }

    return this.v.run.stageHistory.some(
      ([previousStage, previousStageType]) =>
        previousStage === stage && previousStageType === stageType,
    );
  }
}
