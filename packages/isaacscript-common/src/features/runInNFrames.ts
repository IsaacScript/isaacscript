import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { arrayRemoveIndexInPlace } from "../functions/array";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "runInNFrames";

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

type FiringFunctionTuple = [
  index: int,
  func: (() => void) | (() => boolean),
  numIntervalFrames: int | undefined,
];

const v = {
  run: {
    queuedGameFunctionTuples: [] as QueuedFunctionTuple[],
    queuedRenderFunctionTuples: [] as QueuedFunctionTuple[],

    intervalGameFunctionTuples: [] as IntervalFunctionTuple[],
    intervalRenderFunctionTuples: [] as IntervalFunctionTuple[],
  },
};

/** @internal */
export function runInNFramesInit(mod: Mod): void {
  saveDataManager(FEATURE_NAME, v, () => false); // Functions are not serializable.

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  const gameFrameCount = game.GetFrameCount();

  checkExecuteQueuedFunctions(gameFrameCount, v.run.queuedGameFunctionTuples);
  checkExecuteIntervalFunctions(
    gameFrameCount,
    v.run.intervalGameFunctionTuples,
  );
}

// ModCallback.POST_RENDER (2)
function postRender() {
  const renderFrameCount = Isaac.GetFrameCount();

  checkExecuteQueuedFunctions(
    renderFrameCount,
    v.run.queuedRenderFunctionTuples,
  );
  checkExecuteIntervalFunctions(
    renderFrameCount,
    v.run.intervalRenderFunctionTuples,
  );
}

function checkExecuteQueuedFunctions(
  frameCount: int,
  functionTuples: QueuedFunctionTuple[],
) {
  const firingFunctions = getFunctionsThatShouldFireOnThisFrame(
    frameCount,
    functionTuples,
  );

  for (const [i, func] of firingFunctions) {
    func();
    arrayRemoveIndexInPlace(functionTuples, i);
  }
}

function checkExecuteIntervalFunctions(
  frameCount: int,
  functionTuples: IntervalFunctionTuple[],
) {
  const firingFunctions = getFunctionsThatShouldFireOnThisFrame(
    frameCount,
    functionTuples,
  );

  for (const [i, func, numIntervalFrames] of firingFunctions) {
    const returnValue = func();

    arrayRemoveIndexInPlace(functionTuples, i);

    // Queue the next interval (as long as the function did not return false).
    if (numIntervalFrames !== undefined && returnValue === false) {
      const nextFireFrame = frameCount + numIntervalFrames;
      const tuple: IntervalFunctionTuple = [
        nextFireFrame,
        func as () => boolean,
        numIntervalFrames,
      ];
      functionTuples.push(tuple);
    }
  }
}

function getFunctionsThatShouldFireOnThisFrame(
  frameCount: int,
  functionTuples: QueuedFunctionTuple[] | IntervalFunctionTuple[],
): readonly FiringFunctionTuple[] {
  const firingFunctionTuples: FiringFunctionTuple[] = [];
  functionTuples.forEach((functionTuple, i) => {
    const [frameCountToFire, func, numIntervalFrames] = functionTuple;

    if (frameCount >= frameCountToFire) {
      const firingFunctionTuple: FiringFunctionTuple = [
        i,
        func,
        numIntervalFrames,
      ];
      firingFunctionTuples.push(firingFunctionTuple);
    }
  });

  return firingFunctionTuples;
}

/**
 * Supply a function to run N game frames from now in the `POST_UPDATE` callback.
 *
 * For a usage example, see the documentation for the `runNextGameFrame`, which is used in a similar
 * way.
 *
 * Note that this function will not handle saving and quitting. If a player saving and quitting
 * before the deferred function fires would cause a bug in your mod, then you should handle deferred
 * functions manually using serializable data.
 */
export function runInNGameFrames(func: () => void, gameFrames: int): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const gameFrameCount = game.GetFrameCount();
  const functionFireFrame = gameFrameCount + gameFrames;
  const tuple: QueuedFunctionTuple = [functionFireFrame, func];
  v.run.queuedGameFunctionTuples.push(tuple);
}

/**
 * Supply a function to run N render frames from now in the `POST_RENDER` callback.
 *
 * For a usage example, see the documentation for the `runNextGameFrame`, which is used in a similar
 * way.
 *
 * Note that this function will not handle saving and quitting. If a player saving and quitting
 * before the deferred function fires would cause a bug in your mod, then you should handle deferred
 * functions manually using serializable data.
 */
export function runInNRenderFrames(func: () => void, renderFrames: int): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const renderFrameCount = Isaac.GetFrameCount();
  const functionFireFrame = renderFrameCount + renderFrames;
  const tuple: QueuedFunctionTuple = [functionFireFrame, func];
  v.run.queuedRenderFunctionTuples.push(tuple);
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
 * before the deferred function fires would cause a bug in your mod, then you should handle deferred
 * functions manually using serializable data.
 */
export function runNextGameFrame(func: () => void): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  runInNGameFrames(func, 1);
}

/**
 * Supply a function to run on the next `POST_RENDER` callback.
 *
 * For a usage example, see the documentation for the `runNextGameFrame`, which is used in a similar
 * way.
 *
 * Note that this function will not handle saving and quitting.
 */
export function runNextRenderFrame(func: () => void): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  runInNRenderFrames(func, 1);
}

/**
 * Supply a function to be repeatedly run on an interval of N game frames in the `POST_UPDATE`
 * callback. The function will continue to be fired until `false` is returned from the function.
 *
 * This is similar to the `setInterval` vanilla JavaScript function, except there is no
 * corresponding `clearInterval` function. (Instead, the return value from the supplied function is
 * used to stop the interval.)
 *
 * Note that this function will not handle saving and quitting. You must manually restart any
 * intervals if the player saves and quits in the middle of a run.
 *
 * @param func The function to repeatedly run on an interval.
 * @param gameFrames The amount of game frames to wait between each run.
 * @param runImmediately Whether or not to execute the function right now before waiting for the
 *                       interval.
 */
export function setIntervalGameFrames(
  func: () => boolean,
  gameFrames: int,
  runImmediately: boolean,
): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const gameFrameCount = game.GetFrameCount();
  const functionFireFrame = gameFrameCount + gameFrames;
  const tuple: IntervalFunctionTuple = [functionFireFrame, func, gameFrames];
  v.run.intervalGameFunctionTuples.push(tuple);

  if (runImmediately) {
    func();
  }
}

/**
 * Supply a function to be repeatedly run on an interval of N render frames in the `POST_RENDER`
 * callback. The function will continue to be fired until `false` is returned from the function.
 *
 * This is similar to the `setInterval` vanilla JavaScript function, except there is no
 * corresponding `clearInterval` function. (Instead, the return value from the supplied function is
 * used to stop the interval.)
 *
 * Note that this function will not handle saving and quitting. You must manually restart any
 * intervals if the player saves and quits in the middle of a run.
 *
 * @param func The function to repeatedly run on an interval.
 * @param renderFrames The amount of game frames to wait between each run.
 * @param runImmediately Whether or not to execute the function right now before waiting for the
 *                       interval.
 */
export function setIntervalRenderFrames(
  func: () => boolean,
  renderFrames: int,
  runImmediately: boolean,
): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const renderFrameCount = Isaac.GetFrameCount();
  const functionFireFrame = renderFrameCount + renderFrames;
  const tuple: IntervalFunctionTuple = [functionFireFrame, func, renderFrames];
  v.run.intervalGameFunctionTuples.push(tuple);

  if (runImmediately) {
    func();
  }
}
