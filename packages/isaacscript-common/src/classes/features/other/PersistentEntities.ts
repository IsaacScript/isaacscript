import {
  EntityFlag,
  EntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { spawn } from "../../../functions/entities";
import { getRoomListIndex } from "../../../functions/roomData";
import { Feature } from "../../private/Feature";
import { RoomHistory } from "./RoomHistory";

interface PersistentEntityDescription {
  entityType: EntityType;
  variant: int;
  subType: int;
  roomListIndex: int;
  position: Readonly<Vector>;
}

export class PersistentEntities extends Feature {
  /** Iterates upward as new persistent entities are created. */
  private persistentEntityIndexCounter = 0;

  public override v = {
    level: {
      /**
       * Indexed by persistent entity index.
       *
       * When the entity is spawned in the currently room, its corresponding entry in this map will
       * be temporarily deleted (until the entity itself is despawned).
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

  private roomHistory: RoomHistory;

  constructor(roomHistory: RoomHistory) {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_ENTITY_REMOVE, [this.postEntityRemove]], // 67
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, [this.postNewRoomReordered]],
    ];

    this.featuresUsed = [ISCFeature.ROOM_HISTORY];

    this.roomHistory = roomHistory;
  }

  // ModCallback.POST_ENTITY_REMOVE (67)
  private postEntityRemove = (entity: Entity) => {
    this.checkDespawningFromPlayerLeavingRoom(entity);
  };

  private checkDespawningFromPlayerLeavingRoom(entity: Entity) {
    const ptrHash = GetPtrHash(entity);
    const tuple = this.v.room.spawnedPersistentEntities.get(ptrHash);
    if (tuple === undefined) {
      return;
    }
    const index = tuple[0];

    if (!this.roomHistory.isLeavingRoom()) {
      return;
    }

    this.trackDespawningPickupPosition(entity, index);
  }

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

    const previousRoomListIndex = previousRoomDescription.roomListIndex;
    const persistentEntityDescription: PersistentEntityDescription = {
      entityType: entity.Type,
      variant: entity.Variant,
      subType: entity.SubType,
      roomListIndex: previousRoomListIndex,
      position: entity.Position,
    };
    this.v.level.persistentEntities.set(index, persistentEntityDescription);
  }

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private postNewRoomReordered = () => {
    const roomListIndex = getRoomListIndex();

    for (const [
      index,
      description,
    ] of this.v.level.persistentEntities.entries()) {
      if (roomListIndex !== description.roomListIndex) {
        continue;
      }

      this.v.level.persistentEntities.delete(index);
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
    this.v.room.spawnedPersistentEntities.set(ptrHash, tuple);

    return entity;
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
   * @returns A tuple containing the entity and the persistent entity index. You can use the index
   *          with the `removePersistentEntity` function.
   */
  @Exported
  public spawnPersistentEntity(
    entityType: EntityType,
    variant: int,
    subType: int,
    position: Vector,
  ): [Entity, int] {
    this.persistentEntityIndexCounter++;

    const entity = this.spawnAndTrack(
      entityType,
      variant,
      subType,
      position,
      this.persistentEntityIndexCounter,
    );

    return [entity, this.persistentEntityIndexCounter];
  }

  /**
   * Helper function to stop an entity spawned with the `spawnPersistentEntity` helper function from
   * respawning.
   *
   * @param persistentEntityIndex The index that was returned by the `spawnPersistentEntity`
   *                              function.
   * @param removeEntity Optional. True by default. Set to false if you want to stop an entity from
   *                     being persistent but you don't want to actually remove the
   *                     currently-spawned entity from the room.
   */
  @Exported
  public removePersistentEntity(
    persistentEntityIndex: int,
    removeEntity = true,
  ): void {
    this.v.level.persistentEntities.delete(persistentEntityIndex);

    for (const [
      ptrHash,
      tuple,
    ] of this.v.room.spawnedPersistentEntities.entries()) {
      const [index, entityPtr] = tuple;
      if (index !== persistentEntityIndex) {
        continue;
      }

      this.v.room.spawnedPersistentEntities.delete(ptrHash);

      if (removeEntity && entityPtr.Ref !== undefined) {
        entityPtr.Ref.Remove();
      }
    }
  }
}
