import { Challenge, TrinketType } from "isaac-typescript-definitions";

/**
 * Contains the starting trinket for each challenge. Challenges that do not grant a starting trinket
 * will have a value of `undefined`.
 *
 * Taken from the "challenges.xml" file.
 */
export const CHALLENGE_TRINKETS = {
  [Challenge.NULL]: undefined, // 0
  [Challenge.PITCH_BLACK]: undefined, // 1
  [Challenge.HIGH_BROW]: TrinketType.PETRIFIED_POOP, // 2
  [Challenge.HEAD_TRAUMA]: undefined, // 3
  [Challenge.DARKNESS_FALLS]: undefined, // 4
  [Challenge.TANK]: undefined, // 5
  [Challenge.SOLAR_SYSTEM]: undefined, // 6
  [Challenge.SUICIDE_KING]: undefined, // 7
  [Challenge.CAT_GOT_YOUR_TONGUE]: undefined, // 8
  [Challenge.DEMO_MAN]: TrinketType.MATCH_STICK, // 9
  [Challenge.CURSED]: TrinketType.CHILDS_HEART, // 10
  [Challenge.GLASS_CANNON]: undefined, // 11
  [Challenge.WHEN_LIFE_GIVES_YOU_LEMONS]: undefined, // 12
  [Challenge.BEANS]: undefined, // 13
  [Challenge.ITS_IN_THE_CARDS]: undefined, // 14
  [Challenge.SLOW_ROLL]: undefined, // 15
  [Challenge.COMPUTER_SAVY]: undefined, // 16
  [Challenge.WAKA_WAKA]: undefined, // 17
  [Challenge.HOST]: TrinketType.TICK, // 18
  [Challenge.FAMILY_MAN]: undefined, // 19
  [Challenge.PURIST]: undefined, // 20
  [Challenge.XXXXXXXXL]: undefined, // 21
  [Challenge.SPEED]: undefined, // 22
  [Challenge.BLUE_BOMBER]: undefined, // 23
  [Challenge.PAY_TO_PLAY]: undefined, // 24
  [Challenge.HAVE_A_HEART]: undefined, // 25
  [Challenge.I_RULE]: undefined, // 26
  [Challenge.BRAINS]: undefined, // 27
  [Challenge.PRIDE_DAY]: TrinketType.RAINBOW_WORM, // 28
  [Challenge.ONANS_STREAK]: undefined, // 29
  [Challenge.GUARDIAN]: undefined, // 30
  [Challenge.BACKASSWARDS]: undefined, // 31
  [Challenge.APRILS_FOOL]: undefined, // 32
  [Challenge.POKEY_MANS]: undefined, // 33
  [Challenge.ULTRA_HARD]: undefined, // 34
  [Challenge.PONG]: undefined, // 35
  [Challenge.SCAT_MAN]: TrinketType.MYSTERIOUS_CANDY, // 36
  [Challenge.BLOODY_MARY]: TrinketType.CHILDS_HEART, // 37
  [Challenge.BAPTISM_BY_FIRE]: TrinketType.MAGGYS_FAITH, // 38
  [Challenge.ISAACS_AWAKENING]: undefined, // 39
  [Challenge.SEEING_DOUBLE]: undefined, // 40
  [Challenge.PICA_RUN]: undefined, // 41
  [Challenge.HOT_POTATO]: undefined, // 42
  [Challenge.CANTRIPPED]: undefined, // 43
  [Challenge.RED_REDEMPTION]: undefined, // 44
  [Challenge.DELETE_THIS]: undefined, // 45
} as const satisfies Record<Challenge, TrinketType | undefined>;
