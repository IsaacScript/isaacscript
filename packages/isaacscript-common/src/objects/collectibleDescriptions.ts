/* cspell:disable */

import { CollectibleType } from "isaac-typescript-definitions";

export const DEFAULT_COLLECTIBLE_DESCRIPTION = "Unknown";

/** Maps collectible types to the real English descriptions from the "stringtable.sta" file. */
export const COLLECTIBLE_DESCRIPTIONS = {
  [CollectibleType.NULL]: DEFAULT_COLLECTIBLE_DESCRIPTION, // 0
  [CollectibleType.SAD_ONION]: "Tears up", // 1
  [CollectibleType.INNER_EYE]: "Triple shot", // 2
  [CollectibleType.SPOON_BENDER]: "Homing shots", // 3
  [CollectibleType.CRICKETS_HEAD]: "DMG up", // 4
  [CollectibleType.MY_REFLECTION]: "Boomerang tears", // 5
  [CollectibleType.NUMBER_ONE]: "Tears up + range down", // 6
  [CollectibleType.BLOOD_OF_THE_MARTYR]: "DMG up", // 7
  [CollectibleType.BROTHER_BOBBY]: "Friends 'till the end", // 8
  [CollectibleType.SKATOLE]: "Fly love", // 9
  [CollectibleType.HALO_OF_FLIES]: "Projectile protection", // 10
  [CollectibleType.ONE_UP]: "Extra life", // 11
  [CollectibleType.MAGIC_MUSHROOM]: "All stats up!", // 12
  [CollectibleType.VIRUS]: "Poison touch + speed up", // 13
  [CollectibleType.ROID_RAGE]: "Speed and range up", // 14
  [CollectibleType.HEART]: "HP up", // 15
  [CollectibleType.RAW_LIVER]: "HP up", // 16
  [CollectibleType.SKELETON_KEY]: "99 keys", // 17
  [CollectibleType.DOLLAR]: "$$$", // 18
  [CollectibleType.BOOM]: "10 bombs", // 19
  [CollectibleType.TRANSCENDENCE]: "We all float down here...", // 20
  [CollectibleType.COMPASS]: "The end is near", // 21
  [CollectibleType.LUNCH]: "HP up", // 22
  [CollectibleType.DINNER]: "HP up", // 23
  [CollectibleType.DESSERT]: "HP up", // 24
  [CollectibleType.BREAKFAST]: "HP up", // 25
  [CollectibleType.ROTTEN_MEAT]: "HP up", // 26
  [CollectibleType.WOODEN_SPOON]: "Speed up", // 27
  [CollectibleType.BELT]: "Speed up", // 28
  [CollectibleType.MOMS_UNDERWEAR]: "Range up", // 29
  [CollectibleType.MOMS_HEELS]: "Range up", // 30
  [CollectibleType.MOMS_LIPSTICK]: "Range up", // 31
  [CollectibleType.WIRE_COAT_HANGER]: "Tears up", // 32
  [CollectibleType.BIBLE]: "Temporary flight", // 33
  [CollectibleType.BOOK_OF_BELIAL]: "Temporary DMG up", // 34
  [CollectibleType.NECRONOMICON]: "Mass room damage", // 35
  [CollectibleType.POOP]: "Plop!", // 36
  [CollectibleType.MR_BOOM]: "Reusable bomb buddy", // 37
  [CollectibleType.TAMMYS_HEAD]: "Reusable tear burst", // 38
  [CollectibleType.MOMS_BRA]: "Mass paralysis", // 39
  [CollectibleType.KAMIKAZE]: "Become the bomb!", // 40
  [CollectibleType.MOMS_PAD]: "Mass fear", // 41
  [CollectibleType.BOBS_ROTTEN_HEAD]: "Reusable ranged bomb", // 42
  // There is no `CollectibleType` with a value of 43.
  [CollectibleType.TELEPORT]: "Teleport!", // 44
  [CollectibleType.YUM_HEART]: "Reusable regeneration", // 45
  [CollectibleType.LUCKY_FOOT]: "Luck up", // 46
  [CollectibleType.DOCTORS_REMOTE]: "Reusable air strike", // 47
  [CollectibleType.CUPIDS_ARROW]: "Piercing shots", // 48
  [CollectibleType.SHOOP_DA_WHOOP]: "BLLLARRRRGGG!", // 49
  [CollectibleType.STEVEN]: "DMG up", // 50
  [CollectibleType.PENTAGRAM]: "DMG up", // 51
  [CollectibleType.DR_FETUS]: "???", // 52
  [CollectibleType.MAGNETO]: "Item snatcher", // 53
  [CollectibleType.TREASURE_MAP]: "Full visible map", // 54
  [CollectibleType.MOMS_EYE]: "Eye in the back of your head", // 55
  [CollectibleType.LEMON_MISHAP]: "Oops...", // 56
  [CollectibleType.DISTANT_ADMIRATION]: "Attack fly", // 57
  [CollectibleType.BOOK_OF_SHADOWS]: "Temporary invincibility", // 58
  [CollectibleType.BOOK_OF_BELIAL_BIRTHRIGHT]: "Temporary DMG up", // 59
  [CollectibleType.LADDER]: "Building bridges", // 60
  // There is no `CollectibleType` with a value of 61.
  [CollectibleType.CHARM_OF_THE_VAMPIRE]: "Kills heal", // 62
  [CollectibleType.BATTERY]: "Stores energy", // 63
  [CollectibleType.STEAM_SALE]: "50% off", // 64
  [CollectibleType.ANARCHIST_COOKBOOK]: "Summon bombs", // 65
  [CollectibleType.HOURGLASS]: "Temporary enemy slowdown", // 66
  [CollectibleType.SISTER_MAGGY]: "Friends 'till the end", // 67
  [CollectibleType.TECHNOLOGY]: "Laser tears", // 68
  [CollectibleType.CHOCOLATE_MILK]: "Charge shots", // 69
  [CollectibleType.GROWTH_HORMONES]: "Speed + DMG up", // 70
  [CollectibleType.MINI_MUSH]: "Speed + range up", // 71
  [CollectibleType.ROSARY]: "Tears + faith up", // 72
  [CollectibleType.CUBE_OF_MEAT]: "Gotta meat 'em all", // 73
  [CollectibleType.QUARTER]: "+25 coins", // 74
  [CollectibleType.PHD]: "Better pills", // 75
  [CollectibleType.XRAY_VISION]: "I've seen everything", // 76
  [CollectibleType.MY_LITTLE_UNICORN]: "Temporary badass", // 77
  [CollectibleType.BOOK_OF_REVELATIONS]: "Reusable soul protection", // 78
  [CollectibleType.MARK]: "DMG + speed up", // 79
  [CollectibleType.PACT]: "DMG + tears up", // 80
  [CollectibleType.DEAD_CAT]: "9 lives", // 81
  [CollectibleType.LORD_OF_THE_PIT]: "Demon wings", // 82
  [CollectibleType.NAIL]: "Temporary demon form", // 83
  [CollectibleType.WE_NEED_TO_GO_DEEPER]: "Reusable level skip", // 84
  [CollectibleType.DECK_OF_CARDS]: "Reusable card generator ", // 85
  [CollectibleType.MONSTROS_TOOTH]: "Summon Monstro", // 86
  [CollectibleType.LOKIS_HORNS]: "Cross tears", // 87
  [CollectibleType.LITTLE_CHUBBY]: "Attack buddy", // 88
  [CollectibleType.SPIDER_BITE]: "Slow effect", // 89
  [CollectibleType.SMALL_ROCK]: "DMG up", // 90
  [CollectibleType.SPELUNKER_HAT]: "See-through doors", // 91
  [CollectibleType.SUPER_BANDAGE]: "+2 hearts", // 92
  [CollectibleType.GAMEKID]: "Temporary Man-Pac", // 93
  [CollectibleType.SACK_OF_PENNIES]: "Gives money", // 94
  [CollectibleType.ROBO_BABY]: "Friends 'till the bbbbzzzt", // 95
  [CollectibleType.LITTLE_CHAD]: "Gives kisses", // 96
  [CollectibleType.BOOK_OF_SIN]: "Reusable item generator", // 97
  [CollectibleType.RELIC]: "Soul generator", // 98
  [CollectibleType.LITTLE_GISH]: "Sticky friend", // 99
  [CollectibleType.LITTLE_STEVEN]: "Psychic friend", // 100
  [CollectibleType.HALO]: "All stats up", // 101
  [CollectibleType.MOMS_BOTTLE_OF_PILLS]: "Reusable pill generator", // 102
  [CollectibleType.COMMON_COLD]: "Poison damage", // 103
  [CollectibleType.PARASITE]: "Split shot", // 104
  [CollectibleType.D6]: "Reroll your destiny", // 105
  [CollectibleType.MR_MEGA]: "Bigger boom", // 106
  [CollectibleType.PINKING_SHEARS]: "Cut and run", // 107
  [CollectibleType.WAFER]: "Damage resistance", // 108
  [CollectibleType.MONEY_EQUALS_POWER]: "$$$ = DMG", // 109
  [CollectibleType.MOMS_CONTACTS]: "Freeze effect", // 110
  [CollectibleType.BEAN]: "Toot on command", // 111
  [CollectibleType.GUARDIAN_ANGEL]: "Extra protection", // 112
  [CollectibleType.DEMON_BABY]: "Auto-turret friend", // 113
  [CollectibleType.MOMS_KNIFE]: "Stab stab stab", // 114
  [CollectibleType.OUIJA_BOARD]: "Spectral tears", // 115
  [CollectibleType.NINE_VOLT]: "Quicker charge", // 116
  [CollectibleType.DEAD_BIRD]: "Protective buddy", // 117
  [CollectibleType.BRIMSTONE]: "Blood laser barrage", // 118
  [CollectibleType.BLOOD_BAG]: "HP up", // 119
  [CollectibleType.ODD_MUSHROOM_THIN]: "Tears + speed up, DMG down", // 120
  [CollectibleType.ODD_MUSHROOM_LARGE]: "HP + DMG up, speed down", // 121
  [CollectibleType.WHORE_OF_BABYLON]: "Curse up", // 122
  [CollectibleType.MONSTER_MANUAL]: "Temporary buddy generator", // 123
  [CollectibleType.DEAD_SEA_SCROLLS]: "It's a mystery", // 124
  [CollectibleType.BOBBY_BOMB]: "Homing bombs", // 125
  [CollectibleType.RAZOR_BLADE]: "Feel my pain", // 126
  [CollectibleType.FORGET_ME_NOW]: "I don't remember...", // 127
  [CollectibleType.FOREVER_ALONE]: "Attack fly", // 128
  [CollectibleType.BUCKET_OF_LARD]: "HP up", // 129
  [CollectibleType.PONY]: "Flight + dash attack", // 130
  [CollectibleType.BOMB_BAG]: "Gives bombs", // 131
  [CollectibleType.LUMP_OF_COAL]: "My Xmas present", // 132
  [CollectibleType.GUPPYS_PAW]: "Soul converter", // 133
  [CollectibleType.GUPPYS_TAIL]: "Cursed?", // 134
  [CollectibleType.IV_BAG]: "Portable blood bank", // 135
  [CollectibleType.BEST_FRIEND]: "Friends 'till the end", // 136
  [CollectibleType.REMOTE_DETONATOR]: "Remote bomb detonation", // 137
  [CollectibleType.STIGMATA]: "DMG + HP up", // 138
  [CollectibleType.MOMS_PURSE]: "More trinket room", // 139
  [CollectibleType.BOBS_CURSE]: "+5 poison bombs", // 140
  [CollectibleType.PAGEANT_BOY]: "Ultimate grand supreme", // 141
  [CollectibleType.SCAPULAR]: "Pray for a miracle", // 142
  [CollectibleType.SPEED_BALL]: "Speed + shot speed up", // 143
  [CollectibleType.BUM_FRIEND]: "He's greedy", // 144
  [CollectibleType.GUPPYS_HEAD]: "Reusable fly hive", // 145
  [CollectibleType.PRAYER_CARD]: "Reusable eternity ", // 146
  [CollectibleType.NOTCHED_AXE]: "Rocks don't stand a chance", // 147
  [CollectibleType.INFESTATION]: "Fly revenge", // 148
  [CollectibleType.IPECAC]: "Explosive shots", // 149
  [CollectibleType.TOUGH_LOVE]: "Tooth shot", // 150
  [CollectibleType.MULLIGAN]: "They grow inside", // 151
  [CollectibleType.TECHNOLOGY_2]: "Extra laser", // 152
  [CollectibleType.MUTANT_SPIDER]: "Quad shot", // 153
  [CollectibleType.CHEMICAL_PEEL]: "DMG up", // 154
  [CollectibleType.PEEPER]: "Plop!", // 155
  [CollectibleType.HABIT]: "Item martyr", // 156
  [CollectibleType.BLOODY_LUST]: "RAGE!", // 157
  [CollectibleType.CRYSTAL_BALL]: "I see my future", // 158
  [CollectibleType.SPIRIT_OF_THE_NIGHT]: "Scary", // 159
  [CollectibleType.CRACK_THE_SKY]: "Holy white death", // 160
  [CollectibleType.ANKH]: "Eternal life?", // 161
  [CollectibleType.CELTIC_CROSS]: "Blessing of protection", // 162
  [CollectibleType.GHOST_BABY]: "Spectral buddy", // 163
  [CollectibleType.CANDLE]: "Reusable flames", // 164
  [CollectibleType.CAT_O_NINE_TAILS]: "Shot speed + damage up", // 165
  [CollectibleType.D20]: "Reroll the basics", // 166
  [CollectibleType.HARLEQUIN_BABY]: "Double shot buddy", // 167
  [CollectibleType.EPIC_FETUS]: "On-demand air strike", // 168
  [CollectibleType.POLYPHEMUS]: "Mega tears", // 169
  [CollectibleType.DADDY_LONGLEGS]: "Daddy's love", // 170
  [CollectibleType.SPIDER_BUTT]: "Mass enemy slowdown + damage", // 171
  [CollectibleType.SACRIFICIAL_DAGGER]: "My fate protects me", // 172
  [CollectibleType.MITRE]: "Blessing of purity", // 173
  [CollectibleType.RAINBOW_BABY]: "Random buddy", // 174
  [CollectibleType.DADS_KEY]: "Opens all doors...", // 175
  [CollectibleType.STEM_CELLS]: "HP + shot speed up", // 176
  [CollectibleType.PORTABLE_SLOT]: "Gamble 24/7", // 177
  [CollectibleType.HOLY_WATER]: "Splash!", // 178
  [CollectibleType.FATE]: "Flight eternal", // 179
  [CollectibleType.BLACK_BEAN]: "Toot on touch", // 180
  [CollectibleType.WHITE_PONY]: "Flight + holy death", // 181
  [CollectibleType.SACRED_HEART]: "Homing shots + DMG up", // 182
  [CollectibleType.TOOTH_PICKS]: "Tears + shot speed up", // 183
  [CollectibleType.HOLY_GRAIL]: "Flight + HP up", // 184
  [CollectibleType.DEAD_DOVE]: "Flight + spectral tears", // 185
  [CollectibleType.BLOOD_RIGHTS]: "Mass enemy damage at a cost", // 186
  [CollectibleType.GUPPYS_HAIRBALL]: "Swing it", // 187
  [CollectibleType.ABEL]: "Mirrored buddy", // 188
  [CollectibleType.SMB_SUPER_FAN]: "All stats up", // 189
  [CollectibleType.PYRO]: "99 bombs", // 190
  [CollectibleType.THREE_DOLLAR_BILL]: "Rainbow tears", // 191
  [CollectibleType.TELEPATHY_BOOK]: "Temporary psychic shot", // 192
  [CollectibleType.MEAT]: "DMG + HP up", // 193
  [CollectibleType.MAGIC_8_BALL]: "Shot speed up", // 194
  [CollectibleType.MOMS_COIN_PURSE]: "What's all this...?", // 195
  [CollectibleType.SQUEEZY]: "Tears up", // 196
  [CollectibleType.JESUS_JUICE]: "Damage + range up", // 197
  [CollectibleType.BOX]: "Stuff", // 198
  [CollectibleType.MOMS_KEY]: "Better chest loot +2 keys", // 199
  [CollectibleType.MOMS_EYESHADOW]: "Charm tears", // 200
  [CollectibleType.IRON_BAR]: "DMG up + concussive tears", // 201
  [CollectibleType.MIDAS_TOUCH]: "Golden touch", // 202
  [CollectibleType.HUMBLING_BUNDLE]: "1+1 free 4Evar", // 203
  [CollectibleType.FANNY_PACK]: "Filled with goodies", // 204
  [CollectibleType.SHARP_PLUG]: "Infinite charge... at a cost", // 205
  [CollectibleType.GUILLOTINE]: "DMG + tears up. An out-of-body experience!", // 206
  [CollectibleType.BALL_OF_BANDAGES]: "Gotta lick 'em all!", // 207
  [CollectibleType.CHAMPION_BELT]: "DMG + challenge up", // 208
  [CollectibleType.BUTT_BOMBS]: "Toxic blast +5 bombs", // 209
  [CollectibleType.GNAWED_LEAF]: "Unbreakable", // 210
  [CollectibleType.SPIDERBABY]: "Spider revenge", // 211
  [CollectibleType.GUPPYS_COLLAR]: "Eternal life?", // 212
  [CollectibleType.LOST_CONTACT]: "Shielded tears", // 213
  [CollectibleType.ANEMIC]: "Toxic blood", // 214
  [CollectibleType.GOAT_HEAD]: "He accepts your offering", // 215
  [CollectibleType.CEREMONIAL_ROBES]: "DMG + evil up", // 216
  [CollectibleType.MOMS_WIG]: "You feel itchy...", // 217
  [CollectibleType.PLACENTA]: "Regeneration + HP up", // 218
  [CollectibleType.OLD_BANDAGE]: "HP up", // 219
  [CollectibleType.SAD_BOMBS]: "Tear blasts +5 bombs", // 220
  [CollectibleType.RUBBER_CEMENT]: "Bouncing tears", // 221
  [CollectibleType.ANTI_GRAVITY]: "Anti-gravity tears + tears up", // 222
  [CollectibleType.PYROMANIAC]: "It hurts so good +5 bombs", // 223
  [CollectibleType.CRICKETS_BODY]: "Bursting shots + tears up", // 224
  [CollectibleType.GIMPY]: "Sweet suffering", // 225
  [CollectibleType.BLACK_LOTUS]: "HP up x3", // 226
  [CollectibleType.PIGGY_BANK]: "My life savings", // 227
  [CollectibleType.MOMS_PERFUME]: "Fear shot + tears up", // 228
  [CollectibleType.MONSTROS_LUNG]: "Charged burst attack", // 229
  [CollectibleType.ABADDON]: "Evil + DMG up + fear shot", // 230
  [CollectibleType.BALL_OF_TAR]: "Sticky feet...", // 231
  [CollectibleType.STOP_WATCH]: "Let's slow this down a bit...", // 232
  [CollectibleType.TINY_PLANET]: "Orbiting tears + range up", // 233
  [CollectibleType.INFESTATION_2]: "Infestation shot", // 234
  // There is no `CollectibleType` with a value of 235.
  [CollectibleType.E_COLI]: "Turdy touch", // 236
  [CollectibleType.DEATHS_TOUCH]: "Piercing shots + DMG up", // 237
  [CollectibleType.KEY_PIECE_1]: "???", // 238
  [CollectibleType.KEY_PIECE_2]: "???", // 239
  [CollectibleType.EXPERIMENTAL_TREATMENT]: "Some stats up, some stats down", // 240
  [CollectibleType.CONTRACT_FROM_BELOW]: "Wealth... but at what cost?", // 241
  [CollectibleType.INFAMY]: "Blocks damage... sometimes", // 242
  [CollectibleType.TRINITY_SHIELD]: "You feel guarded", // 243
  [CollectibleType.TECH_5]: "It's still being tested...", // 244
  [CollectibleType.TWENTY_TWENTY]: "Double shot", // 245
  [CollectibleType.BLUE_MAP]: "Secrets", // 246
  [CollectibleType.BFFS]: "Your friends rule", // 247
  [CollectibleType.HIVE_MIND]: "Giant spiders and flies", // 248
  [CollectibleType.THERES_OPTIONS]: "More options", // 249
  [CollectibleType.BOGO_BOMBS]: "1+1 BOOM!", // 250
  [CollectibleType.STARTER_DECK]: "Extra card room", // 251
  [CollectibleType.LITTLE_BAGGY]: "Extra pill room", // 252
  [CollectibleType.MAGIC_SCAB]: "HP + luck up", // 253
  [CollectibleType.BLOOD_CLOT]: "DMG + range up", // 254
  [CollectibleType.SCREW]: "Tears + shot speed up", // 255
  [CollectibleType.HOT_BOMBS]: "Burning blast +5 bombs", // 256
  [CollectibleType.FIRE_MIND]: "Flaming tears", // 257
  [CollectibleType.MISSING_NO]: "Syntax error", // 258
  [CollectibleType.DARK_MATTER]: "DMG up + fear shot", // 259
  [CollectibleType.BLACK_CANDLE]: "Curse immunity + evil up", // 260
  [CollectibleType.PROPTOSIS]: "Short range mega tears", // 261
  [CollectibleType.MISSING_PAGE_2]: "Evil up. Your enemies will pay!", // 262
  [CollectibleType.CLEAR_RUNE]: "Rune mimic", // 263
  [CollectibleType.SMART_FLY]: "Revenge fly", // 264
  [CollectibleType.DRY_BABY]: "Immortal friend", // 265
  [CollectibleType.JUICY_SACK]: "Sticky babies", // 266
  [CollectibleType.ROBO_BABY_2]: "We worked out all the kinks", // 267
  [CollectibleType.ROTTEN_BABY]: "Infested friend", // 268
  [CollectibleType.HEADLESS_BABY]: "Bloody friend", // 269
  [CollectibleType.LEECH]: "Blood sucker", // 270
  [CollectibleType.MYSTERY_SACK]: "?", // 271
  [CollectibleType.BBF]: "Big Beautiful Fly", // 272
  [CollectibleType.BOBS_BRAIN]: "Explosive thoughts", // 273
  [CollectibleType.BEST_BUD]: "Sworn protector", // 274
  [CollectibleType.LIL_BRIMSTONE]: "Evil friend", // 275
  [CollectibleType.ISAACS_HEART]: "Protect it", // 276
  [CollectibleType.LIL_HAUNT]: "Fear him", // 277
  [CollectibleType.DARK_BUM]: "He wants to take your life", // 278
  [CollectibleType.BIG_FAN]: "Fat protector", // 279
  [CollectibleType.SISSY_LONGLEGS]: "She loves you", // 280
  [CollectibleType.PUNCHING_BAG]: "Scape goat", // 281
  [CollectibleType.HOW_TO_JUMP]: "It's time you learned how", // 282
  [CollectibleType.D100]: "REEROLLLLL!", // 283
  [CollectibleType.D4]: "Reroll into something else", // 284
  [CollectibleType.D10]: "Reroll enemies", // 285
  [CollectibleType.BLANK_CARD]: "Card mimic", // 286
  [CollectibleType.BOOK_OF_SECRETS]: "Tome of knowledge", // 287
  [CollectibleType.BOX_OF_SPIDERS]: "It's a box of spiders", // 288
  [CollectibleType.RED_CANDLE]: "Flame on", // 289
  [CollectibleType.JAR]: "Save your life", // 290
  [CollectibleType.FLUSH]: "...", // 291
  [CollectibleType.SATANIC_BIBLE]: "Reusable evil... but at what cost?", // 292
  [CollectibleType.HEAD_OF_KRAMPUS]: "Krampus rage", // 293
  [CollectibleType.BUTTER_BEAN]: "Reusable knock-back", // 294
  [CollectibleType.MAGIC_FINGERS]: "Pay to win", // 295
  [CollectibleType.CONVERTER]: "Convert your soul", // 296
  [CollectibleType.BLUE_BOX]: "? ?", // 297
  [CollectibleType.UNICORN_STUMP]: "You feel stumped", // 298
  [CollectibleType.TAURUS]: "Speed down + rage is building", // 299
  [CollectibleType.ARIES]: "Ramming speed", // 300
  [CollectibleType.CANCER]: "HP up + you feel protected", // 301
  [CollectibleType.LEO]: "Stompy", // 302
  [CollectibleType.VIRGO]: "You feel refreshed and protected", // 303
  [CollectibleType.LIBRA]: "You feel balanced", // 304
  [CollectibleType.SCORPIO]: "Poison tears", // 305
  [CollectibleType.SAGITTARIUS]: "Piercing shots + speed up", // 306
  [CollectibleType.CAPRICORN]: "All stats up", // 307
  [CollectibleType.AQUARIUS]: "Trail of tears", // 308
  [CollectibleType.PISCES]: "Tears up + knock-back shot", // 309
  [CollectibleType.EVES_MASCARA]: "DMG up, tears + shot speed down", // 310
  [CollectibleType.JUDAS_SHADOW]: "Sweet revenge", // 311
  [CollectibleType.MAGGYS_BOW]: "HP up + you feel healthy", // 312
  [CollectibleType.HOLY_MANTLE]: "Holy shield", // 313
  [CollectibleType.THUNDER_THIGHS]: "HP up + speed down + you feel stompy", // 314
  [CollectibleType.STRANGE_ATTRACTOR]: "Magnetic tears", // 315
  [CollectibleType.CURSED_EYE]: "Cursed charge shot", // 316
  [CollectibleType.MYSTERIOUS_LIQUID]: "Toxic splash damage", // 317
  [CollectibleType.GEMINI]: "Conjoined friend", // 318
  [CollectibleType.CAINS_OTHER_EYE]: "Near-sighted friend", // 319
  [CollectibleType.BLUE_BABYS_ONLY_FRIEND]: "Controlled friend", // 320
  [CollectibleType.SAMSONS_CHAINS]: "The ol' ball and chain", // 321
  [CollectibleType.MONGO_BABY]: "Mongo friend", // 322
  [CollectibleType.ISAACS_TEARS]: "Collected tears", // 323
  [CollectibleType.UNDEFINED]: "Undefined", // 324
  [CollectibleType.SCISSORS]: "Lose your head", // 325
  [CollectibleType.BREATH_OF_LIFE]: "Invincibility at a cost", // 326
  [CollectibleType.POLAROID]: "Fate chosen", // 327
  [CollectibleType.NEGATIVE]: "Fate chosen", // 328
  [CollectibleType.LUDOVICO_TECHNIQUE]: "Controlled tears", // 329
  [CollectibleType.SOY_MILK]: "DMG down + tears way up", // 330
  [CollectibleType.GODHEAD]: "God tears", // 331
  [CollectibleType.LAZARUS_RAGS]: "Eternal life?", // 332
  [CollectibleType.MIND]: "I know all", // 333
  [CollectibleType.BODY]: "I feel all", // 334
  [CollectibleType.SOUL]: "I am all", // 335
  [CollectibleType.DEAD_ONION]: "Toxic aura tears", // 336
  [CollectibleType.BROKEN_WATCH]: "I think it's broken", // 337
  [CollectibleType.BOOMERANG]: "It will never leave you", // 338
  [CollectibleType.SAFETY_PIN]: "Evil + range + shot speed up", // 339
  [CollectibleType.CAFFEINE_PILL]: "Speed up + size down", // 340
  [CollectibleType.TORN_PHOTO]: "Tears + shot speed up", // 341
  [CollectibleType.BLUE_CAP]: "HP + tears up + shot speed down", // 342
  [CollectibleType.LATCH_KEY]: "Luck up", // 343
  [CollectibleType.MATCH_BOOK]: "Evil up", // 344
  [CollectibleType.SYNTHOIL]: "DMG + range up", // 345
  [CollectibleType.SNACK]: "HP up", // 346
  [CollectibleType.DIPLOPIA]: "Double item vision", // 347
  [CollectibleType.PLACEBO]: "Pill mimic", // 348
  [CollectibleType.WOODEN_NICKEL]: "Flip a coin", // 349
  [CollectibleType.TOXIC_SHOCK]: "Mass poison", // 350
  [CollectibleType.MEGA_BEAN]: "Giga fart!", // 351
  [CollectibleType.GLASS_CANNON]: "Be gentle...", // 352
  [CollectibleType.BOMBER_BOY]: "Cross blast + 5 bombs", // 353
  [CollectibleType.CRACK_JACKS]: "HP up. Don't swallow the prize!", // 354
  [CollectibleType.MOMS_PEARLS]: "Range + luck up", // 355
  [CollectibleType.CAR_BATTERY]: "Active power up", // 356
  [CollectibleType.BOX_OF_FRIENDS]: "Double your friends", // 357
  [CollectibleType.WIZ]: "Double wiz shot!", // 358
  [CollectibleType.EIGHT_INCH_NAILS]: "Stick it to 'em!", // 359
  [CollectibleType.INCUBUS]: "Dark friend", // 360
  [CollectibleType.FATES_REWARD]: "Your fate beside you", // 361
  [CollectibleType.LIL_CHEST]: "What's in the box?", // 362
  [CollectibleType.SWORN_PROTECTOR]: "Protective friend", // 363
  [CollectibleType.FRIEND_ZONE]: "Friendly fly", // 364
  [CollectibleType.LOST_FLY]: "Lost protector", // 365
  [CollectibleType.SCATTER_BOMBS]: "We put bombs in your bombs!", // 366
  [CollectibleType.STICKY_BOMBS]: "Egg sack bombs!", // 367
  [CollectibleType.EPIPHORA]: "Intensifying tears", // 368
  [CollectibleType.CONTINUUM]: "Transcendent tears", // 369
  [CollectibleType.MR_DOLLY]: "Range + tears up", // 370
  [CollectibleType.CURSE_OF_THE_TOWER]: "Embrace chaos", // 371
  [CollectibleType.CHARGED_BABY]: "Bbbzzzzzt! ", // 372
  [CollectibleType.DEAD_EYE]: "Accuracy brings power", // 373
  [CollectibleType.HOLY_LIGHT]: "Holy death shot", // 374
  [CollectibleType.HOST_HAT]: "Blast resistance", // 375
  [CollectibleType.RESTOCK]: "Never ending stores!", // 376
  [CollectibleType.BURSTING_SACK]: "Spider love", // 377
  [CollectibleType.NUMBER_TWO]: "Uh oh...", // 378
  [CollectibleType.PUPULA_DUPLEX]: "Wide shot", // 379
  [CollectibleType.PAY_TO_PLAY]: "Money talks", // 380
  [CollectibleType.EDENS_BLESSING]: "Tears up + your future shines brighter", // 381
  [CollectibleType.FRIEND_BALL]: "Gotta fetch 'em all!", // 382
  [CollectibleType.TEAR_DETONATOR]: "Remote tear detonation", // 383
  [CollectibleType.LIL_GURDY]: "A gurd of your own!", // 384
  [CollectibleType.BUMBO]: "Bumbo want coin!", // 385
  [CollectibleType.D12]: "Rerolls rocks", // 386
  [CollectibleType.CENSER]: "Peace be with you", // 387
  [CollectibleType.KEY_BUM]: "He wants your keys!", // 388
  [CollectibleType.RUNE_BAG]: "Rune generator", // 389
  [CollectibleType.SERAPHIM]: "Sworn friend", // 390
  [CollectibleType.BETRAYAL]: "Turn your enemy", // 391
  [CollectibleType.ZODIAC]: "The heavens will change you", // 392
  [CollectibleType.SERPENTS_KISS]: "The kiss of death", // 393
  [CollectibleType.MARKED]: "Directed tears", // 394
  [CollectibleType.TECH_X]: "Laser ring tears", // 395
  [CollectibleType.VENTRICLE_RAZOR]: "Short cutter", // 396
  [CollectibleType.TRACTOR_BEAM]: "Controlled tears", // 397
  [CollectibleType.GODS_FLESH]: "Shrink shot!", // 398
  [CollectibleType.MAW_OF_THE_VOID]: "Consume thy enemy!", // 399
  [CollectibleType.SPEAR_OF_DESTINY]: "Your destiny", // 400
  [CollectibleType.EXPLOSIVO]: "Sticky bomb shot", // 401
  [CollectibleType.CHAOS]: "!!!", // 402
  [CollectibleType.SPIDER_MOD]: "Mod buddy", // 403
  [CollectibleType.FARTING_BABY]: "He farts", // 404
  [CollectibleType.GB_BUG]: "Double tap glitch", // 405
  [CollectibleType.D8]: "Reroll stats", // 406
  [CollectibleType.PURITY]: "Aura stat boost", // 407
  [CollectibleType.ATHAME]: "Call to the void", // 408
  [CollectibleType.EMPTY_VESSEL]: "I reward an empty vessel", // 409
  [CollectibleType.EVIL_EYE]: "Eye shot", // 410
  [CollectibleType.LUSTY_BLOOD]: "Their blood brings rage!", // 411
  [CollectibleType.CAMBION_CONCEPTION]: "Feed them hate", // 412
  [CollectibleType.IMMACULATE_CONCEPTION]: "Feed them love", // 413
  [CollectibleType.MORE_OPTIONS]: "There's options", // 414
  [CollectibleType.CROWN_OF_LIGHT]: "The untainted gain power", // 415
  [CollectibleType.DEEP_POCKETS]: "More money!", // 416
  [CollectibleType.SUCCUBUS]: "Damage booster", // 417
  [CollectibleType.FRUIT_CAKE]: "Rainbow effects!", // 418
  [CollectibleType.TELEPORT_2]: "I-Teleport!", // 419
  [CollectibleType.BLACK_POWDER]: "Spin the black circle!", // 420
  [CollectibleType.KIDNEY_BEAN]: "Love toots", // 421
  [CollectibleType.GLOWING_HOUR_GLASS]: "Turn back time", // 422
  [CollectibleType.CIRCLE_OF_PROTECTION]: "Protect me from myself", // 423
  [CollectibleType.SACK_HEAD]: "More sacks!", // 424
  [CollectibleType.NIGHT_LIGHT]: "Scared of the dark?", // 425
  [CollectibleType.OBSESSED_FAN]: "Follows my every move...", // 426
  [CollectibleType.MINE_CRAFTER]: "Booom!", // 427
  [CollectibleType.PJS]: "You feel cozy", // 428
  [CollectibleType.HEAD_OF_THE_KEEPER]: "Penny tears", // 429
  [CollectibleType.PAPA_FLY]: "Turret follower", // 430
  [CollectibleType.MULTIDIMENSIONAL_BABY]: "ydduB Buddy", // 431
  [CollectibleType.GLITTER_BOMBS]: "Prize bombs", // 432
  [CollectibleType.MY_SHADOW]: "Me! And my shaaaadow!", // 433
  [CollectibleType.JAR_OF_FLIES]: "Bug catcher", // 434
  [CollectibleType.LIL_LOKI]: "4-way buddy!", // 435
  [CollectibleType.MILK]: "Don't cry over it...", // 436
  [CollectibleType.D7]: "Roll again", // 437
  [CollectibleType.BINKY]: "Tears up", // 438
  [CollectibleType.MOMS_BOX]: "What's inside?", // 439
  [CollectibleType.KIDNEY_STONE]: "Matt's kidney stone", // 440
  [CollectibleType.MEGA_BLAST]: "Laser breath", // 441
  [CollectibleType.DARK_PRINCES_CROWN]: "Loss is power", // 442
  [CollectibleType.APPLE]: "Trick or treat?", // 443
  [CollectibleType.LEAD_PENCIL]: "He's a bleeder!", // 444
  [CollectibleType.DOG_TOOTH]: "Bark at the moon!", // 445
  [CollectibleType.DEAD_TOOTH]: "Toxic breath", // 446
  [CollectibleType.LINGER_BEAN]: "Crying makes me toot", // 447
  [CollectibleType.SHARD_OF_GLASS]: "Blood and guts!", // 448
  [CollectibleType.METAL_PLATE]: "It itches...", // 449
  [CollectibleType.EYE_OF_GREED]: "Gold tears!", // 450
  [CollectibleType.TAROT_CLOTH]: "I see the future", // 451
  [CollectibleType.VARICOSE_VEINS]: "I'm leaking...", // 452
  [CollectibleType.COMPOUND_FRACTURE]: "Bone tears!", // 453
  [CollectibleType.POLYDACTYLY]: "Hold me!", // 454
  [CollectibleType.DADS_LOST_COIN]: "I remember this...", // 455
  [CollectibleType.MIDNIGHT_SNACK]: "HP up", // 456
  [CollectibleType.CONE_HEAD]: "Hard headed!", // 457
  [CollectibleType.BELLY_BUTTON]: "What's in there?", // 458
  [CollectibleType.SINUS_INFECTION]: "Booger tears!", // 459
  [CollectibleType.GLAUCOMA]: "Blind tears!", // 460
  [CollectibleType.PARASITOID]: "Egg tears!", // 461
  [CollectibleType.EYE_OF_BELIAL]: "Possessed tears!", // 462
  [CollectibleType.SULFURIC_ACID]: "Acid tears!", // 463
  [CollectibleType.GLYPH_OF_BALANCE]: "A gift from above", // 464
  [CollectibleType.ANALOG_STICK]: "360 tears!", // 465
  [CollectibleType.CONTAGION]: "Outbreak!", // 466
  [CollectibleType.FINGER]: "Watch where you point that!", // 467
  [CollectibleType.SHADE]: "It follows", // 468
  [CollectibleType.DEPRESSION]: ":(", // 469
  [CollectibleType.HUSHY]: "Lil hush!", // 470
  [CollectibleType.LIL_MONSTRO]: "Ain't he cute?", // 471
  [CollectibleType.KING_BABY]: "Hail to the king baby", // 472
  [CollectibleType.BIG_CHUBBY]: "Chub chub", // 473
  [CollectibleType.BROKEN_GLASS_CANNON]: "You broke it!", // 474
  [CollectibleType.PLAN_C]: "My last resort", // 475
  [CollectibleType.D1]: "What will it be?", // 476
  [CollectibleType.VOID]: "Consume", // 477
  [CollectibleType.PAUSE]: "Stop!", // 478
  [CollectibleType.SMELTER]: "Trinket melter!", // 479
  [CollectibleType.COMPOST]: "Gain more friends!", // 480
  [CollectibleType.DATAMINER]: "109", // 481
  [CollectibleType.CLICKER]: "Change", // 482
  [CollectibleType.MAMA_MEGA]: "BOOOOOOOOOM!", // 483
  [CollectibleType.WAIT_WHAT]: "I can't believe it's not butter bean!", // 484
  [CollectibleType.CROOKED_PENNY]: "50/50", // 485
  [CollectibleType.DULL_RAZOR]: "I feel numb...", // 486
  [CollectibleType.POTATO_PEELER]: "A pound of flesh...", // 487
  [CollectibleType.METRONOME]: "Waggles a finger", // 488
  [CollectibleType.D_INFINITY]: "Reroll forever", // 489
  [CollectibleType.EDENS_SOUL]: "...", // 490
  [CollectibleType.ACID_BABY]: "Pills pills pills!", // 491
  [CollectibleType.YO_LISTEN]: "Yo listen!", // 492
  [CollectibleType.ADRENALINE]: "Panic = power", // 493
  [CollectibleType.JACOBS_LADDER]: "Electric tears", // 494
  [CollectibleType.GHOST_PEPPER]: "Flame tears", // 495
  [CollectibleType.EUTHANASIA]: "Needle shot", // 496
  [CollectibleType.CAMO_UNDIES]: "Camo kid", // 497
  [CollectibleType.DUALITY]: "You feel very balanced", // 498
  [CollectibleType.EUCHARIST]: "Peace be with you", // 499
  [CollectibleType.SACK_OF_SACKS]: "Gives sacks", // 500
  [CollectibleType.GREEDS_GULLET]: "Money = health!", // 501
  [CollectibleType.LARGE_ZIT]: "Creep shots", // 502
  [CollectibleType.LITTLE_HORN]: "Big brother is watching", // 503
  [CollectibleType.BROWN_NUGGET]: "Friendly fly", // 504
  [CollectibleType.POKE_GO]: "Gotta catch em...", // 505
  [CollectibleType.BACKSTABBER]: "Watch your back!", // 506
  [CollectibleType.SHARP_STRAW]: "More blood!", // 507
  [CollectibleType.MOMS_RAZOR]: "It's sharp!", // 508
  [CollectibleType.BLOODSHOT_EYE]: "Bloody friend", // 509
  [CollectibleType.DELIRIOUS]: "Unleash the power!", // 510
  [CollectibleType.ANGRY_FLY]: "He's violent", // 511
  [CollectibleType.BLACK_HOLE]: "Nothing can escape", // 512
  [CollectibleType.BOZO]: "Party time!", // 513
  [CollectibleType.BROKEN_MODEM]: "Lag!", // 514
  [CollectibleType.MYSTERY_GIFT]: "Wrapped up nice for you!", // 515
  [CollectibleType.SPRINKLER]: "Sprinkles.", // 516
  [CollectibleType.FAST_BOMBS]: "Rapid bomb drops", // 517
  [CollectibleType.BUDDY_IN_A_BOX]: "What could it be?!", // 518
  [CollectibleType.LIL_DELIRIUM]: "Delirious friend", // 519
  [CollectibleType.JUMPER_CABLES]: "Bloody recharge", // 520
  [CollectibleType.COUPON]: "Allow 6 weeks for delivery", // 521
  [CollectibleType.TELEKINESIS]: "Power of the mind", // 522
  [CollectibleType.MOVING_BOX]: "Pack and unpack", // 523
  [CollectibleType.TECHNOLOGY_ZERO]: "Static tears", // 524
  [CollectibleType.LEPROSY]: "You're tearing me apart!", // 525
  [CollectibleType.SEVEN_SEALS]: "Lil harbingers!", // 526
  [CollectibleType.MR_ME]: "Caaan do!", // 527
  [CollectibleType.ANGELIC_PRISM]: "Eclipsed by the moon", // 528
  [CollectibleType.POP]: "Eyeball tears", // 529
  [CollectibleType.DEATHS_LIST]: "Just hope you're not next...", // 530
  [CollectibleType.HAEMOLACRIA]: "I'm seeing red...", // 531
  [CollectibleType.LACHRYPHAGY]: "Feed them!", // 532
  [CollectibleType.TRISAGION]: "Smite thy enemy", // 533
  [CollectibleType.SCHOOLBAG]: "Extra active item room", // 534
  [CollectibleType.BLANKET]: "You feel safe", // 535
  [CollectibleType.SACRIFICIAL_ALTAR]: "He demands a sacrifice", // 536
  [CollectibleType.LIL_SPEWER]: "Puking buddy", // 537
  [CollectibleType.MARBLES]: "Choking hazard", // 538
  [CollectibleType.MYSTERY_EGG]: "Sacrificial insemination", // 539
  [CollectibleType.FLAT_STONE]: "Skipping tears", // 540
  [CollectibleType.MARROW]: "HP up?", // 541
  [CollectibleType.SLIPPED_RIB]: "Projectile shield", // 542
  [CollectibleType.HALLOWED_GROUND]: "Portable sanctuary", // 543
  [CollectibleType.POINTY_RIB]: "Stabbing time", // 544
  [CollectibleType.BOOK_OF_THE_DEAD]: "Rise from the grave", // 545
  [CollectibleType.DADS_RING]: "Father's blessing", // 546
  [CollectibleType.DIVORCE_PAPERS]: "Tears up + you feel empty", // 547
  [CollectibleType.JAW_BONE]: "Fetch!", // 548
  [CollectibleType.BRITTLE_BONES]: "Everything hurts", // 549
  [CollectibleType.BROKEN_SHOVEL_1]: "It feels cursed", // 550
  [CollectibleType.BROKEN_SHOVEL_2]: "It feels cursed", // 551
  [CollectibleType.MOMS_SHOVEL]: "Lost but not forgotten", // 552
  [CollectibleType.MUCORMYCOSIS]: "Spore shot", // 553
  [CollectibleType.TWO_SPOOKY]: "4me", // 554
  [CollectibleType.GOLDEN_RAZOR]: "Pain from gain", // 555
  [CollectibleType.SULFUR]: "Temporary demon form", // 556
  [CollectibleType.FORTUNE_COOKIE]: "Reusable fortunes", // 557
  [CollectibleType.EYE_SORE]: "More eyes", // 558
  [CollectibleType.ONE_HUNDRED_TWENTY_VOLT]: "Zap!", // 559
  [CollectibleType.IT_HURTS]: "No it doesn't...", // 560
  [CollectibleType.ALMOND_MILK]: "DMG down + tears up + you feel nutty", // 561
  [CollectibleType.ROCK_BOTTOM]: "It's only up from there", // 562
  [CollectibleType.NANCY_BOMBS]: "Random blast +5 bombs", // 563
  [CollectibleType.BAR_OF_SOAP]: "Tears + shot speed up", // 564
  [CollectibleType.BLOOD_PUPPY]: "What a cute little thing!", // 565
  [CollectibleType.DREAM_CATCHER]: "Sweet dreams", // 566
  [CollectibleType.PASCHAL_CANDLE]: "Keep the flame burning", // 567
  [CollectibleType.DIVINE_INTERVENTION]: "Double tap shield", // 568
  [CollectibleType.BLOOD_OATH]: "Bleed me dry", // 569
  [CollectibleType.PLAYDOUGH_COOKIE]: "Tasty rainbow", // 570
  [CollectibleType.ORPHAN_SOCKS]: "Speed up + your feet feel stronger", // 571
  [CollectibleType.EYE_OF_THE_OCCULT]: "DMG up + range up + controlled tears", // 572
  [CollectibleType.IMMACULATE_HEART]: "Halo of tears", // 573
  [CollectibleType.MONSTRANCE]: "Purifying light", // 574
  [CollectibleType.INTRUDER]: "Invasive friend", // 575
  [CollectibleType.DIRTY_MIND]: "Filthy friends", // 576
  [CollectibleType.DAMOCLES]: "A king's fortune... but at what cost?", // 577
  [CollectibleType.FREE_LEMONADE]: "Party time!", // 578
  [CollectibleType.SPIRIT_SWORD]: "Divine blade", // 579
  [CollectibleType.RED_KEY]: "Explore the other side", // 580
  [CollectibleType.PSY_FLY]: "Flamboyant protector", // 581
  [CollectibleType.WAVY_CAP]: "Tears up. A mind changing experience!", // 582
  [CollectibleType.ROCKET_IN_A_JAR]: "Rocket propulsion +5 bombs", // 583
  [CollectibleType.BOOK_OF_VIRTUES]: "Spiritual companionship", // 584
  [CollectibleType.ALABASTER_BOX]: "A sacred offering", // 585
  [CollectibleType.STAIRWAY]: "May you get what you came for", // 586
  // There is no `CollectibleType` with a value of 587.
  [CollectibleType.SOL]: "Radiant victory", // 588
  [CollectibleType.LUNA]: "The moon's blessing shines upon you", // 589
  [CollectibleType.MERCURIUS]: "Speed up + you feel elusive", // 590
  [CollectibleType.VENUS]: "HP up + you feel pretty", // 591
  [CollectibleType.TERRA]: "Born to rock", // 592
  [CollectibleType.MARS]: "Double tap dash", // 593
  [CollectibleType.JUPITER]: "You're a gas giant!", // 594
  [CollectibleType.SATURNUS]: "Ring of tears", // 595
  [CollectibleType.URANUS]: "Ice tears", // 596
  [CollectibleType.NEPTUNUS]: "Open the floodgates", // 597
  [CollectibleType.PLUTO]: "Size down", // 598
  [CollectibleType.VOODOO_HEAD]: "Extra curse rooms", // 599
  [CollectibleType.EYE_DROPS]: "Tears up", // 600
  [CollectibleType.ACT_OF_CONTRITION]: "Tears up, you feel forgiven", // 601
  [CollectibleType.MEMBER_CARD]: "Exclusive access!", // 602
  [CollectibleType.BATTERY_PACK]: "Instant energy!", // 603
  [CollectibleType.MOMS_BRACELET]: "Mother's strength", // 604
  [CollectibleType.SCOOPER]: "Plop!", // 605
  [CollectibleType.OCULAR_RIFT]: "Stare into the abyss", // 606
  [CollectibleType.BOILED_BABY]: "Messy friend", // 607
  [CollectibleType.FREEZER_BABY]: "Iced iced baby", // 608
  [CollectibleType.ETERNAL_D6]: "???", // 609
  [CollectibleType.BIRD_CAGE]: "Fat buddy", // 610
  [CollectibleType.LARYNX]: "Hear my pain", // 611
  [CollectibleType.LOST_SOUL]: "Protect him", // 612
  // There is no `CollectibleType` with a value of 613.
  [CollectibleType.BLOOD_BOMBS]: "Bloody blast + HP up", // 614
  [CollectibleType.LIL_DUMPY]: "Puffy buddy", // 615
  [CollectibleType.BIRDS_EYE]: "It burns", // 616
  [CollectibleType.LODESTONE]: "Magnetizing tears", // 617
  [CollectibleType.ROTTEN_TOMATO]: "Delicious!", // 618
  [CollectibleType.BIRTHRIGHT]: "???", // 619
  // There is no `CollectibleType` with a value of 620.
  [CollectibleType.RED_STEW]: "Full HP + temporary DMG up", // 621
  [CollectibleType.GENESIS]: "In the beginning", // 622
  [CollectibleType.SHARP_KEY]: "Open your enemies", // 623
  [CollectibleType.BOOSTER_PACK]: "Collect them all!", // 624
  [CollectibleType.MEGA_MUSH]: "I'm a big boy now!", // 625
  [CollectibleType.KNIFE_PIECE_1]: "???", // 626
  [CollectibleType.KNIFE_PIECE_2]: "???", // 627
  [CollectibleType.DEATH_CERTIFICATE]: "Where am I?", // 628
  [CollectibleType.BOT_FLY]: "Defense drone", // 629
  // There is no `CollectibleType` with a value of 630.
  [CollectibleType.MEAT_CLEAVER]: "Slice but no dice", // 631
  [CollectibleType.EVIL_CHARM]: "Luck up + you feel protected", // 632
  [CollectibleType.DOGMA]: "Ascended", // 633
  [CollectibleType.PURGATORY]: "Help from beyond", // 634
  [CollectibleType.STITCHES]: "Bait and switch", // 635
  [CollectibleType.R_KEY]: "Time to start over", // 636
  [CollectibleType.KNOCKOUT_DROPS]: "They pack a punch!", // 637
  [CollectibleType.ERASER]: "Erase thy enemy", // 638
  [CollectibleType.YUCK_HEART]: "Gross!", // 639
  [CollectibleType.URN_OF_SOULS]: "Unleash their sorrow", // 640
  [CollectibleType.AKELDAMA]: "Spill your guts", // 641
  [CollectibleType.MAGIC_SKIN]: "All your desires fulfilled", // 642
  [CollectibleType.REVELATION]: "Awaken your faith", // 643
  [CollectibleType.CONSOLATION_PRIZE]: "+1 to lowest stat", // 644
  [CollectibleType.TINYTOMA]: "Itching for revenge", // 645
  [CollectibleType.BRIMSTONE_BOMBS]: "Demon blast +5 bombs", // 646
  [CollectibleType.FOUR_FIVE_VOLT]: "Beat the juice out of them!", // 647
  // There is no `CollectibleType` with a value of 648.
  [CollectibleType.FRUITY_PLUM]: "Bouncy friend", // 649
  [CollectibleType.PLUM_FLUTE]: "Play time!", // 650
  [CollectibleType.STAR_OF_BETHLEHEM]: "Follow the light", // 651
  [CollectibleType.CUBE_BABY]: "Kick it!", // 652
  [CollectibleType.VADE_RETRO]: "Begone!", // 653
  [CollectibleType.FALSE_PHD]: "Worse pills + evil up", // 654
  [CollectibleType.SPIN_TO_WIN]: "Let it rip!", // 655
  [CollectibleType.DAMOCLES_PASSIVE]: "A king's fortune... but at what cost?", // 656
  [CollectibleType.VASCULITIS]: "Clogged enemies", // 657
  [CollectibleType.GIANT_CELL]: "Micro friends", // 658
  [CollectibleType.TROPICAMIDE]: "Tear size + range up", // 659
  [CollectibleType.CARD_READING]: "A link to your future", // 660
  [CollectibleType.QUINTS]: "They lurk inside", // 661
  // There is no `CollectibleType` with a value of 662.
  [CollectibleType.TOOTH_AND_NAIL]: "You feel prickly", // 663
  [CollectibleType.BINGE_EATER]: "All you can eat", // 664
  [CollectibleType.GUPPYS_EYE]: "An eye for secrets", // 665
  // There is no `CollectibleType` with a value of 666.
  [CollectibleType.STRAWMAN]: "A helping hand", // 667
  [CollectibleType.DADS_NOTE]: "...", // 668
  [CollectibleType.SAUSAGE]: "All stats up", // 669
  [CollectibleType.OPTIONS]: "There might be options", // 670
  [CollectibleType.CANDY_HEART]: "Power of love", // 671
  [CollectibleType.POUND_OF_FLESH]: "Blood money", // 672
  [CollectibleType.REDEMPTION]: "Deliver me from evil", // 673
  [CollectibleType.SPIRIT_SHACKLES]: "Unfinished business", // 674
  [CollectibleType.CRACKED_ORB]: "Shards of knowledge", // 675
  [CollectibleType.EMPTY_HEART]: "It multiplies", // 676
  [CollectibleType.ASTRAL_PROJECTION]: "The true out-of-body experience!", // 677
  [CollectibleType.C_SECTION]: "Fetus shots", // 678
  [CollectibleType.LIL_ABADDON]: "Abyssal friend", // 679
  [CollectibleType.MONTEZUMAS_REVENGE]: "Oh no...", // 680
  [CollectibleType.LIL_PORTAL]: "It hungers", // 681
  [CollectibleType.WORM_FRIEND]: "Clingy buddy", // 682
  [CollectibleType.BONE_SPURS]: "Break your enemies", // 683
  [CollectibleType.HUNGRY_SOUL]: "Out for blood", // 684
  [CollectibleType.JAR_OF_WISPS]: "Your faith grows", // 685
  [CollectibleType.SOUL_LOCKET]: "Power of faith", // 686
  [CollectibleType.FRIEND_FINDER]: "Best friends forever!", // 687
  [CollectibleType.INNER_CHILD]: "Let him free", // 688
  [CollectibleType.GLITCHED_CROWN]: "?????", // 689
  [CollectibleType.JELLY_BELLY]: "Bounce away!", // 690
  [CollectibleType.SACRED_ORB]: "Destined for greatness", // 691
  [CollectibleType.SANGUINE_BOND]: "He awaits your offering", // 692
  [CollectibleType.SWARM]: "Infest", // 693
  [CollectibleType.HEARTBREAK]: "Eternal sorrow", // 694
  [CollectibleType.BLOODY_GUST]: "May your rage bring haste", // 695
  [CollectibleType.SALVATION]: "Divine protection", // 696
  [CollectibleType.VANISHING_TWIN]: "He wants revenge", // 697
  [CollectibleType.TWISTED_PAIR]: "Double trouble!", // 698
  [CollectibleType.AZAZELS_RAGE]: "Ancient power", // 699
  [CollectibleType.ECHO_CHAMBER]: "I can see see the future future future", // 700
  [CollectibleType.ISAACS_TOMB]: "Buried memories", // 701
  [CollectibleType.VENGEFUL_SPIRIT]: "Hot blooded", // 702
  [CollectibleType.ESAU_JR]: "Lost brother", // 703
  [CollectibleType.BERSERK]: "Rip and tear", // 704
  [CollectibleType.DARK_ARTS]: "One with the shadows", // 705
  [CollectibleType.ABYSS]: "Come forth from the depths", // 706
  [CollectibleType.SUPPER]: "HP up", // 707
  [CollectibleType.STAPLER]: "DMG up", // 708
  [CollectibleType.SUPLEX]: "Angel breaker", // 709
  [CollectibleType.BAG_OF_CRAFTING]: "Make your destiny", // 710
  [CollectibleType.FLIP]: "Life and death", // 711
  [CollectibleType.LEMEGETON]: "Item summoner", // 712
  [CollectibleType.SUMPTORIUM]: "Return", // 713
  [CollectibleType.RECALL]: "Come back", // 714
  [CollectibleType.HOLD]: "Saved for later", // 715
  [CollectibleType.KEEPERS_SACK]: "Spending power", // 716
  [CollectibleType.KEEPERS_KIN]: "Under a rock", // 717
  // There is no `CollectibleType` with a value of 718.
  [CollectibleType.KEEPERS_BOX]: "Portable shop", // 719
  [CollectibleType.EVERYTHING_JAR]: "Anything is possible", // 720
  [CollectibleType.TMTRAINER]:
    "Isaac and his mother lived alone in a small house on a hill", // 721
  [CollectibleType.ANIMA_SOLA]: "Repent", // 722
  [CollectibleType.SPINDOWN_DICE]: "-1", // 723
  [CollectibleType.HYPERCOAGULATION]: "Thick blooded", // 724
  [CollectibleType.IBS]: "Your stomach rumbles", // 725
  [CollectibleType.HEMOPTYSIS]: "Double tap sneeze", // 726
  [CollectibleType.GHOST_BOMBS]: "Spooky blast +5 bombs", // 727
  [CollectibleType.GELLO]: "Demonic gestation", // 728
  [CollectibleType.DECAP_ATTACK]: "Chuck away!", // 729
  [CollectibleType.GLASS_EYE]: "DMG + luck up", // 730
  [CollectibleType.STYE]: "DMG + range up", // 731
  [CollectibleType.MOMS_RING]: "DMG up", // 732
} as const satisfies Record<CollectibleType, string>;
