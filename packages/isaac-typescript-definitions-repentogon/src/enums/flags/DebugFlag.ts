/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @enum
 * @notExported
 * @rename DebugFlag
 * @see https://repentogon.com/
 */
const DebugFlagInternal = {
  ENTITY_POSITIONS: 1 << 0,
  GRID: 1 << 1,
  INFINITE_HP: 1 << 2,
  HIGH_DAMAGE: 1 << 3,
  ROOM_INFO: 1 << 4,
  HIT_SPHERES: 1 << 5,
  DAMAGE_VALUES: 1 << 6,
  INFINITE_ITEM_CHARGES: 1 << 7,
  HIGH_LUCK: 1 << 8,
  QUICK_KILL: 1 << 9,
  GRID_INFO: 1 << 10,
  PLAYER_ITEM_INFO: 1 << 11,
  GRID_COLLISION_POINTS: 1 << 12,
  LUA_MEMORY_USAGE: 1 << 13,
} as const;

type DebugFlagValue = BitFlag & {
  readonly __DebugFlagBrand: symbol;
};
type DebugFlagType = {
  readonly [K in keyof typeof DebugFlagInternal]: DebugFlagValue;
};

export const DebugFlag = DebugFlagInternal as DebugFlagType;
export type DebugFlag = DebugFlagType[keyof DebugFlagType];

export const DebugFlagZero = 0 as BitFlags<DebugFlag>;
