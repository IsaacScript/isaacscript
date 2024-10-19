import type {
  ActiveSlot,
  CardType,
  PillColor,
} from "isaac-typescript-definitions";
import type { PocketItemType } from "../../enums/PocketItemType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface PocketItem {
    /**
     * Returns an identifying value for the pocket item:
     *
     * - Returns `CardType` if the pocket item is a card.
     * - Returns `PillColor` if the pocket item is a pill.
     * - Returns an `ActiveSlot` offset by +1 if the pocket item is an active item.
     * - Returns 0 if the pocket slot is empty.
     *
     * **Example**
     *
     * This snippet obtains the `CollectibleType` of the pocket item in a given pocket slot:
     *
     * ```ts
     * const player = Isaac.GetPlayer();
     * const pocketItem = player.GetPocketItem(PillCardSlot.PRIMARY);
     *
     * if (pocketItem.GetType() === PocketItemType.ACTIVE_ITEM) {
     *   const activeSlot = (pocketItem.GetSlot() - 1) as ActiveSlot;
     *   const activeItemID = player.GetActiveItem(activeSlot);
     *   print(activeItemID);
     * }
     * ```
     */
    GetSlot: () => CardType | PillColor | ActiveSlot | 0;

    /**
     * Returns the pocket item's `PocketItemType`.
     *
     * Do not use this method if the slot is currently empty as the game sometimes does not clear
     * the value.
     */
    GetType: () => PocketItemType;
  }
}
