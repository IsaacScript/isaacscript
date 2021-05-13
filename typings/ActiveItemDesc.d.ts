declare class ActiveItemDesc {
  BatteryCharge: int;
  Charge: int;
  Item: CollectibleType | int;
  /** How close the item is to gaining another charge (0-1 range, used by 4.5 Volt). */
  PartialCharge: float;
  /**
   * Number of frames before an item with a timed cooldown can recharge again.
   * (Used by Spin To Win to pause its recharge after fully discharging it.)
   */
  TimedRechargeCooldown: int;
  /**
   * Holds extra information for some active items (such as the number of uses for Jar of Wisps)
   */
  VarData: int;
}
