import {
  EffectVariant,
  HeavenLightDoorSubType,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { DISTANCE_OF_GRID_TILE } from "../core/constants";
import { getEntities } from "./entities";
import { getEffects } from "./entitiesSpecific";
import { getPlayers } from "./playerIndex";
import { getPlayerCloserThan } from "./players";

const MAX_FIND_FREE_POSITION_ATTEMPTS = 100;

export function anyEntityCloserThan(
  entities: readonly Entity[],
  position: Vector,
  distance: int,
): boolean {
  return entities.some(
    (entity) => position.Distance(entity.Position) <= distance,
  );
}

/**
 * Iterates over all players and checks if any player is close enough to the specified position.
 *
 * Note that this function does not consider players with a non-undefined parent, since they are not
 * real players (e.g. the Strawman Keeper).
 */
export function anyPlayerCloserThan(
  position: Vector,
  distance: float,
): boolean {
  const players = getPlayers();
  return players.some(
    (player) => player.Position.Distance(position) <= distance,
  );
}

/**
 * Helper function to get a room position that is not overlapping with a grid entity, a heaven door,
 * or a player. The `Room.FindFreePickupSpawnPosition` method will return locations that overlap
 * with heaven doors and partially overlap with players, if the thing being spawned is bigger than a
 * tile (like a Blood Donation Machine). Use this function instead if you want to account for those
 * specific situations.
 *
 * @param startingPosition The position to start searching from. If this position is not overlapping
 *                         with anything, then it will be returned.
 * @param avoidActiveEntities Optional. Default is false.
 * @param minimumDistance Optional. If specified, will ensure that the randomly generated position
 *                        is equal to or greater than the distance provided.
 */
export function findFreePosition(
  startingPosition: Vector,
  avoidActiveEntities = false,
  minimumDistance?: float,
): Readonly<Vector> {
  const room = game.GetRoom();
  const heavenDoors = getEffects(
    EffectVariant.HEAVEN_LIGHT_DOOR,
    HeavenLightDoorSubType.HEAVEN_DOOR,
  );

  for (
    let initialStep = 0;
    initialStep < MAX_FIND_FREE_POSITION_ATTEMPTS;
    initialStep++
  ) {
    const position = room.FindFreePickupSpawnPosition(
      startingPosition,
      initialStep,
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

    if (minimumDistance !== undefined) {
      const distance = startingPosition.Distance(position);
      if (distance < minimumDistance) {
        continue;
      }
    }

    return position;
  }

  // We failed to find a free position in N iterations.
  return room.FindFreePickupSpawnPosition(startingPosition);
}

/**
 * Helper function to get a map containing the positions of every entity in the current room.
 *
 * This is useful for rewinding entity positions at a later time. Also see `setEntityPositions`.
 *
 * @param entities Optional. If provided, will only get the positions of the provided entities. Use
 *                 this with cached entities to avoid invoking the `Isaac.GetRoomEntities` method
 *                 multiple times.
 */
export function getEntityPositions(
  entities?: readonly Entity[],
): ReadonlyMap<PtrHash, Vector> {
  if (entities === undefined) {
    entities = getEntities();
  }

  const entityPositions = new Map<PtrHash, Vector>();
  for (const entity of entities) {
    const ptrHash = GetPtrHash(entity);
    entityPositions.set(ptrHash, entity.Position);
  }

  return entityPositions;
}

/**
 * Helper function to get a map containing the velocities of every entity in the current room.
 *
 * This is useful for rewinding entity velocities at a later time. Also see `setEntityVelocities`.
 *
 * @param entities Optional. If provided, will only get the velocities of the provided entities. Use
 *                 this with cached entities to avoid invoking the `Isaac.GetRoomEntities` method
 *                 multiple times.
 */
export function getEntityVelocities(
  entities?: readonly Entity[],
): ReadonlyMap<PtrHash, Vector> {
  if (entities === undefined) {
    entities = getEntities();
  }

  const entityVelocities = new Map<PtrHash, Vector>();
  for (const entity of entities) {
    const ptrHash = GetPtrHash(entity);
    entityVelocities.set(ptrHash, entity.Velocity);
  }

  return entityVelocities;
}

/**
 * Helper function to set the position of every entity in the room based on a map of positions. If
 * an entity is found that does not have matching element in the provided map, then that entity will
 * be skipped.
 *
 * This function is useful for rewinding entity positions at a later time. Also see
 * `getEntityPositions`.
 *
 * @param entityPositions The map providing the positions for every entity.
 * @param entities Optional. If provided, will only set the positions of the provided entities. Use
 *                 this with cached entities to avoid invoking the `Isaac.GetRoomEntities` method
 *                 multiple times.
 */
export function setEntityPositions(
  entityPositions: ReadonlyMap<PtrHash, Vector>,
  entities?: readonly Entity[],
): void {
  if (entities === undefined) {
    entities = getEntities();
  }

  for (const entity of entities) {
    const ptrHash = GetPtrHash(entity);
    const entityPosition = entityPositions.get(ptrHash);
    if (entityPosition !== undefined) {
      entity.Position = entityPosition;
    }
  }
}

/**
 * Helper function to set the velocity of every entity in the room based on a map of velocities. If
 * an entity is found that does not have matching element in the provided map, then that entity will
 * be skipped.
 *
 * This function is useful for rewinding entity velocities at a later time. Also see
 * `getEntityVelocities`.
 *
 * @param entityVelocities The map providing the velocities for every entity.
 * @param entities Optional. If provided, will only set the velocities of the provided entities. Use
 *                 this with cached entities to avoid invoking the `Isaac.GetRoomEntities` method
 *                 multiple times.
 */
export function setEntityVelocities(
  entityVelocities: ReadonlyMap<PtrHash, Vector>,
  entities?: readonly Entity[],
): void {
  if (entities === undefined) {
    entities = getEntities();
  }

  for (const entity of entities) {
    const ptrHash = GetPtrHash(entity);
    const entityVelocity = entityVelocities.get(ptrHash);
    if (entityVelocity !== undefined) {
      entity.Velocity = entityVelocity;
    }
  }
}
