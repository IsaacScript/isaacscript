import { EntityType, ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { spawn } from "../functions/entity";
import { getRoomListIndex } from "../functions/roomData";
import { PersistentEntityDescription } from "../interfaces/PersistentEntityDescription";
import { saveDataManager } from "./saveDataManager/exports";

/** Iterates upward as new persistent entities are created. */
let persistentEntityIndexCounter = 0;

const v = {
  level: {
    /**
     * Indexed by persistent entity index.
     *
     * When the entity is spawned in the currently room, its corresponding entry in this map will be
     * temporarily deleted (until the entity itself is despawned).
     */
    persistentEntities: new Map<int, PersistentEntityDescription>(),
  },

  room: {
    spawnedPersistentEntities: new Map<
      PtrHash,
      [index: int, entityPtr: EntityPtr]
    >(),
  },
};

/** @internal */
export function persistentEntitiesInit(mod: ModUpgraded): void {
  saveDataManager("persistentEntities", v);

  mod.AddCallback(ModCallback.POST_ENTITY_REMOVE, postEntityRemove); // 67
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_REORDERED,
    postNewRoomReordered,
  );
}

// ModCallback.POST_ENTITY_REMOVE (67)
function postEntityRemove(entity: Entity) {
  const ptrHash = GetPtrHash(entity);
  const tuple = v.room.spawnedPersistentEntities.get(ptrHash);
  if (tuple === undefined) {
    return;
  }
  const index = tuple[0];

  // The persistent entity is despawning, presumably because the player is in the process of leaving
  // the room. Keep track of the position for later.
  const roomListIndex = getRoomListIndex();
  v.level.persistentEntities.set(index, {
    entityType: entity.Type,
    variant: entity.Variant,
    subType: entity.SubType,
    roomListIndex,
    position: entity.Position,
  });
}

// ModCallbackCustom.POST_NEW_ROOM_REORDERED
function postNewRoomReordered() {
  const roomListIndex = getRoomListIndex();

  for (const [index, description] of v.level.persistentEntities.entries()) {
    if (roomListIndex !== description.roomListIndex) {
      continue;
    }

    v.level.persistentEntities.delete(index);
    spawnAndTrack(
      description.entityType,
      description.variant,
      description.subType,
      description.position,
    );
  }
}

/**
 * Helper function to spawn an entity that will have persistence similar to a pickup.
 *
 * By default, as soon as you leave a room, any spawned entities will be despawned and will not
 * return if the player revisits the room. This means that if you want to have an entity like a
 * pickup, you have to manually respawn it when the player re-enters the room. Use this helper
 * function to avoid having to do any tracking on your own.
 *
 * Conventionally, the word "persistent" refers to `EntityFlag.FLAG_PERSISTENT`, which is used on
 * e.g. familiars to make them appear in every room. On the other hand, pickups are also persistent,
 * but they are not present in every room, only one specific room. This function spawns entities
 * like pickups, not familiars.
 *
 * @returns A tuple containing the entity and the persistent entity index. You can use the index
 *          with the `removePersistentEntity` function.
 */
export function spawnPersistentEntity(
  entityType: EntityType,
  variant: int,
  subType: int,
  position: Vector,
): [Entity, int] {
  return spawnAndTrack(entityType, variant, subType, position);
}

function spawnAndTrack(
  entityType: EntityType,
  variant: int,
  subType: int,
  position: Vector,
): [Entity, int] {
  const entity = spawn(entityType, variant, subType, position);
  const ptrHash = GetPtrHash(entity);

  // Keep track that we spawned it so that we can respawn it if the player re-enters the room.
  persistentEntityIndexCounter += 1;
  const tuple: [int, EntityPtr] = [
    persistentEntityIndexCounter,
    EntityPtr(entity),
  ];
  v.room.spawnedPersistentEntities.set(ptrHash, tuple);

  return [entity, persistentEntityIndexCounter];
}

/**
 * Helper function to stop an entity spawned with the `spawnPersistentEntity` helper function from
 * respawning.
 *
 * @param persistentEntityIndex The index that was returned by the `spawnPersistentEntity` function.
 * @param removeEntity Optional. True by default. Set to false if you want to stop an entity from
 *                     being persistent but you don't want to actually remove the currently-spawned
 *                     entity from the room.
 */
export function removePersistentEntity(
  persistentEntityIndex: int,
  removeEntity = true,
): void {
  v.level.persistentEntities.delete(persistentEntityIndex);

  for (const [ptrHash, tuple] of v.room.spawnedPersistentEntities.entries()) {
    const [index, entityPtr] = tuple;
    if (index !== persistentEntityIndex) {
      continue;
    }

    v.room.spawnedPersistentEntities.delete(ptrHash);

    if (removeEntity && entityPtr.Ref !== undefined) {
      entityPtr.Ref.Remove();
    }
  }
}
