/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 * @enum
 * @notExported
 * @rename ButtonActionFlag
 */
const ButtonActionFlagInternal = {
  ACTION_LEFT: 1 << 0,
  ACTION_RIGHT: 1 << 1,
  ACTION_UP: 1 << 2,
  ACTION_DOWN: 1 << 3,
  ACTION_SHOOT__LEFT: 1 << 4,
  ACTION_SHOOT_RIGHT: 1 << 5,
  ACTION_SHOOT_UP: 1 << 6,
  ACTION_SHOOT_DOWN: 1 << 7,
  ACTION_BOMB: 1 << 8,
  ACTION_ITEM: 1 << 9,
  ACTION_PILL_CARD: 1 << 10,
  ACTION_DROP: 1 << 11,
  ACTION_PAUSE: 1 << 12,
  ACTION_MAP: 1 << 13,
  ACTION_MENU__CONFIRM: 1 << 14,
  ACTION_MENU_BACK: 1 << 15,
  ACTION_RESTART: 1 << 16,
  ACTION_FULLSCREEN: 1 << 17,
  ACTION_MUTE: 1 << 18,
  ACTION_JOIN_MULTIPLAYER: 1 << 19,
  ACTION_MENU_LEFT: 1 << 20,
  ACTION_MENU_RIGHT: 1 << 21,
  ACTION_MENU_UP: 1 << 22,
  ACTION_MENU_DOWN: 1 << 23,
  ACTION_MENU_LT: 1 << 24,
  ACTION_MENU_RT: 1 << 25,
  ACTION_MENU_TAB: 1 << 26,
  ACTION_CONSOLE: 1 << 28,
} as const;

type ButtonActionFlagValue = BitFlag & {
  readonly __buttonActionFlagBrand: symbol;
};
type ButtonActionFlagType = {
  readonly [K in keyof typeof ButtonActionFlagInternal]: ButtonActionFlagValue;
};

export const ButtonActionFlag =
  ButtonActionFlagInternal as ButtonActionFlagType;
export type ButtonActionFlag = ButtonActionFlagType[keyof ButtonActionFlagType];

export const ButtonActionFlagZero = 0 as BitFlags<ButtonActionFlag>;
