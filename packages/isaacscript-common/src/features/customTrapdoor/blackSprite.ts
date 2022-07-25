import { VectorZero } from "../../constants";
import { StageTravelState } from "../../enums/private/StageTravelState";
import v from "./v";

// In order to represent a black sprite, we just use the first frame of the boss versus screen
// animation. However, we must lazy load the sprite in order to prevent issues with mods that
// replace the vanilla files. (For some reason, loading the sprites will cause the overwrite to no
// longer apply on the second and subsequent runs.)
const blackSprite = Sprite();

export function drawBlackSprite(): void {
  if (v.run.state !== StageTravelState.PAUSING_ON_BLACK) {
    return;
  }

  if (!blackSprite.IsLoaded()) {
    blackSprite.Load("gfx/ui/boss/versusscreen.anm2", true);
    blackSprite.SetFrame("Scene", 0);
  }

  blackSprite.RenderLayer(0, VectorZero);
}
