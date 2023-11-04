import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { emptyArray } from "../../../functions/array";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    queuedFunctions: [] as Array<() => void>,
  },
};

export class RunNextRoom extends Feature {
  /** @internal */
  public override v = v;

  public override vConditionalFunc = (): boolean => false;

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, this.postNewRoomReordered],
    ];
  }

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private readonly postNewRoomReordered = () => {
    for (const func of v.run.queuedFunctions) {
      func();
    }

    emptyArray(v.run.queuedFunctions);
  };

  /**
   * Supply a function to run on the next `POST_NEW_ROOM` callback.
   *
   * Note that this function will not handle saving and quitting. If a player saving and quitting
   * before the deferred function fires would cause a bug in your mod, then you should handle
   * deferred functions manually using serializable data.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.RUN_NEXT_ROOM`.
   */
  @Exported
  public runNextRoom(func: () => void): void {
    v.run.queuedFunctions.push(func);
  }
}
