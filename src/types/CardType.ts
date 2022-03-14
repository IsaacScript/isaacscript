/** Matches the "type" attribute in the "pocketitems.xml" file. */
export enum CardType {
  /** No valid card will have this type. */
  NULL,

  /** A normal card with a brown back, like "0 - The Fool". */
  TAROT,

  /** A playing card with a red back, like 2 of Clubs. This includes the Queen of Hearts. */
  SUIT,

  /**
   * A left-facing rune like Hagalaz, a right-facing rune like Ansuz, a Black Rune, a Blank Rune, a
   * a Rune Shard, or a "soul" rune like Soul of Isaac.
   */
  RUNE,

  /**
   * A card that does not fall into any of the other categories, like a Chaos Card (42).
   *
   * Most of these have unique backs.
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
  SPECIAL,

  /** A Dice Shard, an Emergency Contact, or a Cracked Key. */
  OBJECT,

  /** A reverse tarot card with a reddish-brown back, like "0 - The Fool?". */
  TAROT_REVERSE,

  /**
   * This is not a real `CardType`. Due to limitations in the API, getting the real type of modded
   * cards is not possible, so this value is returned instead.
   */
  MODDED,
}
