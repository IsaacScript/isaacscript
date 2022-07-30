import { LevelStage, StageType } from "isaac-typescript-definitions";
import {
  forceNewLevelCallbackInternal,
  forceNewRoomCallbackInternal,
  reorderedCallbacksSetStageInternal,
} from "../callbacks/reorderedCallbacks";

/**
 * This is a utility function for users of the `ModCallbackCustom.POST_NEW_LEVEL_REORDERED` custom
 * callback.
 *
 * If some specific cases, mods can change the current level during run initialization on the 0th
 * frame. However, due to how the callback reordering works, the custom `POST_NEW_LEVEL` callback
 * will never fire on the 0th frame. To get around this, call this function before changing levels
 * to temporarily force the callback to fire.
 */
export function forceNewLevelCallback(): void {
  forceNewLevelCallbackInternal();
}

/**
 * This is a utility function for users of the `ModCallbackCustom.POST_NEW_ROOM_REORDERED` custom
 * callback.
 *
 * If some specific cases, mods can change the current room during run initialization on the 0th
 * frame. However, due to how the callback reordering works, the custom `POST_NEW_ROOM` callback
 * will never fire on the 0th frame. To get around this, call this function before changing rooms to
 * temporarily force the callback to fire.
 */
export function forceNewRoomCallback(): void {
  forceNewRoomCallbackInternal();
}

/**
 * Helper function to manually set the variable that the reordered callback logic uses to track the
 * current stage and stage type.
 *
 * This is useful because if the stage is changed with the `Game.SetStage` method, the reordered
 * callbacks will stop working.
 */
export function reorderedCallbacksSetStage(
  stage: LevelStage,
  stageType: StageType,
): void {
  reorderedCallbacksSetStageInternal(stage, stageType);
}
