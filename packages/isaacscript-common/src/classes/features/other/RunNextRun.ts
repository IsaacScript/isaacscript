import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { emptyArray } from "../../../functions/array";
import { Feature } from "../../private/Feature";

const v = {
  persistent: {
    queuedFunctions: [] as Array<() => void>,
  },
};

export class RunNextRun extends Feature {
  /** @internal */
  public override v = v;

  public override vConditionalFunc = (): boolean => false;

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_GAME_STARTED_REORDERED,
        this.postGameStartedReorderedFalse,
        [false],
      ],
    ];
  }

  // ModCallbackCustom.POST_GAME_STARTED_REORDERED
  // false
  private readonly postGameStartedReorderedFalse = () => {
    for (const func of v.persistent.queuedFunctions) {
      func();
    }

    emptyArray(v.persistent.queuedFunctions);
  };

  /**
   * Supply a function to run on the next `POST_GAME_STARTED` callback.
   *
   * Note that this function will not handle saving and quitting. If a player saving and quitting
   * before the deferred function fires would cause a bug in your mod, then you should handle
   * deferred functions manually using serializable data.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.RUN_NEXT_ROOM`.
   */
  @Exported
  public runNextRun(func: () => void): void {
    v.persistent.queuedFunctions.push(func);
  }
}
