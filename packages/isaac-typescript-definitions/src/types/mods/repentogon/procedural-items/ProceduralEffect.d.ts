import type { ProceduralEffectActionType } from "../../../../enums/mods/repentogon/ProceduralEffectActionType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface ProceduralEffect {
    GetActionType: () => ProceduralEffectActionType;

    /** Values range from 0 to 1. */
    GetTriggerChance: () => number;
  }
}
