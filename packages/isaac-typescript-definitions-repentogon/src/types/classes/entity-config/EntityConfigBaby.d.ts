import type { BabySubType } from "isaac-typescript-definitions";
import type { Achievement } from "../../../enums/Achievement";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface EntityConfigBaby extends IsaacAPIClass {
    /** Returns the `Achievement` tied to the baby's unlock. */
    readonly GetAchievementID: () => Achievement;

    /** Returns the `BabySubType` of the baby. */
    readonly GetID: () => BabySubType;

    /** Returns the name of the baby. */
    readonly GetName: () => string;

    /** Returns a path to the baby's spritesheet. */
    readonly GetSpritesheetPath: () => string;
  }
}
