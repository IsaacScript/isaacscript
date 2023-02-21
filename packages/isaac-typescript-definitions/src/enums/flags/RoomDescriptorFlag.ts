/**
 * Matches the `RoomDescriptor.FLAG_*` members of the `RoomDescriptor` class. In IsaacScript, we
 * reimplement this as an object instead, since it is cleaner.
 *
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 * @rename RoomDescriptorFlag
 */
const RoomDescriptorFlagInternal = {
  /**
   * Room is clear, don't spawn enemies when visiting.
   *
   * 1 << 0 (1)
   */
  CLEAR: 1 << 0,

  /**
   * All pressure plates have been triggered in this room. This won't be set if there are no trigger
   * pressure plates in the first place.
   *
   * 1 << 1 (2)
   */
  PRESSURE_PLATES_TRIGGERED: 1 << 1,

  /**
   * A Sacrifice Room has paid out.
   *
   * 1 << 2 (4)
   */
  SACRIFICE_DONE: 1 << 2,

  /**
   * A Challenge Room has finished.
   *
   * 1 << 3 (8)
   */
  CHALLENGE_DONE: 1 << 3,

  /**
   * Load Greed/Krampus instead of the room specified by the type & variant.
   *
   * 1 << 4 (16)
   */
  SURPRISE_MINIBOSS: 1 << 4,

  /**
   * Pits in this room contain water.
   *
   * 1 << 5 (32)
   */
  HAS_WATER: 1 << 5,

  /**
   * Play alternate boss music in this room.
   *
   * 1 << 6 (64)
   */
  ALT_BOSS_MUSIC: 1 << 6,

  /**
   * Don't pay out with a reward when clearing this room. Used for traps that lock the player in the
   * room when triggered.
   *
   * 1 << 7 (128)
   */
  NO_REWARD: 1 << 7,

  /**
   * Was flooded by an item (i.e. Flush).
   *
   * 1 << 8 (256)
   */
  FLOODED: 1 << 8,

  /**
   * Complete darkness.
   *
   * 1 << 9 (512)
   */
  PITCH_BLACK: 1 << 9,

  /**
   * Room spawned by Red Key.
   *
   * 1 << 10 (1024)
   */
  RED_ROOM: 1 << 10,

  /**
   * Treasure room transformed by Devil's Crown.
   *
   * 1 << 11 (2048)
   */
  DEVIL_TREASURE: 1 << 11,

  /**
   * Use an alternate backdrop. (This is used by some floors such as Dross and Ashpit.)
   *
   * 1 << 12 (4096)
   */
  USE_ALTERNATE_BACKDROP: 1 << 12,

  /**
   * The room is covered in cursed mist; the player is temporarily reduced to base items and stats.
   *
   * 1 << 13 (8192)
   */
  CURSED_MIST: 1 << 13,

  /**
   * Mama Mega has activated in this room.
   *
   * 1 << 14 (16384)
   */
  MAMA_MEGA: 1 << 14,

  /**
   * Don't generate walls (for Beast arena).
   *
   * 1 << 15 (32768)
   */
  NO_WALLS: 1 << 15,

  /**
   * Rotgut's heart was killed, immediately play Rotgut's death animation when reentering this room.
   *
   * 1 << 16 (65536)
   */
  ROTGUT_CLEARED: 1 << 16,

  /**
   * A portal spawned by Lil Portal now links to this room; don't create more portals that link to
   * it.
   *
   * 1 << 17 (131072)
   */
  PORTAL_LINKED: 1 << 17,

  /**
   * If walking into this room through a door, redirect to a Blue Womb room instead. (This is used
   * by Blue Key.)
   *
   * 1 << 18 (262144)
   */
  BLUE_REDIRECT: 1 << 18,
} as const;

type RoomDescriptorFlagValue = BitFlag & {
  readonly __roomDescriptorFlagBrand: symbol;
};
type RoomDescriptorFlagType = {
  readonly [K in keyof typeof RoomDescriptorFlagInternal]: RoomDescriptorFlagValue;
};

export const RoomDescriptorFlag =
  RoomDescriptorFlagInternal as RoomDescriptorFlagType;
export type RoomDescriptorFlag =
  RoomDescriptorFlagType[keyof RoomDescriptorFlagType];

export const RoomDescriptorFlagZero = 0 as BitFlags<RoomDescriptorFlag>;
