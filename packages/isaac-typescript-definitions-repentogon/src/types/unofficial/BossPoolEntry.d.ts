import type { BossID } from "isaac-typescript-definitions";
import type { Achievement } from "../../enums/Achievement";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface BossPoolEntry {
    achievementID: Achievement;
    bossID: BossID;
    initialWeight: float;
    weight: float;
    weightAlt: float;
  }
}
