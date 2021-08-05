import { SCREEN_SIZE_BETWEEN_RENDER_SURFACES } from "../constants";

/**
 * In the options menu, players have the ability to set a HUD offset. However, mods do not have
 * access to this value. To get around this, Mod Config Menu provides a separate HUD offset setting
 * on the first page of the menu. This is intended to be set by end-users to match their vanilla HUD
 * offset setting so that mods can render UI elements to the screen in the correct position.
 *
 * @returns If the user does not have Mod Config Menu enabled, or does not have this option set,
 * then this function will return `Vector.Zero.` Otherwise, it will return a Vector that represents
 * a HUD offset that should be added to the position of a UI element.
 * @category UI
 */
export function getHUDOffsetVector(): Vector {
  const defaultVector = Vector.Zero;

  // In Mod Config Menu, players can set a Hud Offset
  if (
    ModConfigMenu === undefined ||
    ModConfigMenu.Config === undefined ||
    ModConfigMenu.Config.General === undefined
  ) {
    return defaultVector;
  }

  const hudOffset = ModConfigMenu.Config.General.HudOffset;
  if (hudOffset === undefined) {
    return defaultVector;
  }

  // Expected values are integers between 1 and 10
  if (type(hudOffset) !== "number" || hudOffset < 1 || hudOffset > 10) {
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

export function getScreenTopLeft(): Vector {
  return Vector.Zero;
}

export function getScreenTopRight(): Vector {
  const bottomRight = getScreenBottomRight();
  return Vector(bottomRight.X, 0);
}

export function getScreenBottomLeft(): Vector {
  const bottomRight = getScreenBottomRight();
  return Vector(0, bottomRight.Y);
}

export function getScreenBottomRight(): Vector {
  const game = Game();
  const room = game.GetRoom();

  // First, get the offset from (0, 0) that the top-left wall text is drawn at
  const renderSurfaceTopLeft = room.GetRenderSurfaceTopLeft();

  // Multiply it by 2 because the bottom-right-hand-corner will be offset in an identical way
  // (technically, the bottom right room render surface is not set identically,
  // but for a 1x1 room it would be, and the camera is consistent across all room shapes)
  const doubleRenderSurfaceTopLeft = renderSurfaceTopLeft.mul(2);

  return doubleRenderSurfaceTopLeft.add(SCREEN_SIZE_BETWEEN_RENDER_SURFACES);
}

export function getScreenCenter(): Vector {
  const bottomRight = getScreenBottomRight();
  return bottomRight.div(2);
}
