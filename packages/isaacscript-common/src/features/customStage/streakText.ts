import { ButtonAction, ControllerIndex } from "isaac-typescript-definitions";
import { fonts, game } from "../../cachedClasses";
import { KColorDefault, VectorOne } from "../../constants";
import { getEnumValues } from "../../functions/enums";
import {
  getScreenBottomCenterPos,
  getScreenTopCenterPos,
} from "../../functions/ui";
import { CustomStage } from "../../interfaces/CustomStage";
import v from "./v";

enum UIStreakAnimation {
  TEXT = "Text",
  TEXT_IN = "TextIn",
  TEXT_OUT = "TextOut",
  TEXT_STAY = "TextStay",
}

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
const STREAK_SPRITE_TOP_OFFSET = Vector(0, 48.25);

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

/** Corresponds to the vanilla value; determined through trial and error. */
const TEXT_PLAYBACK_SPEED = 0.5;

/** Taken from StageAPI. */
const TEXT_IN_ADJUSTMENTS = [-800, -639, -450, -250, -70, 10, 6, 3];

/** Taken from StageAPI. */
const TEXT_OUT_ADJUSTMENTS = [0, -5, -10, -15, -20, 144, 308, 472, 636, 800];

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
];

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
];

/**
 * We do not actually need to render this sprite at all. It's only purpose is to be an invisible
 * reference for when and where we need to render the stage's name. Thus, we specify "false" for
 * "loadGraphics", but still manage playing its animations in the code below.
 */
const topStreakSprite = Sprite();

/**
 * We do not actually need to render this sprite at all. It's only purpose is to be an invisible
 * reference for when and where we need to render the stage's name. Thus, we specify "false" for
 * "loadGraphics", but still manage playing its animations in the code below.
 */
const bottomStreakSprite = Sprite();

/**
 * We must load the sprites in an init function to prevent issues with mods that replace the vanilla
 * files. (For some reason, loading the sprites will cause the overwrite to no longer apply on the
 * second and subsequent runs.)
 */
export function streakTextInit(): void {
  topStreakSprite.Load("resources/gfx/ui/ui_streak.anm2", false);
  topStreakSprite.PlaybackSpeed = TEXT_PLAYBACK_SPEED;

  bottomStreakSprite.Load("resources/gfx/ui/ui_streak.anm2", false);
  bottomStreakSprite.PlaybackSpeed = TEXT_PLAYBACK_SPEED;
}

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
    v.run.topStreakTextStartedRenderFrame === null ||
    !topStreakSprite.IsPlaying(UIStreakAnimation.TEXT_STAY)
  ) {
    return;
  }

  const renderFrameCount = Isaac.GetFrameCount();
  const elapsedFrames =
    renderFrameCount - v.run.topStreakTextStartedRenderFrame;
  if (elapsedFrames >= 115) {
    playTextOut(topStreakSprite);
  }
}

function trackMapInputPressed() {
  for (const controllerIndex of getEnumValues(ControllerIndex)) {
    const gameFrameCount = game.GetFrameCount();
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
  if (bottomStreakSprite.IsPlaying()) {
    return;
  }

  const pushedMapFrames = [
    ...v.run.controllerIndexPushingMapRenderFrame.values(),
  ];
  if (pushedMapFrames.length === 0) {
    return;
  }

  const earliestFrame = Math.min(...pushedMapFrames);
  const gameFrameCount = game.GetFrameCount();
  const elapsedFrames = gameFrameCount - earliestFrame;
  if (elapsedFrames >= NUM_RENDER_FRAMES_MAP_HELD_BEFORE_STREAK_TEXT) {
    bottomStreakSprite.Play(UIStreakAnimation.TEXT, true);
  }
}

/**
 * If the map input has been released, play the animation where the level streak slides out to the
 * right.
 */
function checkEndBottomStreakText() {
  if (!bottomStreakSprite.IsPlaying(UIStreakAnimation.TEXT_STAY)) {
    return;
  }

  const pushedMapFrames = [
    ...v.run.controllerIndexPushingMapRenderFrame.values(),
  ];
  if (pushedMapFrames.length === 0) {
    playTextOut(bottomStreakSprite);
  }
}

// ModCallback.POST_GAME_STARTED (15)
export function streakTextPostGameStarted(): void {
  topStreakSprite.Stop();
  bottomStreakSprite.Stop();
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
  renderSprite(customStage, topStreakSprite, topStreakPosition);

  const bottomCenterPos = getScreenBottomCenterPos();
  const bottomStreakPosition = bottomCenterPos.add(STREAK_SPRITE_BOTTOM_OFFSET);
  renderSprite(customStage, bottomStreakSprite, bottomStreakPosition);
}

function renderSprite(
  customStage: CustomStage,
  sprite: Sprite,
  position: Vector,
) {
  sprite.Update();
  if (!sprite.IsPlaying()) {
    return;
  }

  const animation = sprite.GetAnimation() as UIStreakAnimation;
  const frame = sprite.GetFrame();
  if (animation === UIStreakAnimation.TEXT && frame === TEXT_STAY_FRAME) {
    sprite.Play(UIStreakAnimation.TEXT_STAY, true);
  }

  const isPaused = game.IsPaused();
  if (isPaused) {
    return;
  }

  const font = fonts.upheaval;
  const { name } = customStage;
  const length = font.GetStringWidthUTF8(name);
  const centeredX = position.X - length / 2;

  let adjustment = 0;
  let scale = VectorOne;
  switch (animation) {
    case UIStreakAnimation.TEXT: {
      if (frame < TEXT_STAY_FRAME) {
        adjustment = TEXT_IN_ADJUSTMENTS[frame] ?? 0;
        scale = TEXT_IN_SCALES[frame] ?? VectorOne;
      } else {
        const adjustedFrame = frame - TEXT_OUT_FRAME;
        adjustment = TEXT_OUT_ADJUSTMENTS[adjustedFrame] ?? 0;
        scale = TEXT_OUT_SCALES[adjustedFrame] ?? VectorOne;
      }

      break;
    }

    case UIStreakAnimation.TEXT_IN: {
      adjustment = TEXT_IN_ADJUSTMENTS[frame] ?? 0;
      scale = TEXT_IN_SCALES[frame] ?? VectorOne;
      break;
    }

    case UIStreakAnimation.TEXT_OUT: {
      adjustment = TEXT_OUT_ADJUSTMENTS[frame] ?? 0;
      scale = TEXT_OUT_SCALES[frame] ?? VectorOne;
      break;
    }

    default: {
      break;
    }
  }

  const adjustedX = centeredX + adjustment;
  const adjustedY = position.Y + STREAK_TEXT_BOTTOM_Y_OFFSET;

  font.DrawStringScaled(
    name,
    adjustedX,
    adjustedY,
    scale.X,
    scale.Y,
    KColorDefault,
  );
}

function playTextOut(sprite: Sprite) {
  sprite.Play(UIStreakAnimation.TEXT, true);
  // We adjust by 2 to roughly align with the speed of the vanilla animation.
  sprite.SetFrame(TEXT_OUT_FRAME - 2);
}

export function topStreakTextStart(): void {
  const level = game.GetLevel();
  const renderFrameCount = Isaac.GetFrameCount();

  // Show the vanilla streak text, which will have a blank name because of the -1 floor.
  level.ShowName(false);

  // Initiate the animation for the custom text.
  v.run.topStreakTextStartedRenderFrame = renderFrameCount;
  topStreakSprite.Play(UIStreakAnimation.TEXT, true);
}
