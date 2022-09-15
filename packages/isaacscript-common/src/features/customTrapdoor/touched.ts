import {
  ButtonAction,
  EntityCollisionClass,
  EntityGridCollisionClass,
  EntityPartition,
  PlayerType,
} from "isaac-typescript-definitions";
import { VectorZero } from "../../core/constants";
import { StageTravelState } from "../../enums/private/StageTravelState";
import { easeOutSine } from "../../functions/easing";
import {
  getAllPlayers,
  getOtherPlayers,
  isChildPlayer,
} from "../../functions/playerIndex";
import { isCharacter } from "../../functions/players";
import { CustomTrapdoorDescription } from "../../interfaces/private/CustomTrapdoorDescription";
import { disableAllInputsExceptFor } from "../disableInputs";
import { isPlayerUsingPony } from "../ponyDetection";
import { runInNGameFrames, runNextRenderFrame } from "../runInNFrames";
import {
  ANIMATIONS_THAT_PREVENT_STAGE_TRAVEL,
  CUSTOM_TRAPDOOR_FEATURE_NAME,
  OTHER_PLAYER_TRAPDOOR_JUMP_DELAY_GAME_FRAMES,
  OTHER_PLAYER_TRAPDOOR_JUMP_DURATION_GAME_FRAMES,
  TRAPDOOR_TOUCH_DISTANCE,
} from "./constants";
import v from "./v";

export function checkCustomTrapdoorPlayerTouched(
  gridEntity: GridEntity,
  trapdoorDescription: CustomTrapdoorDescription,
): void {
  if (v.run.state !== StageTravelState.NONE) {
    return;
  }

  if (!trapdoorDescription.open) {
    return;
  }

  const playersTouching = Isaac.FindInRadius(
    gridEntity.Position,
    TRAPDOOR_TOUCH_DISTANCE,
    EntityPartition.PLAYER,
  );
  for (const playerEntity of playersTouching) {
    const player = playerEntity.ToPlayer();
    if (player === undefined) {
      continue;
    }

    if (
      // We don't want a Pony dash to transition to a new floor or a crawl space.
      !isPlayerUsingPony(player) &&
      !isChildPlayer(player) &&
      canPlayerInteractWithTrapdoor(player)
    ) {
      playerTouchedCustomTrapdoor(gridEntity, trapdoorDescription, player);
      return; // Prevent two players from touching the same entity.
    }
  }
}

function canPlayerInteractWithTrapdoor(player: EntityPlayer) {
  // Players cannot interact with stage travel entities when items are queued or while playing
  // certain animations.
  const sprite = player.GetSprite();
  const animation = sprite.GetAnimation();
  return (
    !player.IsHoldingItem() &&
    !ANIMATIONS_THAT_PREVENT_STAGE_TRAVEL.has(animation)
  );
}

function playerTouchedCustomTrapdoor(
  gridEntity: GridEntity,
  trapdoorDescription: CustomTrapdoorDescription,
  player: EntityPlayer,
) {
  v.run.state = StageTravelState.PLAYERS_JUMPING_DOWN;
  v.run.destination = trapdoorDescription.destination;

  // We don't want to allow pausing, since that will allow render frames to pass without advancing
  // the stage traveling logic. (We track how many render frames have passed to know when to move to
  // the next step.)
  const whitelist = new Set([ButtonAction.CONSOLE]);
  disableAllInputsExceptFor(CUSTOM_TRAPDOOR_FEATURE_NAME, whitelist);
  setPlayerAttributes(player, gridEntity.Position);
  dropTaintedForgotten(player);

  player.PlayExtraAnimation("Trapdoor");

  const otherPlayers = getOtherPlayers(player);
  otherPlayers.forEach((otherPlayer, i) => {
    const gameFramesToWaitBeforeJumping =
      OTHER_PLAYER_TRAPDOOR_JUMP_DELAY_GAME_FRAMES * (i + 1);
    const otherPlayerPtr = EntityPtr(otherPlayer);
    runInNGameFrames(() => {
      startDelayedJump(otherPlayerPtr, gridEntity.Position);
    }, gameFramesToWaitBeforeJumping);
  });
}

function setPlayerAttributes(trapdoorPlayer: EntityPlayer, position: Vector) {
  // Snap the player to the exact position of the trapdoor so that they cleanly jump down the hole.
  trapdoorPlayer.Position = position;

  for (const player of getAllPlayers()) {
    // Disable the controls to prevent the player from moving, shooting, and so on. (We also disable
    // the inputs in the `INPUT_ACTION` callback, but that does not prevent mouse inputs.)
    player.ControlsEnabled = false;

    // Freeze all players.
    player.Velocity = VectorZero;

    // We don't want enemy attacks to move the players.
    player.EntityCollisionClass = EntityCollisionClass.NONE;
    player.GridCollisionClass = EntityGridCollisionClass.NONE;

    player.StopExtraAnimation();
  }
}

function dropTaintedForgotten(player: EntityPlayer) {
  if (isCharacter(player, PlayerType.THE_FORGOTTEN_B)) {
    const taintedSoul = player.GetOtherTwin();
    if (taintedSoul !== undefined) {
      taintedSoul.ThrowHeldEntity(VectorZero);
    }
  }
}

function startDelayedJump(entityPtr: EntityPtr, trapdoorPosition: Vector) {
  const entity = entityPtr.Ref;
  if (entity === undefined) {
    return;
  }

  const player = entity.ToPlayer();
  if (player === undefined) {
    return;
  }

  player.PlayExtraAnimation("Trapdoor");

  adjustPlayerPositionToTrapdoor(entityPtr, player.Position, trapdoorPosition);
}

function adjustPlayerPositionToTrapdoor(
  entityPtr: EntityPtr,
  startPos: Vector,
  endPos: Vector,
) {
  if (v.run.state !== StageTravelState.PLAYERS_JUMPING_DOWN) {
    return;
  }

  const entity = entityPtr.Ref;
  if (entity === undefined) {
    return;
  }

  const player = entity.ToPlayer();
  if (player === undefined) {
    return;
  }

  runNextRenderFrame(() => {
    adjustPlayerPositionToTrapdoor(entityPtr, startPos, endPos);
  });

  const sprite = player.GetSprite();
  if (sprite.IsFinished("Trapdoor")) {
    player.Position = endPos;
    player.Velocity = VectorZero;
    return;
  }

  const frame = sprite.GetFrame();
  if (frame >= OTHER_PLAYER_TRAPDOOR_JUMP_DURATION_GAME_FRAMES) {
    // We have already arrived at the trapdoor.
    player.Position = endPos;
    player.Velocity = VectorZero;
    return;
  }

  // Make the player jump towards the trapdoor. We use an easing function so that the distance
  // traveled is not linear, emulating what the game does.
  const totalDifference = endPos.sub(startPos);
  const progress = frame / OTHER_PLAYER_TRAPDOOR_JUMP_DURATION_GAME_FRAMES;
  const easeProgress = easeOutSine(progress);
  const differenceForThisFrame = totalDifference.mul(easeProgress);
  const targetPosition = startPos.add(differenceForThisFrame);

  player.Position = targetPosition;
  player.Velocity = VectorZero;
}
