// eslint-disable-next-line isaacscript/complete-sentences-jsdoc
/**
 * These are helper functions relating to creating custom stages with the built-in standard library.
 * For more information about custom stages, see the [main
 * documentation page](https://isaacscript.github.io/main/custom-stages).
 *
 * @module
 */

import {
  EntityType,
  LevelStage,
  RoomShape,
  RoomType,
  StageType,
} from "isaac-typescript-definitions";
import { reorderedCallbacksSetStageInternal } from "../../callbacks/reorderedCallbacks";
import { game } from "../../core/cachedClasses";
import { getEntityIDFromConstituents } from "../../functions/entities";
import { logError } from "../../functions/log";
import { newRNG } from "../../functions/rng";
import {
  getRoomDataForTypeVariant,
  getRoomsInGrid,
} from "../../functions/rooms";
import { setStage } from "../../functions/stage";
import { CustomStage } from "../../interfaces/private/CustomStage";
import { getRandomCustomStageRoom } from "./customStageUtils";
import v, {
  customBossPNGPaths,
  customStageCachedRoomData,
  customStagesMap,
} from "./v";

export const DEFAULT_BASE_STAGE = LevelStage.BASEMENT_2;
export const DEFAULT_BASE_STAGE_TYPE = StageType.ORIGINAL;

export const INVALID_STAGE_VALUE = -1 as LevelStage;

/**
 * Helper function to warp to a custom stage/level.
 *
 * Custom stages/levels must first be defined in the "tsconfig.json" file. See the documentation for
 * more details: https://isaacscript.github.io/main/custom-stages/
 *
 * @param name The name of the custom stage, corresponding to what is in the "tsconfig.json" file.
 * @param firstFloor Optional. Whether to go to the first floor or the second floor. For example, if
 *                   you have a custom stage emulating Caves, then the first floor would be Caves 1,
 *                   and the second floor would be Caves 2. Default is true.
 * @param verbose Optional. Whether to log additional information about the rooms that are chosen.
 *                Default is false.
 */
export function setCustomStage(
  name: string,
  firstFloor = true,
  verbose = false,
): void {
  const customStage = customStagesMap.get(name);
  if (customStage === undefined) {
    error(
      `Failed to set the custom stage of "${name}" because it was not found in the custom stages map. (Try restarting IsaacScript / recompiling the mod / restarting the game, and try again. If that does not work, you probably forgot to define it in your "tsconfig.json" file.) See the website for more details on how to set up custom stages.`,
    );
  }

  const level = game.GetLevel();
  const stage = level.GetStage();
  const seeds = game.GetSeeds();
  const startSeed = seeds.GetStartSeed();
  const rng = newRNG(startSeed);

  v.run.currentCustomStage = customStage;
  v.run.firstFloor = firstFloor;

  // Before changing the stage, we have to revert the bugged stage, if necessary. This prevents the
  // bug where the backdrop will not spawn.
  if (stage === INVALID_STAGE_VALUE) {
    level.SetStage(LevelStage.BASEMENT_1, StageType.ORIGINAL);
  }

  let baseStage: int =
    customStage.baseStage === undefined
      ? DEFAULT_BASE_STAGE
      : customStage.baseStage;
  if (!firstFloor) {
    baseStage++;
  }

  const baseStageType =
    customStage.baseStageType === undefined
      ? DEFAULT_BASE_STAGE_TYPE
      : (customStage.baseStageType as StageType);

  const reseed = (stage as int) >= baseStage;

  setStage(baseStage as LevelStage, baseStageType, reseed);

  setStageRoomsData(customStage, rng, verbose);

  // Set the stage to an invalid value, which will prevent the walls and floors from loading.
  // Furthermore, we must use `StageType.WRATH_OF_THE_LAMB` instead of `StageType.ORIGINAL` or else
  // the walls will not render properly. DeadInfinity suspects that this might be because it is
  // trying to use the Dark Room's backdrop (instead of The Chest).
  const targetStage = INVALID_STAGE_VALUE;
  const targetStageType = StageType.WRATH_OF_THE_LAMB;
  level.SetStage(targetStage, targetStageType);
  reorderedCallbacksSetStageInternal(targetStage, targetStageType);

  // We must reload the current room in order for the `Level.SetStage` method to take effect.
  // Furthermore, we need to cancel the queued warp to the `GridRoom.DEBUG` room. We can accomplish
  // both of these things by initiating a room transition to an arbitrary room. However, we rely on
  // the parent function to do this, since for normal purposes, we need to initiate a room
  // transition for the pixelation effect.
}

/** Pick a custom room for each vanilla room. */
function setStageRoomsData(
  customStage: CustomStage,
  rng: RNG,
  verbose: boolean,
) {
  const level = game.GetLevel();
  const startingRoomGridIndex = level.GetStartingRoomIndex();

  for (const room of getRoomsInGrid()) {
    // The starting floor of each room should stay empty.
    if (room.SafeGridIndex === startingRoomGridIndex) {
      continue;
    }

    if (room.Data === undefined) {
      continue;
    }

    const roomType = room.Data.Type;
    const roomShapeMap = customStage.roomTypeMap.get(roomType);
    if (roomShapeMap === undefined) {
      // Only show errors for non-default room types. (By default, we won't replace shops and other
      // special rooms.)
      if (roomType === RoomType.DEFAULT) {
        logError(
          `Failed to find any custom rooms for RoomType.${RoomType[roomType]} (${roomType}) for custom stage: ${customStage.name}`,
        );
      }
      continue;
    }

    const roomShape = room.Data.Shape;
    const roomDoorSlotFlagMap = roomShapeMap.get(roomShape);
    if (roomDoorSlotFlagMap === undefined) {
      logError(
        `Failed to find any custom rooms for RoomType.${RoomType[roomType]} (${roomType}) + RoomShape.${RoomShape[roomShape]} (${roomShape}) for custom stage: ${customStage.name}`,
      );
      continue;
    }

    const doorSlotFlags = room.Data.Doors;
    const roomsMetadata = roomDoorSlotFlagMap.get(doorSlotFlags);
    if (roomsMetadata === undefined) {
      logError(
        `Failed to find any custom rooms for RoomType.${RoomType[roomType]} (${roomType}) + RoomShape.${RoomShape[roomShape]} (${roomShape}) + DoorSlotFlags ${doorSlotFlags} for custom stage: ${customStage.name}`,
      );
      continue;
    }

    const randomRoom = getRandomCustomStageRoom(roomsMetadata, rng, verbose);

    let newRoomData = customStageCachedRoomData.get(randomRoom.variant);
    if (newRoomData === undefined) {
      // We do not already have the room data for this room cached.
      newRoomData = getRoomDataForTypeVariant(
        roomType,
        randomRoom.variant,
        false,
      );
      if (newRoomData === undefined) {
        logError(
          `Failed to get the room data for room variant ${randomRoom.variant} for custom stage: ${customStage.name}`,
        );
        continue;
      }

      customStageCachedRoomData.set(randomRoom.variant, newRoomData);
    }

    room.Data = newRoomData;
  }
}

/**
 * By default, unknown bosses will be drawn on the boss "versus" screen as "???". If your custom
 * stage has custom bosses, you can use this function to register the corresponding graphic file
 * files for them.
 *
 * For reference:
 * - The vanilla name sprite for Monstro is located at "C:\Program Files
 *   (x86)\Steam\steamapps\common\The Binding of Isaac
 *   Rebirth\resources\gfx\ui\boss\bossname_20.0_monstro.png".
 * - The vanilla portrait sprite for Monstro is located at "C:\Program Files
 *   (x86)\Steam\steamapps\common\The Binding of Isaac
 *   Rebirth\resources\gfx\ui\boss\portrait_20.0_monstro.png".
 *
 * (Note that boss metadata like this cannot be specified with the rest of the custom stage metadata
 * in the "tsconfig.json" file because there is not a way to retrieve the name of an entity at
 * run-time.)
 *
 * @param entityType The entity type of the custom boss.
 * @param variant The variant of the custom boss.
 * @param subType The sub-type of the custom boss.
 * @param namePNGPath The full path to the PNG file that contains the name of the boss that will be
 *                    displayed on the top of the boss "versus" screen.
 * @param portraitPNGPath The full path to the PNG file that contains the portrait of the boss that
 *                        will be displayed on the right side of the boss "versus" screen.
 */
export function registerCustomBoss(
  entityType: EntityType,
  variant: int,
  subType: int,
  namePNGPath: string,
  portraitPNGPath: string,
): void {
  const entityID = getEntityIDFromConstituents(entityType, variant, subType);
  customBossPNGPaths.set(entityID, [namePNGPath, portraitPNGPath]);
}

/**
 * Helper function to disable the custom stage. This is typically called before taking the player to
 * a vanilla floor.
 */
export function disableCustomStage(): void {
  v.run.currentCustomStage = null;
}
