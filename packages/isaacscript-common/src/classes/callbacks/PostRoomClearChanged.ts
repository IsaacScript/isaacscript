import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import type { FireArgs, OptionalArgs } from "../private/CustomCallback";
import { CustomCallback } from "../private/CustomCallback";

type T = ModCallbackCustom.POST_ROOM_CLEAR_CHANGED;

const v = {
  room: {
    cleared: false,
  },
};

export class PostRoomClearChanged extends CustomCallback<T> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, this.postNewRoomReordered],
    ];
  }

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [roomClear] = fireArgs;
    const [callbackRoomClear] = optionalArgs;

    return callbackRoomClear === undefined || callbackRoomClear === roomClear;
  };

  // ModCallback.POST_UPDATE (1)
  private readonly postUpdate = (): void => {
    const room = game.GetRoom();
    const roomClear = room.IsClear();

    if (roomClear !== v.room.cleared) {
      v.room.cleared = roomClear;
      this.fire(roomClear);
    }
  };

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private readonly postNewRoomReordered = (): void => {
    const room = game.GetRoom();
    const roomClear = room.IsClear();

    v.room.cleared = roomClear;
    Isaac.DebugString(
      `GETTING HERE - set v.room.cleared --> ${roomClear} (game frame ${game.GetFrameCount()})`,
    );
  };
}
