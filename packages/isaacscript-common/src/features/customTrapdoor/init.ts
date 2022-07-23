import {
  Direction,
  ModCallback,
  RoomTransitionAnim,
} from "isaac-typescript-definitions";
import { game } from "../../cachedClasses";
import { ModUpgraded } from "../../classes/ModUpgraded";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { StageTravelState } from "../../enums/private/StageTravelState";
import { movePlayersToCenter } from "../../functions/playerCenter";
import { getAllPlayers } from "../../functions/playerIndex";
import { getRoomGridIndex, getRoomListIndex } from "../../functions/roomData";
import { setStage } from "../../functions/stage";
import { isString } from "../../functions/types";
import { setCustomStage } from "../customStage/exports";
import { enableAllInputs } from "../disableInputs";
import { runNextRoom } from "../runNextRoom";
import { saveDataManager } from "../saveDataManager/exports";
import { drawBlackSprite } from "./blackSprite";
import {
  CUSTOM_TRAPDOOR_FEATURE_NAME,
  PIXELATION_TO_BLACK_FRAMES,
} from "./customTrapdoorConstants";
import { checkCustomTrapdoorOpenClose } from "./openClose";
import { checkCustomTrapdoorPlayerTouched } from "./touched";
import v from "./v";

export function customTrapdoorInit(mod: ModUpgraded): void {
  saveDataManager(CUSTOM_TRAPDOOR_FEATURE_NAME, v);

  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
  mod.AddCallback(ModCallback.POST_PEFFECT_UPDATE, postPEffectUpdate); // 4
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_GRID_ENTITY_UPDATE,
    postGridEntityUpdateTrapdoor,
  );
}

// ModCallback.POST_RENDER (2)
function postRender() {
  checkAllPlayersJumpComplete();
  checkPixelationToBlackComplete();
  checkPausingOnBlackComplete();
  checkAllPlayersLayingDownComplete();
  drawBlackSprite();
}

function checkAllPlayersJumpComplete() {
  if (v.run.state !== StageTravelState.PLAYERS_JUMPING_DOWN) {
    return;
  }

  if (anyPlayerPlayingExtraAnimation()) {
    return;
  }

  const renderFrameCount = Isaac.GetFrameCount();
  const roomGridIndex = getRoomGridIndex();

  v.run.state = StageTravelState.PIXELATION_TO_BLACK;
  v.run.stateRenderFrame = renderFrameCount;

  // In order to display the pixelation effect that should happen when we go to a new floor, we need
  // to start a room transition. We arbitrarily pick the current room for this purpose.
  game.StartRoomTransition(
    roomGridIndex,
    Direction.NO_DIRECTION,
    RoomTransitionAnim.PIXELATION,
  );
}

function checkPixelationToBlackComplete() {
  if (
    v.run.state !== StageTravelState.PIXELATION_TO_BLACK ||
    v.run.stateRenderFrame === null
  ) {
    return;
  }

  const hud = game.GetHUD();
  const renderFrameCount = Isaac.GetFrameCount();
  const roomGridIndex = getRoomGridIndex();

  const renderFrameScreenBlack =
    v.run.stateRenderFrame + PIXELATION_TO_BLACK_FRAMES;
  if (renderFrameCount < renderFrameScreenBlack) {
    return;
  }

  v.run.state = StageTravelState.PAUSING_ON_BLACK;
  v.run.stateRenderFrame = renderFrameCount;

  hud.SetVisible(false);
  goToCustomDestination();

  // Start another pixelation effect. This time, we will keep the screen black with the sprite, and
  // then remove the black sprite once the pixelation effect is halfway complete.
  game.StartRoomTransition(
    roomGridIndex,
    Direction.NO_DIRECTION,
    RoomTransitionAnim.PIXELATION,
  );
}

function checkPausingOnBlackComplete() {
  if (
    v.run.state !== StageTravelState.PAUSING_ON_BLACK ||
    v.run.stateRenderFrame === null
  ) {
    return;
  }

  const hud = game.GetHUD();
  const renderFrameCount = Isaac.GetFrameCount();

  const renderFrameScreenBlack =
    v.run.stateRenderFrame + PIXELATION_TO_BLACK_FRAMES;
  if (renderFrameCount < renderFrameScreenBlack) {
    return;
  }

  v.run.state = StageTravelState.PIXELATION_TO_ROOM;

  hud.SetVisible(true);

  runNextRoom(() => {
    // After the room transition, the players will be placed next to a door, but they should be in
    // the center of the room to emulate what happens on a vanilla stage.
    movePlayersToCenter();

    v.run.state = StageTravelState.PLAYERS_LAYING_DOWN;

    for (const player of getAllPlayers()) {
      player.AnimateAppear();
    }
  });

  // In vanilla, the streak text appears about when the pixelation has faded and while Isaac is
  // still laying on the ground. Unfortunately, we cannot exactly replicate the vanilla timing,
  // because the level text will bug out and smear the background. Thus, we run it on the next game
  // frame as a workaround.
  /*
  runNextGameFrame(() => {
    topStreakTextStart();
  });
  */
}

function checkAllPlayersLayingDownComplete() {
  if (v.run.state !== StageTravelState.PLAYERS_LAYING_DOWN) {
    return;
  }

  if (anyPlayerPlayingExtraAnimation()) {
    return;
  }

  v.run.state = StageTravelState.NONE;

  enableAllInputs(CUSTOM_TRAPDOOR_FEATURE_NAME);
}

function goToCustomDestination() {
  if (v.run.destination === null) {
    return;
  }

  if (isString(v.run.destination)) {
    setCustomStage("Slaughterhouse");
  } else {
    const [stage, stageType] = v.run.destination;
    setStage(stage, stageType);
  }
}

function anyPlayerPlayingExtraAnimation() {
  const players = getAllPlayers();
  return players.some((player) => !player.IsExtraAnimationFinished());
}

// ModCallback.POST_PEFFECT_UPDATE (4)
function postPEffectUpdate(player: EntityPlayer) {
  checkJumpComplete(player);
}

function checkJumpComplete(player: EntityPlayer) {
  if (v.run.state !== StageTravelState.PLAYERS_JUMPING_DOWN) {
    return;
  }

  // In this state, the players are jumping down the hole (i.e. playing the "Trapdoor" animation).
  // When it completes, they will return to normal (i.e. just standing on top of the trapdoor).
  // Thus, make them invisible at the end of the animation. (They will automatically be set to
  // visible again once we travel to the next floor.)
  if (player.IsExtraAnimationFinished()) {
    player.Visible = false;
  }
}

// ModCallbackCustom.POST_GRID_ENTITY_UPDATE
// GridEntityType.TRAPDOOR (17)
function postGridEntityUpdateTrapdoor(gridEntity: GridEntity) {
  const roomListIndex = getRoomListIndex();
  const gridIndex = gridEntity.GetGridIndex();

  const roomTrapdoorMap = v.level.trapdoors.getAndSetDefault(roomListIndex);
  const trapdoorDescription = roomTrapdoorMap.get(gridIndex);
  if (trapdoorDescription === undefined) {
    return;
  }

  checkCustomTrapdoorOpenClose(gridEntity, trapdoorDescription);
  checkCustomTrapdoorPlayerTouched(gridEntity, trapdoorDescription);
}
