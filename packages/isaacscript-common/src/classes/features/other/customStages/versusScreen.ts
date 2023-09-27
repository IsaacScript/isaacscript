// This emulates the vanilla versus screen that shows up when you enter a boss room.

import {
  BossID,
  PlayerType,
  RoomType,
  SoundEffect,
  StageID,
} from "isaac-typescript-definitions";
import { game, sfxManager } from "../../../../core/cachedClasses";
import { arrayRemove } from "../../../../functions/array";
import { getBosses } from "../../../../functions/bosses";
import { getRoomSubType } from "../../../../functions/roomData";
import { removeCharactersBefore } from "../../../../functions/string";
import { getScreenCenterPos } from "../../../../functions/ui";
import { eRange } from "../../../../functions/utils";
import {
  getBossNamePNGFilePath,
  getBossPortraitPNGFilePath,
  getCharacterNamePNGFilePath,
  getCharacterPortraitPNGFilePath,
} from "../../../../functions/versusScreen";
import type { CustomStage } from "../../../../interfaces/private/CustomStage";
import { VERSUS_SCREEN_BACKGROUND_COLORS } from "../../../../objects/versusScreenBackgroundColors";
import { VERSUS_SCREEN_DIRT_SPOT_COLORS } from "../../../../objects/versusScreenDirtSpotColors";
import type { DisableAllSound } from "../DisableAllSound";
import type { Pause } from "../Pause";
import type { RunInNFrames } from "../RunInNFrames";
import {
  CUSTOM_FLOOR_STAGE,
  CUSTOM_FLOOR_STAGE_TYPE,
  CUSTOM_STAGE_FEATURE_NAME,
  DEFAULT_BASE_STAGE,
  DEFAULT_BASE_STAGE_TYPE,
  ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH,
} from "./constants";
import { v } from "./v";

const DEFAULT_STAGE_ID = StageID.BASEMENT;
const VERSUS_SCREEN_ANIMATION_NAME = "Scene";

/** The layers range from 0 to 13. */
const NUM_VERSUS_SCREEN_ANM2_LAYERS = 14;

/** Corresponds to "resources/gfx/ui/boss/versusscreen.anm2". */
enum VersusScreenLayer {
  BACKGROUND = 0,
  FRAME = 1,

  /** The boss dirt spot. */
  BOSS_SPOT = 2,

  /** The player dirt spot. */
  PLAYER_SPOT = 3,

  BOSS_PORTRAIT = 4,
  PLAYER_PORTRAIT = 5,
  PLAYER_NAME = 6,
  BOSS_NAME = 7,
  VS_TEXT = 8,
  BOSS_DOUBLE = 9,
  DT_TEXT = 10,
  OVERLAY = 11,

  /**
   * We only need to render either the normal player portrait layer or the alternate player portrait
   * layer. Rendering both will cause the player not to shake.
   */
  PLAYER_PORTRAIT_ALT = 12,

  BOSS_PORTRAIT_GROUND = 13,
  BOSS_PORTRAIT_2_GROUND = 14,
}

/** These are the non-special layers that we will render last. */
const OTHER_ANM2_LAYERS: readonly int[] = arrayRemove(
  eRange(NUM_VERSUS_SCREEN_ANM2_LAYERS),
  VersusScreenLayer.BACKGROUND,
  VersusScreenLayer.BOSS_SPOT,
  VersusScreenLayer.PLAYER_SPOT,
  VersusScreenLayer.OVERLAY,
  VersusScreenLayer.PLAYER_PORTRAIT_ALT,
);

const VANILLA_VERSUS_PLAYBACK_SPEED = 0.5;

/** We lazy load the sprite when first needed. */
const versusScreenSprite = Sprite();

/**
 * We lazy load the sprite when first needed.
 *
 * Unfortunately, we must split the background layer into an entirely different sprite so that we
 * can color it with the `Color` field.
 */
const versusScreenBackgroundSprite = Sprite();

/**
 * We lazy load the sprite when first needed.
 *
 * Unfortunately, we must split the dirt layer into an entirely different sprite so that we can
 * color it with the `Color` field.
 */
const versusScreenDirtSpotSprite = Sprite();

export function playVersusScreenAnimation(
  customStage: CustomStage,
  disableAllSound: DisableAllSound,
  pause: Pause,
  runInNFrames: RunInNFrames,
): void {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomCleared = room.IsClear();
  const hud = game.GetHUD();

  if (roomType !== RoomType.BOSS) {
    return;
  }

  if (roomCleared) {
    return;
  }

  if (willVanillaVersusScreenPlay()) {
    // Since we are on an invalid stage, the versus screen will have a completely black background.
    // Revert to using the background from the default stage.
    const level = game.GetLevel();
    level.SetStage(DEFAULT_BASE_STAGE, DEFAULT_BASE_STAGE_TYPE);
    runInNFrames.runNextGameFrame(() => {
      const futureLevel = game.GetLevel();
      futureLevel.SetStage(CUSTOM_FLOOR_STAGE, CUSTOM_FLOOR_STAGE_TYPE);
    });
    return;
  }

  v.run.showingBossVersusScreen = true;

  pause.pause();
  hud.SetVisible(false);
  disableAllSound.disableAllSound(CUSTOM_STAGE_FEATURE_NAME);

  // In vanilla, the "overlay.png" file has a white background. We must convert it to a PNG that
  // uses a transparent background in order for the background behind it to be visible. We use the
  // same "overlay.png" file as StageAPI uses for this purpose.
  if (!versusScreenSprite.IsLoaded()) {
    versusScreenSprite.Load("gfx/ui/boss/versusscreen.anm2", false);
    versusScreenSprite.ReplaceSpritesheet(
      VersusScreenLayer.OVERLAY,
      `${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/overlay.png`,
    );
  }

  // Player
  {
    const { namePNGPath, portraitPNGPath } = getPlayerPNGPaths();
    versusScreenSprite.ReplaceSpritesheet(
      VersusScreenLayer.PLAYER_NAME,
      namePNGPath,
    );
    versusScreenSprite.ReplaceSpritesheet(
      VersusScreenLayer.PLAYER_PORTRAIT,
      portraitPNGPath,
    );
  }

  // Boss
  {
    const { namePNGPath, portraitPNGPath } = getBossPNGPaths(customStage);
    const trimmedNamePNGPath = removeCharactersBefore(namePNGPath, "gfx/");
    versusScreenSprite.ReplaceSpritesheet(
      VersusScreenLayer.BOSS_NAME,
      trimmedNamePNGPath,
    );
    const trimmedPortraitPNGPath = removeCharactersBefore(
      portraitPNGPath,
      "gfx/",
    );
    versusScreenSprite.ReplaceSpritesheet(
      VersusScreenLayer.BOSS_PORTRAIT,
      trimmedPortraitPNGPath,
    );
  }

  versusScreenSprite.LoadGraphics();

  if (!versusScreenBackgroundSprite.IsLoaded()) {
    versusScreenBackgroundSprite.Load("gfx/ui/boss/versusscreen.anm2", true);
  }

  let backgroundColor = VERSUS_SCREEN_BACKGROUND_COLORS[DEFAULT_STAGE_ID];
  if (customStage.versusScreen?.backgroundColor !== undefined) {
    const { r, g, b, a } = customStage.versusScreen.backgroundColor;
    backgroundColor = Color(r, g, b, a);
  }
  versusScreenBackgroundSprite.Color = backgroundColor;

  if (!versusScreenDirtSpotSprite.IsLoaded()) {
    versusScreenDirtSpotSprite.Load("gfx/ui/boss/versusscreen.anm2", true);
  }

  let dirtSpotColor = VERSUS_SCREEN_DIRT_SPOT_COLORS[DEFAULT_STAGE_ID];
  if (customStage.versusScreen?.dirtSpotColor !== undefined) {
    const { r, g, b } = customStage.versusScreen.dirtSpotColor;
    dirtSpotColor = Color(r, g, b);
  }
  versusScreenDirtSpotSprite.Color = dirtSpotColor;

  for (const sprite of [
    versusScreenBackgroundSprite,
    versusScreenDirtSpotSprite,
    versusScreenSprite,
  ]) {
    sprite.Play(VERSUS_SCREEN_ANIMATION_NAME, true);
    sprite.PlaybackSpeed = VANILLA_VERSUS_PLAYBACK_SPEED;
  }
}

function willVanillaVersusScreenPlay() {
  const bosses = getBosses();
  return bosses.some((boss) => boss.GetBossID() !== 0);
}

/** Use the character of the 0th player. */
function getPlayerPNGPaths(): {
  namePNGPath: string;
  portraitPNGPath: string;
} {
  const player = Isaac.GetPlayer();
  const character = player.GetPlayerType();
  if (character === PlayerType.POSSESSOR) {
    error("Failed to get the player PNG paths since they are a possessor.");
  }

  const namePNGPath = getCharacterNamePNGFilePath(character);
  const portraitPNGPath = getCharacterPortraitPNGFilePath(character);

  return { namePNGPath, portraitPNGPath };
}

/** Use the boss of the first boss found. */
function getBossPNGPaths(customStage: CustomStage): {
  namePNGPath: string;
  portraitPNGPath: string;
} {
  // Prefer the PNG paths specified by the end-user, if any.
  const paths = getBossPNGPathsCustom(customStage);
  if (paths !== undefined) {
    return paths;
  }

  // If this is not a vanilla boss, default to showing question marks.
  const bosses = getBosses();
  const firstBoss = bosses[0];
  const bossID = firstBoss === undefined ? 0 : firstBoss.GetBossID();
  if (bossID === 0) {
    const questionMarkPath = getBossNamePNGFilePath(BossID.BLUE_BABY);
    const namePNGPath = questionMarkPath;
    const portraitPNGPath = questionMarkPath;
    return { namePNGPath, portraitPNGPath };
  }

  // If this is a vanilla boss, it will have a boss ID, and we can use the corresponding vanilla
  // files.
  const namePNGPath = getBossNamePNGFilePath(bossID);
  const portraitPNGPath = getBossPortraitPNGFilePath(bossID);

  return { namePNGPath, portraitPNGPath };
}

function getBossPNGPathsCustom(
  customStage: CustomStage,
): { namePNGPath: string; portraitPNGPath: string } | undefined {
  if (customStage.bossPool === undefined) {
    return undefined;
  }

  const roomSubType = getRoomSubType();
  const matchingBossEntry = customStage.bossPool.find(
    (bossEntry) => bossEntry.subType === roomSubType,
  );
  if (matchingBossEntry === undefined) {
    return undefined;
  }

  return matchingBossEntry.versusScreen;
}

function finishVersusScreenAnimation(
  pause: Pause,
  disableAllSound: DisableAllSound,
) {
  const hud = game.GetHUD();

  v.run.showingBossVersusScreen = false;

  pause.unpause();
  hud.SetVisible(true);
  disableAllSound.enableAllSound(CUSTOM_STAGE_FEATURE_NAME);

  // The sound effect only plays once the versus cutscene is over.
  sfxManager.Play(SoundEffect.CASTLE_PORTCULLIS);
}

// ModCallback.POST_RENDER (2)
export function versusScreenPostRender(
  pause: Pause,
  disableAllSound: DisableAllSound,
): void {
  if (!v.run.showingBossVersusScreen) {
    return;
  }

  // We do not want to early return when the game is paused because we need to start displaying the
  // black screen as soon as the slide animation starts.

  if (versusScreenSprite.IsFinished(VERSUS_SCREEN_ANIMATION_NAME)) {
    finishVersusScreenAnimation(pause, disableAllSound);
    return;
  }

  const position = getScreenCenterPos();

  // First, we render the background.
  versusScreenBackgroundSprite.RenderLayer(
    VersusScreenLayer.BACKGROUND,
    position,
  );
  versusScreenBackgroundSprite.Update();

  // Second, we render the overlay.
  versusScreenSprite.RenderLayer(VersusScreenLayer.OVERLAY, position);

  // Third, we render the dirt.
  versusScreenDirtSpotSprite.RenderLayer(VersusScreenLayer.BOSS_SPOT, position);
  versusScreenDirtSpotSprite.RenderLayer(
    VersusScreenLayer.PLAYER_SPOT,
    position,
  );
  versusScreenDirtSpotSprite.Update();

  // Lastly, we render everything else.
  for (const layerID of OTHER_ANM2_LAYERS) {
    versusScreenSprite.RenderLayer(layerID, position);
  }
  versusScreenSprite.Update();
}
