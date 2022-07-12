import { isArray } from "../../functions/array";
import { CustomStage } from "../../interfaces/CustomStage";
import * as metadataJSON from "./metadata.json"; // This will correspond to "metadata.lua" at run-time.
import { customStagesMap } from "./v";

export function customStageInit(): void {
  const customStages = metadataJSON as unknown as CustomStage[];
  if (!isArray(customStages)) {
    error(
      'The IsaacScript standard library attempted to read the custom stage metadata from the "metadata.lua" file, but it was not an array.',
    );
  }

  for (const customStage of customStages) {
    customStagesMap.set(customStage.name, customStage);
  }
}
