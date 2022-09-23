import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallback } from "../private/CustomCallback";

export class PostRoomClearChanged extends CustomCallback<ModCallbackCustom2.POST_ROOM_CLEAR_CHANGED> {
  override v = {
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

  // ModCallback.POST_UPDATE (1)
  postUpdate = (): void => {
    const room = game.GetRoom();
    const roomClear = room.IsClear();

    if (roomClear !== this.v.room.cleared) {
      this.v.room.cleared = roomClear;
      this.fire(roomClear);
    }
  };

  // ModCallback.POST_NEW_ROOM (19)
  postNewRoom = (): void => {
    const room = game.GetRoom();
    const roomClear = room.IsClear();

    this.v.room.cleared = roomClear;
  };
}
