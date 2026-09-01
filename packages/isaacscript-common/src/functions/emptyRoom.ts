import {
  EntityFlag,
  EntityType,
  GridEntityType,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { ReadonlySet } from "../types/ReadonlySet";
import { getEntities } from "./entities";
import { getGridEntities, removeGridEntity } from "./gridEntities";
import { isVanillaWallGridIndex } from "./roomShapeWalls";
import { roomUpdateSafe } from "./rooms";

const EMPTY_ROOM_BLACKLIST_ENTITY_SET = new ReadonlySet<EntityType>([
  EntityType.PLAYER, // 1
  EntityType.TEAR, // 2
  EntityType.FAMILIAR, // 3
  EntityType.LASER, // 7
  EntityType.KNIFE, // 8
  EntityType.PROJECTILE, // 9
  EntityType.DARK_ESAU, // 866
]);

/**
 * Helper function to remove all naturally spawning entities and grid entities from a room. Notably,
 * this will not remove players (1), tears (2), familiars (3), lasers (7), knives (8), projectiles
 * (9), blacklisted NPCs such as Dark Esau, charmed NPCs, friendly NPCs, persistent NPCs, most
 * effects (1000), doors, and walls.
 */
export function emptyRoom(): void {
  emptyRoomEntities();
  emptyRoomGridEntities();
}

/**
 * We remove entities in the `POST_NEW_ROOM` callback instead of in the `PRE_ROOM_ENTITY_SPAWN`
 * callback so that they will not re-appear when we re-enter the room.
 */
function emptyRoomEntities() {
  const room = game.GetRoom();

  for (const entity of getEntities()) {
    if (EMPTY_ROOM_BLACKLIST_ENTITY_SET.has(entity.Type)) {
      continue;
    }

    if (
      entity.HasEntityFlags(EntityFlag.CHARM)
      || entity.HasEntityFlags(EntityFlag.FRIENDLY)
      || entity.HasEntityFlags(EntityFlag.PERSISTENT)
    ) {
      continue;
    }

    entity.ClearEntityFlags(EntityFlag.APPEAR);
    entity.Remove();

    // When fire places are removed, they will leave behind a "path" that will prevent future grid
    // entities from being spawned on the same tile. Thus, reset the path for this tile if this is a
    // fire place.
    if (entity.Type === EntityType.FIREPLACE) {
      const gridIndex = room.GetGridIndex(entity.Position);
      room.SetGridPath(gridIndex, 0);
    }
  }
}

/** Helper function to remove all grid entities from a room except for doors and walls. */
export function emptyRoomGridEntities(): void {
  let removedOneOrMoreGridEntities = false;
  for (const gridEntity of getGridEntities()) {
    const gridEntityType = gridEntity.GetType();
    const gridIndex = gridEntity.GetGridIndex();

    // We cannot simply check if the grid entity type is equal to a wall because other mods use
    // walls as a base for custom grid entities.
    if (
      gridEntityType === GridEntityType.WALL
      && isVanillaWallGridIndex(gridIndex)
    ) {
      continue;
    }

    if (gridEntityType === GridEntityType.DOOR) {
      continue;
    }

    removeGridEntity(gridEntity, false);
    removedOneOrMoreGridEntities = true;
  }
  if (removedOneOrMoreGridEntities) {
    roomUpdateSafe();
  }
}
