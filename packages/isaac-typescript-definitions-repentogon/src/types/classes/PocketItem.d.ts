import type { PocketItemSlot } from "isaac-typescript-definitions";
import type { PocketItemType } from "../../enums/PocketItemType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface PocketItem {
    /** Returns the slot of the pocket item. */
    GetSlot: () => PocketItemSlot;

    /** Returns the pocket item's `PocketItemType`. */
    GetType: () => PocketItemType;
  }
}
