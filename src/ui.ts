import { game } from "./game";

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

/**
 * Helper function for getting the middle of the screen.
 * Usually, `Isaac.WorldToRenderPosition(Game().GetRoom().GetCenterPos())` will correspond with
 * this, but that method will fail in a non-1x1 room.
 *
 * This function is taken from Alphabirth:
 * https://steamcommunity.com/sharedfiles/filedetails/?id=848056541
 */
export function getScreenCenterPosition(): Vector {
  const room = game.GetRoom();
  const shape = room.GetRoomShape();
  const centerPos = room.GetCenterPos();
  const topLeftPos = room.GetTopLeftPos();
  const centerOffset = centerPos.sub(topLeftPos);
  const pos = centerPos;

  if (centerOffset.X > 260) {
    pos.X -= 260;
  }
  if (shape === RoomShape.ROOMSHAPE_LBL || shape === RoomShape.ROOMSHAPE_LTL) {
    pos.X -= 260;
  }
  if (centerOffset.Y > 140) {
    pos.Y -= 140;
  }
  if (shape === RoomShape.ROOMSHAPE_LTR || shape === RoomShape.ROOMSHAPE_LTL) {
    pos.Y -= 140;
  }

  return Isaac.WorldToRenderPosition(pos);
}
