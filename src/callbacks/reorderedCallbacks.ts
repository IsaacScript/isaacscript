// This provides the logic for PostGameStartedReordered, PostNewLevelReordered, and
// PostNewRoomReordered

// By default, callbacks fire in the following order:
// PostNewRoom --> PostNewLevel --> PostGameStarted
// It is easier to write mod code if the callbacks run in a more logical order:
// PostGameStarted --> PostNewLevel --> PostNewRoom
// Manually reorganize the callback execution so that this is the case

import {
  postGameStartedReorderedFire,
  postGameStartedReorderedHasSubscriptions,
} from "./subscriptions/postGameStartedReordered";
import {
  postNewLevelReorderedFire,
  postNewLevelReorderedHasSubscriptions,
} from "./subscriptions/postNewLevelReordered";
import {
  postNewRoomReorderedFire,
  postNewRoomReorderedHasSubscriptions,
} from "./subscriptions/postNewRoomReordered";

let currentStage = null as int | null;
let currentStageType = null as int | null;
let usedGlowingHourGlass = false;
let forceNewLevel = false;
let forceNewRoom = false;

/** @internal */
export function reorderedCallbacksInit(mod: Mod): void {
  mod.AddCallback(
    ModCallbacks.MC_USE_ITEM,
    useItemGlowingHourGlass,
    CollectibleType.COLLECTIBLE_GLOWING_HOUR_GLASS,
  ); // 3
  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStartedVanilla); // 15
  mod.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, postNewLevelVanilla); // 18
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoomVanilla); // 19
}

function hasSubscriptions() {
  return (
    postGameStartedReorderedHasSubscriptions() ||
    postNewLevelReorderedHasSubscriptions() ||
    postNewRoomReorderedHasSubscriptions()
  );
}

// ModCallbacks.MC_USE_ITEM (3)
// CollectibleType.COLLECTIBLE_GLOWING_HOUR_GLASS (422)
function useItemGlowingHourGlass() {
  // If Glowing Hour Glass is used on the first room of a floor,
  // it will send the player to the previous floor without triggering the PostNewLevel callback
  // Manually check for this
  usedGlowingHourGlass = true;
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
function postGameStartedVanilla(isContinued: boolean) {
  if (!hasSubscriptions()) {
    return;
  }

  postGameStartedReorderedFire(isContinued);
  recordCurrentStage();
  postNewLevelReorderedFire();
  postNewRoomReorderedFire();
}

// ModCallbacks.MC_POST_NEW_LEVEL (18)
function postNewLevelVanilla() {
  if (!hasSubscriptions()) {
    return;
  }

  const game = Game();
  const gameFrameCount = game.GetFrameCount();

  if (gameFrameCount === 0 && !forceNewLevel) {
    // Wait for the PostGameStarted callback to fire
    return;
  }
  forceNewLevel = false;

  recordCurrentStage();
  postNewLevelReorderedFire();
  postNewRoomReorderedFire();
}

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoomVanilla() {
  if (!hasSubscriptions()) {
    return;
  }

  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  if (usedGlowingHourGlass) {
    usedGlowingHourGlass = false;

    if (currentStage !== stage || currentStageType !== stageType) {
      // The player has used the Glowing Hour Glass to take them to the previous floor
      // (which does not trigger the PostNewLevel callback)
      // Emulate what happens in the PostNewLevel callback
      recordCurrentStage();
      postNewLevelReorderedFire();
      postNewRoomReorderedFire();
      return;
    }
  }

  if (
    (gameFrameCount === 0 ||
      currentStage !== stage ||
      currentStageType !== stageType) &&
    !forceNewRoom
  ) {
    return;
  }
  forceNewRoom = false;

  postNewRoomReorderedFire();
}

function recordCurrentStage() {
  const game = Game();
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();

  currentStage = stage;
  currentStageType = stageType;
}

/**
 * This is a utility function for users of the `ModCallbacksCustom.POST_NEW_LEVEL_REORDERED` custom
 * callback.
 *
 * If some specific cases, mods can change the current level during run initialization on the 0th
 * frame. However, due to how the callback reordering works, the custom PostNewLevel callback will
 * never fire on the 0th frame. To get around this, call this function before changing levels to
 * temporarily force the callback to fire.
 */
export function forceNewLevelCallback(): void {
  forceNewLevel = true;
}

/**
 * This is a utility function for users of the `ModCallbacksCustom.POST_NEW_ROOM_REORDERED` custom
 * callback.
 *
 * If some specific cases, mods can change the current room during run initialization on the 0th
 * frame. However, due to how the callback reordering works, the custom PostNewRoom callback will
 * never fire on the 0th frame. To get around this, call this function before changing rooms to
 * temporarily force the callback to fire.
 */
export function forceNewRoomCallback(): void {
  forceNewRoom = true;
}
