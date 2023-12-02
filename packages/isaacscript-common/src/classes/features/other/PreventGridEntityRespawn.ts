import type { ActiveSlot, UseFlag } from "isaac-typescript-definitions";
import {
  CollectibleType,
  GridEntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { emptyArray } from "../../../functions/array";
import {
  getAllGridIndexes,
  getGridEntities,
  removeGridEntity,
  setGridEntityInvisible,
  spawnGridEntity,
} from "../../../functions/gridEntities";
import { getPlayerFromPtr } from "../../../functions/players";
import { getRoomListIndex } from "../../../functions/roomData";
import { DefaultMap } from "../../DefaultMap";
import { Feature } from "../../private/Feature";
import type { RunInNFrames } from "./RunInNFrames";

const v = {
  level: {
    roomListIndexToDecorationGridIndexes: new DefaultMap<int, int[]>(() => []),
  },

  room: {
    manuallyUsingShovel: false,
  },
};

export class PreventGridEntityRespawn extends Feature {
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
    if (v.room.manuallyUsingShovel) {
      return undefined;
    }

    const roomListIndex = getRoomListIndex();
    if (!v.level.roomListIndexToDecorationGridIndexes.has(roomListIndex)) {
      return undefined;
    }

    // Since the room was filled with decorations to prevent any grid entities from respawning, if
    // the player uses a shovel, it will always reveal a crawl space. In order to restore the normal
    // shovel functionality, we cancel the shovel use, remove all the decorations, wait a frame,
    // manually use the shovel again, and then respawn the decorations. (We can't do it all on this
    // frame because updating the room causes two invocations of the shovel to happen.)
    const decorations = getGridEntities(GridEntityType.DECORATION);
    for (const decoration of decorations) {
      removeGridEntity(decoration, false);
    }

    const entityPtr = EntityPtr(player);
    this.runInNFrames.runNextGameFrame(() => {
      const futurePlayer = getPlayerFromPtr(entityPtr);
      if (futurePlayer === undefined) {
        return;
      }

      const futureRoomListIndex = getRoomListIndex();
      if (futureRoomListIndex !== roomListIndex) {
        return;
      }

      v.room.manuallyUsingShovel = true;
      futurePlayer.UseActiveItem(CollectibleType.WE_NEED_TO_GO_DEEPER);
      v.room.manuallyUsingShovel = false;

      const decorationGridIndexes =
        v.level.roomListIndexToDecorationGridIndexes.getAndSetDefault(
          roomListIndex,
        );
      emptyArray(decorationGridIndexes);
      this.preventGridEntityRespawn();
    });

    // Cancel the original effect.
    return true;
  };

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private readonly postNewRoomReordered = () => {
    this.setDecorationsInvisible();
  };

  /**
   * Every time we re-enter the room, the sprites for all of the decorations will come back, so we
   * have to remove them again.
   */
  private setDecorationsInvisible() {
    const room = game.GetRoom();
    const roomListIndex = getRoomListIndex();
    const decorationGridIndexes =
      v.level.roomListIndexToDecorationGridIndexes.get(roomListIndex);
    if (decorationGridIndexes === undefined) {
      return;
    }

    for (const gridIndex of decorationGridIndexes) {
      const gridEntity = room.GetGridEntity(gridIndex);
      if (gridEntity !== undefined) {
        // Other grid entities may have spawned, like trapdoors or crawl spaces. Thus, only make
        // decorations invisible.
        const gridEntityType = gridEntity.GetType();
        if (gridEntityType === GridEntityType.DECORATION) {
          setGridEntityInvisible(gridEntity);
        }
      }
    }
  }

  /**
   * Helper function to prevent any removed grid entities from respawning if the player re-enters
   * the current room.
   *
   * This is accomplished by spawning a new grid entity on every tile that does not already have a
   * grid entity. This will force the game to spawn the new grid entity instead of the old one. The
   * natural grid entity to choose for this purpose is a decoration, since it is non-interacting.
   * Then, the decorations are made invisible and any shovel uses are intercepted to avoid creating
   * a crawl space (instead of a trapdoor).
   *
   * Another option besides decorations would be to use a pressure plates with a state of 1, which
   * is a state that is normally unused by the game and makes it invisible & persistent. However,
   * pickups will not be able to spawn on pressure plates, which lead to various bugs (e.g. pickups
   * spawning on top of pits). Thus, using a decoration is preferable.
   *
   * Yet another option to accomplish this would be to replace the room data with that of an empty
   * room. However, the room data must exactly match the room type, the room shape, and the doors,
   * so this is not possible to do in a robust way without adding empty rooms to the mod's `content`
   * folder to draw the data from.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.PREVENT_GRID_ENTITY_RESPAWN`.
   */
  @Exported
  public preventGridEntityRespawn(): void {
    const room = game.GetRoom();
    const roomListIndex = getRoomListIndex();

    const decorationGridIndexes =
      v.level.roomListIndexToDecorationGridIndexes.getAndSetDefault(
        roomListIndex,
      );

    for (const gridIndex of getAllGridIndexes()) {
      const existingGridEntity = room.GetGridEntity(gridIndex);
      if (existingGridEntity !== undefined) {
        continue;
      }

      const decoration = spawnGridEntity(GridEntityType.DECORATION, gridIndex);
      if (decoration !== undefined) {
        setGridEntityInvisible(decoration);
      }

      decorationGridIndexes.push(gridIndex);
    }
  }
}
