import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { emptyArray } from "../../../functions/array";
import { Feature } from "../../private/Feature";

/**
 * Using the "luamod" console command with a mod that has custom shaders can crash the game. A
 * simple fix for this is automatically applied to any upgraded mods. This method was originally
 * discovered by AgentCucco.
 */
export class RunNextRoom extends Feature {
  /** @internal */
  public override v = {
    run: {
      queuedFunctions: [] as Array<() => void>,
    },
  };

  // eslint-disable-next-line class-methods-use-this
  public override vConditionalFunc = (): boolean => false;

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, this.postNewRoomReordered],
    ];
  }

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private postNewRoomReordered = () => {
    for (const func of this.v.run.queuedFunctions) {
      func();
    }

    emptyArray(this.v.run.queuedFunctions);
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
    this.v.run.queuedFunctions.push(func);
  }
}
