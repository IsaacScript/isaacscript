import {
  Direction,
  EntityType,
  GridRoom,
  LevelStage,
  RoomShape,
  RoomTransitionAnim,
  RoomType,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../../cachedClasses";
import { reorderedCallbacksSetStage } from "../../callbacks/reorderedCallbacks";
import { getEntityIDFromConstituents } from "../../functions/entity";
import { log, logError } from "../../functions/log";
import { movePlayersToCenter } from "../../functions/playerCenter";
import { newRNG } from "../../functions/rng";
import { getRoomData } from "../../functions/roomData";
import { getRooms } from "../../functions/rooms";
import { getGotoCommand, setStage } from "../../functions/stage";
import { runNextRoom } from "../runNextRoom";
import { getRandomCustomStageRoom } from "./util";
import v, {
  customBossPNGPaths,
  customStageCachedRoomData,
  customStagesMap,
} from "./v";
import { playVersusScreenAnimation } from "./versusScreen";

/**
 * Helper function to warp to a custom stage/level.
 *
 * Custom stages/levels must first be defined in the "tsconfig.json" file. See the documentation for
 * more details: https://isaacscript.github.io/main/custom-stages/
 */
export function setCustomStage(name: string, verbose = false): void {
  const customStage = customStagesMap.get(name);
  if (customStage === undefined) {
    error(
      `Failed to set the custom stage of "${name}" because it was not found in the custom stages map. (This means that you probably forgot to define it in your "tsconfig.json" file.) See the website for more details on how to set up custom stages.`,
    );
  }

  const level = game.GetLevel();
  const startingRoomGridIndex = level.GetStartingRoomIndex();
  const seeds = game.GetSeeds();
  const startSeed = seeds.GetStartSeed();
  const rng = newRNG(startSeed);

  v.run.currentCustomStage = customStage;

  const baseStage =
    customStage.baseStage === undefined
      ? LevelStage.BASEMENT_2
      : (customStage.baseStage as LevelStage);
  const baseStageType =
    customStage.baseStageType === undefined
      ? StageType.ORIGINAL
      : (customStage.baseStageType as StageType);
  setStage(baseStage, baseStageType);

  // Now, we need to pick a custom room for each vanilla room.
  for (const room of getRooms()) {
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
          `Failed to find any custom rooms for RoomType.${RoomType[roomType]} (${roomType}) for custom stage: ${name}`,
        );
      }
      continue;
    }

    const roomShape = room.Data.Shape;
    const roomDoorSlotFlagMap = roomShapeMap.get(roomShape);
    if (roomDoorSlotFlagMap === undefined) {
      logError(
        `Failed to find any custom rooms for RoomType.${RoomType[roomType]} (${roomType}) + RoomShape.${RoomShape[roomShape]} (${roomShape}) for custom stage: ${name}`,
      );
      continue;
    }

    const doorSlotFlags = room.Data.Doors;
    const roomsMetadata = roomDoorSlotFlagMap.get(doorSlotFlags);
    if (roomsMetadata === undefined) {
      logError(
        `Failed to find any custom rooms for RoomType.${RoomType[roomType]} (${roomType}) + RoomShape.${RoomShape[roomShape]} (${roomShape}) + DoorSlotFlags ${doorSlotFlags} for custom stage: ${name}`,
      );
      continue;
    }

    const randomRoom = getRandomCustomStageRoom(roomsMetadata, rng, verbose);

    let newRoomData = customStageCachedRoomData.get(randomRoom.variant);
    if (newRoomData === undefined) {
      // We need the room data for this room. We can leverage the "goto" console command to load it
      // into the "debug" slot. This is convenient because we do not actually have to travel to the
      // room.
      const command = getGotoCommand(roomType, randomRoom.variant);
      Isaac.ExecuteCommand(command);
      newRoomData = getRoomData(GridRoom.DEBUG);
      if (newRoomData === undefined) {
        logError(
          `Failed to get the room data for room variant ${randomRoom.variant} for custom stage: ${name}`,
        );
        continue;
      }
      customStageCachedRoomData.set(randomRoom.variant, newRoomData);
    }

    room.Data = newRoomData;
  }

  // Set the stage to an invalid value, which will prevent the walls and floors from loading. We
  // must use `StageType.WRATH_OF_THE_LAMB` instead of `StageType.ORIGINAL` or else the walls will
  // not render properly. DeadInfinity suspects that this might be because it is trying to use the
  // Dark Room's backdrop (instead of The Chest).
  const stage = -1 as LevelStage;
  const stageType = StageType.WRATH_OF_THE_LAMB;
  level.SetStage(stage, stageType);
  reorderedCallbacksSetStage(stage, stageType);

  // We must reload the current room in order for the `Level.SetStage` method to take effect.
  // Furthermore, we need to cancel the queued warp to the `GridRoom.DEBUG` room. We can accomplish
  // both of these things by initiating a room transition to the starting room of the floor. (We
  // assume that since we just warped to a new floor, we are already in the starting room.)
  game.StartRoomTransition(
    startingRoomGridIndex,
    Direction.NO_DIRECTION,
    RoomTransitionAnim.FADE,
  );

  // We do more setup once the room is reloaded from the transition.
  runNextRoom(postRoomTransition);
}

function postRoomTransition() {
  // After the room transition, the players will be placed next to a door, but they should be in the
  // center of the room to emulate what happens on a vanilla stage.
  movePlayersToCenter();
}

export function setCustomStageDebug(): void {
  const customStage = v.run.currentCustomStage;
  if (customStage === null) {
    log("No custom stage is currently loaded.");
    return;
  }

  playVersusScreenAnimation(customStage, true);
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
