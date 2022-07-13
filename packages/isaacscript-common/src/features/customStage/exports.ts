import {
  Direction,
  GridRoom,
  LevelStage,
  RoomShape,
  RoomTransitionAnim,
  RoomType,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../../cachedClasses";
import { logError } from "../../functions/log";
import { newRNG } from "../../functions/rng";
import { getRoomData } from "../../functions/roomData";
import { getRooms } from "../../functions/rooms";
import { getGotoCommand, setStage } from "../../functions/stage";
import { getRandomCustomStageRoom } from "./util";
import { customStageCachedRoomData, customStagesMap } from "./v";

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

  setStage(
    customStage.baseStage as LevelStage,
    customStage.baseStageType as StageType,
  );

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

  // Set the stage to an invalid value, which will prevent the walls and floors from loading.
  level.SetStage(-1 as LevelStage, StageType.ORIGINAL);

  // We must reload the current room in order for the `Level.SetStage` method to take effect.
  // Furthermore, we need to cancel the queued warp to the `GridRoom.DEBUG` room. We can accomplish
  // both of these things by initiating a room transition to the starting room of the floor. (We
  // assume that since we just warped to a new floor, we are already in the starting room.)
  game.StartRoomTransition(
    startingRoomGridIndex,
    Direction.NO_DIRECTION,
    RoomTransitionAnim.FADE,
  );
}
