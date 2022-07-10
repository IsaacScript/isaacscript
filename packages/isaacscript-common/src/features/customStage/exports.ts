import { LevelStage } from "isaac-typescript-definitions";
import { CustomStageData } from "../../interfaces/CustomStageData";
import { JSONRoom } from "../../interfaces/JSONRoom";
import { customStages } from "./v";

/**
 * Helper function to register a new custom stage with the IsaacScript standard library stage
 * system.
 */
export function registerCustomStage(
  name: string,
  baseStage: LevelStage,
  jsonRooms: JSONRoom[] | readonly JSONRoom[],
): void {
  if (customStages.has(name)) {
    error(
      `Failed to register a custom stage of "${name}" since there is already a custom stage registered by that name.`,
    );
  }

  if (jsonRooms.length === 0) {
    error(
      `Failed to register a custom stage of "${name}" since the provided JSON room array was empty.`,
    );
  }

  const customStageData: CustomStageData = {
    name,
    baseStage,
  };
  customStages.set(name, customStageData);
}

/**
 * Helper function to warp to a custom stage/level.
 *
 * Custom stages/levels must first be registered with the `registerCustomStage` function.
 */
export function setCustomStage(_name: string): void {}
