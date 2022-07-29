import {
  BossID,
  PlayerType,
  RoomType,
  SoundEffect,
  StageID,
} from "isaac-typescript-definitions";
import { game, sfxManager } from "../../cachedClasses";
import { arrayRemove } from "../../functions/array";
import { getBosses } from "../../functions/bosses";
import { getEntityID } from "../../functions/entities";
import { erange } from "../../functions/utils";
import { CustomStage } from "../../interfaces/CustomStage";
import { BOSS_NAME_PNG_FILE_NAMES } from "../../objects/bossNamePNGFileNames";
import { BOSS_PORTRAIT_PNG_FILE_NAMES } from "../../objects/bossPortraitPNGFileNames";
import { PLAYER_NAME_PNG_FILE_NAMES } from "../../objects/playerNamePNGFileNames";
import { PLAYER_PORTRAIT_PNG_FILE_NAMES } from "../../objects/playerPortraitPNGFileNames";
import { VERSUS_SCREEN_BACKGROUND_COLORS } from "../../objects/versusScreenBackgroundColors";
import { VERSUS_SCREEN_DIRT_SPOT_COLORS } from "../../objects/versusScreenDirtSpotColors";
import { pause, unpause } from "../pause";
import { ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH } from "./customStageConstants";
import v, { customBossPNGPaths } from "./v";

const DEFAULT_CHARACTER = PlayerType.ISAAC;
const DEFAULT_STAGE_ID = StageID.BASEMENT;

const VERSUS_SCREEN_ANIMATION_NAME = "Scene";

/** The layers range from 0 to 13. */
const NUM_VERSUS_SCREEN_ANM2_LAYERS = 14;

const BACKGROUND_ANM2_LAYER = 0;
const BOSS_DIRT_SPOT_ANM2_LAYER = 2;
const PLAYER_DIRT_SPOT_ANM2_LAYER = 3;
const BOSS_PORTRAIT_ANM2_LAYER = 4;
const PLAYER_PORTRAIT_ANM2_LAYER = 5;
const PLAYER_NAME_ANM2_LAYER = 6;
const BOSS_NAME_ANM2_LAYER = 7;
const OVERLAY_ANM2_LAYER = 11;

/**
 * We only need to render either the normal player portrait layer or the alternate player portrait
 * layer. Rendering both will cause the player not to shake.
 */
const PLAYER_PORTRAIT_ALT_ANM2_LAYER = 12;

/** These are the non-special layers that we will render last. */
const OTHER_ANM2_LAYERS: readonly int[] = arrayRemove(
  erange(NUM_VERSUS_SCREEN_ANM2_LAYERS),
  BACKGROUND_ANM2_LAYER,
  BOSS_DIRT_SPOT_ANM2_LAYER,
  PLAYER_DIRT_SPOT_ANM2_LAYER,
  OVERLAY_ANM2_LAYER,
  PLAYER_PORTRAIT_ALT_ANM2_LAYER,
);

/** Most of the PNG files related to the versus screen are located in this directory. */
const PNG_PATH_PREFIX = "gfx/ui/boss";

/**
 * Player portraits are not located in the same directory as everything else, since they are re-used
 * from the animation where the player travels to a new stage.
 */
const PLAYER_PORTRAIT_PNG_PATH_PREFIX = "gfx/ui/stage";

const VANILLA_VERSUS_PLAYBACK_SPEED = 0.5;

const versusScreenSprite = Sprite();

/**
 * Unfortunately, we must split the background layer into an entirely different sprite so that we
 * can color it with the `Color` property.
 */
const versusScreenBackgroundSprite = Sprite();

/**
 * Unfortunately, we must split the dirt layer into an entirely different sprite so that we can
 * color it with the `Color` property.
 */
const versusScreenDirtSpotSprite = Sprite();

/**
 * We must load the sprites in an init function to prevent issues with mods that replace the vanilla
 * files. (For some reason, loading the sprites will cause the overwrite to no longer apply on the
 * second and subsequent runs.)
 */
export function versusScreenInit(): void {
  // In vanilla, the "overlay.png" file has a white background. We must convert it to a PNG that
  // uses a transparent background in order for the background behind it to be visible. We use the
  // same "overlay.png" file as StageAPI uses for this purpose.
  versusScreenSprite.Load("gfx/ui/boss/versusscreen.anm2", false);
  versusScreenSprite.ReplaceSpritesheet(
    OVERLAY_ANM2_LAYER,
    `${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/overlay.png`,
  );
  versusScreenSprite.LoadGraphics();

  versusScreenBackgroundSprite.Load("gfx/ui/boss/versusscreen.anm2", true);
  versusScreenDirtSpotSprite.Load("gfx/ui/boss/versusscreen.anm2", true);
}

export function playVersusScreenAnimation(customStage: CustomStage): void {
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

  v.run.showingBossVersusScreen = true;

  pause();
  hud.SetVisible(false);

  const [playerNamePNGPath, playerPortraitPNGPath] = getPlayerPNGPaths();
  versusScreenSprite.ReplaceSpritesheet(
    PLAYER_NAME_ANM2_LAYER,
    playerNamePNGPath,
  );
  versusScreenSprite.ReplaceSpritesheet(
    PLAYER_PORTRAIT_ANM2_LAYER,
    playerPortraitPNGPath,
  );

  const [bossNamePNGPath, bossPortraitPNGPath] = getBossPNGPaths();
  versusScreenSprite.ReplaceSpritesheet(BOSS_NAME_ANM2_LAYER, bossNamePNGPath);
  versusScreenSprite.ReplaceSpritesheet(
    BOSS_PORTRAIT_ANM2_LAYER,
    bossPortraitPNGPath,
  );

  versusScreenSprite.LoadGraphics();

  let backgroundColor = VERSUS_SCREEN_BACKGROUND_COLORS[DEFAULT_STAGE_ID];
  if (customStage.versusScreen?.backgroundColor !== undefined) {
    const { r, g, b, a } = customStage.versusScreen.backgroundColor;
    backgroundColor = Color(r, g, b, a);
  }
  versusScreenBackgroundSprite.Color = backgroundColor;

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

/** Use the character of the 0th player. */
function getPlayerPNGPaths(): [
  playerNamePNGPath: string,
  playerPortraitPNGPath: string,
] {
  const player = Isaac.GetPlayer();
  const character = player.GetPlayerType();

  let playerNamePNGFileName = PLAYER_NAME_PNG_FILE_NAMES[character];
  if (playerNamePNGFileName === undefined) {
    playerNamePNGFileName = PLAYER_NAME_PNG_FILE_NAMES[DEFAULT_CHARACTER];
  }

  const playerNamePNGPath = `${PNG_PATH_PREFIX}/${playerNamePNGFileName}`;

  let playerPortraitFileName = PLAYER_PORTRAIT_PNG_FILE_NAMES[character];
  if (playerNamePNGFileName === undefined) {
    playerPortraitFileName = PLAYER_PORTRAIT_PNG_FILE_NAMES[DEFAULT_CHARACTER];
  }

  const playerPortraitPNGPath = `${PLAYER_PORTRAIT_PNG_PATH_PREFIX}/${playerPortraitFileName}`;

  return [playerNamePNGPath, playerPortraitPNGPath];
}

/** Use the boss of the first boss found. */
function getBossPNGPaths(): [
  bossNamePNGPath: string,
  bossPortraitPNGPath: string,
] {
  const bosses = getBosses();
  const firstBoss = bosses[0];

  // Prefer the PNG paths specified by the end-user, if any.
  if (firstBoss !== undefined) {
    const entityID = getEntityID(firstBoss);
    const pngPaths = customBossPNGPaths.get(entityID);
    if (pngPaths !== undefined) {
      return pngPaths;
    }
  }

  // If this is not a vanilla boss, default to showing question marks.
  const bossID = firstBoss === undefined ? 0 : firstBoss.GetBossID();
  if (bossID === 0) {
    const questionMarkSprite = `${PNG_PATH_PREFIX}/${
      BOSS_NAME_PNG_FILE_NAMES[BossID.BLUE_BABY]
    }`;
    const bossNamePNGPath = questionMarkSprite;
    const bossPortraitPNGPath = questionMarkSprite;
    return [bossNamePNGPath, bossPortraitPNGPath];
  }

  // If this is a vanilla boss, it will have a boss ID, and we can use the corresponding vanilla
  // files.
  const bossNamePNGFileName = BOSS_NAME_PNG_FILE_NAMES[bossID];
  const bossNamePNGPath = `${PNG_PATH_PREFIX}/${bossNamePNGFileName}`;

  const bossPortraitPNGFileName = BOSS_PORTRAIT_PNG_FILE_NAMES[bossID];
  const bossPortraitPNGPath = `${PNG_PATH_PREFIX}/${bossPortraitPNGFileName}`;

  return [bossNamePNGPath, bossPortraitPNGPath];
}

function finishVersusScreenAnimation() {
  const hud = game.GetHUD();

  v.run.showingBossVersusScreen = false;

  unpause();
  hud.SetVisible(true);

  // The sound effect only plays once the versus cutscene is over.
  sfxManager.Play(SoundEffect.CASTLE_PORTCULLIS);
}

// ModCallback.POST_RENDER (2)
export function versusScreenPostRender(): void {
  if (!v.run.showingBossVersusScreen) {
    return;
  }

  const isPaused = game.IsPaused();
  if (isPaused) {
    return;
  }

  if (versusScreenSprite.IsFinished(VERSUS_SCREEN_ANIMATION_NAME)) {
    finishVersusScreenAnimation();
    return;
  }

  const room = game.GetRoom();
  const centerPos = room.GetCenterPos();
  const position = Isaac.WorldToRenderPosition(centerPos);

  // First, we render the background.
  versusScreenBackgroundSprite.RenderLayer(BACKGROUND_ANM2_LAYER, position);
  versusScreenBackgroundSprite.Update();

  // Second, we render the overlay.
  versusScreenSprite.RenderLayer(OVERLAY_ANM2_LAYER, position);

  // Third, we render the dirt.
  versusScreenDirtSpotSprite.RenderLayer(BOSS_DIRT_SPOT_ANM2_LAYER, position);
  versusScreenDirtSpotSprite.RenderLayer(PLAYER_DIRT_SPOT_ANM2_LAYER, position);
  versusScreenDirtSpotSprite.Update();

  // Lastly, we render everything else.
  for (const layerID of OTHER_ANM2_LAYERS) {
    versusScreenSprite.RenderLayer(layerID, position);
  }
  versusScreenSprite.Update();
}
