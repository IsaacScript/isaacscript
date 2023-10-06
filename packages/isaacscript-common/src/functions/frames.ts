import { game } from "../core/cachedClasses";

export function getElapsedGameFramesSince(gameFrameCount: int): int {
  const thisGameFrameCount = game.GetFrameCount();
  return thisGameFrameCount - gameFrameCount;
}

export function getElapsedRenderFramesSince(renderFrameCount: int): int {
  const thisRenderFrameCount = Isaac.GetFrameCount();
  return thisRenderFrameCount - renderFrameCount;
}

export function getElapsedRoomFramesSince(roomFrameCount: int): int {
  const room = game.GetRoom();
  const thisRoomFrameCount = room.GetFrameCount();
  return thisRoomFrameCount - roomFrameCount;
}

/**
 * Helper function to check if the current game frame count is higher than a specific game frame
 * count.
 *
 * This returns false if the submitted game frame count is null or undefined.
 */
export function isPastGameFrame(
  gameFrameCount: int | null | undefined,
): boolean {
  if (gameFrameCount === null || gameFrameCount === undefined) {
    return false;
  }

  const thisGameFrameCount = game.GetFrameCount();
  return thisGameFrameCount > gameFrameCount;
}

/**
 * Helper function to check if the current render frame count is higher than a specific render frame
 * count.
 *
 * This returns false if the submitted render frame count is null or undefined.
 */
export function isPastRenderFrame(
  renderFrameCount: int | null | undefined,
): boolean {
  if (renderFrameCount === null || renderFrameCount === undefined) {
    return false;
  }

  const thisRenderFrameCount = Isaac.GetFrameCount();
  return thisRenderFrameCount >= renderFrameCount;
}

/**
 * Helper function to check if the current room frame count is higher than a specific room frame
 * count.
 *
 * This returns false if the submitted room frame count is null or undefined.
 */
export function isPastRoomFrame(
  roomFrameCount: int | null | undefined,
): boolean {
  if (roomFrameCount === null || roomFrameCount === undefined) {
    return false;
  }

  const room = game.GetRoom();

  const thisGameFrameCount = room.GetFrameCount();
  return thisGameFrameCount > roomFrameCount;
}

/**
 * Helper function to check if the current game frame count is exactly equal to a specific game
 * frame count.
 *
 * This returns false if the submitted game frame count is null or undefined.
 */
export function onGameFrame(gameFrameCount: int | null | undefined): boolean {
  if (gameFrameCount === null || gameFrameCount === undefined) {
    return false;
  }

  const thisGameFrameCount = game.GetFrameCount();
  return thisGameFrameCount === gameFrameCount;
}

/**
 * Helper function to check if the current game frame count is equal to or higher than a specific
 * game frame count.
 *
 * This returns false if the submitted game frame count is null or undefined.
 */
export function onOrPastGameFrame(
  gameFrameCount: int | null | undefined,
): boolean {
  if (gameFrameCount === null || gameFrameCount === undefined) {
    return false;
  }

  const thisGameFrameCount = game.GetFrameCount();
  return thisGameFrameCount >= gameFrameCount;
}

/**
 * Helper function to check if the current render frame count is equal to or higher than a specific
 * render frame count.
 *
 * This returns false if the submitted render frame count is null or undefined.
 */
export function onOrPastRenderFrame(
  renderFrameCount: int | null | undefined,
): boolean {
  if (renderFrameCount === null || renderFrameCount === undefined) {
    return false;
  }

  const thisRenderFrameCount = Isaac.GetFrameCount();
  return thisRenderFrameCount >= renderFrameCount;
}

/**
 * Helper function to check if the current room frame count is equal to or higher than a specific
 * room frame count.
 *
 * This returns false if the submitted room frame count is null or undefined.
 */
export function onOrPastRoomFrame(
  roomFrameCount: int | null | undefined,
): boolean {
  if (roomFrameCount === null || roomFrameCount === undefined) {
    return false;
  }

  const room = game.GetRoom();

  const thisGameFrameCount = room.GetFrameCount();
  return thisGameFrameCount >= roomFrameCount;
}

/**
 * Helper function to check if the current render frame count is exactly equal to a specific render
 * frame count.
 *
 * This returns false if the submitted render frame count is null or undefined.
 */
export function onRenderFrame(
  renderFrameCount: int | null | undefined,
): boolean {
  if (renderFrameCount === null || renderFrameCount === undefined) {
    return false;
  }

  const thisRenderFrameCount = Isaac.GetFrameCount();
  return thisRenderFrameCount >= renderFrameCount;
}

/**
 * Helper function to check if the current room frame count is exactly equal to a specific room
 * frame count.
 *
 * This returns false if the submitted room frame count is null or undefined.
 */
export function onRoomFrame(roomFrameCount: int | null | undefined): boolean {
  if (roomFrameCount === null || roomFrameCount === undefined) {
    return false;
  }

  const room = game.GetRoom();

  const thisGameFrameCount = room.GetFrameCount();
  return thisGameFrameCount === roomFrameCount;
}
