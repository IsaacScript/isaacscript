import {
  GameStateFlag,
  GridRoom,
  LevelStage,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { hasVisitedStage } from "../features/stageHistory";
import { areFeaturesInitialized } from "../featuresInitialized";
import { getRoomGridIndex } from "./roomData";
import {
  calculateStageType,
  calculateStageTypeRepentance,
  onRepentanceStage,
} from "./stage";

/**
 * Helper function to get the stage that a trapdoor or heaven door would take the player to, based
 * on the current stage, room, and game state flags.
 *
 * Note that in non-upgraded mods, this function will not account for the player having visited
 * Repentance floors in The Ascent. (Handling this requires stateful tracking as the player
 * progresses through the run.)
 */
export function getNextStage(): LevelStage {
  const level = game.GetLevel();
  const backwardsPath = game.GetStateFlag(GameStateFlag.BACKWARDS_PATH);
  const mausoleumHeartKilled = game.GetStateFlag(
    GameStateFlag.MAUSOLEUM_HEART_KILLED,
  );
  const stage = level.GetStage();
  const repentanceStage = onRepentanceStage();
  const roomGridIndex = getRoomGridIndex();

  // First, handle the special case of being on the backwards path.
  if (backwardsPath) {
    return getNextStageBackwardsPath(stage, repentanceStage);
  }

  // Second, handle the special case of being in a specific off-grid room.
  switch (roomGridIndex) {
    // -8
    case GridRoom.BLUE_WOMB: {
      return LevelStage.BLUE_WOMB;
    }

    // -9
    case GridRoom.THE_VOID: {
      return LevelStage.THE_VOID;
    }

    // -10
    case GridRoom.SECRET_EXIT: {
      if (repentanceStage) {
        // e.g. From Downpour 2 to Mines 1, etc.
        return (stage as int) + 1;
      }

      if (stage === LevelStage.DEPTHS_2) {
        // From Depths 2 to Mausoleum 2 through the strange door.
        return LevelStage.DEPTHS_2;
      }

      // e.g. From Basement 1 to Downpour 1, from Basement 2 to Downpour 2, etc.
      return stage;
    }
  }

  // 2
  if (repentanceStage && stage === LevelStage.BASEMENT_2) {
    // From Downpour 2 to Caves 2.
    return LevelStage.CAVES_2;
  }

  // 4
  if (repentanceStage && stage === LevelStage.CAVES_2) {
    // From Mines 2 to Depths 2.
    return LevelStage.DEPTHS_2;
  }

  // 6
  if (repentanceStage && stage === LevelStage.DEPTHS_2) {
    if (mausoleumHeartKilled) {
      // From Mausoleum 2 to Corpse 1.
      return LevelStage.WOMB_1;
    }

    // From Mausoleum 2 to Womb 2.
    return LevelStage.WOMB_2;
  }

  // 8
  if (stage === LevelStage.WOMB_2) {
    // From Womb 2 to Sheol or Cathedral.
    return LevelStage.SHEOL_CATHEDRAL;
  }

  // 11
  if (stage === LevelStage.DARK_ROOM_CHEST) {
    // - The Chest goes to The Chest.
    // - The Dark Room goes to the Dark Room.
    return LevelStage.DARK_ROOM_CHEST;
  }

  // 12
  if (stage === LevelStage.THE_VOID) {
    // The Void goes to The Void.
    return LevelStage.THE_VOID;
  }

  // By default, go to the next floor.
  return (stage as int) + 1;
}

function getNextStageBackwardsPath(
  stage: LevelStage,
  repentanceStage: boolean,
): LevelStage {
  // If we have no stage history to work with, then default to the previous stage.
  if (!areFeaturesInitialized()) {
    return (stage as int) - 1;
  }

  const visitedDownpour1 = hasVisitedStage(
    LevelStage.BASEMENT_1,
    StageType.REPENTANCE,
  );
  const visitedDross1 = hasVisitedStage(
    LevelStage.BASEMENT_1,
    StageType.REPENTANCE_B,
  );
  const visitedDownpour2 = hasVisitedStage(
    LevelStage.BASEMENT_2,
    StageType.REPENTANCE,
  );
  const visitedDross2 = hasVisitedStage(
    LevelStage.BASEMENT_2,
    StageType.REPENTANCE_B,
  );
  const visitedMines1 = hasVisitedStage(
    LevelStage.CAVES_1,
    StageType.REPENTANCE,
  );
  const visitedAshpit1 = hasVisitedStage(
    LevelStage.CAVES_1,
    StageType.REPENTANCE_B,
  );
  const visitedMines2 = hasVisitedStage(
    LevelStage.DEPTHS_2,
    StageType.REPENTANCE,
  );
  const visitedAshpit2 = hasVisitedStage(
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

  return (stage as int) - 1;
}

/**
 * Helper function to get the stage type that a trapdoor or heaven door would take the player to,
 * based on the current stage, room, and game state flags.
 *
 * @param upwards Whether or not the player should go up to Cathedral in the case of being on Womb
 *                2. Default is false.
 */
export function getNextStageType(upwards = false): StageType {
  const backwardsPath = game.GetStateFlag(GameStateFlag.BACKWARDS_PATH);
  const mausoleumHeartKilled = game.GetStateFlag(
    GameStateFlag.MAUSOLEUM_HEART_KILLED,
  );
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();
  const repentanceStage = onRepentanceStage();
  const roomGridIndex = getRoomGridIndex();
  const nextStage = getNextStage();

  // First, handle the special case of being on the backwards path.
  if (backwardsPath) {
    return getStageTypeBackwardsPath(stage, nextStage, repentanceStage);
  }

  // Second, handle the special case of being in a specific off-grid room.
  if (roomGridIndex === (GridRoom.SECRET_EXIT as int)) {
    return calculateStageTypeRepentance(nextStage);
  }

  if (
    repentanceStage &&
    (stage === LevelStage.BASEMENT_1 || // 1
      stage === LevelStage.CAVES_1 || // 3
      stage === LevelStage.DEPTHS_1 || // 5
      stage === LevelStage.WOMB_1) // 7
  ) {
    return calculateStageTypeRepentance(nextStage);
  }

  if (
    repentanceStage &&
    stage === LevelStage.DEPTHS_2 &&
    mausoleumHeartKilled
  ) {
    return calculateStageTypeRepentance(nextStage);
  }

  // 9
  if (nextStage === LevelStage.BLUE_WOMB) {
    // Blue Womb does not have any alternate floors.
    return StageType.ORIGINAL;
  }

  // 10
  if (nextStage === LevelStage.SHEOL_CATHEDRAL) {
    if (upwards) {
      // Go to Cathedral (10.1).
      return StageType.WRATH_OF_THE_LAMB;
    }

    // Go to Sheol (10.0).
    return StageType.ORIGINAL;
  }

  // 11
  if (nextStage === LevelStage.DARK_ROOM_CHEST) {
    if (stageType === StageType.ORIGINAL) {
      // Sheol (10.0) goes to the Dark Room (11.0).
      return StageType.ORIGINAL;
    }

    // Cathedral (10.1) goes to The Chest (11.1).
    return StageType.WRATH_OF_THE_LAMB;
  }

  // 12
  if (nextStage === LevelStage.THE_VOID) {
    // The Void does not have any alternate floors.
    return StageType.ORIGINAL;
  }

  // 13
  if (nextStage === LevelStage.HOME) {
    // Home does not have any alternate floors.
    return StageType.ORIGINAL;
  }

  return calculateStageType(nextStage);
}

function getStageTypeBackwardsPath(
  stage: LevelStage,
  nextStage: LevelStage,
  repentanceStage: boolean,
): StageType {
  const visitedDownpour1 = hasVisitedStage(
    LevelStage.BASEMENT_1,
    StageType.REPENTANCE,
  );
  const visitedDross1 = hasVisitedStage(
    LevelStage.BASEMENT_1,
    StageType.REPENTANCE_B,
  );
  const visitedDownpour2 = hasVisitedStage(
    LevelStage.BASEMENT_2,
    StageType.REPENTANCE,
  );
  const visitedDross2 = hasVisitedStage(
    LevelStage.BASEMENT_2,
    StageType.REPENTANCE_B,
  );
  const visitedMines1 = hasVisitedStage(
    LevelStage.CAVES_1,
    StageType.REPENTANCE,
  );
  const visitedAshpit1 = hasVisitedStage(
    LevelStage.CAVES_1,
    StageType.REPENTANCE_B,
  );
  const visitedMines2 = hasVisitedStage(
    LevelStage.DEPTHS_2,
    StageType.REPENTANCE,
  );
  const visitedAshpit2 = hasVisitedStage(
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

  return calculateStageType(nextStage);
}
