import type { CollectibleType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface ActiveItemDesc {
    BatteryCharge: int;
    Charge: int;
    Item: CollectibleType;
    PartialCharge: number;
    SubCharge: int;
    TimedRechargeCooldown: int;
    VarData: int;
  }
}
