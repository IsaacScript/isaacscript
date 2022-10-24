import { ModCallback, PlayerType } from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { arrayRemoveInPlace } from "../../../functions/array";
import { restart } from "../../../functions/run";
import { Feature } from "../../private/Feature";

/** Used for `runInNFrames` functions. */
type QueuedFunctionTuple = [frameCountToFire: int, func: () => void];

/**
 * Used for `setInterval` functions.
 *
 * The return value is whether or not to continue the function from firing.
 */
type IntervalFunctionTuple = [
  frameCountToFire: int,
  func: () => boolean,
  numIntervalFrames: int,
];

export class RunInNFrames extends Feature {
  /** @internal */
  public override v = {
    run: {
      queuedGameFunctionTuples: [] as QueuedFunctionTuple[],
      queuedRenderFunctionTuples: [] as QueuedFunctionTuple[],

      intervalGameFunctionTuples: [] as IntervalFunctionTuple[],
      intervalRenderFunctionTuples: [] as IntervalFunctionTuple[],
    },
  };

  // eslint-disable-next-line class-methods-use-this
  public override vConditionalFunc = (): boolean => false;

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    const gameFrameCount = game.GetFrameCount();

    checkExecuteQueuedFunctions(
      gameFrameCount,
      this.v.run.queuedGameFunctionTuples,
    );
    checkExecuteIntervalFunctions(
      gameFrameCount,
      this.v.run.intervalGameFunctionTuples,
    );
  };

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    const renderFrameCount = Isaac.GetFrameCount();

    checkExecuteQueuedFunctions(
      renderFrameCount,
      this.v.run.queuedRenderFunctionTuples,
    );
    checkExecuteIntervalFunctions(
      renderFrameCount,
      this.v.run.intervalRenderFunctionTuples,
    );
  };

  /**
   * Helper function to restart on the next render frame. Useful because it is impossible to restart
   * the game inside of the `POST_NEW_ROOM`, `POST_NEW_LEVEL`, or `POST_GAME_STARTED` callbacks when
   * a run is first starting.
   *
   * You can optionally specify a `PlayerType` to restart the game as that character.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.RUN_IN_N_FRAMES`.
   */
  @Exported
  public restartNextRenderFrame(character?: PlayerType): void {
    this.runNextRenderFrame(() => {
      restart(character);
    });
  }

  /**
   * Supply a function to run N game frames from now in the `POST_UPDATE` callback.
   *
   * For a usage example, see the documentation for the `runNextGameFrame`, which is used in a
   * similar way.
   *
   * Note that this function will not handle saving and quitting. If a player saving and quitting
   * before the deferred function fires would cause a bug in your mod, then you should handle
   * deferred functions manually using serializable data.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.RUN_IN_N_FRAMES`.
   */
  @Exported
  public runInNGameFrames(func: () => void, gameFrames: int): void {
    const gameFrameCount = game.GetFrameCount();
    const functionFireFrame = gameFrameCount + gameFrames;
    const tuple: QueuedFunctionTuple = [functionFireFrame, func];
    this.v.run.queuedGameFunctionTuples.push(tuple);
  }

  /**
   * Supply a function to run N render frames from now in the `POST_RENDER` callback.
   *
   * For a usage example, see the documentation for the `runNextGameFrame`, which is used in a
   * similar way.
   *
   * Note that this function will not handle saving and quitting. If a player saving and quitting
   * before the deferred function fires would cause a bug in your mod, then you should handle
   * deferred functions manually using serializable data.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.RUN_IN_N_FRAMES`.
   */
  @Exported
  public runInNRenderFrames(func: () => void, renderFrames: int): void {
    const renderFrameCount = Isaac.GetFrameCount();
    const functionFireFrame = renderFrameCount + renderFrames;
    const tuple: QueuedFunctionTuple = [functionFireFrame, func];
    this.v.run.queuedRenderFunctionTuples.push(tuple);
  }

  /**
   * Supply a function to run on the next `POST_UPDATE` callback.
   *
   * For example:
   *
   * ```ts
   * const NUM_EXPLODER_EXPLOSIONS = 5;
   *
   * function useItemExploder(player: EntityPlayer) {
   *   playSound("exploderBegin");
   *   explode(player, NUM_EXPLODER_EXPLOSIONS);
   * }
   *
   * function explode(player: EntityPlayer, numFramesLeft: int) {
   *   Isaac.Explode(player, undefined, 1);
   *   numFramesLeft -= 1;
   *   if (numFramesLeft === 0) {
   *     runNextFrame(() => {
   *       explode(player, numFramesLeft);
   *     });
   *   }
   * }
   * ```
   *
   * Note that this function will not handle saving and quitting. If a player saving and quitting
   * before the deferred function fires would cause a bug in your mod, then you should handle
   * deferred functions manually using serializable data.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.RUN_IN_N_FRAMES`.
   */
  @Exported
  public runNextGameFrame(func: () => void): void {
    this.runInNGameFrames(func, 1);
  }

  /**
   * Supply a function to run on the next `POST_RENDER` callback.
   *
   * For a usage example, see the documentation for the `runNextGameFrame`, which is used in a
   * similar way.
   *
   * Note that this function will not handle saving and quitting.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.RUN_IN_N_FRAMES`.
   */
  @Exported
  public runNextRenderFrame(func: () => void): void {
    this.runInNRenderFrames(func, 1);
  }

  /**
   * Supply a function to be repeatedly run on an interval of N game frames in the `POST_UPDATE`
   * callback. The function will continue to be fired until `false` is returned from the function.
   *
   * This is similar to the `setInterval` vanilla JavaScript function, except there is no
   * corresponding `clearInterval` function. (Instead, the return value from the supplied function
   * is used to stop the interval.)
   *
   * Note that this function will not handle saving and quitting. You must manually restart any
   * intervals if the player saves and quits in the middle of a run.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.RUN_IN_N_FRAMES`.
   *
   * @param func The function to repeatedly run on an interval.
   * @param gameFrames The amount of game frames to wait between each run.
   * @param runImmediately Whether or not to execute the function right now before waiting for the
   *                       interval.
   */
  @Exported
  public setIntervalGameFrames(
    func: () => boolean,
    gameFrames: int,
    runImmediately: boolean,
  ): void {
    const gameFrameCount = game.GetFrameCount();
    const functionFireFrame = gameFrameCount + gameFrames;
    const tuple: IntervalFunctionTuple = [functionFireFrame, func, gameFrames];
    this.v.run.intervalGameFunctionTuples.push(tuple);

    if (runImmediately) {
      func();
    }
  }

  /**
   * Supply a function to be repeatedly run on an interval of N render frames in the `POST_RENDER`
   * callback. The function will continue to be fired until `false` is returned from the function.
   *
   * This is similar to the `setInterval` vanilla JavaScript function, except there is no
   * corresponding `clearInterval` function. (Instead, the return value from the supplied function
   * is used to stop the interval.)
   *
   * Note that this function will not handle saving and quitting. You must manually restart any
   * intervals if the player saves and quits in the middle of a run.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.RUN_IN_N_FRAMES`.
   *
   * @param func The function to repeatedly run on an interval.
   * @param renderFrames The amount of game frames to wait between each run.
   * @param runImmediately Whether or not to execute the function right now before waiting for the
   *                       interval.
   */
  @Exported
  public setIntervalRenderFrames(
    func: () => boolean,
    renderFrames: int,
    runImmediately: boolean,
  ): void {
    const renderFrameCount = Isaac.GetFrameCount();
    const functionFireFrame = renderFrameCount + renderFrames;
    const tuple: IntervalFunctionTuple = [
      functionFireFrame,
      func,
      renderFrames,
    ];
    this.v.run.intervalGameFunctionTuples.push(tuple);

    if (runImmediately) {
      func();
    }
  }
}

function checkExecuteQueuedFunctions(
  frameCount: int,
  functionTuples: QueuedFunctionTuple[],
) {
  const firingFunctions = functionTuples.filter(
    ([frameCountToFire]) => frameCount >= frameCountToFire,
  );

  for (const tuple of firingFunctions) {
    const [_frameCountToFire, func] = tuple;
    func();
    arrayRemoveInPlace(functionTuples, tuple);
  }
}

function checkExecuteIntervalFunctions(
  frameCount: int,
  functionTuples: IntervalFunctionTuple[],
) {
  const firingFunctions = functionTuples.filter(
    ([frameCountToFire]) => frameCount >= frameCountToFire,
  );

  for (const tuple of firingFunctions) {
    const [_frameCountToFire, func, numIntervalFrames] = tuple;
    const returnValue = func();
    arrayRemoveInPlace(functionTuples, tuple);

    // Queue the next interval (as long as the function did not return false).
    if (returnValue) {
      const nextFireFrame = frameCount + numIntervalFrames;
      const newTuple: IntervalFunctionTuple = [
        nextFireFrame,
        func,
        numIntervalFrames,
      ];
      functionTuples.push(newTuple);
    }
  }
}
