import type { ActiveSlot, UseFlag } from "isaac-typescript-definitions";
import {
  CollectibleType,
  GridCollisionClass,
  GridEntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import {
  removeGridEntity,
  spawnGridEntityWithVariant,
} from "../../../functions/gridEntities";
import { getPlayerFromPtr } from "../../../functions/players";
import { getRoomListIndex } from "../../../functions/roomData";
import { isInteger } from "../../../functions/types";
import { assertDefined } from "../../../functions/utils";
import { isVector } from "../../../functions/vector";
import type { GridEntityCustomData } from "../../../interfaces/GridEntityCustomData";
import { DefaultMap } from "../../DefaultMap";
import { Feature } from "../../private/Feature";
import type { RunInNFrames } from "../other/RunInNFrames";

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

export class CustomGridEntities extends Feature {
  /** @internal */
  public override v = v;

  private readonly runInNFrames: RunInNFrames;

  /** @internal */
  constructor(runInNFrames: RunInNFrames) {
    super();

    this.featuresUsed = [ISCFeature.RUN_IN_N_FRAMES];

    this.callbacksUsed = [
      // 23
      [
        ModCallback.PRE_USE_ITEM,
        this.preUseItemWeNeedToGoDeeper,
        [CollectibleType.WE_NEED_TO_GO_DEEPER],
      ],
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, this.postNewRoomReordered],
    ];

    this.runInNFrames = runInNFrames;
  }

  // ModCallback.PRE_USE_ITEM (23)
  // CollectibleType.WE_NEED_TO_GO_DEEPER (84)
  private readonly preUseItemWeNeedToGoDeeper = (
    _collectibleType: CollectibleType,
    _rng: RNG,
    player: EntityPlayer,
    _useFlags: BitFlags<UseFlag>,
    _activeSlot: ActiveSlot,
    _customVarData: int,
  ): boolean | undefined => {
    // If a player uses We Need to Go Deeper on top of a custom grid entity, then they will always
    // get a crawlspace, due to how custom grids are implemented with decorations. Thus, remove the
    // custom grid entity to prevent this from happening if needed.
    const room = game.GetRoom();
    const roomListIndex = getRoomListIndex();
    const roomCustomGridEntities =
      v.level.customGridEntities.get(roomListIndex);
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

    const entityPtr = EntityPtr(player);
    this.runInNFrames.runNextGameFrame(() => {
      const futurePlayer = getPlayerFromPtr(entityPtr);
      if (futurePlayer === undefined) {
        return;
      }

      v.room.manuallyUsingShovel = true;
      futurePlayer.UseActiveItem(CollectibleType.WE_NEED_TO_GO_DEEPER);
      v.room.manuallyUsingShovel = false;
    });

    // Cancel the original effect.
    return true;
  };

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private readonly postNewRoomReordered = (): void => {
    // When we re-enter a room, the graphics for any custom entities will be reverted back to that
    // of a normal decoration. Thus, we must re-apply the anm2.
    const roomListIndex = getRoomListIndex();
    const roomCustomGridEntities =
      v.level.customGridEntities.get(roomListIndex);
    if (roomCustomGridEntities === undefined) {
      return;
    }

    const room = game.GetRoom();
    for (const [gridIndex, data] of roomCustomGridEntities) {
      const decoration = room.GetGridEntity(gridIndex);
      if (decoration === undefined) {
        roomCustomGridEntities.delete(gridIndex);
        continue;
      }

      if (data.anm2Path !== undefined) {
        const sprite = decoration.GetSprite();
        sprite.Load(data.anm2Path, true);
        const animationToPlay =
          data.defaultAnimation ?? sprite.GetDefaultAnimation();
        sprite.Play(animationToPlay, true);
      }
    }
  };

  /**
   * Helper function to spawn a custom grid entity. Custom grid entities are persistent in that they
   * will reappear if the player leaves and re-enters the room. (It will be manually respawned in
   * the `POST_NEW_ROOM` callback.)
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.CUSTOM_GRID_ENTITIES`.
   *
   * Custom grid entities are built on top of real grid entities. You can use any existing grid
   * entity type as a base. For example, if you want to create a custom rock that would be breakable
   * like a normal rock, then you should specify `GridEntityType.ROCK` as the base grid entity type.
   *
   * Once a custom grid entity is spawned, you can take advantage of the custom grid callbacks such
   * as `POST_GRID_ENTITY_CUSTOM_UPDATE`. Note that the "normal" grid entities callbacks will not
   * fire for custom entities. For example, if you had a custom grid entity based on
   * `GridEntityType.ROCK`, and you also had a subscription to the `POST_GRID_ENTITY_UPDATE`
   * callback, the callback would only fire for normal rocks and not the custom entity.
   *
   * Custom grid entities are an IsaacScript feature because the vanilla game does not support any
   * custom grid entities.
   *
   * For example, this would be code to create a custom rock called a "Silver Rock" that produces a
   * dime when destroyed:
   *
   * ```ts
   * // This is local to the mod and can safely overlap with the values of `GridEntityType` (or
   * // values chosen by other mods).
   * const GridEntityTypeCustom = {
   *   SILVER_ROCK: 0 as GridEntityType,
   * } as const;
   *
   * // This is copied from "gfx/grid/grid_rock.anm2" with some tweaks to make it look special.
   * const SILVER_ROCK_ANM2_PATH = "gfx/grid/grid_rock_silver.anm2";
   *
   * export function silverRockInit(mod: ModUpgraded): void {
   *   mod.AddCallbackCustom(
   *     ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_BROKEN,
   *     postGridEntityCustomBrokenSilverRock,
   *     GridEntityTypeCustom.SILVER_ROCK,
   *   );
   * }
   *
   * function postGridEntityCustomBrokenSilverRock(gridEntity: GridEntity) {
   *   spawnCoin(CoinSubType.DIME, gridEntity.Position);
   * }
   *
   * export function spawnSilverRock(mod: ModUpgraded, gridIndex: int): GridEntity {
   *   return mod.spawnCustomGridEntity(
   *     GridEntityTypeCustom.SILVER_ROCK,
   *     gridIndex,
   *     undefined,
   *     SILVER_ROCK_ANM2_PATH,
   *     undefined,
   *     GridEntityType.ROCK,
   *   );
   * }
   * ```
   *
   * @param gridEntityTypeCustom An integer that identifies what kind of grid entity you are
   *                             creating. It should correspond to a local enum value created in
   *                             your mod. The integer can be any unique value and will not
   *                             correspond to the actual grid entity type used. (This integer is
   *                             used in the various custom grid entity callbacks.)
   * @param gridIndexOrPosition The grid index or position in the room that you want to spawn the
   *                            grid entity at. If a position is specified, the closest grid index
   *                            will be used.
   * @param gridCollisionClass Optional. The collision class that you want the custom grid entity to
   *                           have. If not specified, the grid collision class from the base grid
   *                           entity will be used.
   * @param anm2Path Optional. The path to the ANM2 file to use for the sprite. If not specified,
   *                 the normal sprite from the base grid entity will be used.
   * @param defaultAnimation Optional. The name of the animation to play after the sprite is
   *                         initialized and after the player re-enters a room with this grid entity
   *                         in it. If not specified, the default animation in the anm2 will be
   *                         used.
   * @param baseGridEntityType Optional. The type of the grid entity to use as a "base" for this
   *                           custom grid entity. Default is `GridEntityType.DECORATION`.
   * @param baseGridEntityVariant Optional. The variant of the grid entity to use as a "base" for
   *                              this custom grid entity. Default is 0.
   */
  @Exported
  public spawnCustomGridEntity(
    gridEntityTypeCustom: GridEntityType,
    gridIndexOrPosition: int | Vector,
    gridCollisionClass?: GridCollisionClass,
    anm2Path?: string,
    defaultAnimation?: string,
    baseGridEntityType = GridEntityType.DECORATION,
    baseGridEntityVariant = 0,
  ): GridEntity {
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
    assertDefined(customGridEntity, "Failed to spawn a custom grid entity.");

    if (gridCollisionClass !== undefined) {
      customGridEntity.CollisionClass = gridCollisionClass;
    }

    if (anm2Path !== undefined) {
      const sprite = customGridEntity.GetSprite();
      sprite.Load(anm2Path, true);
      const animationToPlay = defaultAnimation ?? sprite.GetDefaultAnimation();
      sprite.Play(animationToPlay, true);
    }

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
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.CUSTOM_GRID_ENTITIES`.
   *
   * @param gridIndexOrPositionOrGridEntity You can specify the custom grid entity to remove by
   *                                providing the grid index, the room position, or the grid entity
   *                                itself.
   * @param updateRoom Optional. Whether to update the room after the grid entity is removed.
   *                   Default is true. This is generally a good idea because if the room is not
   *                   updated, you will be unable to spawn another grid entity on the same tile
   *                   until a frame has passed. However, doing this is expensive, since it involves
   *                   a call to `Isaac.GetRoomEntities`, so set it to false if you need to run this
   *                   function multiple times.
   * @returns The grid entity that was removed. Returns undefined if no grid entity was found at the
   *          given location or if the given grid entity was not a custom grid entity.
   */
  @Exported
  public removeCustomGridEntity(
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
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.CUSTOM_GRID_ENTITIES`.
   */
  @Exported
  public getCustomGridEntities(): Array<{
    gridEntity: GridEntity;
    data: GridEntityCustomData;
  }> {
    const roomListIndex = getRoomListIndex();
    const roomCustomGridEntities =
      v.level.customGridEntities.get(roomListIndex);
    if (roomCustomGridEntities === undefined) {
      return [];
    }

    const room = game.GetRoom();
    const customGridEntities: Array<{
      gridEntity: GridEntity;
      data: GridEntityCustomData;
    }> = [];
    for (const [gridIndex, data] of roomCustomGridEntities) {
      const gridEntity = room.GetGridEntity(gridIndex);
      if (gridEntity !== undefined) {
        customGridEntities.push({ gridEntity, data });
      }
    }

    return customGridEntities;
  }

  /**
   * Helper function to get the custom `GridEntityType` from a `GridEntity` or grid index. Returns
   * undefined if the provided `GridEntity` is not a custom grid entity, or if there was not a grid
   * entity on the provided grid index.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.CUSTOM_GRID_ENTITIES`.
   */
  @Exported
  public getCustomGridEntityType(
    gridEntityOrGridIndex: GridEntity | int,
  ): GridEntityType | undefined {
    if (!this.initialized) {
      return undefined;
    }

    const gridIndex = isInteger(gridEntityOrGridIndex)
      ? gridEntityOrGridIndex
      : gridEntityOrGridIndex.GetGridIndex();

    const roomListIndex = getRoomListIndex();
    const roomCustomGridEntities =
      v.level.customGridEntities.get(roomListIndex);
    if (roomCustomGridEntities === undefined) {
      return undefined;
    }

    for (const [_gridIndex, data] of roomCustomGridEntities) {
      if (data.gridIndex === gridIndex) {
        return data.gridEntityTypeCustom;
      }
    }

    return undefined;
  }

  /**
   * Helper function to check if a `GridEntity` is a custom grid entity or if a grid index has a
   * custom grid entity.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.CUSTOM_GRID_ENTITIES`.
   */
  @Exported
  public isCustomGridEntity(gridEntityOrGridIndex: GridEntity | int): boolean {
    const gridEntityTypeCustom = this.getCustomGridEntityType(
      gridEntityOrGridIndex,
    );
    return gridEntityTypeCustom !== undefined;
  }
}
