import {
  Direction,
  EntityCollisionClass,
  EntityGridCollisionClass,
  ModCallback,
  RoomTransitionAnim,
} from "isaac-typescript-definitions";
import { ModUpgraded } from "../../classes/ModUpgraded";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { StageTravelState } from "../../enums/private/StageTravelState";
import { movePlayersToCenter } from "../../functions/playerCenter";
import { getAllPlayers } from "../../functions/playerIndex";
import { getRoomGridIndex, getRoomListIndex } from "../../functions/roomData";
import { teleport } from "../../functions/roomTransition";
import { setStage } from "../../functions/stage";
import { disableCustomStage, setCustomStage } from "../customStage/exports";
import { topStreakTextStart } from "../customStage/streakText";
import { enableAllInputs } from "../disableInputs";
import { runNextGameFrame } from "../runInNFrames";
import { runNextRoom } from "../runNextRoom";
import { saveDataManager } from "../saveDataManager/exports";
import { drawBlackSprite } from "./blackSprite";
import {
  CUSTOM_TRAPDOOR_FEATURE_NAME,
  GridEntityTypeCustom,
  PIXELATION_TO_BLACK_FRAMES,
} from "./constants";
import { checkCustomTrapdoorOpenClose } from "./openClose";
import { checkCustomTrapdoorPlayerTouched } from "./touched";
import v from "./v";

export function customTrapdoorInit(mod: ModUpgraded): void {
  saveDataManager(CUSTOM_TRAPDOOR_FEATURE_NAME, v);

  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
  mod.AddCallback(ModCallback.POST_PEFFECT_UPDATE, postPEffectUpdate); // 4
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_UPDATE,
    postGridEntityCustomUpdateTrapdoor,
    GridEntityTypeCustom.TRAPDOOR_CUSTOM,
  );
}

// ModCallback.POST_RENDER (2)
function postRender() {
  checkAllPlayersJumpComplete();
  checkPixelationToBlackComplete();
  checkSecondPixelationHalfWay();
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
  // to start a room transition. We arbitrarily pick the current room for this purpose. (We do not
  // have to worry about Curse of the Maze here, because even if we are taken to a different room,
  // it will not matter, since we will be traveling to a new floor after the screen fades to black.)
  teleport(
    roomGridIndex,
    Direction.NO_DIRECTION,
    RoomTransitionAnim.PIXELATION,
  );

  // Next, we wait a certain amount of render frames for the pixelation to fade the screen to black.
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

  const renderFrameScreenBlack =
    v.run.stateRenderFrame + PIXELATION_TO_BLACK_FRAMES;
  if (renderFrameCount < renderFrameScreenBlack) {
    return;
  }

  v.run.state = StageTravelState.WAITING_FOR_FIRST_PIXELATION_TO_END;

  // Now, we display a black sprite on top of the pixelation effect, to prevent showing the rest of
  // the animation.
  hud.SetVisible(false);

  // If the pixelation effect is not fully allowed to complete, the game's internal buffer will not
  // be flushed. The consequence of this is that after 11 custom stage transitions, the "log.txt"
  // starts to become become spammed with: [ASSERT] - PushRenderTarget: stack overflow!

  // In order to work around this, we fully let the animation complete by only continuing the stage
  // transition on the next game frame.
  runNextGameFrame(() => {
    const level = game.GetLevel();
    const startingRoomIndex = level.GetStartingRoomIndex();
    const futureRenderFrameCount = Isaac.GetFrameCount();

    v.run.state =
      StageTravelState.WAITING_FOR_SECOND_PIXELATION_TO_GET_HALF_WAY;
    v.run.stateRenderFrame = futureRenderFrameCount;

    goToCustomTrapdoorDestination();

    // Start another pixelation effect. This time, we will keep the screen black with the sprite,
    // and then remove the black sprite once the pixelation effect is halfway complete.
    teleport(
      startingRoomIndex,
      Direction.NO_DIRECTION,
      RoomTransitionAnim.PIXELATION,
      true,
    );
  });
}

function checkSecondPixelationHalfWay() {
  if (
    v.run.state !==
      StageTravelState.WAITING_FOR_SECOND_PIXELATION_TO_GET_HALF_WAY ||
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
    v.run.state = StageTravelState.PLAYERS_LAYING_DOWN;

    // After the room transition, the players will be placed next to a door, but they should be in
    // the center of the room to emulate what happens on a vanilla stage.
    movePlayersToCenter();

    for (const player of getAllPlayers()) {
      player.AnimateAppear();

      // We need to restore the original collision classes.
      player.EntityCollisionClass = EntityCollisionClass.ALL;
      player.GridCollisionClass = EntityGridCollisionClass.GROUND;
    }
  });

  // In vanilla, the streak text appears about when the pixelation has faded and while Isaac is
  // still laying on the ground. Unfortunately, we cannot exactly replicate the vanilla timing,
  // because the level text will bug out and smear the background if we play it from a `POST_RENDER`
  // callback. Thus, we run it on the next game frame as a workaround.
  runNextGameFrame(() => {
    topStreakTextStart();
  });
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

function goToCustomTrapdoorDestination() {
  if (v.run.destination === null) {
    return;
  }

  const {
    customStageName,
    customStageFloorNum,
    vanillaStage,
    vanillaStageType,
  } = v.run.destination;

  if (customStageName !== undefined && customStageFloorNum !== undefined) {
    const firstFloor = customStageFloorNum === 1;
    setCustomStage("Slaughterhouse", firstFloor);
  } else if (vanillaStage !== undefined && vanillaStageType !== undefined) {
    disableCustomStage();
    setStage(vanillaStage, vanillaStageType);
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
  const sprite = player.GetSprite();
  if (sprite.IsFinished("Trapdoor")) {
    player.Visible = false;
  }
}

// ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_UPDATE
// GridEntityTypeCustom.TRAPDOOR_CUSTOM
function postGridEntityCustomUpdateTrapdoor(gridEntity: GridEntity) {
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
