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
 */
export function isAfterGameFrame(gameFrameCount: int): boolean {
  const thisGameFrameCount = game.GetFrameCount();
  return thisGameFrameCount > gameFrameCount;
}

/**
 * Helper function to check if the current render frame count is higher than a specific render frame
 * count.
 */
export function isAfterRenderFrame(renderFrameCount: int): boolean {
  const thisRenderFrameCount = Isaac.GetFrameCount();
  return thisRenderFrameCount > renderFrameCount;
}

/**
 * Helper function to check if the current room frame count is higher than a specific room frame
 * count.
 */
export function isAfterRoomFrame(roomFrameCount: int): boolean {
  const room = game.GetRoom();

  const thisGameFrameCount = room.GetFrameCount();
  return thisGameFrameCount > roomFrameCount;
}

/**
 * Helper function to check if the current game frame count is lower than a specific game frame
 * count.
 */
export function isBeforeGameFrame(gameFrameCount: int): boolean {
  const thisGameFrameCount = game.GetFrameCount();
  return thisGameFrameCount < gameFrameCount;
}

/**
 * Helper function to check if the current render frame count is lower than a specific render frame
 * count.
 */
export function isBeforeRenderFrame(renderFrameCount: int): boolean {
  const thisRenderFrameCount = Isaac.GetFrameCount();
  return thisRenderFrameCount < renderFrameCount;
}

/**
 * Helper function to check if the current room frame count is lower than a specific room frame
 * count.
 */
export function isBeforeRoomFrame(roomFrameCount: int): boolean {
  const room = game.GetRoom();

  const thisGameFrameCount = room.GetFrameCount();
  return thisGameFrameCount < roomFrameCount;
}

/**
 * Helper function to check if the current game frame count is exactly equal to a specific game
 * frame count.
 *
 * This returns false if the submitted render frame count is null or undefined.
 */
export function onGameFrame(gameFrameCount: int | null | undefined): boolean {
  const thisGameFrameCount = game.GetFrameCount();
  return thisGameFrameCount === gameFrameCount;
}

/**
 * Helper function to check if the current game frame count is equal to or higher than a specific
 * game frame count.
 */
export function onOrAfterGameFrame(gameFrameCount: int): boolean {
  const thisGameFrameCount = game.GetFrameCount();
  return thisGameFrameCount >= gameFrameCount;
}

/**
 * Helper function to check if the current render frame count is equal to or higher than a specific
 * render frame count.
 */
export function onOrAfterRenderFrame(renderFrameCount: int): boolean {
  const thisRenderFrameCount = Isaac.GetFrameCount();
  return thisRenderFrameCount >= renderFrameCount;
}

/**
 * Helper function to check if the current room frame count is equal to or higher than a specific
 * room frame count.
 */
export function onOrAfterRoomFrame(roomFrameCount: int): boolean {
  const room = game.GetRoom();

  const thisGameFrameCount = room.GetFrameCount();
  return thisGameFrameCount >= roomFrameCount;
}

/**
 * Helper function to check if the current game frame count is equal to or lower than a specific
 * game frame count.
 */
export function onOrBeforeGameFrame(gameFrameCount: int): boolean {
  const thisGameFrameCount = game.GetFrameCount();
  return thisGameFrameCount <= gameFrameCount;
}

/**
 * Helper function to check if the current render frame count is equal to or lower than a specific
 * render frame count.
 */
export function onOrBeforeRenderFrame(renderFrameCount: int): boolean {
  const thisRenderFrameCount = Isaac.GetFrameCount();
  return thisRenderFrameCount <= renderFrameCount;
}

/**
 * Helper function to check if the current room frame count is equal to or lower than a specific
 * room frame count.
 */
export function onOrBeforeRoomFrame(roomFrameCount: int): boolean {
  const room = game.GetRoom();

  const thisGameFrameCount = room.GetFrameCount();
  return thisGameFrameCount <= roomFrameCount;
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
  const thisRenderFrameCount = Isaac.GetFrameCount();
  return thisRenderFrameCount === renderFrameCount;
}

/**
 * Helper function to check if the current room frame count is exactly equal to a specific room
 * frame count.
 *
 * This returns false if the submitted room frame count is null or undefined.
 */
export function onRoomFrame(roomFrameCount: int | null | undefined): boolean {
  const room = game.GetRoom();

  const thisGameFrameCount = room.GetFrameCount();
  return thisGameFrameCount === roomFrameCount;
}
