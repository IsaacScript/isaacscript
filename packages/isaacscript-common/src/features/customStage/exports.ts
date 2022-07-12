import { customStagesMap } from "./v";

/**
 * Helper function to warp to a custom stage/level.
 *
 * Custom stages/levels must first be registered with the `registerCustomStage` function.
 */
export function setCustomStage(name: string): void {
  const customStage = customStagesMap.get(name);
  if (customStage === undefined) {
    error(
      `Failed to set the custom stage of "${name}" because it was not found in the custom stages map. (This means that you probably forgot to define it in your "tsconfig.json" file.) See the website for more details on how to set up custom stages..`,
    );
  }
}
