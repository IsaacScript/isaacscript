/**
 * Matches the ItemConfig.TAG_* members of the ItemConfig class.
 *
 * In IsaacScript, we re-implement this as an enum, since it is cleaner.
 */
export enum ItemConfigTag {
  /**
   * Dead things (for the Parasite unlock).
   *
   * Equal to "dead" in "items_metadata.xml".
   *
   * 1 << 0
   */
  DEAD = 1 << 0,

  /**
   * Syringes (for Little Baggy and the Spun! transformation).
   *
   * Equal to "syringe" in "items_metadata.xml".
   * 1 << 1
   */
  SYRINGE = 1 << 1,

  /**
   * Mom's things (for Mom's Contact and the Yes Mother? transformation).
   *
   * Equal to "mom" in "items_metadata.xml".
   *
   * 1 << 2
   */
  MOM = 1 << 2,

  /**
   * Technology items (for the Technology Zero unlock).
   *
   * Equal to "tech" in "items_metadata.xml".
   *
   * 1 << 3
   */
  TECH = 1 << 3,

  /**
   * Battery items (for the Jumper Cables unlock).
   *
   * Equal to "battery" in "items_metadata.xml".
   *
   * 1 << 4
   */
  BATTERY = 1 << 4,

  /**
   * Guppy items (Guppy transformation).
   *
   * Equal to "guppy" in "items_metadata.xml".
   *
   * 1 << 5
   */
  GUPPY = 1 << 5,

  /**
   * Fly items (Beelzebub transformation).
   *
   * Equal to "fly" in "items_metadata.xml".
   *
   * 1 << 6
   */
  FLY = 1 << 6,

  /**
   * Bob items (Bob transformation).
   *
   * Equal to "bob" in "items_metadata.xml".
   *
   * 1 << 7
   */
  BOB = 1 << 7,

  /**
   * Mushroom items (Fun Guy transformation).
   *
   * Equal to "mushroom" in "items_metadata.xml".
   *
   * 1 << 8
   */
  MUSHROOM = 1 << 8,

  /**
   * Baby items (Conjoined transformation).
   *
   * Equal to "mushroom" in "items_metadata.xml".
   *
   * 1 << 9
   */
  BABY = 1 << 9,

  /**
   * Angel items (Seraphim transformation).
   *
   * Equal to "angel" in "items_metadata.xml".
   *
   * 1 << 10
   */
  ANGEL = 1 << 10,

  /**
   * Devil items (Leviathan transformation).
   *
   * Equal to "devil" in "items_metadata.xml".
   *
   * 1 << 11
   */
  DEVIL = 1 << 11,

  /**
   * Poop items (Oh Shit transformation).
   *
   * Equal to "poop" in "items_metadata.xml".
   *
   * 1 << 12
   */
  POOP = 1 << 12,

  /**
   * Book items (Book Worm transformation).
   *
   * Equal to "book" in "items_metadata.xml".
   *
   * 1 << 13
   */
  BOOK = 1 << 13,

  /**
   * Spider items (Spider Baby transformation).
   *
   * Equal to "spider" in "items_metadata.xml".
   *
   * 1 << 14
   */
  SPIDER = 1 << 14,

  /**
   * Quest item (cannot be rerolled or randomly obtained).
   *
   * Equal to "quest" in "items_metadata.xml".
   *
   * 1 << 15
   */
  QUEST = 1 << 15,

  /**
   * Can be spawned by Monster Manual.
   *
   * Equal to "monstermanual" in "items_metadata.xml".
   *
   * 1 << 16
   */
  MONSTER_MANUAL = 1 << 16,

  /**
   * Cannot appear in Greed Mode.
   *
   * Equal to "nogreed" in "items_metadata.xml".
   *
   * 1 << 17
   */
  NO_GREED = 1 << 17,

  /**
   * Food item (for Binge Eater).
   *
   * Equal to "food" in "items_metadata.xml".
   *
   * 1 << 18
   */
  FOOD = 1 << 18,

  /**
   * Tears up item (for Lachryphagy unlock detection).
   *
   * Equal to "tearsup" in "items_metadata.xml".
   *
   * 1 << 19
   */
  TEARS_UP = 1 << 19,

  /**
   * Whitelisted item for Tainted Lost.
   *
   * Equal to "offensive" in "items_metadata.xml".
   *
   * 1 << 20
   */
  OFFENSIVE = 1 << 20,

  /**
   * Blacklisted item for Keeper & Tainted Keeper.
   *
   * Equal to "nokeeper" in "items_metadata.xml".
   *
   * 1 << 21
   */
  NO_KEEPER = 1 << 21,

  /**
   * Blacklisted item for The Lost's Birthright.
   *
   * Equal to "nolostbr" in "items_metadata.xml".
   *
   * 1 << 22
   */
  NO_LOST_BR = 1 << 22,

  /**
   * Star themed items (for the Planetarium unlock).
   *
   * Equal to "stars" in "items_metadata.xml".
   *
   * 1 << 23
   */
  STARS = 1 << 23,

  /**
   * Summonable items (for Tainted Bethany).
   *
   * Equal to "summonable" in "items_metadata.xml".
   *
   * 1 << 24
   */
  SUMMONABLE = 1 << 24,

  /**
   * Can't be obtained in Cantripped challenge.
   *
   * Equal to "nocantrip" in "items_metadata.xml".
   *
   * 1 << 25
   */
  NO_CANTRIP = 1 << 25,

  /**
   * Active items that have wisps attached to them (automatically set).
   *
   * Not equal to any particular tag in "items_metadata.xml". Instead, this is set for all of the
   * items in the "wisps.xml" file.
   *
   * 1 << 26
   */
  WISP = 1 << 26,

  /**
   * Unique familiars that cannot be duplicated.
   *
   * Equal to "uniquefamiliar" in "items_metadata.xml".
   *
   * 1 << 27
   */
  UNIQUE_FAMILIAR = 1 << 27,

  /**
   * Items that should not be obtainable in challenges.
   *
   * Equal to "nochallenge" in "items_metadata.xml".
   *
   * 1 << 28
   */
  NO_CHALLENGE = 1 << 28,

  /**
   * Items that should not be obtainable in daily runs.
   *
   * Equal to "nodaily" in "items_metadata.xml".
   *
   * 1 << 29
   */
  NO_DAILY = 1 << 29,

  /**
   * Items that should be shared between Tainted Lazarus' forms.
   *
   * This is different from `LAZ_SHARED_GLOBAL` in that it does apply stat changes from the item for
   * both characters.
   *
   * Equal to "lazarusshared" in "items_metadata.xml".
   *
   * 1 << 30
   */
  LAZ_SHARED = 1 << 30,

  /**
   * Items that should be shared between Tainted Lazarus' forms but only through global checks (such
   * as `PlayerManager::HasCollectible`).
   *
   * This is different from `LAZ_SHARED` in that it does not apply stat changes from the item for
   * both characters.
   *
   * Equal to "lazarussharedglobal" in "items_metadata.xml".
   *
   * 1 << 31
   */
  LAZ_SHARED_GLOBAL = 2147483648,
  // (this cannot be represented as "1 << 31" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Items that will not be a random starting item for Eden and Tainted Eden.
   *
   * Equal to "noeden" in "items_metadata.xml".
   *
   * 1 << 32
   */
  NO_EDEN = 4294967296,
  // (this cannot be represented as "1 << 32" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)
}
