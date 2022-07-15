import { RoomType, SoundEffect } from "isaac-typescript-definitions";
import { game, sfxManager } from "../../cachedClasses";
import { pause, unpause } from "../pause";
import v from "./v";

const VERSUS_SCREEN_ANIMATION = "Scene";

/**
 * Taken from StageAPI. I do not know why rendering in a certain order is necessary, but otherwise
 * the overlay layer will be on top of everything else and will hide the other elements.
 */
const VERSUS_SCREEN_LAYER_RENDER_ORDER: readonly int[] = [
  // 0, 1, 2, 3, 9, 14, 13, 4, 5, 12, 11, 6, 7, 8, 10,
  0, 1, 2, 3, 9, 14, 13, 4, 5, 12, 11, 6, 7, 8, 10,
];

const versusScreenSprite = Sprite();
versusScreenSprite.Load("gfx/ui/boss/versusscreen.anm2", true);

export function playBossRoomAnimation(force = false): void {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const hud = game.GetHUD();

  if (roomType !== RoomType.BOSS && !force) {
    return;
  }

  v.run.showingBossVersusScreen = true;

  pause();
  hud.SetVisible(false);

  versusScreenSprite.Play(VERSUS_SCREEN_ANIMATION, true);
  versusScreenSprite.PlaybackSpeed = 0.5; // This matches the vanilla playback speed.
}

function finishBossRoomAnimation() {
  const hud = game.GetHUD();

  v.run.showingBossVersusScreen = false;

  unpause();
  hud.SetVisible(true);

  // The sound effect only plays once the versus cutscene is over.
  sfxManager.Play(SoundEffect.CASTLE_PORTCULLIS);
}

export function bossPostRender(): void {
  if (!v.run.showingBossVersusScreen) {
    return;
  }

  if (versusScreenSprite.IsFinished(VERSUS_SCREEN_ANIMATION)) {
    finishBossRoomAnimation();
    return;
  }

  const room = game.GetRoom();
  const centerPos = room.GetCenterPos();
  const position = Isaac.WorldToRenderPosition(centerPos);

  for (const layerID of VERSUS_SCREEN_LAYER_RENDER_ORDER) {
    versusScreenSprite.RenderLayer(layerID, position);
  }

  versusScreenSprite.Update();
}
