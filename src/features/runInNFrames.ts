import { getUpgradeErrorMsg } from "../errors";
import { saveDataManager } from "./saveDataManager/main";

const FEATURE_NAME = "run in N frames";

let initialized = false;

/** The game frame count to fire, paired with the corresponding function. */
type FunctionTuple = [int, () => void];

const v = {
  run: {
    queuedFunctionTuples: [] as FunctionTuple[],
  },
};

/** @hidden */
export function init(mod: Mod): void {
  initialized = true;
  saveDataManager("runInNFrames", v);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate);
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  const game = Game();
  const gameFrameCount = game.GetFrameCount();

  const functionsToFire: Array<() => void> = [];
  const indexesToRemove: int[] = [];
  for (let i = 0; i < v.run.queuedFunctionTuples.length; i++) {
    const functionTuple = v.run.queuedFunctionTuples[i];
    const [frame, func] = functionTuple;
    if (gameFrameCount >= frame) {
      functionsToFire.push(func);
      indexesToRemove.push(i);
    }
  }

  for (const indexToRemove of indexesToRemove) {
    v.run.queuedFunctionTuples.splice(indexToRemove, 1);
  }

  for (const func of functionsToFire) {
    func();
  }
}

/** Supply a function to run on the next PostUpdate callback. */
export function runNextFrame(func: () => void): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  runInNFrames(1, func);
}

/** Supply a function to run N frames from now in the PostUpdate callback. */
export function runInNFrames(frames: int, func: () => void): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const functionFireFrame = gameFrameCount + frames;
  const tuple: [int, () => void] = [functionFireFrame, func];
  v.run.queuedFunctionTuples.push(tuple);
}
