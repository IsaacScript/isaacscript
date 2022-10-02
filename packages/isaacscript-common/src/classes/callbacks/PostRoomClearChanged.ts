import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.POST_ROOM_CLEAR_CHANGED;

export class PostRoomClearChanged extends CustomCallback<T> {
  public override v = {
    room: {
      cleared: false,
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
      [ModCallback.POST_NEW_ROOM, [this.postNewRoom]], // 19
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [roomClear] = fireArgs;
    const [callbackRoomClear] = optionalArgs;

    return callbackRoomClear === undefined || callbackRoomClear === roomClear;
  };

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    const room = game.GetRoom();
    const roomClear = room.IsClear();

    if (roomClear !== this.v.room.cleared) {
      this.v.room.cleared = roomClear;
      this.fire(roomClear);
    }
  };

  // ModCallback.POST_NEW_ROOM (19)
  private postNewRoom = (): void => {
    const room = game.GetRoom();
    const roomClear = room.IsClear();

    this.v.room.cleared = roomClear;
  };
}
