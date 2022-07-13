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

  setStage(
    customStage.baseStage as LevelStage,
    customStage.baseStageType as StageType,
  );

  // Now, we need to pick a custom room for each vanilla room.
  let usedGotoCommand = false;
  for (const room of getRooms()) {
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

    const randomRoom = getRandomCustomStageRoom(
      roomsMetadata,
      startSeed,
      verbose,
    );

    let newRoomData = customStageCachedRoomData.get(randomRoom.variant);
    if (newRoomData === undefined) {
      // We need the room data for this room. We can leverage the "goto" console command to load it
      // into the "debug" slot. This is convenient because we do not actually have to travel to the
      // room.
      usedGotoCommand = true;
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

  if (usedGotoCommand) {
    // If we do nothing, we will warp to the debug room several frames from now. Cancel the warp to
    // the debug room by initiating a room transition to the room we are already in. (We assume that
    // since we just warped to a new floor, we will be in the starting room.)
    game.StartRoomTransition(
      startingRoomGridIndex,
      Direction.NO_DIRECTION,
      RoomTransitionAnim.FADE,
    );
  }
}
