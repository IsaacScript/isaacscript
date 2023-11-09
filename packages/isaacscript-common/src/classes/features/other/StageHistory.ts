import {
  GameStateFlag,
  LevelStage,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { getNextStage, getNextStageType } from "../../../functions/nextStage";
import {
  calculateStageType,
  onRepentanceStage,
} from "../../../functions/stage";
import { asNumber } from "../../../functions/types";
import type { StageHistoryEntry } from "../../../interfaces/StageHistoryEntry";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    stageHistory: [] as StageHistoryEntry[],
  },
};

export class StageHistory extends Feature {
  /** @internal */
  public override v = v;

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_LEVEL_REORDERED, this.postNewLevelReordered],
    ];
  }

  // ModCallbackCustom.POST_NEW_LEVEL_REORDERED
  private readonly postNewLevelReordered = () => {
    const level = game.GetLevel();
    const stage = level.GetStage();
    const stageType = level.GetStageType();

    v.run.stageHistory.push({ stage, stageType });
  };

  /**
   * Helper function to get the stage type that a trapdoor or heaven door would take the player to,
   * based on the current stage, room, and game state flags.
   *
   * This function accounts for the previous floors that a player has visited thus far on the run so
   * that the next stage type can be properly calculated on The Ascent (which makes it unlike the
   * `getNextStageType` function).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.STAGE_HISTORY`.
   *
   * @param upwards Whether the player should go up to Cathedral in the case of being on Womb 2.
   *                Default is false.
   * @public
   */
  @Exported
  public getNextStageTypeWithHistory(upwards = false): StageType {
    const backwardsPath = game.GetStateFlag(GameStateFlag.BACKWARDS_PATH);
    if (!backwardsPath) {
      return getNextStageType(upwards);
    }

    const level = game.GetLevel();
    const stage = level.GetStage();
    const repentanceStage = onRepentanceStage();

    const visitedDownpour1 = this.hasVisitedStage(
      LevelStage.BASEMENT_1,
      StageType.REPENTANCE,
    );
    const visitedDross1 = this.hasVisitedStage(
      LevelStage.BASEMENT_1,
      StageType.REPENTANCE_B,
    );
    const visitedDownpour2 = this.hasVisitedStage(
      LevelStage.BASEMENT_2,
      StageType.REPENTANCE,
    );
    const visitedDross2 = this.hasVisitedStage(
      LevelStage.BASEMENT_2,
      StageType.REPENTANCE_B,
    );
    const visitedMines1 = this.hasVisitedStage(
      LevelStage.CAVES_1,
      StageType.REPENTANCE,
    );
    const visitedAshpit1 = this.hasVisitedStage(
      LevelStage.CAVES_1,
      StageType.REPENTANCE_B,
    );
    const visitedMines2 = this.hasVisitedStage(
      LevelStage.DEPTHS_2,
      StageType.REPENTANCE,
    );
    const visitedAshpit2 = this.hasVisitedStage(
      LevelStage.DEPTHS_2,
      StageType.REPENTANCE_B,
    );

    if (stage === LevelStage.BASEMENT_2 && repentanceStage) {
      if (visitedDownpour1) {
        return StageType.REPENTANCE;
      }

      if (visitedDross1) {
        return StageType.REPENTANCE_B;
      }
    }

    if (stage === LevelStage.CAVES_1 && repentanceStage) {
      if (visitedDownpour2) {
        return StageType.REPENTANCE;
      }

      if (visitedDross2) {
        return StageType.REPENTANCE_B;
      }
    }

    if (stage === LevelStage.CAVES_2 && !repentanceStage) {
      if (visitedDownpour2) {
        return StageType.REPENTANCE;
      }

      if (visitedDross2) {
        return StageType.REPENTANCE_B;
      }
    }

    if (stage === LevelStage.CAVES_2 && repentanceStage) {
      if (visitedMines1) {
        return StageType.REPENTANCE;
      }

      if (visitedAshpit1) {
        return StageType.REPENTANCE_B;
      }
    }

    if (stage === LevelStage.DEPTHS_2 && !repentanceStage) {
      if (visitedAshpit2) {
        return StageType.REPENTANCE_B;
      }

      if (visitedMines2) {
        return StageType.REPENTANCE;
      }
    }

    const nextStage = this.getNextStageWithHistory();
    return calculateStageType(nextStage);
  }

  /**
   * Helper function to get the stage that a trapdoor or heaven door would take the player to, based
   * on the current stage, room, and game state flags.
   *
   * This function accounts for the previous floors that a player has visited thus far on the run so
   * that the next stage can be properly calculated on The Ascent (which makes it unlike the
   * `getNextStage` function).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.STAGE_HISTORY`.
   */
  @Exported
  public getNextStageWithHistory(): LevelStage {
    const backwardsPath = game.GetStateFlag(GameStateFlag.BACKWARDS_PATH);
    if (!backwardsPath) {
      return getNextStage();
    }

    const level = game.GetLevel();
    const stage = level.GetStage();
    const repentanceStage = onRepentanceStage();

    const visitedDownpour1 = this.hasVisitedStage(
      LevelStage.BASEMENT_1,
      StageType.REPENTANCE,
    );
    const visitedDross1 = this.hasVisitedStage(
      LevelStage.BASEMENT_1,
      StageType.REPENTANCE_B,
    );
    const visitedDownpour2 = this.hasVisitedStage(
      LevelStage.BASEMENT_2,
      StageType.REPENTANCE,
    );
    const visitedDross2 = this.hasVisitedStage(
      LevelStage.BASEMENT_2,
      StageType.REPENTANCE_B,
    );
    const visitedMines1 = this.hasVisitedStage(
      LevelStage.CAVES_1,
      StageType.REPENTANCE,
    );
    const visitedAshpit1 = this.hasVisitedStage(
      LevelStage.CAVES_1,
      StageType.REPENTANCE_B,
    );
    const visitedMines2 = this.hasVisitedStage(
      LevelStage.DEPTHS_2,
      StageType.REPENTANCE,
    );
    const visitedAshpit2 = this.hasVisitedStage(
      LevelStage.DEPTHS_2,
      StageType.REPENTANCE_B,
    );

    if (stage === LevelStage.BASEMENT_1) {
      if (repentanceStage) {
        // From Downpour 1 to Basement 1.
        return LevelStage.BASEMENT_1;
      }

      // From Basement 1 to Home.
      return LevelStage.HOME;
    }

    if (stage === LevelStage.BASEMENT_2) {
      if (repentanceStage) {
        if (visitedDownpour1 || visitedDross1) {
          // From Downpour 2 to Downpour 1.
          return LevelStage.BASEMENT_1;
        }

        // From Downpour 2 to Basement 2.
        return LevelStage.BASEMENT_2;
      }

      // From Basement 2 to Basement 1.
      return LevelStage.BASEMENT_1;
    }

    if (stage === LevelStage.CAVES_1) {
      if (repentanceStage) {
        if (visitedDownpour2 || visitedDross2) {
          // From Mines 1 to Downpour 1.
          return LevelStage.BASEMENT_2;
        }

        // From Mines 1 to Caves 1.
        return LevelStage.CAVES_1;
      }

      // From Caves 1 to Basement 2.
      return LevelStage.BASEMENT_2;
    }

    if (stage === LevelStage.CAVES_2) {
      if (repentanceStage) {
        if (visitedMines1 || visitedAshpit1) {
          // From Mines 2 to Mines 1.
          return LevelStage.CAVES_1;
        }

        // From Mines 2 to Caves 2.
        return LevelStage.CAVES_2;
      }

      // From Caves 2 to Caves 1.
      return LevelStage.CAVES_1;
    }

    if (stage === LevelStage.DEPTHS_1) {
      if (repentanceStage) {
        if (visitedMines2 || visitedAshpit2) {
          // From Mausoleum 1 to Mines 2.
          return LevelStage.CAVES_2;
        }

        // From Mausoleum 1 to Depths 1.
        return LevelStage.DEPTHS_1;
      }

      // From Depths 1 to Caves 2.
      return LevelStage.CAVES_2;
    }

    if (stage === LevelStage.DEPTHS_2) {
      if (repentanceStage) {
        // From Mausoleum 2 to Depths 2.
        return LevelStage.DEPTHS_2;
      }

      // From Depths 2 to Depths 1.
      return LevelStage.DEPTHS_1;
    }

    return asNumber(stage) - 1;
  }

  /**
   * Helper function to get all of the stages that a player has visited thus far on this run.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.STAGE_HISTORY`.
   *
   * @public
   */
  @Exported
  public getStageHistory(): readonly StageHistoryEntry[] {
    return v.run.stageHistory;
  }

  /**
   * Helper function to check if a player has previous visited a particular stage (or stage + stage
   * type combination) on this run.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.STAGE_HISTORY`.
   *
   * @param stage The stage to check for.
   * @param stageType Optional. If provided, will check for a specific stage and stage type
   *                  combination.
   */
  @Exported
  public hasVisitedStage(stage: LevelStage, stageType?: StageType): boolean {
    if (stageType === undefined) {
      return v.run.stageHistory.some(
        (stageHistoryEntry) => stageHistoryEntry.stage === stage,
      );
    }

    return v.run.stageHistory.some(
      (stageHistoryEntry) =>
        stageHistoryEntry.stage === stage &&
        stageHistoryEntry.stageType === stageType,
    );
  }
}
