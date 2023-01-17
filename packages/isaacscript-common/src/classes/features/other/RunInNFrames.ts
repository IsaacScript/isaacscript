import { ModCallback, PlayerType } from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { arrayRemoveInPlace } from "../../../functions/array";
import { restart } from "../../../functions/run";
import { Feature } from "../../private/Feature";
import { RoomHistory } from "./RoomHistory";

/** Used for `runInNFrames` functions. */
interface QueuedFunction {
  func: () => void;
  frameCountToFire: int;
  numRoomsEntered: int;
  cancelIfRoomChanges: boolean;
}

/**
 * Used for `setInterval` functions.
 *
 * The return value is whether or not to continue the function from firing.
 */
interface IntervalFunction {
  func: () => boolean;
  frameCountToFire: int;
  numRoomsEntered: int;
  cancelIfRoomChanges: boolean;
  numIntervalFrames: int;
}

export class RunInNFrames extends Feature {
  /** @internal */
  public override v = {
    run: {
      queuedGameFunctions: [] as QueuedFunction[],
      queuedRenderFunctions: [] as QueuedFunction[],

      intervalGameFunctions: [] as IntervalFunction[],
      intervalRenderFunctions: [] as IntervalFunction[],
    },
  };

  // eslint-disable-next-line class-methods-use-this
  public override vConditionalFunc = (): boolean => false;

  private roomHistory: RoomHistory;

  /** @internal */
  constructor(roomHistory: RoomHistory) {
    super();

    this.featuresUsed = [ISCFeature.ROOM_HISTORY];

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],

      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];

    this.roomHistory = roomHistory;
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    const gameFrameCount = game.GetFrameCount();
    const numRoomsEntered = this.roomHistory.getNumRoomsEntered();

    checkExecuteQueuedFunctions(
      this.v.run.queuedGameFunctions,
      gameFrameCount,
      numRoomsEntered,
    );
    checkExecuteIntervalFunctions(
      this.v.run.intervalGameFunctions,
      gameFrameCount,
      numRoomsEntered,
    );
  };

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    const renderFrameCount = Isaac.GetFrameCount();
    const numRoomsEntered = this.roomHistory.getNumRoomsEntered();

    checkExecuteQueuedFunctions(
      this.v.run.queuedRenderFunctions,
      renderFrameCount,
      numRoomsEntered,
    );
    checkExecuteIntervalFunctions(
      this.v.run.intervalRenderFunctions,
      renderFrameCount,
      numRoomsEntered,
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
   *
   * @param func The function to run.
   * @param gameFrames The amount of game frames to wait before running the function.
   * @param cancelIfRoomChanges Optional. Whether or not to cancel running the function if a new
   *                            room is loaded in the interim. Default is false.
   */
  @Exported
  public runInNGameFrames(
    func: () => void,
    gameFrames: int,
    cancelIfRoomChanges = false,
  ): void {
    const gameFrameCount = game.GetFrameCount();
    const numRoomsEntered = this.roomHistory.getNumRoomsEntered();

    const frameCountToFire = gameFrameCount + gameFrames;
    const queuedFunction: QueuedFunction = {
      func,
      frameCountToFire,
      numRoomsEntered,
      cancelIfRoomChanges,
    };
    this.v.run.queuedGameFunctions.push(queuedFunction);
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
   *
   * @param func The function to run.
   * @param renderFrames The amount of render frames to wait before running the function.
   * @param cancelIfRoomChanges Optional. Whether or not to cancel running the function if a new
   *                            room is loaded in the interim. Default is false.
   */
  @Exported
  public runInNRenderFrames(
    func: () => void,
    renderFrames: int,
    cancelIfRoomChanges = false,
  ): void {
    const renderFrameCount = Isaac.GetFrameCount();
    const numRoomsEntered = this.roomHistory.getNumRoomsEntered();

    const frameCountToFire = renderFrameCount + renderFrames;
    const queuedFunction: QueuedFunction = {
      func,
      frameCountToFire,
      numRoomsEntered,
      cancelIfRoomChanges,
    };
    this.v.run.queuedRenderFunctions.push(queuedFunction);
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
   *
   * @param func The function to run.
   * @param cancelIfRoomChanges Optional. Whether or not to cancel running the function if a new
   *                            room is loaded in the interim. Default is false.
   */
  @Exported
  public runNextGameFrame(func: () => void, cancelIfRoomChanges = false): void {
    this.runInNGameFrames(func, 1, cancelIfRoomChanges);
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
   *
   * @param func The function to run.
   * @param cancelIfRoomChanges Optional. Whether or not to cancel running the function if a new
   *                            room is loaded in the interim. Default is false.
   */
  @Exported
  public runNextRenderFrame(
    func: () => void,
    cancelIfRoomChanges = false,
  ): void {
    this.runInNRenderFrames(func, 1, cancelIfRoomChanges);
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
   * @param cancelIfRoomChanges Optional. Whether or not to cancel running the function if a new
   *                            room is loaded in the interim. Default is false.
   */
  @Exported
  public setIntervalGameFrames(
    func: () => boolean,
    gameFrames: int,
    runImmediately: boolean,
    cancelIfRoomChanges = false,
  ): void {
    const gameFrameCount = game.GetFrameCount();
    const numRoomsEntered = this.roomHistory.getNumRoomsEntered();

    const intervalFunction: IntervalFunction = {
      func,
      frameCountToFire: gameFrameCount + gameFrames,
      numRoomsEntered,
      cancelIfRoomChanges,
      numIntervalFrames: gameFrames,
    };
    this.v.run.intervalGameFunctions.push(intervalFunction);

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
   * @param cancelIfRoomChanges Optional. Whether or not to cancel running the function if a new
   *                            room is loaded in the interim. Default is false.
   */
  @Exported
  public setIntervalRenderFrames(
    func: () => boolean,
    renderFrames: int,
    runImmediately: boolean,
    cancelIfRoomChanges = false,
  ): void {
    const renderFrameCount = Isaac.GetFrameCount();
    const numRoomsEntered = this.roomHistory.getNumRoomsEntered();

    const intervalFunction: IntervalFunction = {
      func,
      frameCountToFire: renderFrameCount + renderFrames,
      numRoomsEntered,
      cancelIfRoomChanges,
      numIntervalFrames: renderFrames,
    };
    this.v.run.intervalGameFunctions.push(intervalFunction);

    if (runImmediately) {
      func();
    }
  }
}

function checkExecuteQueuedFunctions(
  functionTuples: QueuedFunction[],
  frameCount: int,
  newNumRoomsEntered: int,
) {
  const firingFunctions = functionTuples.filter(
    ({ frameCountToFire }) => frameCount >= frameCountToFire,
  );

  for (const firingFunction of firingFunctions) {
    const { func, cancelIfRoomChanges, numRoomsEntered } = firingFunction;

    if (!cancelIfRoomChanges || numRoomsEntered === newNumRoomsEntered) {
      func();
    }

    arrayRemoveInPlace(functionTuples, firingFunction);
  }
}

function checkExecuteIntervalFunctions(
  functionTuples: IntervalFunction[],
  frameCount: int,
  newNumRoomsEntered: int,
) {
  const firingFunctions = functionTuples.filter(
    ({ frameCountToFire }) => frameCount >= frameCountToFire,
  );

  for (const firingFunction of firingFunctions) {
    const { func, cancelIfRoomChanges, numRoomsEntered, numIntervalFrames } =
      firingFunction;

    let returnValue = false;
    if (!cancelIfRoomChanges || numRoomsEntered === newNumRoomsEntered) {
      returnValue = func();
    }

    arrayRemoveInPlace(functionTuples, firingFunction);

    // Queue the next interval (as long as the function did not return false).
    if (returnValue) {
      const newIntervalFunction: IntervalFunction = {
        func,
        frameCountToFire: frameCount + numIntervalFrames,
        numRoomsEntered,
        cancelIfRoomChanges,
        numIntervalFrames,
      };
      functionTuples.push(newIntervalFunction);
    }
  }
}
