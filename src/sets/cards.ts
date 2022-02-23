/**
 * Contains all of the entries in the `Card` enum that are not a rune and not an object (e.g. Fool,
 * Reverse Fool, Wild Card, etc.).
 */
export const CARDS: readonly Card[] = [
  Card.CARD_FOOL,
  Card.CARD_MAGICIAN,
  Card.CARD_HIGH_PRIESTESS,
  Card.CARD_EMPRESS,
  Card.CARD_EMPEROR,
  Card.CARD_HIEROPHANT,
  Card.CARD_LOVERS,
  Card.CARD_CHARIOT,
  Card.CARD_JUSTICE,
  Card.CARD_HERMIT,
  Card.CARD_WHEEL_OF_FORTUNE,
  Card.CARD_STRENGTH,
  Card.CARD_HANGED_MAN,
  Card.CARD_DEATH,
  Card.CARD_TEMPERANCE,
  Card.CARD_DEVIL,
  Card.CARD_TOWER,
  Card.CARD_STARS,
  Card.CARD_MOON,
  Card.CARD_SUN,
  Card.CARD_JUDGEMENT,
  Card.CARD_WORLD,
  Card.CARD_CLUBS_2,
  Card.CARD_DIAMONDS_2,
  Card.CARD_SPADES_2,
  Card.CARD_HEARTS_2,
  Card.CARD_ACE_OF_CLUBS,
  Card.CARD_ACE_OF_DIAMONDS,
  Card.CARD_ACE_OF_SPADES,
  Card.CARD_ACE_OF_HEARTS,
  Card.CARD_JOKER,
  Card.CARD_CHAOS,
  Card.CARD_CREDIT,
  Card.CARD_RULES,
  Card.CARD_HUMANITY,
  Card.CARD_SUICIDE_KING,
  Card.CARD_GET_OUT_OF_JAIL,
  Card.CARD_QUESTIONMARK,
  Card.CARD_HOLY,
  Card.CARD_HUGE_GROWTH,
  Card.CARD_ANCIENT_RECALL,
  Card.CARD_ERA_WALK,
  Card.CARD_REVERSE_FOOL,
  Card.CARD_REVERSE_MAGICIAN,
  Card.CARD_REVERSE_HIGH_PRIESTESS,
  Card.CARD_REVERSE_EMPRESS,
  Card.CARD_REVERSE_EMPEROR,
  Card.CARD_REVERSE_HIEROPHANT,
  Card.CARD_REVERSE_LOVERS,
  Card.CARD_REVERSE_CHARIOT,
  Card.CARD_REVERSE_JUSTICE,
  Card.CARD_REVERSE_HERMIT,
  Card.CARD_REVERSE_WHEEL_OF_FORTUNE,
  Card.CARD_REVERSE_STRENGTH,
  Card.CARD_REVERSE_HANGED_MAN,
  Card.CARD_REVERSE_DEATH,
  Card.CARD_REVERSE_TEMPERANCE,
  Card.CARD_REVERSE_DEVIL,
  Card.CARD_REVERSE_TOWER,
  Card.CARD_REVERSE_STARS,
  Card.CARD_REVERSE_MOON,
  Card.CARD_REVERSE_SUN,
  Card.CARD_REVERSE_JUDGEMENT,
  Card.CARD_REVERSE_WORLD,
  Card.CARD_QUEEN_OF_HEARTS,
  Card.CARD_WILD,
];

/**
 * Contains all of the entries in the `Card` enum that are not a rune and not an object (e.g. Fool,
 * Reverse Fool, Wild Card, etc.).
 */
export const CARD_SET: ReadonlySet<Card> = new Set(CARDS);

/**
 * Contains all of the entries in the `Card` enum that are a rune (e.g. Rune of Hagalaz, Blank Rune,
 * Black Rune, Rune Shard, Soul of Isaac, etc.).
 */
export const RUNES: readonly Card[] = [
  Card.RUNE_HAGALAZ,
  Card.RUNE_JERA,
  Card.RUNE_EHWAZ,
  Card.RUNE_DAGAZ,
  Card.RUNE_ANSUZ,
  Card.RUNE_PERTHRO,
  Card.RUNE_BERKANO,
  Card.RUNE_ALGIZ,
  Card.RUNE_BLANK,
  Card.RUNE_BLACK,
  Card.RUNE_SHARD,
  Card.CARD_SOUL_ISAAC,
  Card.CARD_SOUL_MAGDALENE,
  Card.CARD_SOUL_CAIN,
  Card.CARD_SOUL_JUDAS,
  Card.CARD_SOUL_BLUEBABY,
  Card.CARD_SOUL_EVE,
  Card.CARD_SOUL_SAMSON,
  Card.CARD_SOUL_AZAZEL,
  Card.CARD_SOUL_LAZARUS,
  Card.CARD_SOUL_EDEN,
  Card.CARD_SOUL_LOST,
  Card.CARD_SOUL_LILITH,
  Card.CARD_SOUL_KEEPER,
  Card.CARD_SOUL_APOLLYON,
  Card.CARD_SOUL_FORGOTTEN,
  Card.CARD_SOUL_BETHANY,
  Card.CARD_SOUL_JACOB,
];

/**
 * Contains all of the entries in the `Card` enum that are a rune (e.g. Rune of Hagalaz, Blank Rune,
 * Black Rune, Rune Shard, Soul of Isaac, etc.).
 */
export const RUNE_SET: ReadonlySet<Card> = new Set(RUNES);

/** Contains all of the entries in the `Card` enum that are objects (like Dice Shard). */
export const POCKET_ITEM_OBJECTS: readonly Card[] = [
  Card.CARD_DICE_SHARD,
  Card.CARD_EMERGENCY_CONTACT,
  Card.CARD_CRACKED_KEY,
];

/** Contains all of the entries in the `Card` enum that are objects (like Dice Shard). */
export const POCKET_ITEM_OBJECT_SET: ReadonlySet<Card> = new Set(
  POCKET_ITEM_OBJECTS,
);
