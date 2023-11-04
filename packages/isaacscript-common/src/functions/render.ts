import { RenderMode } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";

/**
 * Helper function to see if the current render callback is rendering a water reflection.
 *
 * When the player is in a room with water, things will be rendered twice: once for the normal
 * rendering, and once for the reflecting rendering. Thus, any mod code in a render callback will
 * run twice per frame in these situations, which may be unexpected or cause bugs.
 *
 * This function is typically used to early return from a render function if it returns true.
 */
export function isReflectionRender(): boolean {
  const room = game.GetRoom();
  const renderMode = room.GetRenderMode();
  return renderMode === RenderMode.WATER_REFLECT;
}

export function renderScaledTextOnEntity(
  entity: Entity | GridEntity,
  text: string,
  scaleX: float,
  scaleY: float,
): void {
  if (isReflectionRender()) {
    return;
  }

  const position = Isaac.WorldToScreen(entity.Position);
  Isaac.RenderScaledText(
    text,
    position.X,
    position.Y,
    scaleX,
    scaleY,
    1,
    1,
    1,
    1,
  );
}

export function renderTextOnEntity(
  entity: Entity | GridEntity,
  text: string,
): void {
  if (isReflectionRender()) {
    return;
  }

  const position = Isaac.WorldToScreen(entity.Position);
  Isaac.RenderText(text, position.X, position.Y, 1, 1, 1, 1);
}
