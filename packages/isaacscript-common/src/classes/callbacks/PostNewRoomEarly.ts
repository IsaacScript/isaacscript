import {
  EntityType,
  GridEntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  getTopLeftWallGridIndex,
  spawnGridEntity,
} from "../../functions/gridEntities";
import { logError } from "../../functions/logMisc";
import { CustomCallback } from "../private/CustomCallback";

export class PostNewRoomEarly extends CustomCallback<ModCallbackCustom.POST_NEW_ROOM_EARLY> {
  private currentRoomTopLeftWallPtrHash: PtrHash | null = null;

  /** The wall entity directly to the right of the top-left wall. */
  private currentRoomTopLeftWallPtrHash2: PtrHash | null = null;

  constructor() {
    super();

    this.callbacksUsed = [
      // 19
      [ModCallback.POST_NEW_ROOM, [this.postNewRoom]],

      // 24
      [ModCallback.PRE_ENTITY_SPAWN, [this.preEntitySpawn]],
    ];
  }

  // ModCallback.POST_NEW_ROOM (19)
  private postNewRoom = (): void => {
    this.checkRoomChanged();
  };

  // ModCallback.PRE_ENTITY_SPAWN (24)
  private preEntitySpawn = (): [EntityType, int, int, int] | undefined => {
    this.checkRoomChanged();
    return undefined;
  };

  private checkRoomChanged(): void {
    if (this.isNewRoom()) {
      this.fire();
    }
  }

  private isNewRoom(): boolean {
    const room = game.GetRoom();
    const topLeftWallGridIndex = getTopLeftWallGridIndex();
    const rightOfTopWallGridIndex = topLeftWallGridIndex + 1;

    let topLeftWall = room.GetGridEntity(topLeftWallGridIndex);
    let topLeftWall2 = room.GetGridEntity(rightOfTopWallGridIndex);

    // Sometimes, the PreEntitySpawn callback can fire before any grid entities in the room have
    // spawned, which means that the top-left wall will not exist. If ths is the case, then simply
    // spawn the top-left wall early.
    if (topLeftWall === undefined) {
      topLeftWall = spawnGridEntity(GridEntityType.WALL, topLeftWallGridIndex);
      if (topLeftWall === undefined) {
        logError(
          "Failed to spawn a new wall (1) for the POST_NEW_ROOM_EARLY callback.",
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
          "Failed to spawn a new wall (2) for the POST_NEW_ROOM_EARLY callback.",
        );
        return false;
      }
    }

    const oldTopLeftWallPtrHash = this.currentRoomTopLeftWallPtrHash;
    const oldTopLeftWallPtrHash2 = this.currentRoomTopLeftWallPtrHash2;
    this.currentRoomTopLeftWallPtrHash = GetPtrHash(topLeftWall);
    this.currentRoomTopLeftWallPtrHash2 = GetPtrHash(topLeftWall2);

    return (
      oldTopLeftWallPtrHash !== this.currentRoomTopLeftWallPtrHash ||
      oldTopLeftWallPtrHash2 !== this.currentRoomTopLeftWallPtrHash2
    );
  }
}
