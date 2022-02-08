// These are unofficial enums contributed by the community
// We have to use const enums here instead of normal enums because the corresponding Lua globals do
// not exist
// https://www.typescriptlang.org/docs/handbook/enums.html
// Alternatively, we could create new global enums, but that would pollute the global namespace

// Some of the official enums repeat themselves inside of the properties
// e.g. "CollectibleType.COLLECTIBLE_SAD_ONION" is better written as "CollectibleType.SAD_ONION"
// As a standard, enums in this file do not use any unnecessary prefixes

/**
 * Matches the ItemConfig.CHARGE_* members of the ItemConfig class.
 * In IsaacScript, we reimplement this as an enum, since it is cleaner.
 */
declare const enum ItemConfigChargeType {
  NORMAL = 0,
  TIMED = 1,
  SPECIAL = 2,
}

/**
 * Matches the ItemConfig.TAG_* members of the ItemConfig class.
 * In IsaacScript, we reimplement this as an enum, since it is cleaner.
 * The vanilla is enum is missing values for the following tags:
 * - nochallenge         - 1 << 28
 * - nodaily             - 1 << 29
 * - lazarusshared       - 1 << 30
 * - lazarussharedglobal - 1 << 31
 * - noeden              - 1 << 32
 */
declare const enum ItemConfigTag {
  /**
   * Dead things (for the Parasite unlock).
   * Equal to "dead" in "items_metadata.xml".
   */
  DEAD = 1,
  /**
   * Syringes (for Little Baggy and the Spun! transformation).
   * Equal to "syringe" in "items_metadata.xml".
   */
  SYRINGE = 1 << 1,
  /**
   * Mom's things (for Mom's Contact and the Yes Mother? transformation).
   * Equal to "mom" in "items_metadata.xml".
   */
  MOM = 1 << 2,
  /**
   * Technology items (for the Technology Zero unlock).
   * Equal to "tech" in "items_metadata.xml".
   */
  TECH = 1 << 3,
  /**
   * Battery items (for the Jumper Cables unlock).
   * Equal to "battery" in "items_metadata.xml".
   */
  BATTERY = 1 << 4,
  /**
   * Guppy items (Guppy transformation).
   * Equal to "guppy" in "items_metadata.xml".
   */
  GUPPY = 1 << 5,
  /**
   * Fly items (Beelzebub transformation).
   * Equal to "fly" in "items_metadata.xml".
   */
  FLY = 1 << 6,
  /**
   * Bob items (Bob transformation).
   * Equal to "bob" in "items_metadata.xml".
   */
  BOB = 1 << 7,
  /**
   * Mushroom items (Fun Guy transformation).
   * Equal to "mushroom" in "items_metadata.xml".
   */
  MUSHROOM = 1 << 8,
  /**
   * Baby items (Conjoined transformation).
   * Equal to "mushroom" in "items_metadata.xml".
   */
  BABY = 1 << 9,
  /**
   * Angel items (Seraphim transformation).
   * Equal to "angel" in "items_metadata.xml".
   */
  ANGEL = 1 << 10,
  /**
   * Devil items (Leviathan transformation).
   * Equal to "devil" in "items_metadata.xml".
   */
  DEVIL = 1 << 11,
  /**
   * Poop items (Oh Shit transformation).
   * Equal to "poop" in "items_metadata.xml".
   */
  POOP = 1 << 12,
  /**
   * Book items (Book Worm transformation).
   * Equal to "book" in "items_metadata.xml".
   */
  BOOK = 1 << 13,
  /**
   * Spider items (Spider Baby transformation).
   * Equal to "spider" in "items_metadata.xml".
   */
  SPIDER = 1 << 14,
  /**
   * Quest item (cannot be rerolled or randomly obtained).
   * Equal to "quest" in "items_metadata.xml".
   */
  QUEST = 1 << 15,
  /**
   * Can be spawned by Monster Manual.
   * Equal to "monstermanual" in "items_metadata.xml".
   */
  MONSTER_MANUAL = 1 << 16,
  /**
   * Cannot appear in Greed Mode.
   * Equal to "nogreed" in "items_metadata.xml".
   */
  NO_GREED = 1 << 17,
  /**
   * Food item (for Binge Eater).
   * Equal to "food" in "items_metadata.xml".
   */
  FOOD = 1 << 18,
  /**
   * Tears up item (for Lachryphagy unlock detection).
   * Equal to "tearsup" in "items_metadata.xml".
   */
  TEARS_UP = 1 << 19,
  /**
   * Whitelisted item for Tainted Lost.
   * Equal to "offensive" in "items_metadata.xml".
   */
  OFFENSIVE = 1 << 20,
  /**
   * Blacklisted item for Keeper & Tainted Keeper.
   * Equal to "nokeeper" in "items_metadata.xml".
   */
  NO_KEEPER = 1 << 21,
  /**
   * Blacklisted item for The Lost's Birthright.
   * Equal to "nolostbr" in "items_metadata.xml".
   */
  NO_LOST_BR = 1 << 22,
  /**
   * Star themed items (for the Planetarium unlock).
   * Equal to "stars" in "items_metadata.xml".
   */
  STARS = 1 << 23,
  /**
   * Summonable items (for Tainted Bethany).
   * Equal to "summonable" in "items_metadata.xml".
   */
  SUMMONABLE = 1 << 24,
  /**
   * Can't be obtained in Cantripped challenge.
   * Equal to "nocantrip" in "items_metadata.xml".
   */
  NO_CANTRIP = 1 << 25,
  /**
   * Active items that have wisps attached to them (automatically set).
   * Not equal to any particular tag in "items_metadata.xml". Instead, this is set for all of the
   * items in the "wisps.xml" file.
   */
  WISP = 1 << 26,
  /**
   * Unique familiars that cannot be duplicated.
   * Equal to "uniquefamiliar" in "items_metadata.xml".
   */
  UNIQUE_FAMILIAR = 1 << 27,
  /**
   * Won't appear in challenges.
   * Equal to "nochallenge" in "items_metadata.xml".
   * This is not present in the vanilla enum.
   */
  NO_CHALLENGE = 1 << 28,
  /**
   * Won't appear in Daily Challenges.
   * Equal to "nodaily" in "items_metadata.xml".
   * This is not present in the vanilla enum.
   */
  NO_DAILY = 1 << 29,
  /**
   * Used for items that should be shared between Tainted Lazarus and Dead Tainted Lazarus.
   * This is different from `LAZARUS_SHARED_GLOBAL` in that it does apply stat changes from the item
   * for both characters.
   * Equal to "lazarusshared" in "items_metadata.xml".
   * This is not present in the vanilla enum.
   */
  LAZARUS_SHARED = 1 << 30,
  /**
   * Used for items that should be shared between Tainted Lazarus and Dead Tainted Lazarus.
   * This is different from `LAZARUS_SHARED` in that it does not apply stat changes from the item
   * for both characters.
   * Equal to "lazarussharedglobal" in "items_metadata.xml".
   * This is not present in the vanilla enum.
   */
  LAZARUS_SHARED_GLOBAL = 1 << 31,
  /**
   * Won't be a starting item for Eden and Tainted Eden.
   * Equal to "noeden" in "items_metadata.xml".
   * This is not present in the vanilla enum.
   */
  NO_EDEN = 4294967296,
  // (we can't represent this as "1 << 32" because JavaScript only has 32-bit numbers and it will be
  // converted to 1)
}

/**
 * Matches the ItemConfig.CARDTYPE_* members of the ItemConfig class.
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

declare const enum Dimension {
  CURRENT = -1,
  MAIN = 0,
  /** Used by the mirror sequence and the escape sequence. */
  SECONDARY = 1,
  DEATH_CERTIFICATE = 2,
}

declare const enum ControllerIndex {
  KEYBOARD = 0,
  CONTROLLER_1 = 1,
  CONTROLLER_2 = 2,
  CONTROLLER_3 = 3,
}

declare const enum PocketItemSlot {
  SLOT_1 = 0,
  SLOT_2 = 1,
  SLOT_3 = 2,
  SLOT_4 = 3,
}

declare const enum TrinketSlot {
  /** The bottom-right trinket. */
  SLOT_1 = 0,
  /** The top-left trinket. */
  SLOT_2 = 1,
}

declare type ZodiacCollectibles =
  | CollectibleType.COLLECTIBLE_CANCER
  | CollectibleType.COLLECTIBLE_ARIES
  | CollectibleType.COLLECTIBLE_LEO
  | CollectibleType.COLLECTIBLE_SCORPIO
  | CollectibleType.COLLECTIBLE_AQUARIUS
  | CollectibleType.COLLECTIBLE_PISCES
  | CollectibleType.COLLECTIBLE_TAURUS
  | CollectibleType.COLLECTIBLE_GEMINI
  | CollectibleType.COLLECTIBLE_CAPRICORN
  | CollectibleType.COLLECTIBLE_SAGITTARIUS
  | CollectibleType.COLLECTIBLE_LIBRA
  | CollectibleType.COLLECTIBLE_VIRGO;

declare const enum PlayerItemAnimation {
  PICKUP = "Pickup",
  LIFT_ITEM = "LiftItem",
  HIDE_ITEM = "HideItem",
  USE_ITEM = "UseItem",
}

declare const enum CollectibleAnimation {
  IDLE = "Idle",
  EMPTY = "Empty",
  SHOP_IDLE = "ShopIdle",
  PLAYER_PICKUP = "PlayerPickup",
  PLAYER_PICKUP_SPARKLE = "PlayerPickupSparkle",
}

declare const enum StageTransition {
  DISAPPEAR = 0,
  NONE = 1,
}

declare const enum FadeoutTarget {
  FILE_SELECT = 0,
  MAIN_MENU = 1,
  TITLE_SCREEN = 2,
  RESTART_RUN = 3,
  RESTART_RUN_LAP = 4,
  // 5 and higher results in a black screen
}

/**
 * These enums loop after 31, so 32 = DPAD_LEFT, 63 = DPAD_LEFT, and so on.
 * There appears to be no input key for joystick movement.
 */
declare const enum Controller {
  DPAD_LEFT = 0,
  DPAD_RIGHT = 1,
  DPAD_UP = 2,
  DPAD_DOWN = 3,
  /** A, X and B on Xbox, Playstation and Nintendo respectively. */
  BUTTON_A = 4,
  /** B, O and A on Xbox, Playstation and Nintendo respectively. */
  BUTTON_B = 5,
  /** X, □ and Y on Xbox, Playstation and Nintendo respectively. */
  BUTTON_X = 6,
  /** Y, Δ and X on Xbox, Playstation and Nintendo respectively. */
  BUTTON_Y = 7,
  /** Left shoulder button. */
  BUMPER_LEFT = 8,
  TRIGGER_LEFT = 9,
  STICK_LEFT = 10,
  /** Right shoulder button. */
  BUMPER_RIGHT = 11,
  TRIGGER_RIGHT = 12,
  STICK_RIGHT = 13,
  /** Select, Share and - on Xbox, Playstation and Nintendo respectively. */
  BUTTON_BACK = 14,
  /** Start, Options and + on Xbox, Playstation and Nintendo respectively. */
  BUTTON_START = 15,
}

declare const enum LineCheckMode {
  /** Stopped by pits and rocks (e.g. like a Gaper's behavior). */
  NORMAL = 0,
  /** Same as MODE_NORMAL, but less resource-intensive. */
  ECONOMIC = 1,
  /** Only blocked by walls and metal blocks. */
  EXPLOSION = 2,
  /** Not blocked by pits. Used by enemies that shoot projectiles at you, such as Hosts. */
  PROJECTILE = 3,
}

declare const enum ProjectilesMode {
  ONE_PROJECTILE = 0,
  /** Uses params.Spread */
  TWO_PROJECTILES = 1,
  /** Uses params.Spread */
  THREE_PROJECTILES = 2,
  /** Uses params.Spread */
  THREE_PROJECTILES_SPREAD = 3,
  /** Uses params.Spread */
  FOUR_PROJECTILES = 4,
  /** Uses params.Spread */
  FIVE_PROJECTILES = 5,
  /** Uses velocity.X as speed. */
  FOUR_PROJECTILES_PLUS_PATTERN = 6,
  /** Uses velocity.X as speed. */
  FOUR_PROJECTILES_X_PATTERN = 7,
  /** Uses velocity.X as speed. */
  EIGHT_PROJECTILES_STAR_PATTERN = 8,
  /**
   * Uses velocity.X as speed.
   * Uses velocity.y as N.
   * To fire in an arc, use params.FireDirectionLimit and params.DotProductLimit.
   */
  N_PROJECTILES_IN_CIRCLE = 9,
}

declare const enum DisplayFlag {
  INVISIBLE = 1 << -1,
  VISIBLE = 1 << 0,
  SHADOW = 1 << 1,
  SHOW_ICON = 1 << 2,
}

declare const enum BrokenWatchState {
  NONE = 0,
  SLOW = 1,
  FAST = 2,
}

/**
 * Matches the RoomDescriptor.DISPLAY_* members of the RoomDescriptor class.
 * In IsaacScript, we reimplement this as an enum, since it is cleaner.
 */
declare const enum RoomDescriptorDisplayType {
  NONE = 0,
  BOX = 1,
  LOCK = 2,
  ICON = 4,
  ALL = 5,
}

/**
 * Matches the RoomDescriptor.FLAG_* members of the RoomDescriptor class.
 * In IsaacScript, we reimplement this as an enum, since it is cleaner.
 */
declare const enum RoomDescriptorFlag {
  /** Room is clear, don't spawn enemies when visiting. */
  CLEAR = 1 << 0,
  /**
   * All pressure plates have been triggered in this room. This won't be set if there are no trigger
   * pressure plates in the first place.
   */
  PRESSURE_PLATES_TRIGGERED = 1 << 1,
  /** A Sacrifice Room has paid out. */
  SACRIFICE_DONE = 1 << 2,
  /** A Challenge Room has finished. */
  CHALLENGE_DONE = 1 << 3,
  /** Load Greed/Krampus instead of the room specified by the type & variant. */
  SURPRISE_MINIBOSS = 1 << 4,
  /** Pits in this room contain water. */
  HAS_WATER = 1 << 5,
  /** Play alternate boss music in this room. */
  ALT_BOSS_MUSIC = 1 << 6,
  /**
   * Don't pay out with a reward when clearing this room. Used for traps that lock the player in the
   * room when triggered.
   */
  NO_REWARD = 1 << 7,
  /** Was flooded by an item (i.e. Flush). */
  FLOODED = 1 << 8,
  /** Complete darkness. */
  PITCH_BLACK = 1 << 9,
  /** Room spawned by Red Key. */
  RED_ROOM = 1 << 10,
  /** Treasure room transformed by Devil's Crown. */
  DEVIL_TREASURE = 1 << 11,
  /** Use an alternate backdrop. (This is used by some floors such as Dross and Ashpit.) */
  USE_ALTERNATE_BACKDROP = 1 << 12,
  /**
   * The room is covered in cursed mist; the player is temporarily reduced to base items and stats.
   */
  CURSED_MIST = 1 << 13,
  /** Mama Mega has activated in this room. */
  MAMA_MEGA = 1 << 14,
  /** Don't generate walls (for Beast arena). */
  NO_WALLS = 1 << 15,
  /**
   * Rotgut's heart was killed, immediately play Rotgut's death animation when reentering this room.
   */
  ROTGUT_CLEARED = 1 << 16,
  /**
   * A portal spawned by Lil Portal now links to this room; don't create more portals that link to
   * it.
   */
  PORTAL_LINKED = 1 << 17,
  /**
   * If walking into this room through a door, redirect to a Blue Womb room instead. (This is used
   * by Blue Key.)
   */
  BLUE_REDIRECT = 1 << 18,
}

/** Listed in order of how they cycle through the options menu. */
declare const enum LanguageAbbreviation {
  ENGLISH = "en",
  JAPANESE = "jp",
  SPANISH = "es",
  GERMAN = "de",
  RUSSIAN = "ru",
  KOREAN = "kr",
  CHINESE_SIMPLE = "zh",
}
