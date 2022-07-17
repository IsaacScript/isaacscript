import { fonts, game } from "../../cachedClasses";
import { KColorDefault } from "../../constants";
import { getScreenBottomCenterPos } from "../../functions/ui";
import { todo } from "../../functions/utils";
import { CustomStage } from "../../interfaces/CustomStage";
import v from "./v";

/** This must match the name of the shader in "shaders.xml". */
const EMPTY_SHADER_NAME = "IsaacScript-RenderAboveHUD";

/** This matches the offset that the vanilla game uses. */
const STREAK_TEXT_BOTTOM_OFFSET = Vector(0, -60);

// ModCallback.POST_RENDER (2)
export function streakTextPostRender(customStage: CustomStage): void {
  if (!v.run.showingStreakText) {
    return;
  }

  const isPaused = game.IsPaused();
  if (isPaused) {
    return;
  }

  const font = fonts.upheaval;
  const length = font.GetStringWidthUTF8(customStage.name);
  const bottomCenterPos = getScreenBottomCenterPos();
  const position = bottomCenterPos.add(STREAK_TEXT_BOTTOM_OFFSET);
  const adjustedX = position.X - length / 2;
  font.DrawString(customStage.name, adjustedX, position.Y, KColorDefault);
}

// ModCallback.INPUT_ACTION (13)
// TODO

// ModCallback.GET_SHADER_PARAMS (22)
export function streakTextGetShaderParams(shaderName: string): void {
  if (shaderName !== EMPTY_SHADER_NAME) {
    return;
  }

  todo();
}
