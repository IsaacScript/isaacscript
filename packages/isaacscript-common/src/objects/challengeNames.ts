import { Challenge } from "isaac-typescript-definitions";

export const DEFAULT_CHALLENGE_NAME = "Unknown";

/** Taken from the "challenges.xml" file. */
export const CHALLENGE_NAMES = {
  [Challenge.NULL]: DEFAULT_CHALLENGE_NAME, // 0
  [Challenge.PITCH_BLACK]: "Pitch Black", // 1
  [Challenge.HIGH_BROW]: "High Brow", // 2
  [Challenge.HEAD_TRAUMA]: "Head Trauma", // 3
  [Challenge.DARKNESS_FALLS]: "Darkness Falls", // 4
  [Challenge.TANK]: "The Tank", // 5
  [Challenge.SOLAR_SYSTEM]: "Solar System", // 6
  [Challenge.SUICIDE_KING]: "Suicide King", // 7
  [Challenge.CAT_GOT_YOUR_TONGUE]: "Cat Got Your Tongue", // 8
  [Challenge.DEMO_MAN]: "Demo Man", // 9
  [Challenge.CURSED]: "Cursed!", // 10
  [Challenge.GLASS_CANNON]: "Glass Cannon", // 11
  [Challenge.WHEN_LIFE_GIVES_YOU_LEMONS]: "When Life Gives You Lemons", // 12
  [Challenge.BEANS]: "Beans!", // 13
  [Challenge.ITS_IN_THE_CARDS]: "It's In The Cards", // 14
  [Challenge.SLOW_ROLL]: "Slow Roll", // 15
  [Challenge.COMPUTER_SAVY]: "Computer Savvy", // 16
  [Challenge.WAKA_WAKA]: "Waka Waka", // 17
  [Challenge.HOST]: "The Host", // 18
  [Challenge.FAMILY_MAN]: "The Family Man", // 19
  [Challenge.PURIST]: "Purist", // 20
  [Challenge.XXXXXXXXL]: "XXXXXXXXL", // 21
  [Challenge.SPEED]: "SPEED!", // 22
  [Challenge.BLUE_BOMBER]: "Blue Bomber", // 23
  [Challenge.PAY_TO_PLAY]: "PAY TO PLAY", // 24
  [Challenge.HAVE_A_HEART]: "Have a Heart", // 25
  [Challenge.I_RULE]: "I RULE!", // 26
  [Challenge.BRAINS]: "BRAINS!", // 27
  [Challenge.PRIDE_DAY]: "PRIDE DAY!", // 28
  [Challenge.ONANS_STREAK]: "Onan's Streak", // 29
  [Challenge.GUARDIAN]: "The Guardian", // 30
  [Challenge.BACKASSWARDS]: "Backasswards", // 31
  [Challenge.APRILS_FOOL]: "Aprils Fool", // 32
  [Challenge.POKEY_MANS]: "Pokey Mans", // 33
  [Challenge.ULTRA_HARD]: "Ultra Hard", // 34
  [Challenge.PONG]: "Pong", // 35
  [Challenge.SCAT_MAN]: "Scat Man", // 36
  [Challenge.BLOODY_MARY]: "Bloody Mary", // 37
  [Challenge.BAPTISM_BY_FIRE]: "Baptism By Fire", // 38
  [Challenge.ISAACS_AWAKENING]: "Isaac's Awakening", // 39
  [Challenge.SEEING_DOUBLE]: "Seeing Double", // 40
  [Challenge.PICA_RUN]: "Pica Run", // 41
  [Challenge.HOT_POTATO]: "Hot Potato", // 42
  [Challenge.CANTRIPPED]: "Cantripped!", // 43
  [Challenge.RED_REDEMPTION]: "Red Redemption", // 44
  [Challenge.DELETE_THIS]: "DELETE THIS", // 45
} as const satisfies Record<Challenge, string>;
