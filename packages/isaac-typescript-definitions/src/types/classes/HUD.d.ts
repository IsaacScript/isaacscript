import type { ActiveSlot } from "../../enums/ActiveSlot";

declare global {
  interface HUD extends IsaacAPIClass {
    /**
     * Causes the charge bar of the active item in the specified slot to blink as if it had gained
     * charges.
     *
     * @param player
     * @param slot Default is `ActiveSlot.SLOT_PRIMARY`.
     */
    FlashChargeBar: (player: EntityPlayer, slot?: ActiveSlot) => void;

    /**
     * Forces the specified active item slot to update. This might be useful for functions that
     * modify an active item slot without directly giving or removing items.
     *
     * @param player
     * @param slot Default is `ActiveSlot.SLOT_PRIMARY`.
     */
    InvalidateActiveItem: (player: EntityPlayer, slot?: ActiveSlot) => void;

    /**
     * Forces the crafting output from Bag of Crafting to update.
     *
     * @param player
     */
    InvalidateCraftingItem: (player: EntityPlayer) => void;

    IsVisible: () => boolean;
    PostUpdate: () => void;
    Render: () => void;
    SetVisible: (visible: boolean) => void;

    /**
     * Accepts an array of up to 32 strings, where each string is a line of text.
     *
     * Passing more than 7 lines will result in them not being displayed properly, since the fortune
     * paper does not dynamically stretch to accommodate the extra lines.
     *
     * @param text
     */
    ShowFortuneText: (...text: string[]) => void;

    /**
     * Shows the pickup text for the specified item as if it was picked up by the specified player.
     * The overloaded method supports showing custom pickup text.
     */
    ShowItemText: ((player: EntityPlayer, item: ItemConfigItem) => void) &
      ((name: string, description?: string, paper?: boolean) => void);

    Update: () => void;
  }
}
