import type { Dimension, EntityType } from "isaac-typescript-definitions";
import { EntityFlag, ModCallback } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { spawn } from "../../../functions/entities";
import { getRoomListIndex } from "../../../functions/roomData";
import { Feature } from "../../private/Feature";
import type { RoomHistory } from "./RoomHistory";

interface PersistentEntityDescription {
  entityType: EntityType;
  variant: int;
  subType: int;
  dimension: Dimension;
  roomListIndex: int;
  position: Readonly<Vector>;
}

type PersistentEntityTuple = [index: int, entityPtr: EntityPtr];

const v = {
  run: {
    /** Iterates upward as new persistent entities are created. */
    persistentEntityIndexCounter: 0,
  },

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
    spawnedPersistentEntities: new Map<PtrHash, PersistentEntityTuple>(),
  },
};

export class PersistentEntities extends Feature {
  /** @internal */
  public override v = v;

  private readonly roomHistory: RoomHistory;

  /** @internal */
  constructor(roomHistory: RoomHistory) {
    super();

    this.featuresUsed = [ISCFeature.ROOM_HISTORY];

    this.callbacksUsed = [
      // 67
      [ModCallback.POST_ENTITY_REMOVE, this.postEntityRemove],
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, this.postNewRoomReordered],
    ];

    this.roomHistory = roomHistory;
  }

  // ModCallback.POST_ENTITY_REMOVE (67)
  private readonly postEntityRemove = (entity: Entity) => {
    const ptrHash = GetPtrHash(entity);
    const tuple = v.room.spawnedPersistentEntities.get(ptrHash);
    if (tuple === undefined) {
      return;
    }

    // A persistent entity is being removed, either because it was killed / manually despawned, or
    // the player left the room.
    const index = tuple[0];

    if (this.roomHistory.isLeavingRoom()) {
      this.trackDespawningPickupPosition(entity, index);
    } else {
      this.removePersistentEntity(index, false);
    }
  };

  /**
   * The persistent entity is despawning because the player is in the process of leaving the room.
   * Keep track of the position for later.
   */
  private trackDespawningPickupPosition(entity: Entity, index: int) {
    // (The "latest" room description is really the previous room, because the `POST_NEW_ROOM`
    // callback was not fired yet.)
    const previousRoomDescription = this.roomHistory.getLatestRoomDescription();
    if (previousRoomDescription === undefined) {
      return;
    }

    const persistentEntityDescription: PersistentEntityDescription = {
      entityType: entity.Type,
      variant: entity.Variant,
      subType: entity.SubType,
      dimension: previousRoomDescription.dimension,
      roomListIndex: previousRoomDescription.roomListIndex,
      position: entity.Position,
    };
    v.level.persistentEntities.set(index, persistentEntityDescription);
  }

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private readonly postNewRoomReordered = () => {
    const roomListIndex = getRoomListIndex();
    const persistentEntities = [...v.level.persistentEntities.entries()];
    const persistentEntitiesInThisRoom = persistentEntities.filter(
      ([_index, description]) => roomListIndex === description.roomListIndex,
    );

    for (const [index, description] of persistentEntitiesInThisRoom) {
      v.level.persistentEntities.delete(index);
      this.spawnAndTrack(
        description.entityType,
        description.variant,
        description.subType,
        description.position,
        index,
        true,
      );
    }
  };

  private spawnAndTrack(
    entityType: EntityType,
    variant: int,
    subType: int,
    position: Vector,
    index: int,
    respawning = false,
  ): Entity {
    const entity = spawn(entityType, variant, subType, position);
    if (respawning) {
      entity.ClearEntityFlags(EntityFlag.APPEAR);
    }

    const ptrHash = GetPtrHash(entity);

    // Keep track that we spawned it so that we can respawn it if the player re-enters the room.
    const tuple: [int, EntityPtr] = [index, EntityPtr(entity)];
    v.room.spawnedPersistentEntities.set(ptrHash, tuple);

    return entity;
  }

  /**
   * Helper function to stop an entity spawned with the `spawnPersistentEntity` helper function from
   * respawning.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.PERSISTENT_ENTITIES`.
   *
   * @param persistentEntityIndex The index that was returned by the `spawnPersistentEntity`
   *                              function.
   * @param removeEntity Optional. True by default. Set to false if you want to stop an entity from
   *                     being persistent but you don't want to actually remove the
   *                     currently-spawned entity from the room.
   * @public
   */
  @Exported
  public removePersistentEntity(
    persistentEntityIndex: int,
    removeEntity = true,
  ): void {
    v.level.persistentEntities.delete(persistentEntityIndex);

    for (const [ptrHash, tuple] of v.room.spawnedPersistentEntities) {
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

  /**
   * Helper function to spawn an entity that will have persistence similar to a pickup.
   *
   * By default, as soon as you leave a room, any spawned entities will be despawned and will not
   * return if the player revisits the room. This means that if you want to have an entity like a
   * pickup, you have to manually respawn it when the player re-enters the room. Use this helper
   * function to avoid having to do any tracking on your own.
   *
   * Conventionally, the word "persistent" refers to `EntityFlag.FLAG_PERSISTENT`, which is used on
   * e.g. familiars to make them appear in every room. On the other hand, pickups are also
   * persistent, but they are not present in every room, only one specific room. This function
   * spawns entities like pickups, not familiars.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.PERSISTENT_ENTITIES`.
   *
   * @returns An object containing the entity and the persistent entity index. You can use the index
   *          with the `removePersistentEntity` function.
   * @public
   */
  @Exported
  public spawnPersistentEntity(
    entityType: EntityType,
    variant: int,
    subType: int,
    position: Vector,
  ): { entity: Entity; persistentIndex: int } {
    v.run.persistentEntityIndexCounter++;

    const entity = this.spawnAndTrack(
      entityType,
      variant,
      subType,
      position,
      v.run.persistentEntityIndexCounter,
    );

    return { entity, persistentIndex: v.run.persistentEntityIndexCounter };
  }
}
