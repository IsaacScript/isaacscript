import { RoomType } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { TrapdoorAnimation } from "../../enums/private/TrapdoorAnimation";
import { anyPlayerCloserThan } from "../../functions/positionVelocity";
import { CustomTrapdoorDescription } from "../../interfaces/private/CustomTrapdoorDescription";
import { getRoomClearGameFrame } from "../roomClearFrame";
import {
  TRAPDOOR_BOSS_REACTION_FRAMES,
  TRAPDOOR_OPEN_DISTANCE,
  TRAPDOOR_OPEN_DISTANCE_AFTER_BOSS,
} from "./customTrapdoorConstants";

export function checkCustomTrapdoorOpenClose(
  gridEntity: GridEntity,
  trapdoorDescription: CustomTrapdoorDescription,
): void {
  /** By default, trapdoors will never close if they are already open. */
  if (trapdoorDescription.open) {
    return;
  }

  if (shouldTrapdoorOpen(gridEntity, trapdoorDescription.firstSpawn)) {
    open(gridEntity, trapdoorDescription);
  }
}

function shouldTrapdoorOpen(
  gridEntity: GridEntity,
  firstSpawn: boolean,
): boolean {
  const room = game.GetRoom();
  const roomClear = room.IsClear();

  return (
    !anyPlayerCloserThan(gridEntity.Position, TRAPDOOR_OPEN_DISTANCE) &&
    !isPlayerCloseAfterBoss(gridEntity.Position) &&
    !shouldBeClosedFromStartingInRoomWithEnemies(firstSpawn, roomClear)
  );
}

function isPlayerCloseAfterBoss(position: Vector) {
  const gameFrameCount = game.GetFrameCount();
  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomClearGameFrame = getRoomClearGameFrame();

  // In order to prevent a player from accidentally entering a freshly-spawned trapdoor after
  // killing the boss of the floor, we use a wider open distance for a short amount of frames.
  if (
    roomType !== RoomType.BOSS ||
    roomClearGameFrame === undefined ||
    gameFrameCount >= roomClearGameFrame + TRAPDOOR_BOSS_REACTION_FRAMES
  ) {
    return false;
  }

  return anyPlayerCloserThan(position, TRAPDOOR_OPEN_DISTANCE_AFTER_BOSS);
}

function shouldBeClosedFromStartingInRoomWithEnemies(
  firstSpawn: boolean,
  roomClear: boolean,
) {
  return firstSpawn && !roomClear;
}

function open(
  gridEntity: GridEntity,
  trapdoorDescription: CustomTrapdoorDescription,
) {
  trapdoorDescription.open = true;

  const sprite = gridEntity.GetSprite();
  sprite.Play(TrapdoorAnimation.OPEN_ANIMATION, true);
}

export function shouldTrapdoorSpawnOpen(
  gridEntity: GridEntity,
  firstSpawn: boolean,
): boolean {
  const room = game.GetRoom();
  const roomFrameCount = room.GetFrameCount();
  const roomClear = room.IsClear();

  // Trapdoors created after a room has already initialized should spawn closed by default:
  // - Trapdoors created after bosses should spawn closed so that players do not accidentally jump
  //   into them.
  // - Trapdoors created by We Need to Go Deeper should spawn closed because the player will be
  //   standing on top of them.
  if (roomFrameCount > 0) {
    return false;
  }

  // If we just entered a new room with enemies in it, spawn the trapdoor closed so that the player
  // has to defeat the enemies first before using the trapdoor.
  if (!roomClear) {
    return false;
  }

  // If we just entered a new room that is already cleared, spawn the trapdoor closed if we are
  // standing close to it, and open otherwise.
  return shouldTrapdoorOpen(gridEntity, firstSpawn);
}
