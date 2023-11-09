import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { Feature } from "../../private/Feature";

const v = {
  room: {
    roomClearGameFrame: undefined as int | undefined,
    roomClearRenderFrame: undefined as int | undefined,
    roomClearRoomFrame: undefined as int | undefined,
  },
};

export class RoomClearFrame extends Feature {
  /** @internal */
  public override v = v;

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_ROOM_CLEAR_CHANGED,
        this.postRoomClearChangedTrue,
      ],
    ];
  }

  // ModCallbackCustom.POST_ROOM_CLEAR_CHANGED
  // true
  private readonly postRoomClearChangedTrue = () => {
    const gameFrameCount = game.GetFrameCount();
    const room = game.GetRoom();
    const roomFrameCount = room.GetFrameCount();
    const renderFrameCount = Isaac.GetFrameCount();

    v.room.roomClearGameFrame = gameFrameCount;
    v.room.roomClearRenderFrame = renderFrameCount;
    v.room.roomClearRoomFrame = roomFrameCount;
  };

  /**
   * Helper function to get the game frame (i.e. `Game.GetFrameCount`) of the last time that this
   * room was cleared. Returns undefined if the room has never been cleared.
   *
   * Note that if the room is left, all room clear tracking for it will be discarded.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ROOM_CLEAR_FRAME`.
   *
   * @public
   */
  @Exported
  public getRoomClearGameFrame(): int | undefined {
    return v.room.roomClearGameFrame;
  }

  /**
   * Helper function to get the render frame (i.e. `Isaac.GetFrameCount`) of the last time that this
   * room was cleared. Returns undefined if the room has never been cleared.
   *
   * Note that if the room is left, all room clear tracking for it will be discarded.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ROOM_CLEAR_FRAME`.
   *
   * @public
   */
  @Exported
  public getRoomClearRenderFrame(): int | undefined {
    return v.room.roomClearRenderFrame;
  }

  /**
   * Helper function to get the room frame (i.e. `Room.GetFrameCount`) of the last time that this
   * room was cleared. Returns undefined if the room has never been cleared.
   *
   * Note that if the room is left, all room clear tracking for it will be discarded.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ROOM_CLEAR_FRAME`.
   *
   * @public
   */
  @Exported
  public getRoomClearRoomFrame(): int | undefined {
    return v.room.roomClearRoomFrame;
  }
}
