import { getFinalFrameOfAnimation } from "../functions/sprite";
import { getEffectiveStage } from "../functions/stage";
import {
  preNewLevelFire,
  preNewLevelHasSubscriptions,
} from "./subscriptions/preNewLevel";

const TRAVELING_TO_NEXT_FLOOR_ANIMATIONS: ReadonlySet<string> = new Set([
  "Trapdoor",
  "LightTravel",
]);

/**
 * Since there can be multiple players, use this variable to ensure that we only fire the custom
 * callback once per stage.
 */
let firedOnStage: int | null = null;

/** @internal */
export function preNewLevelCallbackInit(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_RENDER, postPlayerRender); // 32
}

function hasSubscriptions() {
  return preNewLevelHasSubscriptions();
}

// ModCallbacks.MC_POST_PLAYER_RENDER (32)
function postPlayerRender(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const effectiveStage = getEffectiveStage();
  if (effectiveStage === firedOnStage) {
    return;
  }

  const sprite = player.GetSprite();
  const animation = sprite.GetAnimation();
  if (!TRAVELING_TO_NEXT_FLOOR_ANIMATIONS.has(animation)) {
    return;
  }

  // We can't use the "Sprite.IsFinished" method to detect when we are at the end of the animation
  // because the player will stop rendering at that point
  // Thus, revert to checking for the final frame manually
  const frame = sprite.GetFrame();
  const finalFrame = getFinalFrameOfAnimation(sprite);
  if (frame === finalFrame) {
    firedOnStage = effectiveStage;
    preNewLevelFire(player);
  }
}
