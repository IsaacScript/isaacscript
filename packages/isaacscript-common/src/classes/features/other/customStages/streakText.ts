import { ButtonAction } from "isaac-typescript-definitions";
import { CONTROLLER_INDEX_VALUES } from "../../../../cachedEnumValues";
import { fonts, game } from "../../../../core/cachedClasses";
import { KColorDefault, VectorOne } from "../../../../core/constants";
import { UIStreakAnimation } from "../../../../enums/private/UIStreakAnimation";
import {
  getElapsedGameFramesSince,
  getElapsedRenderFramesSince,
} from "../../../../functions/frames";
import {
  getScreenBottomCenterPos,
  getScreenTopCenterPos,
} from "../../../../functions/ui";
import type { CustomStage } from "../../../../interfaces/private/CustomStage";
import { v } from "./v";

/** Corresponds to "resources/gfx/ui/ui_streak.anm2". */
const UI_STREAK_ANIMATION_END_FRAMES = {
  [UIStreakAnimation.NONE]: 0,
  [UIStreakAnimation.TEXT]: 69,
  [UIStreakAnimation.TEXT_STAY]: 1,
} as const satisfies Record<UIStreakAnimation, int>;

/** This must match the name of the shader in "shaders.xml". */
const EMPTY_SHADER_NAME = "IsaacScript-RenderAboveHUD";

/**
 * The frame of the "Text" animation that corresponds to when it reaches the center of the screen
 * and stays put.
 */
const TEXT_STAY_FRAME = 8;

/** The frame of the "Text" animation that corresponds to when it starts to move right. */
const TEXT_OUT_FRAME = 60;

/** This matches the offset that the vanilla game uses; determined via trial and error. */
const STREAK_SPRITE_TOP_OFFSET = Vector(0, 47);

/** This matches the offset that the vanilla game uses; determined via trial and error. */
const STREAK_SPRITE_BOTTOM_OFFSET = Vector(0, -48.25);

/**
 * The offset from the bottom of the sprite that the rendered text should go; determined via trial
 * and error.
 */
const STREAK_TEXT_BOTTOM_Y_OFFSET = -9;

/**
 * Corresponds to the vanilla value; determined via trial and error.
 *
 * 8 is too little and 9 has the vanilla text come out just slightly ahead, so we go with 9.
 */
const NUM_RENDER_FRAMES_MAP_HELD_BEFORE_STREAK_TEXT = 11;

/** Taken from StageAPI. */
const TEXT_IN_ADJUSTMENTS = [-800, -639, -450, -250, -70, 10, 6, 3] as const;

/** Taken from StageAPI. */
const TEXT_OUT_ADJUSTMENTS = [
  0, -5, -10, -15, -20, 144, 308, 472, 636, 800,
] as const;

/** Taken from StageAPI. */
const TEXT_IN_SCALES = [
  Vector(3, 0.2),
  Vector(2.6, 0.36),
  Vector(2.2, 0.52),
  Vector(1.8, 0.68),
  Vector(1.4, 0.84),
  Vector(0.95, 1.05),
  Vector(0.97, 1.03),
  Vector(0.98, 1.02),
] as const;

/** Taken from StageAPI. */
const TEXT_OUT_SCALES = [
  Vector(1, 1),
  Vector(0.99, 1.03),
  Vector(0.98, 1.05),
  Vector(0.96, 1.08),
  Vector(0.95, 1.1),
  Vector(1.36, 0.92),
  Vector(1.77, 0.74),
  Vector(2.18, 0.56),
  Vector(2.59, 0.38),
  Vector(3, 0.2),
] as const;

// ModCallback.POST_RENDER (2)
export function streakTextPostRender(): void {
  // The top streak only plays when the player arrives on the floor (or continues a game from the
  // main menu.)
  checkEndTopStreakText();

  // The bottom streak only plays when the player holds down the map button.
  trackMapInputPressed();
  checkStartBottomStreakText();
  checkEndBottomStreakText();
}

function checkEndTopStreakText() {
  if (
    v.run.topStreakTextStartedRenderFrame === null
    || v.run.topStreakText.animation !== UIStreakAnimation.TEXT_STAY
  ) {
    return;
  }

  const elapsedFrames = getElapsedRenderFramesSince(
    v.run.topStreakTextStartedRenderFrame,
  );
  if (elapsedFrames >= 115) {
    v.run.topStreakText.animation = UIStreakAnimation.TEXT;
    // We adjust by the frame backwards by an arbitrary amount to roughly align with the speed of
    // the vanilla animation.
    v.run.topStreakText.frame = TEXT_OUT_FRAME - 2;
  }
}

function trackMapInputPressed() {
  const gameFrameCount = game.GetFrameCount();

  for (const controllerIndex of CONTROLLER_INDEX_VALUES) {
    const oldPushedMapFrame =
      v.run.controllerIndexPushingMapRenderFrame.get(controllerIndex);
    const isPushingMap = Input.IsActionPressed(
      ButtonAction.MAP,
      controllerIndex,
    );

    if (isPushingMap) {
      if (oldPushedMapFrame === undefined) {
        v.run.controllerIndexPushingMapRenderFrame.set(
          controllerIndex,
          gameFrameCount,
        );
      }
    } else {
      v.run.controllerIndexPushingMapRenderFrame.delete(controllerIndex);
    }
  }
}

/**
 * If the map input has been pressed down for long enough, play the animation where the level streak
 * slides in from the left.
 */
function checkStartBottomStreakText() {
  if (v.run.bottomStreakText.animation !== UIStreakAnimation.NONE) {
    return;
  }

  const pushedMapFrames = [
    ...v.run.controllerIndexPushingMapRenderFrame.values(),
  ];
  if (pushedMapFrames.length === 0) {
    return;
  }

  const earliestFrame = Math.min(...pushedMapFrames);
  const elapsedFrames = getElapsedGameFramesSince(earliestFrame);
  if (elapsedFrames >= NUM_RENDER_FRAMES_MAP_HELD_BEFORE_STREAK_TEXT) {
    v.run.bottomStreakText.animation = UIStreakAnimation.TEXT;
    v.run.bottomStreakText.frame = 0;
  }
}

/**
 * If the map input has been released, play the animation where the level streak slides out to the
 * right.
 */
function checkEndBottomStreakText() {
  if (v.run.bottomStreakText.animation !== UIStreakAnimation.TEXT_STAY) {
    return;
  }

  const pushedMapFrames = [
    ...v.run.controllerIndexPushingMapRenderFrame.values(),
  ];
  if (pushedMapFrames.length === 0) {
    v.run.bottomStreakText.animation = UIStreakAnimation.TEXT;
    // We adjust by the frame backwards by an arbitrary amount to roughly align with the speed of
    // the vanilla animation.
    v.run.bottomStreakText.frame = TEXT_OUT_FRAME - 2;
  }
}

// ModCallback.GET_SHADER_PARAMS (22)
export function streakTextGetShaderParams(
  customStage: CustomStage,
  shaderName: string,
): void {
  if (shaderName !== EMPTY_SHADER_NAME) {
    return;
  }

  const topCenterPos = getScreenTopCenterPos();
  const topStreakPosition = topCenterPos.add(STREAK_SPRITE_TOP_OFFSET);
  renderStreakText(customStage, v.run.topStreakText, topStreakPosition);

  const bottomCenterPos = getScreenBottomCenterPos();
  const bottomStreakPosition = bottomCenterPos.add(STREAK_SPRITE_BOTTOM_OFFSET);
  renderStreakText(customStage, v.run.bottomStreakText, bottomStreakPosition);
}

function renderStreakText(
  customStage: CustomStage,
  streakText: { animation: UIStreakAnimation; frame: int; pauseFrame: boolean },
  position: Vector,
) {
  if (streakText.animation === UIStreakAnimation.NONE) {
    return;
  }

  if (streakText.animation !== UIStreakAnimation.TEXT_STAY) {
    const { pauseFrame } = streakText;
    streakText.pauseFrame = !streakText.pauseFrame;

    if (!pauseFrame) {
      streakText.frame++;
    }
  }

  const endFrame = UI_STREAK_ANIMATION_END_FRAMES[streakText.animation];
  if (streakText.frame > endFrame) {
    streakText.animation = UIStreakAnimation.NONE;
    streakText.frame = 0;
    return;
  }

  if (
    streakText.animation === UIStreakAnimation.TEXT
    && streakText.frame === TEXT_STAY_FRAME
  ) {
    streakText.animation = UIStreakAnimation.TEXT_STAY;
    streakText.frame = 0;
  }

  const isPaused = game.IsPaused();
  if (isPaused) {
    return;
  }

  const font = fonts.upheaval;
  const { name } = customStage;
  const numberSuffix = v.run.firstFloor ? "I" : "II";
  const nameWithNumberSuffix = `${name} ${numberSuffix}`;
  const length = font.GetStringWidthUTF8(nameWithNumberSuffix);
  const centeredX = position.X - length / 2;

  let adjustment = 0;
  let scale = VectorOne;

  if (streakText.animation === UIStreakAnimation.TEXT) {
    if (streakText.frame < TEXT_STAY_FRAME) {
      adjustment = TEXT_IN_ADJUSTMENTS[streakText.frame] ?? 0;
      scale = TEXT_IN_SCALES[streakText.frame] ?? VectorOne;
    } else {
      const adjustedFrame = streakText.frame - TEXT_OUT_FRAME;
      adjustment = TEXT_OUT_ADJUSTMENTS[adjustedFrame] ?? 0;
      scale = TEXT_OUT_SCALES[adjustedFrame] ?? VectorOne;
    }
  }

  const adjustedX = centeredX + adjustment;
  const adjustedY = position.Y + STREAK_TEXT_BOTTOM_Y_OFFSET;

  font.DrawStringScaled(
    nameWithNumberSuffix,
    adjustedX,
    adjustedY,
    scale.X,
    scale.Y,
    KColorDefault,
  );
}

export function topStreakTextStart(): void {
  const level = game.GetLevel();
  const renderFrameCount = Isaac.GetFrameCount();

  // Show the vanilla streak text, which will have a blank name because of the -1 floor.
  level.ShowName(false);

  // Initiate the animation for the custom text.
  v.run.topStreakText.animation = UIStreakAnimation.TEXT;
  v.run.topStreakText.frame = 0;
  v.run.topStreakTextStartedRenderFrame = renderFrameCount;
}
