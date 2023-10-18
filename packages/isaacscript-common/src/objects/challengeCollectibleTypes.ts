import { Challenge, CollectibleType } from "isaac-typescript-definitions";

/**
 * Contains the extra starting collectibles for each challenge. Challenges that do not grant extra
 * starting collectibles are represented by an empty array.
 *
 * Taken from the "challenges.xml" file.
 */
export const CHALLENGE_COLLECTIBLE_TYPES = {
  // 0
  [Challenge.NULL]: [],

  // 1
  [Challenge.PITCH_BLACK]: [],

  // 2
  [Challenge.HIGH_BROW]: [
    CollectibleType.NUMBER_ONE, // 6
    CollectibleType.BUTT_BOMBS, // 209
    CollectibleType.E_COLI, // 236
    CollectibleType.FLUSH, // 291
  ],

  // 3
  [Challenge.HEAD_TRAUMA]: [
    CollectibleType.SMALL_ROCK, // 90
    CollectibleType.IRON_BAR, // 201
    CollectibleType.TINY_PLANET, // 233
    CollectibleType.SOY_MILK, // 330
  ],

  // 4
  [Challenge.DARKNESS_FALLS]: [
    CollectibleType.PENTAGRAM, // 51
    CollectibleType.RAZOR_BLADE, // 126
    CollectibleType.SACRIFICIAL_DAGGER, // 172
    CollectibleType.DARK_MATTER, // 259
  ],

  // 5
  [Challenge.TANK]: [
    CollectibleType.BUCKET_OF_LARD, // 129
    CollectibleType.INFAMY, // 242
    CollectibleType.THUNDER_THIGHS, // 314
  ],

  // 6
  [Challenge.SOLAR_SYSTEM]: [
    CollectibleType.HALO_OF_FLIES, // 10
    CollectibleType.TRANSCENDENCE, // 20
    CollectibleType.DISTANT_ADMIRATION, // 57
    CollectibleType.FOREVER_ALONE, // 128
  ],

  // 7
  [Challenge.SUICIDE_KING]: [
    CollectibleType.MY_REFLECTION, // 5
    CollectibleType.MR_MEGA, // 106
    CollectibleType.IPECAC, // 149
  ],

  // 8
  [Challenge.CAT_GOT_YOUR_TONGUE]: [
    CollectibleType.GUPPYS_TAIL, // 134
    CollectibleType.GUPPYS_HEAD, // 145
    CollectibleType.GUPPYS_HAIRBALL, // 187
  ],

  // 9
  [Challenge.DEMO_MAN]: [
    CollectibleType.DR_FETUS, // 52
    CollectibleType.REMOTE_DETONATOR, // 137
  ],

  // 10
  [Challenge.CURSED]: [
    CollectibleType.RAW_LIVER, // 16
    CollectibleType.COMPASS, // 21
    CollectibleType.TREASURE_MAP, // 54
    CollectibleType.BLUE_MAP, // 246
  ],

  // 11
  [Challenge.GLASS_CANNON]: [
    CollectibleType.LOKIS_HORNS, // 87
    CollectibleType.EPIC_FETUS, // 168
  ],

  // 12
  [Challenge.WHEN_LIFE_GIVES_YOU_LEMONS]: [
    CollectibleType.LEMON_MISHAP, // 56
    CollectibleType.NINE_VOLT, // 116
    CollectibleType.HABIT, // 156
  ],

  // 13
  [Challenge.BEANS]: [
    CollectibleType.BEAN, // 111
    CollectibleType.NINE_VOLT, // 116
    CollectibleType.BLACK_BEAN, // 180
    CollectibleType.PYRO, // 190
    CollectibleType.BUTT_BOMBS, // 209
  ],

  // 14
  [Challenge.ITS_IN_THE_CARDS]: [
    CollectibleType.BATTERY, // 63
    CollectibleType.DECK_OF_CARDS, // 85
    CollectibleType.NINE_VOLT, // 116
    CollectibleType.STARTER_DECK, // 251
  ],

  // 15
  [Challenge.SLOW_ROLL]: [
    CollectibleType.MY_REFLECTION, // 5
    CollectibleType.CUPIDS_ARROW, // 48
    CollectibleType.POLYPHEMUS, // 169
  ],

  // 16
  [Challenge.COMPUTER_SAVY]: [
    CollectibleType.SPOON_BENDER, // 3
    CollectibleType.TECHNOLOGY, // 68
    CollectibleType.TECHNOLOGY_2, // 152
  ],

  // 17
  [Challenge.WAKA_WAKA]: [
    CollectibleType.ANTI_GRAVITY, // 222
    CollectibleType.STRANGE_ATTRACTOR, // 315
  ],

  // 18
  [Challenge.HOST]: [
    CollectibleType.MULLIGAN, // 151
    CollectibleType.SPIDERBABY, // 211
  ],

  // 19
  [Challenge.FAMILY_MAN]: [
    CollectibleType.BROTHER_BOBBY, // 8
    CollectibleType.SISTER_MAGGY, // 67
    CollectibleType.DADS_KEY, // 175
    CollectibleType.BFFS, // 247
    CollectibleType.ROTTEN_BABY, // 268
  ],

  // 20
  [Challenge.PURIST]: [],

  // 21
  [Challenge.XXXXXXXXL]: [],

  // 22
  [Challenge.SPEED]: [],

  // 23
  [Challenge.BLUE_BOMBER]: [
    CollectibleType.BROTHER_BOBBY, // 8
    CollectibleType.KAMIKAZE, // 40
    CollectibleType.MR_MEGA, // 106
    CollectibleType.PYROMANIAC, // 223
  ],

  // 24
  [Challenge.PAY_TO_PLAY]: [
    CollectibleType.SACK_OF_PENNIES, // 94
    CollectibleType.MONEY_EQUALS_POWER, // 109
  ],

  // 25
  [Challenge.HAVE_A_HEART]: [
    CollectibleType.CHARM_OF_THE_VAMPIRE, // 62
  ],

  // 26
  [Challenge.I_RULE]: [
    CollectibleType.LADDER, // 60
    CollectibleType.MOMS_KNIFE, // 114
    CollectibleType.TRINITY_SHIELD, // 243
    CollectibleType.BOOMERANG, // 338
  ],

  // 27
  [Challenge.BRAINS]: [
    CollectibleType.BOBS_BRAIN, // 273
    CollectibleType.BOBS_BRAIN, // 273
    CollectibleType.BOBS_BRAIN, // 273
    CollectibleType.THUNDER_THIGHS, // 314
  ],

  // 28
  [Challenge.PRIDE_DAY]: [
    CollectibleType.RAINBOW_BABY, // 174
    CollectibleType.THREE_DOLLAR_BILL, // 191
  ],

  // 29
  [Challenge.ONANS_STREAK]: [
    CollectibleType.CHOCOLATE_MILK, // 69
  ],

  // 30
  [Challenge.GUARDIAN]: [
    CollectibleType.HOLY_GRAIL, // 184
    CollectibleType.ISAACS_HEART, // 276
    CollectibleType.PUNCHING_BAG, // 281
    CollectibleType.SPEAR_OF_DESTINY, // 400
  ],

  // 31
  [Challenge.BACKASSWARDS]: [],

  // 32
  [Challenge.APRILS_FOOL]: [],

  // 33
  [Challenge.POKEY_MANS]: [
    CollectibleType.MOMS_EYESHADOW, // 200
    CollectibleType.FRIEND_BALL, // 382
  ],

  // 34
  [Challenge.ULTRA_HARD]: [
    CollectibleType.BOOK_OF_REVELATIONS, // 78
    CollectibleType.CAFFEINE_PILL, // 340
  ],

  // 35
  [Challenge.PONG]: [
    CollectibleType.CUPIDS_ARROW, // 48
    CollectibleType.RUBBER_CEMENT, // 221
  ],

  // 36
  [Challenge.SCAT_MAN]: [
    CollectibleType.SKATOLE, // 9
    CollectibleType.POOP, // 36
    CollectibleType.NINE_VOLT, // 116
    CollectibleType.BUTT_BOMBS, // 209
    CollectibleType.BUTT_BOMBS, // 209
    CollectibleType.BUTT_BOMBS, // 209
    CollectibleType.E_COLI, // 236
    CollectibleType.BFFS, // 247
    CollectibleType.THUNDER_THIGHS, // 314
    CollectibleType.DIRTY_MIND, // 576
  ],

  // 37
  [Challenge.BLOODY_MARY]: [
    // Note that in "challenges.xml", it also includes "-584", which removes Book of Virtues from
    // Bethany.
    CollectibleType.BOOK_OF_BELIAL, // 34
    CollectibleType.BLOOD_BAG, // 119
    CollectibleType.ANEMIC, // 214
    CollectibleType.BLOOD_OATH, // 569
  ],

  // 38
  [Challenge.BAPTISM_BY_FIRE]: [
    // Note that in "challenges.xml", it also includes "-584", which removes Book of Virtues from
    // Bethany.
    CollectibleType.GUPPYS_PAW, // 133
    CollectibleType.SCHOOLBAG, // 534
    CollectibleType.URN_OF_SOULS, // 640
  ],

  // 39
  [Challenge.ISAACS_AWAKENING]: [
    CollectibleType.TRINITY_SHIELD, // 243
    CollectibleType.SPIRIT_SWORD, // 579
    CollectibleType.MOMS_BRACELET, // 604
  ],

  // 40
  [Challenge.SEEING_DOUBLE]: [245],

  // 41
  [Challenge.PICA_RUN]: [
    CollectibleType.MOMS_PURSE, // 139
    CollectibleType.MOMS_BOX, // 439
    CollectibleType.MARBLES, // 538
  ],

  // 42
  [Challenge.HOT_POTATO]: [],

  // 43
  [Challenge.CANTRIPPED]: [],

  // 44
  [Challenge.RED_REDEMPTION]: [
    CollectibleType.DADS_KEY, // 175
  ],

  // 45
  [Challenge.DELETE_THIS]: [CollectibleType.TMTRAINER],
} as const satisfies Record<Challenge, readonly CollectibleType[]>;
