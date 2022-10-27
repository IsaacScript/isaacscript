import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { Feature } from "../../private/Feature";

export class RoomClearFrame extends Feature {
  /** @internal */
  public override v = {
    room: {
      roomClearGameFrame: undefined as int | undefined,
      roomClearRoomFrame: undefined as int | undefined,
    },
  };

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_ROOM_CLEAR_CHANGED,
        [this.postRoomClearChangedTrue],
      ],
    ];
  }

  // ModCallbackCustom.POST_ROOM_CLEAR_CHANGED
  // true
  private postRoomClearChangedTrue = () => {
    const gameFrameCount = game.GetFrameCount();
    const room = game.GetRoom();
    const roomFrameCount = room.GetFrameCount();

    this.v.room.roomClearGameFrame = gameFrameCount;
    this.v.room.roomClearRoomFrame = roomFrameCount;
  };

  /**
   * Helper function to get the game frame (i.e. `Game.GetFrameCount`) of the last time that this
   * room was cleared. Returns undefined if the room has never been cleared.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ROOM_CLEAR_FRAME`.
   */
  @Exported
  public getRoomClearGameFrame(): int | undefined {
    return this.v.room.roomClearGameFrame;
  }

  /**
   * Helper function to get the room frame (i.e. `Room.GetFrameCount`) of the last time that this
   * room was cleared. Returns undefined if the room has never been cleared.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ROOM_CLEAR_FRAME`.
   */
  @Exported
  public getRoomClearRoomFrame(): int | undefined {
    return this.v.room.roomClearGameFrame;
  }
}
