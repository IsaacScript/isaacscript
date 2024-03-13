import type { BabySubType } from "../../../enums/collections/subTypes";
import type { Achievement } from "../../../enums/repentogon/Achievement";

declare global {
  interface EntityConfigBaby {
    /** Returns the Achievement id tied to the baby's unlock. */
    GetAchievementID: () => Achievement;

    /** Returns the BabySubType of the baby. */
    GetID: () => BabySubType;

    /** Returns the name of the baby. */
    GetName: () => string;

    /** Returns a path to the baby's spritesheet. */
    GetSpritesheetPath: () => string;
  }
}
