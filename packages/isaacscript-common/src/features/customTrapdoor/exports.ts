import { LevelStage, StageType } from "isaac-typescript-definitions";
import { errorIfFeaturesNotInitialized } from "../../featuresInitialized";
import { getNextStage, getNextStageType } from "../../functions/nextStage";
import { CustomTrapdoorDestination } from "../../interfaces/private/CustomTrapdoorDestination";
import { CUSTOM_TRAPDOOR_FEATURE_NAME } from "./customTrapdoorConstants";
import { spawnCustomTrapdoorToDestination } from "./spawn";

/**
 * Helper function to spawn a trapdoor grid entity that will take a player to a custom stage. If you
 * want to create a custom trapdoor that goes to a vanilla stage instead, use the
 * `spawnCustomTrapdoorToVanilla` helper function.
 *
 * Custom trapdoors can have one or more of the following attributes:
 *
 * - custom destination (or custom logic for after the player enters)
 * - custom graphics
 * - custom logic for opening/closing
 *
 * Under the hood, the custom trapdoor is represented by a decoration grid entity and is manually
 * respawned every time the player re-enters the room.
 *
 * @param gridIndexOrPosition The location in the room to spawn the trapdoor.
 * @param customStageName The name of the custom stage.
 * @param customStageFloorNum The floor of the custom stage. For most purposes, you should use 1 or
 *                            2.
 * @param anm2Path Optional. The path to the anm2 file to use. By default, the vanilla trapdoor anm2
 *                 of "gfx/grid/door_11_trapdoor.anm2" will be used. The specified anm2 file must
 *                 have animations called "Opened", "Closed", and "Open Animation".
 * @param spawnOpen Optional. Whether or not to spawn the trapdoor in an open state. By default,
 *                  behavior will be used that emulates a vanilla trapdoor.
 */
export function spawnCustomTrapdoor(
  gridIndexOrPosition: int | Vector,
  customStageName: string,
  customStageFloorNum: int,
  anm2Path = "gfx/grid/door_11_trapdoor.anm2",
  spawnOpen?: boolean,
): GridEntity {
  errorIfFeaturesNotInitialized(CUSTOM_TRAPDOOR_FEATURE_NAME);

  const destination: CustomTrapdoorDestination = {
    customStageName,
    customStageFloorNum,
  };

  return spawnCustomTrapdoorToDestination(
    gridIndexOrPosition,
    destination,
    anm2Path,
    spawnOpen,
  );
}

/**
 * This is the same thing as the `spawnCustomTrapdoor` function, but instead of having a destination
 * of a custom stage, it has a destination of a vanilla stage.
 *
 * For more information, see the `spawnCustomTrapdoor` function.
 *
 * @param gridIndexOrPosition The location in the room to spawn the trapdoor.
 * @param stage Optional. The number of the vanilla stage to go to. If not provided, the "normal"
 *              next stage will be selected.
 * @param stageType The stage type of the vanilla stage to go to. If not provided, the "normal" next
 *                  stage type will be selected.
 * @param anm2Path Optional. The path to the anm2 file to use. By default, the vanilla trapdoor anm2
 *                 of "gfx/grid/door_11_trapdoor.anm2" will be used. The specified anm2 file must
 *                 have animations called "Opened", "Closed", and "Open Animation".
 * @param spawnOpen Optional. Whether or not to spawn the trapdoor in an open state. By default,
 *                  behavior will be used that emulates a vanilla trapdoor.
 */
export function spawnCustomTrapdoorToVanilla(
  gridIndexOrPosition: int | Vector,
  stage?: LevelStage,
  stageType?: StageType,
  anm2Path = "gfx/grid/door_11_trapdoor.anm2",
  spawnOpen?: boolean,
): GridEntity {
  errorIfFeaturesNotInitialized(CUSTOM_TRAPDOOR_FEATURE_NAME);

  const vanillaStage = stage === undefined ? getNextStage() : stage;
  const vanillaStageType =
    stageType === undefined ? getNextStageType() : stageType;

  const destination: CustomTrapdoorDestination = {
    vanillaStage,
    vanillaStageType,
  };

  return spawnCustomTrapdoorToDestination(
    gridIndexOrPosition,
    destination,
    anm2Path,
    spawnOpen,
  );
}
