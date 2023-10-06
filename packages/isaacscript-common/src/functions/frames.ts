import { game } from "../core/cachedClasses";

/**
 * Helper function to check if the current game frame count is on or past a specific frame.
 *
 * This returns false if the submitted game frame count is null or undefined.
 */
export function isOnOrPastGameFrame(
  gameFrameCount: int | null | undefined,
): boolean {
  if (gameFrameCount === null || gameFrameCount === undefined) {
    return false;
  }

  const thisGameFrameCount = game.GetFrameCount();
  return thisGameFrameCount >= gameFrameCount;
}

/**
 * Helper function to check if the current render frame count is on or past a specific frame.
 *
 * This returns false if the submitted render frame count is null or undefined.
 */
export function isOnOrPastRenderFrame(
  renderFrameCount: int | null | undefined,
): boolean {
  if (renderFrameCount === null || renderFrameCount === undefined) {
    return false;
  }

  const thisRenderFrameCount = Isaac.GetFrameCount();
  return thisRenderFrameCount >= renderFrameCount;
}
