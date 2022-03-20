import { game } from "../cachedClasses";
import { UI_HEART_WIDTH } from "../constants";

/**
 * In the options menu, players have the ability to set a HUD offset. However, mods do not have
 * access to this value. To get around this, Mod Config Menu provides a separate HUD offset setting
 * on the first page of the menu. This is intended to be set by end-users to match their vanilla HUD
 * offset setting so that mods can render UI elements to the screen in the correct position.
 *
 * @returns If the user does not have Mod Config Menu enabled, or does not have this option set,
 * then this function will return `Vector.Zero.` Otherwise, it will return a Vector that represents
 * a HUD offset that should be added to the position of a UI element.
 */
export function getHUDOffsetVector(): Vector {
  const defaultVector = Vector.Zero;

  // Convert e.g. 0.4 to 4
  const hudOffset = math.floor(Options.HUDOffset * 10);

  // Expected values are integers between 1 and 10
  if (hudOffset < 1 || hudOffset > 10) {
    return defaultVector;
  }

  const x = hudOffset * 2;
  let y = hudOffset;
  if (y >= 4) {
    y += 1;
  }
  if (y >= 9) {
    y += 1;
  }

  return Vector(x, y);
}

/**
 * Returns how many hearts are in the heart UI row. If the player has more than 6 hearts, this
 * function will return 6.
 */
export function getHeartRowLength(player: EntityPlayer): int {
  const maxHearts = player.GetMaxHearts();
  const soulHearts = player.GetSoulHearts();
  const boneHearts = player.GetBoneHearts();

  const combinedHearts = maxHearts + soulHearts + boneHearts * 2; // There are no half bone hearts
  const heartRowLength = combinedHearts / 2;

  // After 6 hearts, the hearts wrap to a second row
  return Math.min(heartRowLength, 6);
}

/**
 * Helper function to get the width of the first player's hearts on the UI. This is useful for
 * drawing UI elements to the right of where the player's hearts are. Make sure to use this in
 * combination with the the `getHUDOffsetVector` helper function.
 */
export function getHeartsUIWidth(): int {
  const level = game.GetLevel();
  const curses = level.GetCurses();
  const player = Isaac.GetPlayer();
  const extraLives = player.GetExtraLives();
  const effects = player.GetEffects();
  const hasHolyMantleEffect = effects.HasCollectibleEffect(
    CollectibleType.COLLECTIBLE_HOLY_MANTLE,
  );

  let heartRowLength = getHeartRowLength(player);
  if (hasHolyMantleEffect) {
    heartRowLength += 1;
  }
  if (curses === LevelCurse.CURSE_OF_THE_UNKNOWN) {
    heartRowLength = 1;
  }

  let width = heartRowLength * UI_HEART_WIDTH;
  if (extraLives > 9) {
    width += 20;
    if (player.HasCollectible(CollectibleType.COLLECTIBLE_GUPPYS_COLLAR)) {
      width += 6;
    }
  } else if (extraLives > 0) {
    width += 16;
    if (player.HasCollectible(CollectibleType.COLLECTIBLE_GUPPYS_COLLAR)) {
      width += 4;
    }
  }

  return width;
}

export function getScreenBottomLeftPos(): Vector {
  const bottomRight = getScreenBottomRightPos();
  return Vector(0, bottomRight.Y);
}

export function getScreenBottomRightPos(): Vector {
  const screenWidth = Isaac.GetScreenWidth();
  const screenHeight = Isaac.GetScreenHeight();

  return Vector(screenWidth, screenHeight);
}

export function getScreenCenterPos(): Vector {
  const bottomRight = getScreenBottomRightPos();
  return bottomRight.div(2);
}

export function getScreenTopLeftPos(): Vector {
  return Vector.Zero;
}

export function getScreenTopRightPos(): Vector {
  const bottomRight = getScreenBottomRightPos();
  return Vector(bottomRight.X, 0);
}

/**
 * Get how many hearts are currently being shown on the hearts UI.
 *
 * This function is originally from piber20 Helper.
 */
export function getVisibleHearts(player: EntityPlayer): int {
  const effectiveMaxHearts = player.GetEffectiveMaxHearts();
  const soulHearts = player.GetSoulHearts();
  const boneHearts = player.GetBoneHearts();

  const maxHearts = math.max(effectiveMaxHearts, boneHearts * 2);

  let visibleHearts = math.ceil((maxHearts + soulHearts) / 2);
  if (visibleHearts < 1) {
    visibleHearts = 1;
  }

  return visibleHearts;
}
