/**
 * Corresponds to the "type" attribute in the "pocketitems.xml" file.
 *
 * Matches the `ItemConfig.CARDTYPE_` members of the `ItemConfig` class. In IsaacScript, we
 * reimplement this as an enum instead, since it is cleaner.
 *
 * Note that this enum is not to be confused with the `CardType` enum; the latter denotes the
 * in-game sub-type of the card, which is completely different.
 */
export enum ItemConfigCardType {
  /** No valid card will have this type. */
  NULL = -1,

  /** A normal card with a brown back, like "0 - The Fool". */
  TAROT = 0,

  /**
   * A playing card with a red back, like 2 of Clubs. This includes the Queen of Hearts and the
   * Joker. This does not include Suicide King or the Rules Card.
   */
  SUIT = 1,

  /**
   * A left-facing rune like Hagalaz, a right-facing rune like Ansuz, a Black Rune, a Blank Rune, a
   * a Rune Shard, or a "soul" rune like Soul of Isaac.
   */
  RUNE = 2,

  /**
   * A card that does not fall into any of the other categories, like a Chaos Card (42). This
   * category excludes non-cards such as Dice Shard.
   *
   * Most of the cards in this category have unique card-backs.
   *
   * 4 cards share the Magic the Gathering back:
   * - Chaos Card (42)
   * - Huge Growth (52)
   * - Ancient Recall (53)
   * - Era Walk (54)
   *
   * 3 cards have a red playing card back:
   * - Rules Card (44)
   * - Suicide King (46)
   * - ? Card (48)
   */
  SPECIAL = 3,

  /** A Dice Shard, an Emergency Contact, or a Cracked Key. */
  SPECIAL_OBJECT = 4,

  /** A reverse tarot card with a reddish-brown back, like "0 - The Fool?". */
  TAROT_REVERSE = 5,

  /**
   * This is not a real `CardType`. Due to limitations in the API, getting the real type of modded
   * cards is not possible, so this value is returned instead.
   */
  MODDED = 6,
}
