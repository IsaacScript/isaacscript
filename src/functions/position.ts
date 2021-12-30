import { DISTANCE_OF_GRID_TILE } from "../constants";
import { anyEntityCloserThan, getEffects } from "./entity";
import { getPlayerCloserThan } from "./player";

/**
 * Helper function to get a room position that is not overlapping with a grid entity, a heaven door,
 * or a player. The `Room.FindFreePickupSpawnPosition()` function will return locations that overlap
 * with heaven doors and partially overlap with players, if the thing being spawned is bigger than a
 * tile (like a Blood Donation Machine). Use this function instead if you want to account for those
 * specific situations.
 *
 * @param startingPosition The position to start searching from. If this position is not overlapping
 * with anything, then it will be returned.
 * @param avoidActiveEntities Optional. False by default.
 */
export function findFreePosition(
  startingPosition: Vector,
  avoidActiveEntities = false,
): Vector {
  const game = Game();
  const room = game.GetRoom();
  const heavenDoors = getEffects(
    EffectVariant.HEAVEN_LIGHT_DOOR,
    HeavenLightDoorSubType.HEAVEN_DOOR,
  );

  for (let i = 0; i < 100; i++) {
    const position = room.FindFreePickupSpawnPosition(
      startingPosition,
      i,
      avoidActiveEntities,
    );

    const closePlayer = getPlayerCloserThan(position, DISTANCE_OF_GRID_TILE);
    if (closePlayer !== undefined) {
      continue;
    }

    const isCloseHeavenDoor = anyEntityCloserThan(
      heavenDoors,
      position,
      DISTANCE_OF_GRID_TILE,
    );
    if (isCloseHeavenDoor) {
      continue;
    }

    return position;
  }

  // We failed to find a free position in N iterations
  return room.FindFreePickupSpawnPosition(startingPosition);
}
