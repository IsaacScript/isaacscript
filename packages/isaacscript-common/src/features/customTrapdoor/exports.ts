import {
  GridCollisionClass,
  LevelStage,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../../cachedClasses";
import { TrapdoorAnimation } from "../../enums/private/TrapdoorAnimation";
import { errorIfFeaturesNotInitialized } from "../../featuresInitialized";
import { getNextStage, getNextStageType } from "../../functions/nextStage";
import { getRoomListIndex } from "../../functions/roomData";
import { isVector } from "../../functions/vector";
import { CustomTrapdoorDescription } from "../../interfaces/private/CustomTrapdoorDescription";
import { TrapdoorDestination } from "../../types/TrapdoorDestination";
import { spawnCustomGridEntity } from "../customGridEntity";
import {
  CUSTOM_TRAPDOOR_FEATURE_NAME,
  GridEntityTypeCustom,
} from "./customTrapdoorConstants";
import { shouldTrapdoorSpawnOpen } from "./openClose";
import v from "./v";

/**
 * Helper function to spawn a trapdoor grid entity that will have one or more of the following
 * attributes:
 *
 * - custom destination (or custom logic for after the player enters)
 * - custom graphics
 * - custom logic for opening/closing
 *
 * You can use this function to take the player to your custom stage.
 *
 * Under the hood, the custom trapdoor is represented by a decoration grid entity and is manually
 * respawned every time the player re-enters the room.
 *
 * @param gridIndexOrPosition The location in the room to spawn the trapdoor.
 * @param destination Optional. Used to specify where the player will go after jumping into the
 *                    trapdoor. Can either be a vanilla stage tuple, a custom stage tuple, or
 *                    undefined. For example, a destination of `[LevelStage.CAVES_1,
 *                    StageType.ORIGINAL]` corresponds to Caves 1, and a destination of
 *                    `["Slaughterhouse", 1]` corresponds to a custom stage of Slaughterhouse 1. If
 *                    the destination is undefined, then the "normal" destination corresponding to
 *                    the current stage and room will be used (e.g. the next floor, in most cases).
 * @param anm2Path Optional. The path to the anm2 file to use. By default, the vanilla trapdoor anm2
 *                 of "gfx/grid/door_11_trapdoor.anm2" will be used. The specified anm2 file must
 *                 have animations called "Opened", "Closed", and "Open Animation".
 * @param spawnOpen Optional. Whether or not to spawn the trapdoor in an open state. By default,
 *                  behavior will be used that emulates a vanilla trapdoor.
 */
export function spawnCustomTrapdoor(
  gridIndexOrPosition: int | Vector,
  destination?: TrapdoorDestination,
  anm2Path = "gfx/grid/door_11_trapdoor.anm2",
  spawnOpen?: boolean,
): GridEntity {
  errorIfFeaturesNotInitialized(CUSTOM_TRAPDOOR_FEATURE_NAME);

  const room = game.GetRoom();
  const roomFrameCount = room.GetFrameCount();
  const roomListIndex = getRoomListIndex();
  const gridIndex = isVector(gridIndexOrPosition)
    ? room.GetGridIndex(gridIndexOrPosition)
    : gridIndexOrPosition;

  const gridEntity = spawnCustomGridEntity(
    GridEntityTypeCustom.TRAPDOOR_CUSTOM,
    gridIndexOrPosition,
    GridCollisionClass.NONE,
    anm2Path,
    TrapdoorAnimation.OPENED,
  );

  const firstSpawn = roomFrameCount !== 0;
  const open =
    spawnOpen === undefined
      ? shouldTrapdoorSpawnOpen(gridEntity, firstSpawn)
      : spawnOpen;
  const destinationToUse =
    destination === undefined ? getDefaultDestination() : destination;

  const roomTrapdoorMap = v.level.trapdoors.getAndSetDefault(roomListIndex);
  const customTrapdoorDescription: CustomTrapdoorDescription = {
    open,
    destination: destinationToUse,
    firstSpawn,
  };
  roomTrapdoorMap.set(gridIndex, customTrapdoorDescription);

  if (!open) {
    const sprite = gridEntity.GetSprite();
    sprite.Play(TrapdoorAnimation.CLOSED, true);
  }

  return gridEntity;
}

function getDefaultDestination(): [stage: LevelStage, stageType: StageType] {
  const nextStage = getNextStage();
  const nextStageType = getNextStageType();

  return [nextStage, nextStageType];
}
