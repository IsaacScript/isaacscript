import { VectorZero } from "../../constants";
import { StageTravelState } from "../../enums/private/StageTravelState";
import { ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH } from "../customStage/customStageConstants";
import v from "./v";

const sprite = Sprite();
sprite.Load(`${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/black.anm2`, true);
sprite.SetFrame("Default", 0);

export function drawBlackSprite(): void {
  if (v.run.state !== StageTravelState.PAUSING_ON_BLACK) {
    return;
  }

  sprite.RenderLayer(0, VectorZero);
}
