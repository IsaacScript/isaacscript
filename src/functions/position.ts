import { DISTANCE_OF_GRID_TILE } from "../constants";
import { anyEntityCloserThan, getEffects } from "./entity";
import { getPlayerCloserThan } from "./player";

/**
 * Helper function to get a room position that is not overlapping with a grid entity, a heaven door,
 * or a player. The `Room.FindFreePickupSpawnPosition()` function will return locations that are
 * overlap with heaven doors and players, so use this function instead if you want to account for
 * those specific situations.
 */
export function findFreePosition(startingPosition: Vector): Vector {
  const game = Game();
  const room = game.GetRoom();
  const heavenDoors = getEffects(
    EffectVariant.HEAVEN_LIGHT_DOOR,
    HeavenLightDoorSubType.HEAVEN_DOOR,
  );

  for (let i = 0; i < 100; i++) {
    const position = room.FindFreePickupSpawnPosition(startingPosition, i);

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
