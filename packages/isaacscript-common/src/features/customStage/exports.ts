import { LevelStage } from "isaac-typescript-definitions";
import { CustomStageData } from "../../interfaces/CustomStageData";
import { JSONRoom } from "../../interfaces/JSONRoom";
import * as metadataJSON from "./metadata.json";
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
export function setCustomStage(name: string): void {
  const customStageMetadata = metadataJSON as unknown as Record<
    string,
    CustomStageData
  >;
  const metadata = customStageMetadata[name];
  if (metadata === undefined) {
    error(
      `Failed to set the custom stage of "${name}" because it was not found in the "metadata.json" file. (This means that you probably forgot to define it in your "tsconfig.json" file.)`,
    );
  }
}
