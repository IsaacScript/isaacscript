import type { EntityType } from "isaac-typescript-definitions";
import { GridEntityType, ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  getTopLeftWallGridIndex,
  spawnGridEntity,
} from "../../functions/gridEntities";
import { logError } from "../../functions/log";
import { shouldFireRoom } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNewRoomEarly extends CustomCallback<ModCallbackCustom.POST_NEW_ROOM_EARLY> {
  private currentRoomTopLeftWallPtrHash: PtrHash | null = null;

  /** The wall entity directly to the right of the top-left wall. */
  private currentRoomTopLeftWallPtrHash2: PtrHash | null = null;

  constructor() {
    super();

    this.callbacksUsed = [
      // 19
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      [ModCallback.POST_NEW_ROOM, this.postNewRoom],

      // 24
      [ModCallback.PRE_ENTITY_SPAWN, this.preEntitySpawn],
    ];
  }

  protected override shouldFire = shouldFireRoom;

  // ModCallback.POST_NEW_ROOM (19)
  private readonly postNewRoom = (): void => {
    this.checkRoomChanged();
  };

  // ModCallback.PRE_ENTITY_SPAWN (24)
  private readonly preEntitySpawn = ():
    | [entityType: EntityType, variant: int, subType: int, initSeed: Seed]
    | undefined => {
    this.checkRoomChanged();
    return undefined;
  };

  private checkRoomChanged(): void {
    if (this.isNewRoom()) {
      const room = game.GetRoom();
      const roomType = room.GetType();

      this.fire(roomType);
    }
  }

  private isNewRoom(): boolean {
    const room = game.GetRoom();
    const topLeftWallGridIndex = getTopLeftWallGridIndex();
    const rightOfTopWallGridIndex = topLeftWallGridIndex + 1;

    let topLeftWall = room.GetGridEntity(topLeftWallGridIndex);
    let topLeftWall2 = room.GetGridEntity(rightOfTopWallGridIndex);

    // Sometimes, the `PRE_ENTITY_SPAWN` callback can fire before any grid entities in the room have
    // spawned, which means that the top-left wall will not exist. If ths is the case, then simply
    // spawn the top-left wall early.
    if (topLeftWall === undefined) {
      topLeftWall = spawnGridEntity(GridEntityType.WALL, topLeftWallGridIndex);
      if (topLeftWall === undefined) {
        logError(
          "Failed to spawn a new wall for the POST_NEW_ROOM_EARLY callback (on the first try).",
        );
        return false;
      }
    }

    // For some reason, the above check will rarely fail. We duplicate the check with another wall
    // segment to increase the reliability.
    if (topLeftWall2 === undefined) {
      topLeftWall2 = spawnGridEntity(
        GridEntityType.WALL,
        rightOfTopWallGridIndex,
      );
      if (topLeftWall2 === undefined) {
        logError(
          "Failed to spawn a new wall for the POST_NEW_ROOM_EARLY callback (on the second try).",
        );
        return false;
      }
    }

    const oldTopLeftWallPtrHash = this.currentRoomTopLeftWallPtrHash;
    const oldTopLeftWallPtrHash2 = this.currentRoomTopLeftWallPtrHash2;
    this.currentRoomTopLeftWallPtrHash = GetPtrHash(topLeftWall);
    this.currentRoomTopLeftWallPtrHash2 = GetPtrHash(topLeftWall2);

    return (
      oldTopLeftWallPtrHash !== this.currentRoomTopLeftWallPtrHash
      || oldTopLeftWallPtrHash2 !== this.currentRoomTopLeftWallPtrHash2
    );
  }
}
