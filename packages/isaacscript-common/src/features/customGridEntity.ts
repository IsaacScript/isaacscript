import {
  ActiveSlot,
  CollectibleType,
  GridCollisionClass,
  GridEntityType,
  ModCallback,
  UseFlag,
} from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { DecorationVariant } from "../enums/DecorationVariant";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import {
  removeGridEntity,
  spawnGridEntityWithVariant,
} from "../functions/gridEntities";
import { getRoomListIndex } from "../functions/roomData";
import { isVector } from "../functions/vector";
import { CustomGridEntityData } from "../interfaces/CustomGridEntityData";
import { runNextGameFrame } from "./runInNFrames";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "customGridEntity";

const v = {
  level: {
    /** Indexed by room list index and grid index. */
    customGridEntities: new DefaultMap<int, Map<int, CustomGridEntityData>>(
      () => new Map(),
    ),
  },

  room: {
    manuallyUsingShovel: false,
  },
};

/** @internal */
export function customGridEntityInit(mod: ModUpgraded): void {
  saveDataManager(FEATURE_NAME, v);

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
 * This is an IsaacScript feature because the vanilla game does not support any custom grid
 * entities. Under the hood, IsaacScript accomplishes this by using decorations with an arbitrary
 * non-zero variant to represent custom grid entities.
 *
 * Once a custom grid entity is spawned, you can take advantage of the custom grid callbacks such as
 * `POST_GRID_ENTITY_CUSTOM_UPDATE`.
 *
 * @param gridEntityTypeCustom An integer that identifies what kind of grid entity you are creating.
 *                             It should correspond to a local enum value in your mod. The integer
 *                             can be any unique value and will not correspond to the actual grid
 *                             entity type used. (This integer is used in the various custom grid
 *                             entity callbacks.)
 * @param gridIndexOrPosition The grid index or position in the room that you want to spawn the grid
 *                            entity at. If a position is specified, the closest grid index will be
 *                            used.
 * @param gridCollisionClass The collision class that you want the custom grid entity to have.
 * @param anm2Path The path to the ANM2 file to use for the sprite.
 * @param defaultAnimation Optional. The name of the animation to play after the sprite is
 *                         initialized and after the player re-enters a room with this grid entity
 *                         in it. If not specified, the default animation in the anm2 will be used.
 */
export function spawnCustomGridEntity(
  gridEntityTypeCustom: GridEntityType,
  gridIndexOrPosition: int | Vector,
  gridCollisionClass: GridCollisionClass,
  anm2Path: string,
  defaultAnimation?: string,
): GridEntity {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const room = game.GetRoom();
  const roomListIndex = getRoomListIndex();
  const gridIndex = isVector(gridIndexOrPosition)
    ? room.GetGridIndex(gridIndexOrPosition)
    : gridIndexOrPosition;

  const existingGridEntity = room.GetGridEntity(gridIndex);
  const isExistingDecoration =
    existingGridEntity !== undefined &&
    existingGridEntity.GetType() === GridEntityType.DECORATION &&
    existingGridEntity.GetVariant() ===
      (DecorationVariant.CUSTOM_GRID_ENTITY as int);
  const decoration = isExistingDecoration
    ? existingGridEntity
    : spawnGridEntityWithVariant(
        GridEntityType.DECORATION,
        DecorationVariant.CUSTOM_GRID_ENTITY,
        gridIndexOrPosition,
      );
  if (decoration === undefined) {
    error("Failed to spawn a decoration for a custom grid entity.");
  }

  const sprite = decoration.GetSprite();
  sprite.Load(anm2Path, true);
  const animationToPlay =
    defaultAnimation === undefined
      ? sprite.GetDefaultAnimation()
      : defaultAnimation;
  sprite.Play(animationToPlay, true);

  const customGridEntityData: CustomGridEntityData = {
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

  return decoration;
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
export function removeCustomGrid(
  gridIndexOrPositionOrGridEntity: int | Vector | GridEntity,
  updateRoom = true,
): GridEntity | undefined {
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
  [gridEntity: GridEntity, data: CustomGridEntityData]
> {
  const roomListIndex = getRoomListIndex();
  const roomCustomGridEntities = v.level.customGridEntities.get(roomListIndex);
  if (roomCustomGridEntities === undefined) {
    return [];
  }

  const room = game.GetRoom();
  const customGridEntities: Array<[GridEntity, CustomGridEntityData]> = [];
  for (const [gridIndex, data] of roomCustomGridEntities.entries()) {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity !== undefined) {
      customGridEntities.push([gridEntity, data]);
    }
  }

  return customGridEntities;
}
