import {
  GridCollisionClass,
  LevelStage,
  RoomType,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../../cachedClasses";
import { errorIfFeaturesNotInitialized } from "../../featuresInitialized";
import { getNextStage, getNextStageType } from "../../functions/nextStage";
import { anyPlayerCloserThan } from "../../functions/positionVelocity";
import { spawnCustomGridEntity } from "../customGridEntity";
import { getRoomClearGameFrame } from "../roomClearFrame";
import {
  CUSTOM_TRAPDOOR_FEATURE_NAME,
  GridEntityTypeCustom,
  TRAPDOOR_BOSS_REACTION_FRAMES,
  TRAPDOOR_OPEN_DISTANCE,
  TRAPDOOR_OPEN_DISTANCE_AFTER_BOSS,
} from "./customTrapdoorConstants";
import { getCustomTrapdoorDescription } from "./v";

/**
 * Helper function to spawn a trapdoor grid entity that will have one or more of the following
 * attributes:
 *
 * - custom destination (or custom logic for after the player enters)
 * - custom graphics
 * - custom logic for opening/closing
 * - TODO: animation
 *
 * You can use this function to take the player to your custom stage.
 *
 * Under the hood, the custom trapdoor is represented by a decoration grid entity and is manually
 * respawned every time the player re-enters the room.
 *
 * @param gridIndexOrPosition The location in the room to spawn the trapdoor.
 * @param _destination Used to specify where the player will go after jumping into the trapdoor. Can
 *                     either be a tuple containing the stage and stage type, a string containing
 *                     the name of a custom stage, or undefined. If undefined, nothing will happen
 *                     after the player jumps in the trapdoor. (Use undefined to perform some custom
 *                     behavior and/or handle the traveling part yourself.) You can also specify a
 *                     function that returns one of these things. By default, the destination will
 *                     be set to the next floor like that of a vanilla trapdoor.
 * @param anm2Path Optional. The path to the anm2 file to use. By default, the vanilla trapdoor anm2
 *                 of "gfx/grid/door_11_trapdoor.anm2" will be used.
 * @param _shouldOpenFunc Optional. If the trapdoor is currently closed, this function will run on
 *                        every frame to determine if it should open. By default, a function that
 *                        emulates a vanilla trapdoor will be used.
 * @param _shouldCloseFunc Optional. If the trapdoor is currently open, this function will run on
 *                         every frame to determine if it should close. By default, a function that
 *                         emulates a vanilla trapdoor will be used.
 * @param _spawnOpen Optional. Whether or not to spawn the trapdoor in an open state. Can either be
 *                   a boolean or a function returning a boolean. By default, a function that
 *                   emulates a vanilla trapdoor will be used.
 */
export function spawnCustomTrapdoor(
  gridIndexOrPosition: int | Vector,
  _destination:
    | [stage: LevelStage, stageType: StageType]
    | string
    | ((
        gridEntity: GridEntity,
      ) =>
        | [stage: LevelStage, stageType: StageType]
        | string
        | undefined) = defaultDestinationFunc,
  anm2Path = "gfx/grid/door_11_trapdoor.anm2",
  _shouldOpenFunc: (gridEntity: GridEntity) => boolean = defaultShouldOpenFunc,
  _shouldCloseFunc: (
    gridEntity: GridEntity,
  ) => boolean = defaultShouldCloseFunc,
  _spawnOpen:
    | boolean
    | ((gridEntity: GridEntity) => boolean) = defaultShouldSpawnOpenFunc,
): GridEntity {
  errorIfFeaturesNotInitialized(CUSTOM_TRAPDOOR_FEATURE_NAME);

  // TODO
  return spawnCustomGridEntity(
    GridEntityTypeCustom.TRAPDOOR_CUSTOM,
    gridIndexOrPosition,
    anm2Path,
    "Closed",
    GridCollisionClass.NONE,
  );
}

function defaultDestinationFunc(): [stage: LevelStage, stageType: StageType] {
  const nextStage = getNextStage();
  const nextStageType = getNextStageType();

  return [nextStage, nextStageType];
}

function defaultShouldOpenFunc(gridEntity: GridEntity): boolean {
  const trapdoorDescription = getCustomTrapdoorDescription(gridEntity);
  if (trapdoorDescription === undefined) {
    return false;
  }

  const room = game.GetRoom();
  const roomClear = room.IsClear();

  return (
    !anyPlayerCloserThan(gridEntity.Position, TRAPDOOR_OPEN_DISTANCE) &&
    !isPlayerCloseAfterBoss(gridEntity.Position) &&
    !shouldBeClosedFromStartingInRoomWithEnemies(
      trapdoorDescription.firstSpawn,
      roomClear,
    )
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

/** By default, trapdoors will never close if they are already open. */
function defaultShouldCloseFunc(): boolean {
  return false;
}

function defaultShouldSpawnOpenFunc(gridEntity: GridEntity): boolean {
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
  return defaultShouldOpenFunc(gridEntity);
}
