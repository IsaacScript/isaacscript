import { GridCollisionClass } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { TrapdoorAnimation } from "../../enums/private/TrapdoorAnimation";
import { getRoomListIndex } from "../../functions/roomData";
import { isVector } from "../../functions/vector";
import { CustomTrapdoorDescription } from "../../interfaces/private/CustomTrapdoorDescription";
import { spawnCustomGridEntity } from "../customGridEntity";
import { GridEntityTypeCustom } from "./constants";
import { shouldTrapdoorSpawnOpen } from "./openClose";
import v from "./v";

export function spawnCustomTrapdoorToDestination(
  gridIndexOrPosition: int | Vector,
  destination: CustomTrapdoorDestination,
  anm2Path: string,
  spawnOpen?: boolean,
): GridEntity {
  const room = game.GetRoom();
  const roomFrameCount = room.GetFrameCount();
  const roomListIndex = getRoomListIndex();
  const gridIndex = isVector(gridIndexOrPosition)
    ? room.GetGridIndex(gridIndexOrPosition)
    : gridIndexOrPosition;

  const gridEntity = spawnCustomGridEntity(
    GridEntityTypeCustom.TRAPDOOR_CUSTOM,
    gridIndexOrPosition,
    GridCollisionClass.NONE,
    anm2Path,
    TrapdoorAnimation.OPENED,
  );

  const firstSpawn = roomFrameCount !== 0;
  const open =
    spawnOpen === undefined
      ? shouldTrapdoorSpawnOpen(gridEntity, firstSpawn)
      : spawnOpen;

  const roomTrapdoorMap = v.level.trapdoors.getAndSetDefault(roomListIndex);
  const customTrapdoorDescription: CustomTrapdoorDescription = {
    open,
    destination,
    firstSpawn,
  };
  roomTrapdoorMap.set(gridIndex, customTrapdoorDescription);

  const sprite = gridEntity.GetSprite();
  const animation = open ? TrapdoorAnimation.OPENED : TrapdoorAnimation.CLOSED;
  sprite.Play(animation, true);

  return gridEntity;
}
