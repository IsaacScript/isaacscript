import {
  EntityCollisionClass,
  EntityPartition,
  PlayerType,
} from "isaac-typescript-definitions";
import { VectorZero } from "../../constants";
import { StageTravelState } from "../../enums/private/StageTravelState";
import {
  getOtherPlayers,
  getPlayers,
  isChildPlayer,
} from "../../functions/playerIndex";
import { isCharacter } from "../../functions/players";
import { CustomTrapdoorDescription } from "../../interfaces/private/CustomTrapdoorDescription";
import { disableAllInputs } from "../disableInputs";
import { isPlayerUsingPony } from "../ponyDetection";
import { runInNGameFrames, runNextGameFrame } from "../runInNFrames";
import {
  ANIMATIONS_THAT_PREVENT_STAGE_TRAVEL,
  CUSTOM_TRAPDOOR_FEATURE_NAME,
  OTHER_PLAYER_TRAPDOOR_JUMP_DELAY_GAME_FRAMES,
  OTHER_PLAYER_TRAPDOOR_JUMP_DURATION_GAME_FRAMES,
  TRAPDOOR_TOUCH_DISTANCE,
} from "./customTrapdoorConstants";
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

  disableAllInputs(CUSTOM_TRAPDOOR_FEATURE_NAME);
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

  adjustPlayerVelocityToTrapdoor(entityPtr, player.Position, trapdoorPosition);
}

function adjustPlayerVelocityToTrapdoor(
  entityPtr: EntityPtr,
  startPos: Vector,
  endPos: Vector,
) {
  const entity = entityPtr.Ref;
  if (entity === undefined) {
    return;
  }

  const player = entity.ToPlayer();
  if (player === undefined) {
    return;
  }

  const sprite = player.GetSprite();
  if (sprite.IsFinished("Trapdoor")) {
    return;
  }

  const frame = sprite.GetFrame();
  if (frame > OTHER_PLAYER_TRAPDOOR_JUMP_DURATION_GAME_FRAMES) {
    // We have already arrived at the trapdoor.
    return;
  }

  const totalDifference = endPos.sub(startPos);
  const differencePerFrame = totalDifference.div(
    OTHER_PLAYER_TRAPDOOR_JUMP_DURATION_GAME_FRAMES,
  );
  const differenceForThisFrame = differencePerFrame.mul(frame + 1);
  const targetPosition = startPos.add(differenceForThisFrame);
  const calculatedVelocity = player.Position.sub(targetPosition);

  player.Velocity = calculatedVelocity;

  runNextGameFrame(() => {
    adjustPlayerVelocityToTrapdoor(entityPtr, startPos, endPos);
  });
}

function setPlayerAttributes(trapdoorPlayer: EntityPlayer, position: Vector) {
  // Snap the player to the exact position of the trapdoor so that they cleanly jump down the hole.
  trapdoorPlayer.Position = position;

  for (const player of getPlayers()) {
    // Freeze all players.
    player.Velocity = VectorZero;

    // We don't want enemy attacks to move the players.
    player.EntityCollisionClass = EntityCollisionClass.NONE;
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
