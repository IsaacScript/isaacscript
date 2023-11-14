import { CollectibleType } from "isaac-typescript-definitions";

export const DEFAULT_COLLECTIBLE_NAME = "Unknown";

/**
 * Maps collectible types to the real English names from the "stringtable.sta" file.
 *
 * For a mapping of name to `CollectibleType`, see `COLLECTIBLE_NAME_TO_TYPE_MAP`.
 */
export const COLLECTIBLE_NAMES = {
  [CollectibleType.NULL]: DEFAULT_COLLECTIBLE_NAME, // 0
  [CollectibleType.SAD_ONION]: "The Sad Onion", // 1
  [CollectibleType.INNER_EYE]: "The Inner Eye", // 2
  [CollectibleType.SPOON_BENDER]: "Spoon Bender", // 3
  [CollectibleType.CRICKETS_HEAD]: "Cricket's Head", // 4
  [CollectibleType.MY_REFLECTION]: "My Reflection", // 5
  [CollectibleType.NUMBER_ONE]: "Number One", // 6
  [CollectibleType.BLOOD_OF_THE_MARTYR]: "Blood of the Martyr", // 7
  [CollectibleType.BROTHER_BOBBY]: "Brother Bobby", // 8
  [CollectibleType.SKATOLE]: "Skatole", // 9
  [CollectibleType.HALO_OF_FLIES]: "Halo of Flies", // 10
  [CollectibleType.ONE_UP]: "1up!", // 11
  [CollectibleType.MAGIC_MUSHROOM]: "Magic Mushroom", // 12
  [CollectibleType.VIRUS]: "The Virus", // 13
  [CollectibleType.ROID_RAGE]: "Roid Rage", // 14
  [CollectibleType.HEART]: "<3", // 15
  [CollectibleType.RAW_LIVER]: "Raw Liver", // 16
  [CollectibleType.SKELETON_KEY]: "Skeleton Key", // 17
  [CollectibleType.DOLLAR]: "A Dollar", // 18
  [CollectibleType.BOOM]: "Boom!", // 19
  [CollectibleType.TRANSCENDENCE]: "Transcendence", // 20
  [CollectibleType.COMPASS]: "The Compass", // 21
  [CollectibleType.LUNCH]: "Lunch", // 22
  [CollectibleType.DINNER]: "Dinner", // 23
  [CollectibleType.DESSERT]: "Dessert", // 24
  [CollectibleType.BREAKFAST]: "Breakfast", // 25
  [CollectibleType.ROTTEN_MEAT]: "Rotten Meat", // 26
  [CollectibleType.WOODEN_SPOON]: "Wooden Spoon", // 27
  [CollectibleType.BELT]: "The Belt", // 28
  [CollectibleType.MOMS_UNDERWEAR]: "Mom's Underwear", // 29
  [CollectibleType.MOMS_HEELS]: "Mom's Heels", // 30
  [CollectibleType.MOMS_LIPSTICK]: "Mom's Lipstick", // 31
  [CollectibleType.WIRE_COAT_HANGER]: "Wire Coat Hanger", // 32
  [CollectibleType.BIBLE]: "The Bible", // 33
  [CollectibleType.BOOK_OF_BELIAL]: "The Book of Belial", // 34
  [CollectibleType.NECRONOMICON]: "The Necronomicon", // 35
  [CollectibleType.POOP]: "The Poop", // 36
  [CollectibleType.MR_BOOM]: "Mr. Boom", // 37
  [CollectibleType.TAMMYS_HEAD]: "Tammy's Head", // 38
  [CollectibleType.MOMS_BRA]: "Mom's Bra", // 39
  [CollectibleType.KAMIKAZE]: "Kamikaze!", // 40
  [CollectibleType.MOMS_PAD]: "Mom's Pad", // 41
  [CollectibleType.BOBS_ROTTEN_HEAD]: "Bob's Rotten Head", // 42
  // There is no `CollectibleType` with a value of 43.
  [CollectibleType.TELEPORT]: "Teleport!", // 44
  [CollectibleType.YUM_HEART]: "Yum Heart", // 45
  [CollectibleType.LUCKY_FOOT]: "Lucky Foot", // 46
  [CollectibleType.DOCTORS_REMOTE]: "Doctor's Remote", // 47
  [CollectibleType.CUPIDS_ARROW]: "Cupid's Arrow", // 48
  [CollectibleType.SHOOP_DA_WHOOP]: "Shoop da Whoop!", // 49
  [CollectibleType.STEVEN]: "Steven", // 50
  [CollectibleType.PENTAGRAM]: "Pentagram", // 51
  [CollectibleType.DR_FETUS]: "Dr. Fetus", // 52
  [CollectibleType.MAGNETO]: "Magneto", // 53
  [CollectibleType.TREASURE_MAP]: "Treasure Map", // 54
  [CollectibleType.MOMS_EYE]: "Mom's Eye", // 55
  [CollectibleType.LEMON_MISHAP]: "Lemon Mishap", // 56
  [CollectibleType.DISTANT_ADMIRATION]: "Distant Admiration", // 57
  [CollectibleType.BOOK_OF_SHADOWS]: "Book of Shadows", // 58
  [CollectibleType.BOOK_OF_BELIAL_BIRTHRIGHT]: "The Book of Belial", // 59
  [CollectibleType.LADDER]: "The Ladder", // 60
  // There is no `CollectibleType` with a value of 61.
  [CollectibleType.CHARM_OF_THE_VAMPIRE]: "Charm of the Vampire", // 62
  [CollectibleType.BATTERY]: "The Battery", // 63
  [CollectibleType.STEAM_SALE]: "Steam Sale", // 64
  [CollectibleType.ANARCHIST_COOKBOOK]: "Anarchist Cookbook", // 65
  [CollectibleType.HOURGLASS]: "The Hourglass", // 66
  [CollectibleType.SISTER_MAGGY]: "Sister Maggy", // 67
  [CollectibleType.TECHNOLOGY]: "Technology", // 68
  [CollectibleType.CHOCOLATE_MILK]: "Chocolate Milk", // 69
  [CollectibleType.GROWTH_HORMONES]: "Growth Hormones", // 70
  [CollectibleType.MINI_MUSH]: "Mini Mush", // 71
  [CollectibleType.ROSARY]: "Rosary", // 72
  [CollectibleType.CUBE_OF_MEAT]: "Cube of Meat", // 73
  [CollectibleType.QUARTER]: "A Quarter", // 74
  [CollectibleType.PHD]: "PHD", // 75
  [CollectibleType.XRAY_VISION]: "X-Ray Vision", // 76
  [CollectibleType.MY_LITTLE_UNICORN]: "My Little Unicorn", // 77
  [CollectibleType.BOOK_OF_REVELATIONS]: "Book of Revelations", // 78
  [CollectibleType.MARK]: "The Mark", // 79
  [CollectibleType.PACT]: "The Pact", // 80
  [CollectibleType.DEAD_CAT]: "Dead Cat", // 81
  [CollectibleType.LORD_OF_THE_PIT]: "Lord of the Pit", // 82
  [CollectibleType.NAIL]: "The Nail", // 83
  [CollectibleType.WE_NEED_TO_GO_DEEPER]: "We Need To Go Deeper!", // 84
  [CollectibleType.DECK_OF_CARDS]: "Deck of Cards", // 85
  [CollectibleType.MONSTROS_TOOTH]: "Monstro's Tooth", // 86
  [CollectibleType.LOKIS_HORNS]: "Loki's Horns", // 87
  [CollectibleType.LITTLE_CHUBBY]: "Little Chubby", // 88
  [CollectibleType.SPIDER_BITE]: "Spider Bite", // 89
  [CollectibleType.SMALL_ROCK]: "The Small Rock", // 90
  [CollectibleType.SPELUNKER_HAT]: "Spelunker Hat", // 91
  [CollectibleType.SUPER_BANDAGE]: "Super Bandage", // 92
  [CollectibleType.GAMEKID]: "The Gamekid", // 93
  [CollectibleType.SACK_OF_PENNIES]: "Sack of Pennies", // 94
  [CollectibleType.ROBO_BABY]: "Robo-Baby", // 95
  [CollectibleType.LITTLE_CHAD]: "Little C.H.A.D.", // 96
  [CollectibleType.BOOK_OF_SIN]: "The Book of Sin", // 97
  [CollectibleType.RELIC]: "The Relic", // 98
  [CollectibleType.LITTLE_GISH]: "Little Gish", // 99
  [CollectibleType.LITTLE_STEVEN]: "Little Steven", // 100
  [CollectibleType.HALO]: "The Halo", // 101
  [CollectibleType.MOMS_BOTTLE_OF_PILLS]: "Mom's Bottle of Pills", // 102
  [CollectibleType.COMMON_COLD]: "The Common Cold", // 103
  [CollectibleType.PARASITE]: "The Parasite", // 104
  [CollectibleType.D6]: "The D6", // 105
  [CollectibleType.MR_MEGA]: "Mr. Mega", // 106
  [CollectibleType.PINKING_SHEARS]: "The Pinking Shears", // 107
  [CollectibleType.WAFER]: "The Wafer", // 108
  [CollectibleType.MONEY_EQUALS_POWER]: "Money = Power", // 109
  [CollectibleType.MOMS_CONTACTS]: "Mom's Contacts", // 110
  [CollectibleType.BEAN]: "The Bean", // 111
  [CollectibleType.GUARDIAN_ANGEL]: "Guardian Angel", // 112
  [CollectibleType.DEMON_BABY]: "Demon Baby", // 113
  [CollectibleType.MOMS_KNIFE]: "Mom's Knife", // 114
  [CollectibleType.OUIJA_BOARD]: "Ouija Board", // 115
  [CollectibleType.NINE_VOLT]: "9 Volt", // 116
  [CollectibleType.DEAD_BIRD]: "Dead Bird", // 117
  [CollectibleType.BRIMSTONE]: "Brimstone", // 118
  [CollectibleType.BLOOD_BAG]: "Blood Bag", // 119
  [CollectibleType.ODD_MUSHROOM_THIN]: "Odd Mushroom", // 120
  [CollectibleType.ODD_MUSHROOM_LARGE]: "Odd Mushroom", // 121
  [CollectibleType.WHORE_OF_BABYLON]: "Whore of Babylon", // 122
  [CollectibleType.MONSTER_MANUAL]: "Monster Manual", // 123
  [CollectibleType.DEAD_SEA_SCROLLS]: "Dead Sea Scrolls", // 124
  [CollectibleType.BOBBY_BOMB]: "Bobby-Bomb", // 125
  [CollectibleType.RAZOR_BLADE]: "Razor Blade", // 126
  [CollectibleType.FORGET_ME_NOW]: "Forget Me Now", // 127
  [CollectibleType.FOREVER_ALONE]: "Forever Alone", // 128
  [CollectibleType.BUCKET_OF_LARD]: "Bucket of Lard", // 129
  [CollectibleType.PONY]: "A Pony", // 130
  [CollectibleType.BOMB_BAG]: "Bomb Bag", // 131
  [CollectibleType.LUMP_OF_COAL]: "A Lump of Coal", // 132
  [CollectibleType.GUPPYS_PAW]: "Guppy's Paw", // 133
  [CollectibleType.GUPPYS_TAIL]: "Guppy's Tail", // 134
  [CollectibleType.IV_BAG]: "IV Bag", // 135
  [CollectibleType.BEST_FRIEND]: "Best Friend", // 136
  [CollectibleType.REMOTE_DETONATOR]: "Remote Detonator", // 137
  [CollectibleType.STIGMATA]: "Stigmata", // 138
  [CollectibleType.MOMS_PURSE]: "Mom's Purse", // 139
  [CollectibleType.BOBS_CURSE]: "Bob's Curse", // 140
  [CollectibleType.PAGEANT_BOY]: "Pageant Boy", // 141
  [CollectibleType.SCAPULAR]: "Scapular", // 142
  [CollectibleType.SPEED_BALL]: "Speed Ball", // 143
  [CollectibleType.BUM_FRIEND]: "Bum Friend", // 144
  [CollectibleType.GUPPYS_HEAD]: "Guppy's Head", // 145
  [CollectibleType.PRAYER_CARD]: "Prayer Card", // 146
  [CollectibleType.NOTCHED_AXE]: "Notched Axe", // 147
  [CollectibleType.INFESTATION]: "Infestation", // 148
  [CollectibleType.IPECAC]: "Ipecac", // 149
  [CollectibleType.TOUGH_LOVE]: "Tough Love", // 150
  [CollectibleType.MULLIGAN]: "The Mulligan", // 151
  [CollectibleType.TECHNOLOGY_2]: "Technology 2", // 152
  [CollectibleType.MUTANT_SPIDER]: "Mutant Spider", // 153
  [CollectibleType.CHEMICAL_PEEL]: "Chemical Peel", // 154
  [CollectibleType.PEEPER]: "The Peeper", // 155
  [CollectibleType.HABIT]: "Habit", // 156
  [CollectibleType.BLOODY_LUST]: "Bloody Lust", // 157
  [CollectibleType.CRYSTAL_BALL]: "Crystal Ball", // 158
  [CollectibleType.SPIRIT_OF_THE_NIGHT]: "Spirit of the Night", // 159
  [CollectibleType.CRACK_THE_SKY]: "Crack the Sky", // 160
  [CollectibleType.ANKH]: "Ankh", // 161
  [CollectibleType.CELTIC_CROSS]: "Celtic Cross", // 162
  [CollectibleType.GHOST_BABY]: "Ghost Baby", // 163
  [CollectibleType.CANDLE]: "The Candle", // 164
  [CollectibleType.CAT_O_NINE_TAILS]: "Cat-o-nine-tails", // 165
  [CollectibleType.D20]: "D20", // 166
  [CollectibleType.HARLEQUIN_BABY]: "Harlequin Baby", // 167
  [CollectibleType.EPIC_FETUS]: "Epic Fetus", // 168
  [CollectibleType.POLYPHEMUS]: "Polyphemus", // 169
  [CollectibleType.DADDY_LONGLEGS]: "Daddy Longlegs", // 170
  [CollectibleType.SPIDER_BUTT]: "Spider Butt", // 171
  [CollectibleType.SACRIFICIAL_DAGGER]: "Sacrificial Dagger", // 172
  [CollectibleType.MITRE]: "Mitre", // 173
  [CollectibleType.RAINBOW_BABY]: "Rainbow Baby", // 174
  [CollectibleType.DADS_KEY]: "Dad's Key", // 175
  [CollectibleType.STEM_CELLS]: "Stem Cells", // 176
  [CollectibleType.PORTABLE_SLOT]: "Portable Slot", // 177
  [CollectibleType.HOLY_WATER]: "Holy Water", // 178
  [CollectibleType.FATE]: "Fate", // 179
  [CollectibleType.BLACK_BEAN]: "The Black Bean", // 180
  [CollectibleType.WHITE_PONY]: "White Pony", // 181
  [CollectibleType.SACRED_HEART]: "Sacred Heart", // 182
  [CollectibleType.TOOTH_PICKS]: "Tooth Picks", // 183
  [CollectibleType.HOLY_GRAIL]: "Holy Grail", // 184
  [CollectibleType.DEAD_DOVE]: "Dead Dove", // 185
  [CollectibleType.BLOOD_RIGHTS]: "Blood Rights", // 186
  [CollectibleType.GUPPYS_HAIRBALL]: "Guppy's Hairball", // 187
  [CollectibleType.ABEL]: "Abel", // 188
  [CollectibleType.SMB_SUPER_FAN]: "SMB Super Fan", // 189
  [CollectibleType.PYRO]: "Pyro", // 190
  [CollectibleType.THREE_DOLLAR_BILL]: "3 Dollar Bill", // 191
  [CollectibleType.TELEPATHY_BOOK]: "Telepathy For Dummies", // 192
  [CollectibleType.MEAT]: "MEAT!", // 193
  [CollectibleType.MAGIC_8_BALL]: "Magic 8 Ball", // 194
  [CollectibleType.MOMS_COIN_PURSE]: "Mom's Coin Purse", // 195
  [CollectibleType.SQUEEZY]: "Squeezy", // 196
  [CollectibleType.JESUS_JUICE]: "Jesus Juice", // 197
  [CollectibleType.BOX]: "Box", // 198
  [CollectibleType.MOMS_KEY]: "Mom's Key", // 199
  [CollectibleType.MOMS_EYESHADOW]: "Mom's Eyeshadow", // 200
  [CollectibleType.IRON_BAR]: "Iron Bar", // 201
  [CollectibleType.MIDAS_TOUCH]: "Midas' Touch", // 202
  [CollectibleType.HUMBLEING_BUNDLE]: "Humbleing Bundle", // 203
  [CollectibleType.FANNY_PACK]: "Fanny Pack", // 204
  [CollectibleType.SHARP_PLUG]: "Sharp Plug", // 205
  [CollectibleType.GUILLOTINE]: "Guillotine", // 206
  [CollectibleType.BALL_OF_BANDAGES]: "Ball of Bandages", // 207
  [CollectibleType.CHAMPION_BELT]: "Champion Belt", // 208
  [CollectibleType.BUTT_BOMBS]: "Butt Bombs", // 209
  [CollectibleType.GNAWED_LEAF]: "Gnawed Leaf", // 210
  [CollectibleType.SPIDERBABY]: "Spiderbaby", // 211
  [CollectibleType.GUPPYS_COLLAR]: "Guppy's Collar", // 212
  [CollectibleType.LOST_CONTACT]: "Lost Contact", // 213
  [CollectibleType.ANEMIC]: "Anemic", // 214
  [CollectibleType.GOAT_HEAD]: "Goat Head", // 215
  [CollectibleType.CEREMONIAL_ROBES]: "Ceremonial Robes", // 216
  [CollectibleType.MOMS_WIG]: "Mom's Wig", // 217
  [CollectibleType.PLACENTA]: "Placenta", // 218
  [CollectibleType.OLD_BANDAGE]: "Old Bandage", // 219
  [CollectibleType.SAD_BOMBS]: "Sad Bombs", // 220
  [CollectibleType.RUBBER_CEMENT]: "Rubber Cement", // 221
  [CollectibleType.ANTI_GRAVITY]: "Anti-Gravity", // 222
  [CollectibleType.PYROMANIAC]: "Pyromaniac", // 223
  [CollectibleType.CRICKETS_BODY]: "Cricket's Body", // 224
  [CollectibleType.GIMPY]: "Gimpy", // 225
  [CollectibleType.BLACK_LOTUS]: "Black Lotus", // 226
  [CollectibleType.PIGGY_BANK]: "Piggy Bank", // 227
  [CollectibleType.MOMS_PERFUME]: "Mom's Perfume", // 228
  [CollectibleType.MONSTROS_LUNG]: "Monstro's Lung", // 229
  [CollectibleType.ABADDON]: "Abaddon", // 230
  [CollectibleType.BALL_OF_TAR]: "Ball of Tar", // 231
  [CollectibleType.STOP_WATCH]: "Stop Watch", // 232
  [CollectibleType.TINY_PLANET]: "Tiny Planet", // 233
  [CollectibleType.INFESTATION_2]: "Infestation 2", // 234
  // There is no `CollectibleType` with a value of 235.
  [CollectibleType.E_COLI]: "E. Coli", // 236
  [CollectibleType.DEATHS_TOUCH]: "Death's Touch", // 237
  [CollectibleType.KEY_PIECE_1]: "Key Piece 1", // 238
  [CollectibleType.KEY_PIECE_2]: "Key Piece 2", // 239
  [CollectibleType.EXPERIMENTAL_TREATMENT]: "Experimental Treatment", // 240
  [CollectibleType.CONTRACT_FROM_BELOW]: "Contract from Below", // 241
  [CollectibleType.INFAMY]: "Infamy", // 242
  [CollectibleType.TRINITY_SHIELD]: "Trinity Shield", // 243
  [CollectibleType.TECH_5]: "Tech.5", // 244
  [CollectibleType.TWENTY_TWENTY]: "20/20", // 245
  [CollectibleType.BLUE_MAP]: "Blue Map", // 246
  [CollectibleType.BFFS]: "BFFS!", // 247
  [CollectibleType.HIVE_MIND]: "Hive Mind", // 248
  [CollectibleType.THERES_OPTIONS]: "There's Options", // 249
  [CollectibleType.BOGO_BOMBS]: "BOGO Bombs", // 250
  [CollectibleType.STARTER_DECK]: "Starter Deck", // 251
  [CollectibleType.LITTLE_BAGGY]: "Little Baggy", // 252
  [CollectibleType.MAGIC_SCAB]: "Magic Scab", // 253
  [CollectibleType.BLOOD_CLOT]: "Blood Clot", // 254
  [CollectibleType.SCREW]: "Screw", // 255
  [CollectibleType.HOT_BOMBS]: "Hot Bombs", // 256
  [CollectibleType.FIRE_MIND]: "Fire Mind", // 257
  [CollectibleType.MISSING_NO]: "Missing No.", // 258
  [CollectibleType.DARK_MATTER]: "Dark Matter", // 259
  [CollectibleType.BLACK_CANDLE]: "Black Candle", // 260
  [CollectibleType.PROPTOSIS]: "Proptosis", // 261
  [CollectibleType.MISSING_PAGE_2]: "Missing Page 2", // 262
  [CollectibleType.CLEAR_RUNE]: "Clear Rune", // 263
  [CollectibleType.SMART_FLY]: "Smart Fly", // 264
  [CollectibleType.DRY_BABY]: "Dry Baby", // 265
  [CollectibleType.JUICY_SACK]: "Juicy Sack", // 266
  [CollectibleType.ROBO_BABY_2]: "Robo-Baby 2.0", // 267
  [CollectibleType.ROTTEN_BABY]: "Rotten Baby", // 268
  [CollectibleType.HEADLESS_BABY]: "Headless Baby", // 269
  [CollectibleType.LEECH]: "Leech", // 270
  [CollectibleType.MYSTERY_SACK]: "Mystery Sack", // 271
  [CollectibleType.BBF]: "BBF", // 272
  [CollectibleType.BOBS_BRAIN]: "Bob's Brain", // 273
  [CollectibleType.BEST_BUD]: "Best Bud", // 274
  [CollectibleType.LIL_BRIMSTONE]: "Lil Brimstone", // 275
  [CollectibleType.ISAACS_HEART]: "Isaac's Heart", // 276
  [CollectibleType.LIL_HAUNT]: "Lil Haunt", // 277
  [CollectibleType.DARK_BUM]: "Dark Bum", // 278
  [CollectibleType.BIG_FAN]: "Big Fan", // 279
  [CollectibleType.SISSY_LONGLEGS]: "Sissy Longlegs", // 280
  [CollectibleType.PUNCHING_BAG]: "Punching Bag", // 281
  [CollectibleType.HOW_TO_JUMP]: "How to Jump", // 282
  [CollectibleType.D100]: "D100", // 283
  [CollectibleType.D4]: "D4", // 284
  [CollectibleType.D10]: "D10", // 285
  [CollectibleType.BLANK_CARD]: "Blank Card", // 286
  [CollectibleType.BOOK_OF_SECRETS]: "Book of Secrets", // 287
  [CollectibleType.BOX_OF_SPIDERS]: "Box of Spiders", // 288
  [CollectibleType.RED_CANDLE]: "Red Candle", // 289
  [CollectibleType.JAR]: "The Jar", // 290
  [CollectibleType.FLUSH]: "Flush!", // 291
  [CollectibleType.SATANIC_BIBLE]: "Satanic Bible", // 292
  [CollectibleType.HEAD_OF_KRAMPUS]: "Head of Krampus", // 293
  [CollectibleType.BUTTER_BEAN]: "Butter Bean", // 294
  [CollectibleType.MAGIC_FINGERS]: "Magic Fingers", // 295
  [CollectibleType.CONVERTER]: "Converter", // 296
  [CollectibleType.BLUE_BOX]: "Pandora's Box", // 297
  [CollectibleType.UNICORN_STUMP]: "Unicorn Stump", // 298
  [CollectibleType.TAURUS]: "Taurus", // 299
  [CollectibleType.ARIES]: "Aries", // 300
  [CollectibleType.CANCER]: "Cancer", // 301
  [CollectibleType.LEO]: "Leo", // 302
  [CollectibleType.VIRGO]: "Virgo", // 303
  [CollectibleType.LIBRA]: "Libra", // 304
  [CollectibleType.SCORPIO]: "Scorpio", // 305
  [CollectibleType.SAGITTARIUS]: "Sagittarius", // 306
  [CollectibleType.CAPRICORN]: "Capricorn", // 307
  [CollectibleType.AQUARIUS]: "Aquarius", // 308
  [CollectibleType.PISCES]: "Pisces", // 309
  [CollectibleType.EVES_MASCARA]: "Eve's Mascara", // 310
  [CollectibleType.JUDAS_SHADOW]: "Judas' Shadow", // 311
  [CollectibleType.MAGGYS_BOW]: "Maggy's Bow", // 312
  [CollectibleType.HOLY_MANTLE]: "Holy Mantle", // 313
  [CollectibleType.THUNDER_THIGHS]: "Thunder Thighs", // 314
  [CollectibleType.STRANGE_ATTRACTOR]: "Strange Attractor", // 315
  [CollectibleType.CURSED_EYE]: "Cursed Eye", // 316
  [CollectibleType.MYSTERIOUS_LIQUID]: "Mysterious Liquid", // 317
  [CollectibleType.GEMINI]: "Gemini", // 318
  [CollectibleType.CAINS_OTHER_EYE]: "Cain's Other Eye", // 319
  [CollectibleType.BLUE_BABYS_ONLY_FRIEND]: "???'s Only Friend", // 320
  [CollectibleType.SAMSONS_CHAINS]: "Samson's Chains", // 321
  [CollectibleType.MONGO_BABY]: "Mongo Baby", // 322
  [CollectibleType.ISAACS_TEARS]: "Isaac's Tears", // 323
  [CollectibleType.UNDEFINED]: "Undefined", // 324
  [CollectibleType.SCISSORS]: "Scissors", // 325
  [CollectibleType.BREATH_OF_LIFE]: "Breath of Life", // 326
  [CollectibleType.POLAROID]: "The Polaroid", // 327
  [CollectibleType.NEGATIVE]: "The Negative", // 328
  [CollectibleType.LUDOVICO_TECHNIQUE]: "The Ludovico Technique", // 329
  [CollectibleType.SOY_MILK]: "Soy Milk", // 330
  [CollectibleType.GODHEAD]: "Godhead", // 331
  [CollectibleType.LAZARUS_RAGS]: "Lazarus' Rags", // 332
  [CollectibleType.MIND]: "The Mind", // 333
  [CollectibleType.BODY]: "The Body", // 334
  [CollectibleType.SOUL]: "The Soul", // 335
  [CollectibleType.DEAD_ONION]: "Dead Onion", // 336
  [CollectibleType.BROKEN_WATCH]: "Broken Watch", // 337
  [CollectibleType.BOOMERANG]: "The Boomerang", // 338
  [CollectibleType.SAFETY_PIN]: "Safety Pin", // 339
  [CollectibleType.CAFFEINE_PILL]: "Caffeine Pill", // 340
  [CollectibleType.TORN_PHOTO]: "Torn Photo", // 341
  [CollectibleType.BLUE_CAP]: "Blue Cap", // 342
  [CollectibleType.LATCH_KEY]: "Latch Key", // 343
  [CollectibleType.MATCH_BOOK]: "Match Book", // 344
  [CollectibleType.SYNTHOIL]: "Synthoil", // 345
  [CollectibleType.SNACK]: "A Snack", // 346
  [CollectibleType.DIPLOPIA]: "Diplopia", // 347
  [CollectibleType.PLACEBO]: "Placebo", // 348
  [CollectibleType.WOODEN_NICKEL]: "Wooden Nickel", // 349
  [CollectibleType.TOXIC_SHOCK]: "Toxic Shock", // 350
  [CollectibleType.MEGA_BEAN]: "Mega Bean", // 351
  [CollectibleType.GLASS_CANNON]: "Glass Cannon", // 352
  [CollectibleType.BOMBER_BOY]: "Bomber Boy", // 353
  [CollectibleType.CRACK_JACKS]: "Crack Jacks", // 354
  [CollectibleType.MOMS_PEARLS]: "Mom's Pearls", // 355
  [CollectibleType.CAR_BATTERY]: "Car Battery", // 356
  [CollectibleType.BOX_OF_FRIENDS]: "Box of Friends", // 357
  [CollectibleType.WIZ]: "The Wiz", // 358
  [CollectibleType.EIGHT_INCH_NAILS]: "8 Inch Nails", // 359
  [CollectibleType.INCUBUS]: "Incubus", // 360
  [CollectibleType.FATES_REWARD]: "Fate's Reward", // 361
  [CollectibleType.LIL_CHEST]: "Lil Chest", // 362
  [CollectibleType.SWORN_PROTECTOR]: "Sworn Protector", // 363
  [CollectibleType.FRIEND_ZONE]: "Friend Zone", // 364
  [CollectibleType.LOST_FLY]: "Lost Fly", // 365
  [CollectibleType.SCATTER_BOMBS]: "Scatter Bombs", // 366
  [CollectibleType.STICKY_BOMBS]: "Sticky Bombs", // 367
  [CollectibleType.EPIPHORA]: "Epiphora", // 368
  [CollectibleType.CONTINUUM]: "Continuum", // 369
  [CollectibleType.MR_DOLLY]: "Mr. Dolly", // 370
  [CollectibleType.CURSE_OF_THE_TOWER]: "Curse of the Tower", // 371
  [CollectibleType.CHARGED_BABY]: "Charged Baby", // 372
  [CollectibleType.DEAD_EYE]: "Dead Eye", // 373
  [CollectibleType.HOLY_LIGHT]: "Holy Light", // 374
  [CollectibleType.HOST_HAT]: "Host Hat", // 375
  [CollectibleType.RESTOCK]: "Restock", // 376
  [CollectibleType.BURSTING_SACK]: "Bursting Sack", // 377
  [CollectibleType.NUMBER_TWO]: "Number Two", // 378
  [CollectibleType.PUPULA_DUPLEX]: "Pupula Duplex", // 379
  [CollectibleType.PAY_TO_PLAY]: "Pay To Play", // 380
  [CollectibleType.EDENS_BLESSING]: "Eden's Blessing", // 381
  [CollectibleType.FRIEND_BALL]: "Friendly Ball", // 382
  [CollectibleType.TEAR_DETONATOR]: "Tear Detonator", // 383
  [CollectibleType.LIL_GURDY]: "Lil Gurdy", // 384
  [CollectibleType.BUMBO]: "Bumbo", // 385
  [CollectibleType.D12]: "D12", // 386
  [CollectibleType.CENSER]: "Censer", // 387
  [CollectibleType.KEY_BUM]: "Key Bum", // 388
  [CollectibleType.RUNE_BAG]: "Rune Bag", // 389
  [CollectibleType.SERAPHIM]: "Seraphim", // 390
  [CollectibleType.BETRAYAL]: "Betrayal", // 391
  [CollectibleType.ZODIAC]: "Zodiac", // 392
  [CollectibleType.SERPENTS_KISS]: "Serpent's Kiss", // 393
  [CollectibleType.MARKED]: "Marked", // 394
  [CollectibleType.TECH_X]: "Tech X", // 395
  [CollectibleType.VENTRICLE_RAZOR]: "Ventricle Razor", // 396
  [CollectibleType.TRACTOR_BEAM]: "Tractor Beam", // 397
  [CollectibleType.GODS_FLESH]: "God's Flesh", // 398
  [CollectibleType.MAW_OF_THE_VOID]: "Maw of the Void", // 399
  [CollectibleType.SPEAR_OF_DESTINY]: "Spear of Destiny", // 400
  [CollectibleType.EXPLOSIVO]: "Explosivo", // 401
  [CollectibleType.CHAOS]: "Chaos", // 402
  [CollectibleType.SPIDER_MOD]: "Spider Mod", // 403
  [CollectibleType.FARTING_BABY]: "Farting Baby", // 404
  [CollectibleType.GB_BUG]: "GB Bug", // 405
  [CollectibleType.D8]: "D8", // 406
  [CollectibleType.PURITY]: "Purity", // 407
  [CollectibleType.ATHAME]: "Athame", // 408
  [CollectibleType.EMPTY_VESSEL]: "Empty Vessel", // 409
  [CollectibleType.EVIL_EYE]: "Evil Eye", // 410
  [CollectibleType.LUSTY_BLOOD]: "Lusty Blood", // 411
  [CollectibleType.CAMBION_CONCEPTION]: "Cambion Conception", // 412
  [CollectibleType.IMMACULATE_CONCEPTION]: "Immaculate Conception", // 413
  [CollectibleType.MORE_OPTIONS]: "More Options", // 414
  [CollectibleType.CROWN_OF_LIGHT]: "Crown of Light", // 415
  [CollectibleType.DEEP_POCKETS]: "Deep Pockets", // 416
  [CollectibleType.SUCCUBUS]: "Succubus", // 417
  [CollectibleType.FRUIT_CAKE]: "Fruit Cake", // 418
  [CollectibleType.TELEPORT_2]: "Teleport 2.0", // 419
  [CollectibleType.BLACK_POWDER]: "Black Powder", // 420
  [CollectibleType.KIDNEY_BEAN]: "Kidney Bean", // 421
  [CollectibleType.GLOWING_HOUR_GLASS]: "Glowing Hourglass", // 422
  [CollectibleType.CIRCLE_OF_PROTECTION]: "Circle of Protection", // 423
  [CollectibleType.SACK_HEAD]: "Sack Head", // 424
  [CollectibleType.NIGHT_LIGHT]: "Night Light", // 425
  [CollectibleType.OBSESSED_FAN]: "Obsessed Fan", // 426
  [CollectibleType.MINE_CRAFTER]: "Mine Crafter", // 427
  [CollectibleType.PJS]: "PJs", // 428
  [CollectibleType.HEAD_OF_THE_KEEPER]: "Head of the Keeper", // 429
  [CollectibleType.PAPA_FLY]: "Papa Fly", // 430
  [CollectibleType.MULTIDIMENSIONAL_BABY]: "Multidimensional Baby", // 431
  [CollectibleType.GLITTER_BOMBS]: "Glitter Bombs", // 432
  [CollectibleType.MY_SHADOW]: "My Shadow", // 433
  [CollectibleType.JAR_OF_FLIES]: "Jar of Flies", // 434
  [CollectibleType.LIL_LOKI]: "Lil Loki", // 435
  [CollectibleType.MILK]: "Milk!", // 436
  [CollectibleType.D7]: "D7", // 437
  [CollectibleType.BINKY]: "Binky", // 438
  [CollectibleType.MOMS_BOX]: "Mom's Box", // 439
  [CollectibleType.KIDNEY_STONE]: "Kidney Stone", // 440
  [CollectibleType.MEGA_BLAST]: "Mega Blast", // 441
  [CollectibleType.DARK_PRINCES_CROWN]: "Dark Prince's Crown", // 442
  [CollectibleType.APPLE]: "Apple!", // 443
  [CollectibleType.LEAD_PENCIL]: "Lead Pencil", // 444
  [CollectibleType.DOG_TOOTH]: "Dog Tooth", // 445
  [CollectibleType.DEAD_TOOTH]: "Dead Tooth", // 446
  [CollectibleType.LINGER_BEAN]: "Linger Bean", // 447
  [CollectibleType.SHARD_OF_GLASS]: "Shard of Glass", // 448
  [CollectibleType.METAL_PLATE]: "Metal Plate", // 449
  [CollectibleType.EYE_OF_GREED]: "Eye of Greed", // 450
  [CollectibleType.TAROT_CLOTH]: "Tarot Cloth", // 451
  [CollectibleType.VARICOSE_VEINS]: "Varicose Veins", // 452
  [CollectibleType.COMPOUND_FRACTURE]: "Compound Fracture", // 453
  [CollectibleType.POLYDACTYLY]: "Polydactyly", // 454
  [CollectibleType.DADS_LOST_COIN]: "Dad's Lost Coin", // 455
  [CollectibleType.MIDNIGHT_SNACK]: "Midnight Snack", // 456
  [CollectibleType.CONE_HEAD]: "Cone Head", // 457
  [CollectibleType.BELLY_BUTTON]: "Belly Button", // 458
  [CollectibleType.SINUS_INFECTION]: "Sinus Infection", // 459
  [CollectibleType.GLAUCOMA]: "Glaucoma", // 460
  [CollectibleType.PARASITOID]: "Parasitoid", // 461
  [CollectibleType.EYE_OF_BELIAL]: "Eye of Belial", // 462
  [CollectibleType.SULFURIC_ACID]: "Sulfuric Acid", // 463
  [CollectibleType.GLYPH_OF_BALANCE]: "Glyph of Balance", // 464
  [CollectibleType.ANALOG_STICK]: "Analog Stick", // 465
  [CollectibleType.CONTAGION]: "Contagion", // 466
  [CollectibleType.FINGER]: "Finger!", // 467
  [CollectibleType.SHADE]: "Shade", // 468
  [CollectibleType.DEPRESSION]: "Depression", // 469
  [CollectibleType.HUSHY]: "Hushy", // 470
  [CollectibleType.LIL_MONSTRO]: "Lil Monstro", // 471
  [CollectibleType.KING_BABY]: "King Baby", // 472
  [CollectibleType.BIG_CHUBBY]: "Big Chubby", // 473
  [CollectibleType.BROKEN_GLASS_CANNON]: "Broken Glass Cannon", // 474
  [CollectibleType.PLAN_C]: "Plan C", // 475
  [CollectibleType.D1]: "D1", // 476
  [CollectibleType.VOID]: "Void", // 477
  [CollectibleType.PAUSE]: "Pause", // 478
  [CollectibleType.SMELTER]: "Smelter", // 479
  [CollectibleType.COMPOST]: "Compost", // 480
  [CollectibleType.DATAMINER]: "Dataminer", // 481
  [CollectibleType.CLICKER]: "Clicker", // 482
  [CollectibleType.MAMA_MEGA]: "Mama Mega!", // 483
  [CollectibleType.WAIT_WHAT]: "Wait What?", // 484
  [CollectibleType.CROOKED_PENNY]: "Crooked Penny", // 485
  [CollectibleType.DULL_RAZOR]: "Dull Razor", // 486
  [CollectibleType.POTATO_PEELER]: "Potato Peeler", // 487
  [CollectibleType.METRONOME]: "Metronome", // 488
  [CollectibleType.D_INFINITY]: "D infinity", // 489
  [CollectibleType.EDENS_SOUL]: "Eden's Soul", // 490
  [CollectibleType.ACID_BABY]: "Acid Baby", // 491
  [CollectibleType.YO_LISTEN]: "YO LISTEN!", // 492
  [CollectibleType.ADRENALINE]: "Adrenaline", // 493
  [CollectibleType.JACOBS_LADDER]: "Jacob's Ladder", // 494
  [CollectibleType.GHOST_PEPPER]: "Ghost Pepper", // 495
  [CollectibleType.EUTHANASIA]: "Euthanasia", // 496
  [CollectibleType.CAMO_UNDIES]: "Camo Undies", // 497
  [CollectibleType.DUALITY]: "Duality", // 498
  [CollectibleType.EUCHARIST]: "Eucharist", // 499
  [CollectibleType.SACK_OF_SACKS]: "Sack of Sacks", // 500
  [CollectibleType.GREEDS_GULLET]: "Greed's Gullet", // 501
  [CollectibleType.LARGE_ZIT]: "Large Zit", // 502
  [CollectibleType.LITTLE_HORN]: "Little Horn", // 503
  [CollectibleType.BROWN_NUGGET]: "Brown Nugget", // 504
  [CollectibleType.POKE_GO]: "Poke Go", // 505
  [CollectibleType.BACKSTABBER]: "Backstabber", // 506
  [CollectibleType.SHARP_STRAW]: "Sharp Straw", // 507
  [CollectibleType.MOMS_RAZOR]: "Mom's Razor", // 508
  [CollectibleType.BLOODSHOT_EYE]: "Bloodshot Eye", // 509
  [CollectibleType.DELIRIOUS]: "Delirious", // 510
  [CollectibleType.ANGRY_FLY]: "Angry Fly", // 511
  [CollectibleType.BLACK_HOLE]: "Black Hole", // 512
  [CollectibleType.BOZO]: "Bozo", // 513
  [CollectibleType.BROKEN_MODEM]: "Broken Modem", // 514
  [CollectibleType.MYSTERY_GIFT]: "Mystery Gift", // 515
  [CollectibleType.SPRINKLER]: "Sprinkler", // 516
  [CollectibleType.FAST_BOMBS]: "Fast Bombs", // 517
  [CollectibleType.BUDDY_IN_A_BOX]: "Buddy in a Box", // 518
  [CollectibleType.LIL_DELIRIUM]: "Lil Delirium", // 519
  [CollectibleType.JUMPER_CABLES]: "Jumper Cables", // 520
  [CollectibleType.COUPON]: "Coupon", // 521
  [CollectibleType.TELEKINESIS]: "Telekinesis", // 522
  [CollectibleType.MOVING_BOX]: "Moving Box", // 523
  [CollectibleType.TECHNOLOGY_ZERO]: "Technology Zero", // 524
  [CollectibleType.LEPROSY]: "Leprosy", // 525
  [CollectibleType.SEVEN_SEALS]: "7 Seals", // 526
  [CollectibleType.MR_ME]: "Mr. ME!", // 527
  [CollectibleType.ANGELIC_PRISM]: "Angelic Prism", // 528
  [CollectibleType.POP]: "Pop!", // 529
  [CollectibleType.DEATHS_LIST]: "Death's List", // 530
  [CollectibleType.HAEMOLACRIA]: "Haemolacria", // 531
  [CollectibleType.LACHRYPHAGY]: "Lachryphagy", // 532
  [CollectibleType.TRISAGION]: "Trisagion", // 533
  [CollectibleType.SCHOOLBAG]: "Schoolbag", // 534
  [CollectibleType.BLANKET]: "Blanket", // 535
  [CollectibleType.SACRIFICIAL_ALTAR]: "Sacrificial Altar", // 536
  [CollectibleType.LIL_SPEWER]: "Lil Spewer", // 537
  [CollectibleType.MARBLES]: "Marbles", // 538
  [CollectibleType.MYSTERY_EGG]: "Mystery Egg", // 539
  [CollectibleType.FLAT_STONE]: "Flat Stone", // 540
  [CollectibleType.MARROW]: "Marrow", // 541
  [CollectibleType.SLIPPED_RIB]: "Slipped Rib", // 542
  [CollectibleType.HALLOWED_GROUND]: "Hallowed Ground", // 543
  [CollectibleType.POINTY_RIB]: "Pointy Rib", // 544
  [CollectibleType.BOOK_OF_THE_DEAD]: "Book of the Dead", // 545
  [CollectibleType.DADS_RING]: "Dad's Ring", // 546
  [CollectibleType.DIVORCE_PAPERS]: "Divorce Papers", // 547
  [CollectibleType.JAW_BONE]: "Jaw Bone", // 548
  [CollectibleType.BRITTLE_BONES]: "Brittle Bones", // 549
  [CollectibleType.BROKEN_SHOVEL_1]: "Broken Shovel", // 550
  [CollectibleType.BROKEN_SHOVEL_2]: "Broken Shovel", // 551
  [CollectibleType.MOMS_SHOVEL]: "Mom's Shovel", // 552
  [CollectibleType.MUCORMYCOSIS]: "Mucormycosis", // 553
  [CollectibleType.TWO_SPOOKY]: "2Spooky", // 554
  [CollectibleType.GOLDEN_RAZOR]: "Golden Razor", // 555
  [CollectibleType.SULFUR]: "Sulfur", // 556
  [CollectibleType.FORTUNE_COOKIE]: "Fortune Cookie", // 557
  [CollectibleType.EYE_SORE]: "Eye Sore", // 558
  [CollectibleType.ONE_HUNDRED_TWENTY_VOLT]: "120 Volt", // 559
  [CollectibleType.IT_HURTS]: "It Hurts", // 560
  [CollectibleType.ALMOND_MILK]: "Almond Milk", // 561
  [CollectibleType.ROCK_BOTTOM]: "Rock Bottom", // 562
  [CollectibleType.NANCY_BOMBS]: "Nancy Bombs", // 563
  [CollectibleType.BAR_OF_SOAP]: "A Bar of Soap", // 564
  [CollectibleType.BLOOD_PUPPY]: "Blood Puppy", // 565
  [CollectibleType.DREAM_CATCHER]: "Dream Catcher", // 566
  [CollectibleType.PASCHAL_CANDLE]: "Paschal Candle", // 567
  [CollectibleType.DIVINE_INTERVENTION]: "Divine Intervention", // 568
  [CollectibleType.BLOOD_OATH]: "Blood Oath", // 569
  [CollectibleType.PLAYDOUGH_COOKIE]: "Playdough Cookie", // 570
  [CollectibleType.ORPHAN_SOCKS]: "Orphan Socks", // 571
  [CollectibleType.EYE_OF_THE_OCCULT]: "Eye of the Occult", // 572
  [CollectibleType.IMMACULATE_HEART]: "Immaculate Heart", // 573
  [CollectibleType.MONSTRANCE]: "Monstrance", // 574
  [CollectibleType.INTRUDER]: "The Intruder", // 575
  [CollectibleType.DIRTY_MIND]: "Dirty Mind", // 576
  [CollectibleType.DAMOCLES]: "Damocles", // 577
  [CollectibleType.FREE_LEMONADE]: "Free Lemonade", // 578
  [CollectibleType.SPIRIT_SWORD]: "Spirit Sword", // 579
  [CollectibleType.RED_KEY]: "Red Key", // 580
  [CollectibleType.PSY_FLY]: "Psy Fly", // 581
  [CollectibleType.WAVY_CAP]: "Wavy Cap", // 582
  [CollectibleType.ROCKET_IN_A_JAR]: "Rocket in a Jar", // 583
  [CollectibleType.BOOK_OF_VIRTUES]: "Book of Virtues", // 584
  [CollectibleType.ALABASTER_BOX]: "Alabaster Box", // 585
  [CollectibleType.STAIRWAY]: "The Stairway", // 586
  // There is no `CollectibleType` with a value of 587.
  [CollectibleType.SOL]: "Sol", // 588
  [CollectibleType.LUNA]: "Luna", // 589
  [CollectibleType.MERCURIUS]: "Mercurius", // 590
  [CollectibleType.VENUS]: "Venus", // 591
  [CollectibleType.TERRA]: "Terra", // 592
  [CollectibleType.MARS]: "Mars", // 593
  [CollectibleType.JUPITER]: "Jupiter", // 594
  [CollectibleType.SATURNUS]: "Saturnus", // 595
  [CollectibleType.URANUS]: "Uranus", // 596
  [CollectibleType.NEPTUNUS]: "Neptunus", // 597
  [CollectibleType.PLUTO]: "Pluto", // 598
  [CollectibleType.VOODOO_HEAD]: "Voodoo Head", // 599
  [CollectibleType.EYE_DROPS]: "Eye Drops", // 600
  [CollectibleType.ACT_OF_CONTRITION]: "Act of Contrition", // 601
  [CollectibleType.MEMBER_CARD]: "Member Card", // 602
  [CollectibleType.BATTERY_PACK]: "Battery Pack", // 603
  [CollectibleType.MOMS_BRACELET]: "Mom's Bracelet", // 604
  [CollectibleType.SCOOPER]: "The Scooper", // 605
  [CollectibleType.OCULAR_RIFT]: "Ocular Rift", // 606
  [CollectibleType.BOILED_BABY]: "Boiled Baby", // 607
  [CollectibleType.FREEZER_BABY]: "Freezer Baby", // 608
  [CollectibleType.ETERNAL_D6]: "Eternal D6", // 609
  [CollectibleType.BIRD_CAGE]: "Bird Cage", // 610
  [CollectibleType.LARYNX]: "Larynx", // 611
  [CollectibleType.LOST_SOUL]: "Lost Soul", // 612
  // There is no `CollectibleType` with a value of 613.
  [CollectibleType.BLOOD_BOMBS]: "Blood Bombs", // 614
  [CollectibleType.LIL_DUMPY]: "Lil Dumpy", // 615
  [CollectibleType.BIRDS_EYE]: "Bird's Eye", // 616
  [CollectibleType.LODESTONE]: "Lodestone", // 617
  [CollectibleType.ROTTEN_TOMATO]: "Rotten Tomato", // 618
  [CollectibleType.BIRTHRIGHT]: "Birthright", // 619
  // There is no `CollectibleType` with a value of 620.
  [CollectibleType.RED_STEW]: "Red Stew", // 621
  [CollectibleType.GENESIS]: "Genesis", // 622
  [CollectibleType.SHARP_KEY]: "Sharp Key", // 623
  [CollectibleType.BOOSTER_PACK]: "Booster Pack", // 624
  [CollectibleType.MEGA_MUSH]: "Mega Mush", // 625
  [CollectibleType.KNIFE_PIECE_1]: "Knife Piece 1", // 626
  [CollectibleType.KNIFE_PIECE_2]: "Knife Piece 2", // 627
  [CollectibleType.DEATH_CERTIFICATE]: "Death Certificate", // 628
  [CollectibleType.BOT_FLY]: "Bot Fly", // 629
  // There is no `CollectibleType` with a value of 630.
  [CollectibleType.MEAT_CLEAVER]: "Meat Cleaver", // 631
  [CollectibleType.EVIL_CHARM]: "Evil Charm", // 632
  [CollectibleType.DOGMA]: "Dogma", // 633
  [CollectibleType.PURGATORY]: "Purgatory", // 634
  [CollectibleType.STITCHES]: "Stitches", // 635
  [CollectibleType.R_KEY]: "R Key", // 636
  [CollectibleType.KNOCKOUT_DROPS]: "Knockout Drops", // 637
  [CollectibleType.ERASER]: "Eraser", // 638
  [CollectibleType.YUCK_HEART]: "Yuck Heart", // 639
  [CollectibleType.URN_OF_SOULS]: "Urn of Souls", // 640
  [CollectibleType.AKELDAMA]: "Akeldama", // 641
  [CollectibleType.MAGIC_SKIN]: "Magic Skin", // 642
  [CollectibleType.REVELATION]: "Revelation", // 643
  [CollectibleType.CONSOLATION_PRIZE]: "Consolation Prize", // 644
  [CollectibleType.TINYTOMA]: "Tinytoma", // 645
  [CollectibleType.BRIMSTONE_BOMBS]: "Brimstone Bombs", // 646
  [CollectibleType.FOUR_FIVE_VOLT]: "4.5 Volt", // 647
  // There is no `CollectibleType` with a value of 648.
  [CollectibleType.FRUITY_PLUM]: "Fruity Plum", // 649
  [CollectibleType.PLUM_FLUTE]: "Plum Flute", // 650
  [CollectibleType.STAR_OF_BETHLEHEM]: "Star of Bethlehem", // 651
  [CollectibleType.CUBE_BABY]: "Cube Baby", // 652
  [CollectibleType.VADE_RETRO]: "Vade Retro", // 653
  [CollectibleType.FALSE_PHD]: "False PHD", // 654
  [CollectibleType.SPIN_TO_WIN]: "Spin to Win", // 655
  [CollectibleType.DAMOCLES_PASSIVE]: "Damocles (Passive)", // 656
  [CollectibleType.VASCULITIS]: "Vasculitis", // 657
  [CollectibleType.GIANT_CELL]: "Giant Cell", // 658
  [CollectibleType.TROPICAMIDE]: "Tropicamide", // 659
  [CollectibleType.CARD_READING]: "Card Reading", // 660
  [CollectibleType.QUINTS]: "Quints", // 661
  // There is no `CollectibleType` with a value of 662.
  [CollectibleType.TOOTH_AND_NAIL]: "Tooth and Nail", // 663
  [CollectibleType.BINGE_EATER]: "Binge Eater", // 664
  [CollectibleType.GUPPYS_EYE]: "Guppy's Eye", // 665
  // There is no `CollectibleType` with a value of 666.
  [CollectibleType.STRAWMAN]: "Strawman", // 667
  [CollectibleType.DADS_NOTE]: "Dad's Note", // 668
  [CollectibleType.SAUSAGE]: "Sausage", // 669
  [CollectibleType.OPTIONS]: "Options?", // 670
  [CollectibleType.CANDY_HEART]: "Candy Heart", // 671
  [CollectibleType.POUND_OF_FLESH]: "A Pound of Flesh", // 672
  [CollectibleType.REDEMPTION]: "Redemption", // 673
  [CollectibleType.SPIRIT_SHACKLES]: "Spirit Shackles", // 674
  [CollectibleType.CRACKED_ORB]: "Cracked Orb", // 675
  [CollectibleType.EMPTY_HEART]: "Empty Heart", // 676
  [CollectibleType.ASTRAL_PROJECTION]: "Astral Projection", // 677
  [CollectibleType.C_SECTION]: "C Section", // 678
  [CollectibleType.LIL_ABADDON]: "Lil Abaddon", // 679
  [CollectibleType.MONTEZUMAS_REVENGE]: "Montezuma's Revenge", // 680
  [CollectibleType.LIL_PORTAL]: "Lil Portal", // 681
  [CollectibleType.WORM_FRIEND]: "Worm Friend", // 682
  [CollectibleType.BONE_SPURS]: "Bone Spurs", // 683
  [CollectibleType.HUNGRY_SOUL]: "Hungry Soul", // 684
  [CollectibleType.JAR_OF_WISPS]: "Jar of Wisps", // 685
  [CollectibleType.SOUL_LOCKET]: "Soul Locket", // 686
  [CollectibleType.FRIEND_FINDER]: "Friend Finder", // 687
  [CollectibleType.INNER_CHILD]: "Inner Child", // 688
  [CollectibleType.GLITCHED_CROWN]: "Glitched Crown", // 689
  [CollectibleType.JELLY_BELLY]: "Belly Jelly", // 690
  [CollectibleType.SACRED_ORB]: "Sacred Orb", // 691
  [CollectibleType.SANGUINE_BOND]: "Sanguine Bond", // 692
  [CollectibleType.SWARM]: "The Swarm", // 693
  [CollectibleType.HEARTBREAK]: "Heartbreak", // 694
  [CollectibleType.BLOODY_GUST]: "Bloody Gust", // 695
  [CollectibleType.SALVATION]: "Salvation", // 696
  [CollectibleType.VANISHING_TWIN]: "Vanishing Twin", // 697
  [CollectibleType.TWISTED_PAIR]: "Twisted Pair", // 698
  [CollectibleType.AZAZELS_RAGE]: "Azazel's Rage", // 699
  [CollectibleType.ECHO_CHAMBER]: "Echo Chamber", // 700
  [CollectibleType.ISAACS_TOMB]: "Isaac's Tomb", // 701
  [CollectibleType.VENGEFUL_SPIRIT]: "Vengeful Spirit", // 702
  [CollectibleType.ESAU_JR]: "Esau Jr.", // 703
  [CollectibleType.BERSERK]: "Berserk!", // 704
  [CollectibleType.DARK_ARTS]: "Dark Arts", // 705
  [CollectibleType.ABYSS]: "Abyss", // 706
  [CollectibleType.SUPPER]: "Supper", // 707
  [CollectibleType.STAPLER]: "Stapler", // 708
  [CollectibleType.SUPLEX]: "Suplex!", // 709
  [CollectibleType.BAG_OF_CRAFTING]: "Bag of Crafting", // 710
  [CollectibleType.FLIP]: "Flip", // 711
  [CollectibleType.LEMEGETON]: "Lemegeton", // 712
  [CollectibleType.SUMPTORIUM]: "Sumptorium", // 713
  [CollectibleType.RECALL]: "Recall", // 714
  [CollectibleType.HOLD]: "Hold", // 715
  [CollectibleType.KEEPERS_SACK]: "Keeper's Sack", // 716
  [CollectibleType.KEEPERS_KIN]: "Keeper's Kin", // 717
  // There is no `CollectibleType` with a value of 718.
  [CollectibleType.KEEPERS_BOX]: "Keeper's Box", // 719
  [CollectibleType.EVERYTHING_JAR]: "Everything Jar", // 720
  [CollectibleType.TMTRAINER]: "TMTRAINER", // 721
  [CollectibleType.ANIMA_SOLA]: "Anima Sola", // 722
  [CollectibleType.SPINDOWN_DICE]: "Spindown Dice", // 723
  [CollectibleType.HYPERCOAGULATION]: "Hypercoagulation", // 724
  [CollectibleType.IBS]: "IBS", // 725
  [CollectibleType.HEMOPTYSIS]: "Hemoptysis", // 726
  [CollectibleType.GHOST_BOMBS]: "Ghost Bombs", // 727
  [CollectibleType.GELLO]: "Gello", // 728
  [CollectibleType.DECAP_ATTACK]: "Decap Attack", // 729
  [CollectibleType.GLASS_EYE]: "Glass Eye", // 730
  [CollectibleType.STYE]: "Stye", // 731
  [CollectibleType.MOMS_RING]: "Mom's Ring", // 732
} as const satisfies Record<CollectibleType, string>;
