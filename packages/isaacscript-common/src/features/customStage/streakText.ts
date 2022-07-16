import { fonts } from "../../cachedClasses";
import { KColorDefault } from "../../constants";
import { getScreenBottomCenterPos } from "../../functions/ui";
import { CustomStage } from "../../interfaces/CustomStage";
import v from "./v";

const STREAK_TEXT_BOTTOM_OFFSET = Vector(0, -60);

// ModCallback.POST_RENDER (2)
export function streakTextPostRender(customStage: CustomStage): void {
  if (!v.run.showingStreakText) {
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
