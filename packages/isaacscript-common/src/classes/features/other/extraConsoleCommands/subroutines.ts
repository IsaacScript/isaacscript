import type { Direction, EntityType } from "isaac-typescript-definitions";
import {
  GridEntityType,
  GridRoom,
  RoomType,
} from "isaac-typescript-definitions";
import { game } from "../../../../core/cachedClasses";
import { HealthType } from "../../../../enums/HealthType";
import { directionToVector } from "../../../../functions/direction";
import { spawnGridEntity } from "../../../../functions/gridEntities";
import {
  getRoomAdjacentGridIndexes,
  getRoomGridIndexesForType,
} from "../../../../functions/levelGrid";
import {
  logAllEntities,
  logAllGridEntities,
} from "../../../../functions/logEntities";
import { addPlayerHealthType } from "../../../../functions/playerHealth";
import { getRoomData, getRoomDescriptor } from "../../../../functions/roomData";
import { changeRoom } from "../../../../functions/rooms";
import { parseIntSafe } from "../../../../functions/types";
import { ROOM_TYPE_NAMES } from "../../../../objects/roomTypeNames";

const DEFAULT_MOVE_UNITS = 0.5;

export function addHeart(params: string, healthType: HealthType): void {
  let numHearts = healthType === HealthType.MAX_HEARTS ? 2 : 1;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print("That is an invalid amount of hearts to add.");
      return;
    }

    numHearts = num;
  }

  const player = Isaac.GetPlayer();
  addPlayerHealthType(player, healthType, numHearts);
}

export function devilAngel(useDevil: boolean): void {
  const level = game.GetLevel();

  const devilAngelRoomData = getRoomData(GridRoom.DEVIL);
  if (devilAngelRoomData !== undefined) {
    const roomType = devilAngelRoomData.Type;
    const conflictingType = useDevil ? RoomType.ANGEL : RoomType.DEVIL;
    if (roomType === conflictingType) {
      // Delete the room data, which will allow the `Level.InitializeDevilAngelRoom` method to work.
      const roomDescriptor = getRoomDescriptor(GridRoom.DEVIL);
      roomDescriptor.Data = undefined;
    }
  }

  if (useDevil) {
    level.InitializeDevilAngelRoom(false, true);
  } else {
    level.InitializeDevilAngelRoom(true, false);
  }

  changeRoom(GridRoom.DEVIL);
}

export function listEntities(
  params: string,
  includeBackgroundEffects: boolean,
): void {
  let entityTypeFilter: EntityType | undefined;
  if (params !== "") {
    entityTypeFilter = parseIntSafe(params);
    if (entityTypeFilter === undefined) {
      print("That is an invalid entity type to filter by.");
      return;
    }
  }

  logAllEntities(includeBackgroundEffects, entityTypeFilter);
  print('Logged the entities in the room to the "log.txt" file.');
}

export function listGridEntities(params: string, includeWalls: boolean): void {
  let gridEntityTypeFilter: GridEntityType | undefined;
  if (params !== "") {
    gridEntityTypeFilter = parseIntSafe(params);
    if (gridEntityTypeFilter === undefined) {
      print("That is an invalid grid entity type to filter by.");
      return;
    }
  }

  logAllGridEntities(includeWalls, gridEntityTypeFilter);
  print('Logged the grid entities in the room to the "log.txt" file.');
}

export function movePlayer(params: string, direction: Direction): void {
  let amount = DEFAULT_MOVE_UNITS;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print("That is an invalid amount of units to move.");
      return;
    }

    amount = num;
  }

  const player = Isaac.GetPlayer();
  const vector = directionToVector(direction);
  const modifiedVector = vector.mul(amount);
  player.Position = player.Position.add(modifiedVector);
}

export function spawnTrapdoorOrCrawlSpace(trapdoor: boolean): void {
  const room = game.GetRoom();
  const player = Isaac.GetPlayer();
  const position = room.FindFreeTilePosition(player.Position, 0);
  const gridEntityType = trapdoor
    ? GridEntityType.TRAPDOOR
    : GridEntityType.CRAWL_SPACE;

  spawnGridEntity(gridEntityType, position);
}

export function warpToRoomType(roomType: RoomType): void {
  const roomTypeName = ROOM_TYPE_NAMES[roomType];
  const gridIndexes = getRoomGridIndexesForType(roomType);
  const firstGridIndex = gridIndexes[0];
  if (firstGridIndex === undefined) {
    print(`There are no ${roomTypeName}s on this floor.`);
    return;
  }

  changeRoom(firstGridIndex);
  print(`Warped to room type: ${roomTypeName} (${roomType})`);
}

export function warpNextToRoomType(roomType: RoomType): void {
  const roomTypeName = ROOM_TYPE_NAMES[roomType];
  const gridIndexes = getRoomGridIndexesForType(roomType);
  const firstGridIndex = gridIndexes[0];
  if (firstGridIndex === undefined) {
    print(`There are no ${roomTypeName}s on this floor.`);
    return;
  }

  const adjacentRoomGridIndexes = getRoomAdjacentGridIndexes(firstGridIndex);

  for (const [_doorSlot, roomGridIndex] of adjacentRoomGridIndexes) {
    const roomData = getRoomData(roomGridIndex);
    if (roomData !== undefined && roomData.Type === RoomType.DEFAULT) {
      changeRoom(roomGridIndex);
      print(`Warped next to room type: ${roomTypeName} (${roomType})`);
      return;
    }
  }

  print(
    `Failed to find the room next to room type: ${roomTypeName} (${roomType})`,
  );
}
