import { BossID, Challenge } from "isaac-typescript-definitions";

export const DEFAULT_CHALLENGE_BOSS_ID = BossID.MOM;

/**
 * Contains the boss goal for each challenge.
 *
 * Taken from the "challenges.xml" file.
 *
 * @see https://bindingofisaacrebirth.fandom.com/wiki/Challenges
 */
export const CHALLENGE_BOSSES = {
  [Challenge.NULL]: BossID.MOM, // 0
  [Challenge.PITCH_BLACK]: BossID.MOM, // 1
  [Challenge.HIGH_BROW]: BossID.MOM, // 2
  [Challenge.HEAD_TRAUMA]: BossID.MOM, // 3
  [Challenge.DARKNESS_FALLS]: BossID.SATAN, // 4
  [Challenge.TANK]: BossID.MOM, // 5
  [Challenge.SOLAR_SYSTEM]: BossID.MOMS_HEART, // 6
  [Challenge.SUICIDE_KING]: BossID.ISAAC, // 7
  [Challenge.CAT_GOT_YOUR_TONGUE]: BossID.MOM, // 8
  [Challenge.DEMO_MAN]: BossID.MOMS_HEART, // 9
  [Challenge.CURSED]: BossID.MOM, // 10
  [Challenge.GLASS_CANNON]: BossID.SATAN, // 11
  [Challenge.WHEN_LIFE_GIVES_LEMONS]: BossID.MOM, // 12
  [Challenge.BEANS]: BossID.MOM, // 13
  [Challenge.ITS_IN_THE_CARDS]: BossID.MOM, // 14
  [Challenge.SLOW_ROLL]: BossID.MOM, // 15
  [Challenge.COMPUTER_SAVY]: BossID.MOM, // 16
  [Challenge.WAKA_WAKA]: BossID.MOM, // 17
  [Challenge.HOST]: BossID.MOM, // 18
  [Challenge.FAMILY_MAN]: BossID.ISAAC, // 19
  [Challenge.PURIST]: BossID.MOMS_HEART, // 20
  [Challenge.XXXXXXXXL]: BossID.MOMS_HEART, // 21
  [Challenge.SPEED]: BossID.MOMS_HEART, // 22
  [Challenge.BLUE_BOMBER]: BossID.SATAN, // 23
  [Challenge.PAY_TO_PLAY]: BossID.ISAAC, // 24
  [Challenge.HAVE_A_HEART]: BossID.MOMS_HEART, // 25
  [Challenge.I_RULE]: BossID.MEGA_SATAN, // 26
  [Challenge.BRAINS]: BossID.BLUE_BABY, // 27
  [Challenge.PRIDE_DAY]: BossID.MOMS_HEART, // 28
  [Challenge.ONANS_STREAK]: BossID.ISAAC, // 29
  [Challenge.GUARDIAN]: BossID.MOMS_HEART, // 30
  [Challenge.BACKASSWARDS]: BossID.MEGA_SATAN, // 31
  [Challenge.APRILS_FOOL]: BossID.MOMS_HEART, // 32
  [Challenge.POKEY_MANS]: BossID.ISAAC, // 33
  [Challenge.ULTRA_HARD]: BossID.MEGA_SATAN, // 34
  [Challenge.PONG]: BossID.BLUE_BABY, // 35
  [Challenge.SCAT_MAN]: BossID.MOM, // 36
  [Challenge.BLOODY_MARY]: BossID.SATAN, // 37
  [Challenge.BAPTISM_BY_FIRE]: BossID.SATAN, // 38
  [Challenge.ISAACS_AWAKENING]: BossID.MOTHER, // 39
  [Challenge.SEEING_DOUBLE]: BossID.MOMS_HEART, // 40
  [Challenge.PICA_RUN]: BossID.ISAAC, // 41
  [Challenge.HOT_POTATO]: BossID.SATAN, // 42
  [Challenge.CANTRIPPED]: BossID.MOM, // 43
  [Challenge.RED_REDEMPTION]: BossID.MOTHER, // 44
  [Challenge.DELETE_THIS]: BossID.BLUE_BABY, // 45
} as const satisfies Record<Challenge, BossID>;
