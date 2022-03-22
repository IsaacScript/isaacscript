/**
 * Matches the ItemConfig.CARDTYPE_* members of the ItemConfig class.
 *
 * In IsaacScript, we reimplement this as an enum, since it is cleaner.
 */
declare const enum ItemConfigCardType {
  TAROT = 0,

  /**
   * Standard playing cards (twos, aces and Joker, does not include Suicide King, Rules Card or
   * Queen of Hearts).
   */
  CARDTYPE_SUIT = 1,

  CARDTYPE_RUNE = 2,

  /**
   * Anything that doesn't fall in the earlier categories.
   * This excludes non-cards such as Dice Shard, which are located in subsequent enums.
   */
  CARDTYPE_SPECIAL = 3,

  /** Special pocket items that do not qualify as "cards". */
  CARDTYPE_SPECIAL_OBJECT = 4,

  CARDTYPE_TAROT_REVERSE = 5,
}
