import {
  ActiveSlot,
  CollectibleType,
  DamageFlag,
  EntityType,
  GridCollisionClass,
  GridEntityType,
  ModCallback,
  UseFlag,
} from "isaac-typescript-definitions";
import { postGridEntityCustomBrokenFire } from "../callbacks/subscriptions/postGridEntityCustomBroken";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { game } from "../core/cachedClasses";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import {
  areFeaturesInitialized,
  errorIfFeaturesNotInitialized,
} from "../featuresInitialized";
import { hasFlag } from "../functions/flag";
import {
  removeGridEntity,
  spawnGridEntityWithVariant,
} from "../functions/gridEntities";
import { getRoomListIndex } from "../functions/roomData";
import { isNumber } from "../functions/types";
import { isVector } from "../functions/vector";
import { GridEntityCustomData } from "../interfaces/GridEntityCustomData";
import { runNextGameFrame } from "./runInNFrames";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "customGridEntity";

const v = {
  level: {
    /** Indexed by room list index and grid index. */
    customGridEntities: new DefaultMap<int, Map<int, GridEntityCustomData>>(
      () => new Map(),
    ),
  },

  room: {
    genericPropPtrHashes: new Set<PtrHash>(),
    manuallyUsingShovel: false,
  },
};

export function customGridEntityInit(mod: ModUpgraded): void {
  saveDataManager(FEATURE_NAME, v);

  mod.AddCallback(
    ModCallback.ENTITY_TAKE_DMG,
    entityTakeDmgGenericProp,
    EntityType.GENERIC_PROP,
  ); // 11

  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    preUseItemWeNeedToGoDeeper,
    CollectibleType.WE_NEED_TO_GO_DEEPER,
  ); // 23

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_REORDERED,
    postNewRoomReordered,
  );
}

// ModCallback.ENTITY_TAKE_DMG (11)
// EntityType.GENERIC_PROP (960)
function entityTakeDmgGenericProp(
  tookDamage: Entity,
  _damageAmount: float,
  damageFlags: BitFlags<DamageFlag>,
  _damageSource: EntityRef,
  _damageCountdownFrames: int,
): boolean | undefined {
  const ptrHash = GetPtrHash(tookDamage);
  if (!v.room.genericPropPtrHashes.has(ptrHash)) {
    return undefined;
  }

  if (!hasFlag(damageFlags, DamageFlag.EXPLOSION)) {
    return false;
  }

  const room = game.GetRoom();
  const roomListIndex = getRoomListIndex();
  const roomCustomGridEntities = v.level.customGridEntities.get(roomListIndex);
  if (roomCustomGridEntities === undefined) {
    return false;
  }

  const gridIndex = room.GetGridIndex(tookDamage.Position);
  const data = roomCustomGridEntities.get(gridIndex);
  if (data === undefined) {
    return false;
  }

  const gridEntity = room.GetGridEntity(gridIndex);
  if (gridEntity === undefined) {
    error(
      `Failed to get the grid entity for a custom grid entity that broke at grid index: ${gridIndex}`,
    );
  }

  postGridEntityCustomBrokenFire(gridEntity, data.gridEntityTypeCustom);

  // Even though the custom grid entity is now broken, we do not want to remove it, as the end-user
  // could intend for it to persist with different graphics (or take multiple hits to be destroyed).
  return false;
}

// ModCallback.PRE_USE_ITEM (23)
// CollectibleType.WE_NEED_TO_GO_DEEPER (84)
function preUseItemWeNeedToGoDeeper(
  _collectibleType: CollectibleType,
  _rng: RNG,
  player: EntityPlayer,
  _useFlags: BitFlags<UseFlag>,
  _activeSlot: ActiveSlot,
  _customVarData: int,
): boolean | undefined {
  // If a player uses We Need to Go Deeper on top of a custom grid entity, then they will always get
  // a crawlspace, due to how custom grids are implemented with decorations. Thus, remove the custom
  // grid entity to prevent this from happening if needed.
  const room = game.GetRoom();
  const roomListIndex = getRoomListIndex();
  const roomCustomGridEntities = v.level.customGridEntities.get(roomListIndex);
  if (roomCustomGridEntities === undefined) {
    return undefined;
  }

  const gridIndex = room.GetGridIndex(player.Position);
  const customGridEntity = roomCustomGridEntities.get(gridIndex);
  if (customGridEntity === undefined) {
    return undefined;
  }

  // If the custom grid entity has collision, then the player should not be able to be standing on
  // top of it.
  if (customGridEntity.gridCollisionClass !== GridCollisionClass.NONE) {
    return undefined;
  }

  removeGridEntity(customGridEntity.gridIndex, false);

  const playerPtr = EntityPtr(player);
  runNextGameFrame(() => {
    const futureEntity = playerPtr.Ref;
    if (futureEntity === undefined) {
      return;
    }

    const futurePlayer = futureEntity.ToPlayer();
    if (futurePlayer === undefined) {
      return;
    }

    v.room.manuallyUsingShovel = true;
    futurePlayer.UseActiveItem(CollectibleType.WE_NEED_TO_GO_DEEPER);
    v.room.manuallyUsingShovel = false;
  });

  // Cancel the original effect.
  return true;
}

// ModCallbackCustom.POST_NEW_ROOM_REORDERED
function postNewRoomReordered() {
  // When we re-enter a room, the graphics for any custom entities will be reverted back to that of
  // a normal decoration. Thus, we must re-apply the anm2.
  const roomListIndex = getRoomListIndex();
  const roomCustomGridEntities = v.level.customGridEntities.get(roomListIndex);
  if (roomCustomGridEntities === undefined) {
    return;
  }

  const room = game.GetRoom();
  for (const [gridIndex, data] of roomCustomGridEntities.entries()) {
    const decoration = room.GetGridEntity(gridIndex);
    if (decoration === undefined) {
      roomCustomGridEntities.delete(gridIndex);
      continue;
    }

    const sprite = decoration.GetSprite();
    sprite.Load(data.anm2Path, true);
    const animationToPlay =
      data.defaultAnimation === undefined
        ? sprite.GetDefaultAnimation()
        : data.defaultAnimation;
    sprite.Play(animationToPlay, true);
  }
}

/**
 * Helper function to spawn a custom grid entity. Custom grid entities are persistent in that they
 * will reappear if the player leaves and re-enters the room. (It will be manually respawned in the
 * `POST_NEW_ROOM` callback.)
 *
 * Custom grid entities are built on top of real grid entities. You can use any existing grid entity
 * type as a base. For example, if you want to create a custom rock that would be breakable like a
 * normal rock, then you should specify `GridEntityType.ROCK` as the base grid entity type.
 *
 * Once a custom grid entity is spawned, you can take advantage of the custom grid callbacks such as
 * `POST_GRID_ENTITY_CUSTOM_UPDATE`. Note that the "normal" grid entities callbacks will not fire
 * for custom entities. For example, if you had a custom grid entity based on `GridEntityType.ROCK`,
 * and you also had a subscription to the `POST_GRID_ENTITY_UPDATE` callback, the callback would
 * only fire for normal rocks and not the custom entity.
 *
 * Custom grid entities are an IsaacScript feature because the vanilla game does not support any
 * custom grid entities.
 *
 * @param gridEntityTypeCustom An integer that identifies what kind of grid entity you are creating.
 *                             It should correspond to a local enum value created in your mod. The
 *                             integer can be any unique value and will not correspond to the actual
 *                             grid entity type used. (This integer is used in the various custom
 *                             grid entity callbacks.)
 * @param gridIndexOrPosition The grid index or position in the room that you want to spawn the grid
 *                            entity at. If a position is specified, the closest grid index will be
 *                            used.
 * @param gridCollisionClass The collision class that you want the custom grid entity to have.
 * @param anm2Path The path to the ANM2 file to use for the sprite.
 * @param defaultAnimation Optional. The name of the animation to play after the sprite is
 *                         initialized and after the player re-enters a room with this grid entity
 *                         in it. If not specified, the default animation in the anm2 will be used.
 * @param baseGridEntityType Optional. The type of the grid entity to use as a "base" for this
 *                           custom grid entity. Default is `GridEntityType.DECORATION`.
 * @param baseGridEntityVariant Optional. The variant of the grid entity to use as a "base" for this
 *                              custom grid entity. Default is 0.
 */
export function spawnCustomGridEntity(
  gridEntityTypeCustom: GridEntityType,
  gridIndexOrPosition: int | Vector,
  gridCollisionClass: GridCollisionClass,
  anm2Path: string,
  defaultAnimation?: string,
  baseGridEntityType = GridEntityType.DECORATION,
  baseGridEntityVariant = 0,
): GridEntity {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const room = game.GetRoom();
  const roomListIndex = getRoomListIndex();
  const gridIndex = isVector(gridIndexOrPosition)
    ? room.GetGridIndex(gridIndexOrPosition)
    : gridIndexOrPosition;

  const customGridEntity = spawnGridEntityWithVariant(
    baseGridEntityType,
    baseGridEntityVariant,
    gridIndexOrPosition,
  );
  if (customGridEntity === undefined) {
    error("Failed to spawn a custom grid entity.");
  }
  customGridEntity.CollisionClass = gridCollisionClass;

  const sprite = customGridEntity.GetSprite();
  sprite.Load(anm2Path, true);
  const animationToPlay =
    defaultAnimation === undefined
      ? sprite.GetDefaultAnimation()
      : defaultAnimation;
  sprite.Play(animationToPlay, true);

  const customGridEntityData: GridEntityCustomData = {
    gridEntityTypeCustom,
    roomListIndex,
    gridIndex,
    anm2Path,
    defaultAnimation,
    gridCollisionClass,
  };

  const roomCustomGridEntities =
    v.level.customGridEntities.getAndSetDefault(roomListIndex);
  roomCustomGridEntities.set(gridIndex, customGridEntityData);

  return customGridEntity;
}

/**
 * Helper function to remove a custom grid entity created by the `spawnCustomGrid` function.
 *
 * @param gridIndexOrPositionOrGridEntity You can specify the custom grid entity to remove by
 *                                 providing the grid index, the room position, or the grid entity
 *                                 itself.
 * @param updateRoom Optional. Whether or not to update the room after the grid entity is removed.
 *                   Default is true. This is generally a good idea because if the room is not
 *                   updated, you will be unable to spawn another grid entity on the same tile until
 *                   a frame has passed. However, doing this is expensive, since it involves a call
 *                   to `Isaac.GetRoomEntities`, so set it to false if you need to run this function
 *                   multiple times.
 * @returns The grid entity that was removed. Returns undefined if no grid entity was found at the
 *          given location or if the given grid entity was not a custom grid entity.
 */
export function removeCustomGridEntity(
  gridIndexOrPositionOrGridEntity: int | Vector | GridEntity,
  updateRoom = true,
): GridEntity | undefined {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const room = game.GetRoom();
  const roomListIndex = getRoomListIndex();

  let decoration: GridEntity;
  if (typeof gridIndexOrPositionOrGridEntity === "number") {
    const gridIndex = gridIndexOrPositionOrGridEntity;
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity === undefined) {
      return undefined;
    }

    decoration = gridEntity;
  } else if (isVector(gridIndexOrPositionOrGridEntity)) {
    const position = gridIndexOrPositionOrGridEntity;
    const gridEntity = room.GetGridEntityFromPos(position);
    if (gridEntity === undefined) {
      return undefined;
    }

    decoration = gridEntity;
  } else {
    decoration = gridIndexOrPositionOrGridEntity;
  }

  const gridIndex = decoration.GetGridIndex();
  const roomCustomGridEntities =
    v.level.customGridEntities.getAndSetDefault(roomListIndex);
  const exists = roomCustomGridEntities.has(gridIndex);
  if (!exists) {
    return undefined;
  }

  roomCustomGridEntities.delete(gridIndex);
  removeGridEntity(decoration, updateRoom);

  return decoration;
}

/**
 * Helper function to get the custom grid entities in the current room. Returns an array of tuples
 * containing the raw decoration grid entity and the associated entity data.
 */
export function getCustomGridEntities(): Array<
  [gridEntity: GridEntity, data: GridEntityCustomData]
> {
  if (!areFeaturesInitialized()) {
    return [];
  }

  const roomListIndex = getRoomListIndex();
  const roomCustomGridEntities = v.level.customGridEntities.get(roomListIndex);
  if (roomCustomGridEntities === undefined) {
    return [];
  }

  const room = game.GetRoom();
  const customGridEntities: Array<[GridEntity, GridEntityCustomData]> = [];
  for (const [gridIndex, data] of roomCustomGridEntities.entries()) {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity !== undefined) {
      customGridEntities.push([gridEntity, data]);
    }
  }

  return customGridEntities;
}

/**
 * Helper function to get the custom `GridEntityType` from a `GridEntity` or grid index. Returns
 * undefined if the provided `GridEntity` is not a custom grid entity, or if there was not a grid
 * entity on the provided grid index.
 */
export function getCustomGridEntityType(
  gridEntityOrGridIndex: GridEntity | int,
): GridEntityType | undefined {
  if (!areFeaturesInitialized()) {
    return undefined;
  }

  const gridIndex = isNumber(gridEntityOrGridIndex)
    ? gridEntityOrGridIndex
    : gridEntityOrGridIndex.GetGridIndex();

  const roomListIndex = getRoomListIndex();
  const roomCustomGridEntities = v.level.customGridEntities.get(roomListIndex);
  if (roomCustomGridEntities === undefined) {
    return undefined;
  }

  for (const [_gridIndex, data] of roomCustomGridEntities.entries()) {
    if (data.gridIndex === gridIndex) {
      return data.gridEntityTypeCustom;
    }
  }

  return undefined;
}

/**
 * Helper function to check if a `GridEntity` is a custom grid entity or if a grid index has a
 * custom grid entity.
 */
export function isCustomGridEntity(
  gridEntityOrGridIndex: GridEntity | int,
): boolean {
  if (!areFeaturesInitialized()) {
    return false;
  }

  const gridEntityTypeCustom = getCustomGridEntityType(gridEntityOrGridIndex);
  return gridEntityTypeCustom !== undefined;
}
