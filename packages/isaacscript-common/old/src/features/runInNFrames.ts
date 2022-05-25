import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "run in N frames";

/** The frame count to fire, paired with the corresponding function. */
type FunctionTuple = [int, () => void];

const v = {
  run: {
    queuedGameFunctionTuples: [] as FunctionTuple[],
    queuedRenderFunctionTuples: [] as FunctionTuple[],
  },
};

/** @internal */
export function runInNFramesInit(mod: Mod): void {
  saveDataManager("runInNFrames", v, () => false);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  const gameFrameCount = game.GetFrameCount();

  checkExecuteQueuedFunctions(gameFrameCount, v.run.queuedGameFunctionTuples);
}

// ModCallback.POST_RENDER (2)
function postRender() {
  const renderFrameCount = Isaac.GetFrameCount();

  checkExecuteQueuedFunctions(
    renderFrameCount,
    v.run.queuedRenderFunctionTuples,
  );
}

function checkExecuteQueuedFunctions(
  frameCount: int,
  functionTuples: FunctionTuple[],
) {
  const functionsToFire: Array<() => void> = [];
  const indexesToRemove: int[] = [];
  functionTuples.forEach((functionTuple, i) => {
    const [frame, func] = functionTuple;
    if (frameCount >= frame) {
      functionsToFire.push(func);
      indexesToRemove.push(i);
    }
  });

  for (const indexToRemove of indexesToRemove) {
    functionTuples.splice(indexToRemove, 1);
  }

  for (const func of functionsToFire) {
    func();
  }
}

/**
 * Supply a function to run N game frames from now in the PostUpdate callback.
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
  const tuple: [int, () => void] = [functionFireFrame, func];
  v.run.queuedGameFunctionTuples.push(tuple);
}

/**
 * Supply a function to run N render frames from now in the PostRender callback.
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
  const tuple: [int, () => void] = [functionFireFrame, func];
  v.run.queuedRenderFunctionTuples.push(tuple);
}

/**
 * Supply a function to run on the next PostUpdate callback.
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
 * Supply a function to run on the next PostRender callback.
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
