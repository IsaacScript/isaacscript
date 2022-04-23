import { game } from "../../cachedClasses";
import { HealthType } from "../../enums/HealthType";
import { spawnGridWithVariant } from "../../functions/gridEntity";
import { logEntities, logGridEntities } from "../../functions/log";
import { addPlayerHealthType } from "../../functions/playerHealth";
import { getRoomData, getRoomDescriptor } from "../../functions/roomData";
import { changeRoom, getRoomGridIndexesForType } from "../../functions/rooms";
import { printConsole } from "../../functions/utils";
import { directionToVector } from "../../functions/vector";
import {
  DEFAULT_ROOM_TYPE_NAME,
  ROOM_TYPE_NAMES,
} from "../../objects/roomTypeNames";

const DEFAULT_MOVE_UNITS = 0.5;

export function addHeart(params: string, healthType: HealthType): void {
  let numHearts = healthType === HealthType.MAX_HEARTS ? 2 : 1;
  if (params !== "") {
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of hearts to add.");
      return;
    }

    numHearts = num;
  }

  const player = Isaac.GetPlayer();
  addPlayerHealthType(player, healthType, numHearts);
}

export function devilAngel(useDevil: boolean): void {
  const level = game.GetLevel();

  const devilAngelRoomData = getRoomData(GridRooms.ROOM_DEVIL_IDX);
  if (devilAngelRoomData !== undefined) {
    const roomType = devilAngelRoomData.Type;
    const conflictingType = useDevil
      ? RoomType.ROOM_ANGEL
      : RoomType.ROOM_DEVIL;
    if (roomType === conflictingType) {
      // Delete the room data, which will allow the "Level.InitializeDevilAngelRoom" method to work
      const roomDescriptor = getRoomDescriptor(GridRooms.ROOM_DEVIL_IDX);
      roomDescriptor.Data = undefined;
    }
  }

  if (useDevil) {
    level.InitializeDevilAngelRoom(false, true);
  } else {
    level.InitializeDevilAngelRoom(true, false);
  }

  changeRoom(GridRooms.ROOM_DEVIL_IDX);
}

export function listEntities(
  params: string,
  includeBackgroundEffects: boolean,
): void {
  let entityTypeFilter: int | undefined;
  if (params !== "") {
    entityTypeFilter = tonumber(params);
    if (entityTypeFilter === undefined) {
      printConsole("That is an invalid entity type to filter by.");
      return;
    }
  }

  logEntities(includeBackgroundEffects, entityTypeFilter);
  printConsole('Logged the entities in the room to the "log.txt" file.');
}

export function listGridEntities(params: string, includeWalls: boolean): void {
  let gridEntityTypeFilter: int | undefined;
  if (params !== "") {
    gridEntityTypeFilter = tonumber(params);
    if (gridEntityTypeFilter === undefined) {
      printConsole("That is an invalid grid entity type to filter by.");
      return;
    }
  }

  logGridEntities(includeWalls, gridEntityTypeFilter);
  printConsole('Logged the grid entities in the room to the "log.txt" file.');
}

export function movePlayer(params: string, direction: Direction): void {
  let amount = DEFAULT_MOVE_UNITS;
  if (params !== "") {
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of units to move.");
      return;
    }

    amount = num;
  }

  const player = Isaac.GetPlayer();
  const vector = directionToVector(direction);
  const modifiedVector = vector.mul(amount);
  player.Position = player.Position.add(modifiedVector);
}

export function spawnTrapdoorOrCrawlspace(trapdoor: boolean): void {
  const room = game.GetRoom();
  const player = Isaac.GetPlayer();
  const position = room.FindFreeTilePosition(player.Position, 0);
  const gridIndex = room.GetGridIndex(position);
  const gridEntityType = trapdoor
    ? GridEntityType.GRID_TRAPDOOR
    : GridEntityType.GRID_STAIRS;

  spawnGridWithVariant(gridEntityType, 0, gridIndex);
}

export function warpToRoomType(roomType: RoomType): void {
  const roomTypeName = ROOM_TYPE_NAMES[roomType];
  if (roomTypeName === undefined || roomTypeName === DEFAULT_ROOM_TYPE_NAME) {
    printConsole(`Invalid room type: ${roomType}`);
  }

  const gridIndexes = getRoomGridIndexesForType(roomType);
  if (gridIndexes.length === 0) {
    printConsole(`There are no ${roomTypeName}s on this floor.`);
    return;
  }

  const firstGridIndex = gridIndexes[0];
  changeRoom(firstGridIndex);
  printConsole(`Warped to room type: ${roomTypeName} (${roomType})`);
}
