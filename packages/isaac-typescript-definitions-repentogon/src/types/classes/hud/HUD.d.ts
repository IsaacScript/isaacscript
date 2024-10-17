declare interface HUD extends IsaacAPIClass {
  /** Flashes the player's red hearts on their HUD. */
  FlashRedHearts: (player: EntityPlayer) => void;

  /**
   * Returns the percent the boss HP bar is filled between 0 - 1. Returns -1 if the boss HP bar is
   * not rendering.
   */
  GetBossHPBarFill: () => number;

  /** Returns the sprite object used to render pills, cards, and rune sprites in the HUD. */
  GetCardsPillsSprite: () => Sprite;

  /** Returns the sprite object used to render the charge bar. */
  GetChargeBarSprite: () => Sprite;

  /** Returns the sprite used to render the co-op player select menu. */
  GetCoopMenuSprite: () => Sprite;

  /** Returns the sprite used to render the Bag of Crafting HUD. */
  GetCraftingSprite: () => Sprite;

  /** Returns the sprite used to render the fortune popup window. */
  GetFortuneSprite: () => Sprite;

  /** Returns the sprite used to render health. */
  GetHeartsSprite: () => Sprite;

  /** Returns the sprite used to render Tainted Isaac's inventory. */
  GetInventorySprite: () => Sprite;

  /** Returns the sprite used to render the pickups HUD. */
  GetPickupsHUDSprite: () => Sprite;

  /**
   * Returns the `PlayerHUD` from the provided index.
   *
   * @param index Optional. The index must be between 0 - 7, otherwise an error is thrown. Default
   *              is 0.
   */
  GetPlayerHUD: (index?: int) => PlayerHUD;

  /** Returns the sprite used to render Tainted Blue Baby's poop spells. */
  GetPoopSpellSprite: () => Sprite;

  /**
   * Returns the sprite used to render streak popups (e.g. Picking up items, displaying floor
   * names).
   */
  GetStreakSprite: () => Sprite;

  /**
   * Updates the fill of the boss HP bar. This does not affect the current health of the boss.
   *
   * This method must be called on every render frame.
   *
   * @param percent Must be between 0 and 1. If the value is below 0, the boss HP bar will not
   *                render.
   */
  SetBossHPBarFill: (percent: number) => void;
}
