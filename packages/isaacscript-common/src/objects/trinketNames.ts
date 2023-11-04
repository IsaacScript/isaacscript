import { TrinketType } from "isaac-typescript-definitions";

export const DEFAULT_TRINKET_NAME = "Unknown";

/**
 * Maps trinket types to the real English names from the "stringtable.sta" file.
 *
 * For a mapping of name to `TrinketType`, see `TRINKET_NAME_TO_TYPE_MAP`.
 */
export const TRINKET_NAMES = {
  [TrinketType.NULL]: DEFAULT_TRINKET_NAME, // 0
  [TrinketType.SWALLOWED_PENNY]: "Swallowed Penny", // 1
  [TrinketType.PETRIFIED_POOP]: "Petrified Poop", // 2
  [TrinketType.AAA_BATTERY]: "AAA Battery", // 3
  [TrinketType.BROKEN_REMOTE]: "Broken Remote", // 4
  [TrinketType.PURPLE_HEART]: "Purple Heart", // 5
  [TrinketType.BROKEN_MAGNET]: "Broken Magnet", // 6
  [TrinketType.ROSARY_BEAD]: "Rosary Bead", // 7
  [TrinketType.CARTRIDGE]: "Cartridge", // 8
  [TrinketType.PULSE_WORM]: "Pulse Worm", // 9
  [TrinketType.WIGGLE_WORM]: "Wiggle Worm", // 10
  [TrinketType.RING_WORM]: "Ring Worm", // 11
  [TrinketType.FLAT_WORM]: "Flat Worm", // 12
  [TrinketType.STORE_CREDIT]: "Store Credit", // 13
  [TrinketType.CALLUS]: "Callus", // 14
  [TrinketType.LUCKY_ROCK]: "Lucky Rock", // 15
  [TrinketType.MOMS_TOENAIL]: "Mom's Toenail", // 16
  [TrinketType.BLACK_LIPSTICK]: "Black Lipstick", // 17
  [TrinketType.BIBLE_TRACT]: "Bible Tract", // 18
  [TrinketType.PAPER_CLIP]: "Paper Clip", // 19
  [TrinketType.MONKEY_PAW]: "Monkey Paw", // 20
  [TrinketType.MYSTERIOUS_PAPER]: "Mysterious Paper", // 21
  [TrinketType.DAEMONS_TAIL]: "Daemon's Tail", // 22
  [TrinketType.MISSING_POSTER]: "Missing Poster", // 23
  [TrinketType.BUTT_PENNY]: "Butt Penny", // 24
  [TrinketType.MYSTERIOUS_CANDY]: "Mysterious Candy", // 25
  [TrinketType.HOOK_WORM]: "Hook Worm", // 26
  [TrinketType.WHIP_WORM]: "Whip Worm", // 27
  [TrinketType.BROKEN_ANKH]: "Broken Ankh", // 28
  [TrinketType.FISH_HEAD]: "Fish Head", // 29
  [TrinketType.PINKY_EYE]: "Pinky Eye", // 30
  [TrinketType.PUSH_PIN]: "Push Pin", // 31
  [TrinketType.LIBERTY_CAP]: "Liberty Cap", // 32
  [TrinketType.UMBILICAL_CORD]: "Umbilical Cord", // 33
  [TrinketType.CHILDS_HEART]: "Child's Heart", // 34
  [TrinketType.CURVED_HORN]: "Curved Horn", // 35
  [TrinketType.RUSTED_KEY]: "Rusted Key", // 36
  [TrinketType.GOAT_HOOF]: "Goat Hoof", // 37
  [TrinketType.MOMS_PEARL]: "Mom's Pearl", // 38
  [TrinketType.CANCER]: "Cancer", // 39
  [TrinketType.RED_PATCH]: "Red Patch", // 40
  [TrinketType.MATCH_STICK]: "Match Stick", // 41
  [TrinketType.LUCKY_TOE]: "Lucky Toe", // 42
  [TrinketType.CURSED_SKULL]: "Cursed Skull", // 43
  [TrinketType.SAFETY_CAP]: "Safety Cap", // 44
  [TrinketType.ACE_OF_SPADES]: "Ace of Spades", // 45
  [TrinketType.ISAACS_FORK]: "Isaac's Fork", // 46
  // There is no `TrinketType` with a value of 47.
  [TrinketType.MISSING_PAGE]: "A Missing Page", // 48
  [TrinketType.BLOODY_PENNY]: "Bloody Penny", // 49
  [TrinketType.BURNT_PENNY]: "Burnt Penny", // 50
  [TrinketType.FLAT_PENNY]: "Flat Penny", // 51
  [TrinketType.COUNTERFEIT_PENNY]: "Counterfeit Penny", // 52
  [TrinketType.TICK]: "Tick", // 53
  [TrinketType.ISAACS_HEAD]: "Isaac's Head", // 54
  [TrinketType.MAGGYS_FAITH]: "Maggy's Faith", // 55
  [TrinketType.JUDAS_TONGUE]: "Judas' Tongue", // 56
  [TrinketType.BLUE_BABYS_SOUL]: "???'s Soul", // 57
  [TrinketType.SAMSONS_LOCK]: "Samson's Lock", // 58
  [TrinketType.CAINS_EYE]: "Cain's Eye", // 59
  [TrinketType.EVES_BIRD_FOOT]: "Eve's Bird Foot", // 60
  [TrinketType.LEFT_HAND]: "The Left Hand", // 61
  [TrinketType.SHINY_ROCK]: "Shiny Rock", // 62
  [TrinketType.SAFETY_SCISSORS]: "Safety Scissors", // 63
  [TrinketType.RAINBOW_WORM]: "Rainbow Worm", // 64
  [TrinketType.TAPE_WORM]: "Tape Worm", // 65
  [TrinketType.LAZY_WORM]: "Lazy Worm", // 66
  [TrinketType.CRACKED_DICE]: "Cracked Dice", // 67
  [TrinketType.SUPER_MAGNET]: "Super Magnet", // 68
  [TrinketType.FADED_POLAROID]: "Faded Polaroid", // 69
  [TrinketType.LOUSE]: "Louse", // 70
  [TrinketType.BOBS_BLADDER]: "Bob's Bladder", // 71
  [TrinketType.WATCH_BATTERY]: "Watch Battery", // 72
  [TrinketType.BLASTING_CAP]: "Blasting Cap", // 73
  [TrinketType.STUD_FINDER]: "Stud Finder", // 74
  [TrinketType.ERROR]: "Error", // 75
  [TrinketType.POKER_CHIP]: "Poker Chip", // 76
  [TrinketType.BLISTER]: "Blister", // 77
  [TrinketType.SECOND_HAND]: "Second Hand", // 78
  [TrinketType.ENDLESS_NAMELESS]: "Endless Nameless", // 79
  [TrinketType.BLACK_FEATHER]: "Black Feather", // 80
  [TrinketType.BLIND_RAGE]: "Blind Rage", // 81
  [TrinketType.GOLDEN_HORSE_SHOE]: "Golden Horse Shoe", // 82
  [TrinketType.STORE_KEY]: "Store Key", // 83
  [TrinketType.RIB_OF_GREED]: "Rib of Greed", // 84
  [TrinketType.KARMA]: "Karma", // 85
  [TrinketType.LIL_LARVA]: "Lil Larva", // 86
  [TrinketType.MOMS_LOCKET]: "Mom's Locket", // 87
  [TrinketType.NO]: "NO!", // 88
  [TrinketType.CHILD_LEASH]: "Child Leash", // 89
  [TrinketType.BROWN_CAP]: "Brown Cap", // 90
  [TrinketType.MECONIUM]: "Meconium", // 91
  [TrinketType.CRACKED_CROWN]: "Cracked Crown", // 92
  [TrinketType.USED_DIAPER]: "Used Diaper", // 93
  [TrinketType.FISH_TAIL]: "Fish Tail", // 94
  [TrinketType.BLACK_TOOTH]: "Black Tooth", // 95
  [TrinketType.OUROBOROS_WORM]: "Ouroboros Worm", // 96
  [TrinketType.TONSIL]: "Tonsil", // 97
  [TrinketType.NOSE_GOBLIN]: "Nose Goblin", // 98
  [TrinketType.SUPER_BALL]: "Super Ball", // 99
  [TrinketType.VIBRANT_BULB]: "Vibrant Bulb", // 100
  [TrinketType.DIM_BULB]: "Dim Bulb", // 101
  [TrinketType.FRAGMENTED_CARD]: "Fragmented Card", // 102
  [TrinketType.EQUALITY]: "Equality!", // 103
  [TrinketType.WISH_BONE]: "Wish Bone", // 104
  [TrinketType.BAG_LUNCH]: "Bag Lunch", // 105
  [TrinketType.LOST_CORK]: "Lost Cork", // 106
  [TrinketType.CROW_HEART]: "Crow Heart", // 107
  [TrinketType.WALNUT]: "Walnut", // 108
  [TrinketType.DUCT_TAPE]: "Duct Tape", // 109
  [TrinketType.SILVER_DOLLAR]: "Silver Dollar", // 110
  [TrinketType.BLOODY_CROWN]: "Bloody Crown", // 111
  [TrinketType.PAY_TO_WIN]: "Pay To Win", // 112
  [TrinketType.LOCUST_OF_WRATH]: "Locust of War", // 113
  [TrinketType.LOCUST_OF_PESTILENCE]: "Locust of Pestilence", // 114
  [TrinketType.LOCUST_OF_FAMINE]: "Locust of Famine", // 115
  [TrinketType.LOCUST_OF_DEATH]: "Locust of Death", // 116
  [TrinketType.LOCUST_OF_CONQUEST]: "Locust of Conquest", // 117
  [TrinketType.BAT_WING]: "Bat Wing", // 118
  [TrinketType.STEM_CELL]: "Stem Cell", // 119
  [TrinketType.HAIRPIN]: "Hairpin", // 120
  [TrinketType.WOODEN_CROSS]: "Wooden Cross", // 121
  [TrinketType.BUTTER]: "Butter!", // 122
  [TrinketType.FILIGREE_FEATHERS]: "Filigree Feather", // 123
  [TrinketType.DOOR_STOP]: "Door Stop", // 124
  [TrinketType.EXTENSION_CORD]: "Extension Cord", // 125
  [TrinketType.ROTTEN_PENNY]: "Rotten Penny", // 126
  [TrinketType.BABY_BENDER]: "Baby-Bender", // 127
  [TrinketType.FINGER_BONE]: "Finger Bone", // 128
  [TrinketType.JAW_BREAKER]: "Jawbreaker", // 129
  [TrinketType.CHEWED_PEN]: "Chewed Pen", // 130
  [TrinketType.BLESSED_PENNY]: "Blessed Penny", // 131
  [TrinketType.BROKEN_SYRINGE]: "Broken Syringe", // 132
  [TrinketType.SHORT_FUSE]: "Short Fuse", // 133
  [TrinketType.GIGANTE_BEAN]: "Gigante Bean", // 134
  [TrinketType.LIGHTER]: "A Lighter", // 135
  [TrinketType.BROKEN_PADLOCK]: "Broken Padlock", // 136
  [TrinketType.MYOSOTIS]: "Myosotis", // 137
  [TrinketType.M]: " 'M", // 138
  [TrinketType.TEARDROP_CHARM]: "Teardrop Charm", // 139
  [TrinketType.APPLE_OF_SODOM]: "Apple of Sodom", // 140
  [TrinketType.FORGOTTEN_LULLABY]: "Forgotten Lullaby", // 141
  [TrinketType.BETHS_FAITH]: "Beth's Faith", // 142
  [TrinketType.OLD_CAPACITOR]: "Old Capacitor", // 143
  [TrinketType.BRAIN_WORM]: "Brain Worm", // 144
  [TrinketType.PERFECTION]: "Perfection", // 145
  [TrinketType.DEVILS_CROWN]: "Devil's Crown", // 146
  [TrinketType.CHARGED_PENNY]: "Charged Penny", // 147
  [TrinketType.FRIENDSHIP_NECKLACE]: "Friendship Necklace", // 148
  [TrinketType.PANIC_BUTTON]: "Panic Button", // 149
  [TrinketType.BLUE_KEY]: "Blue Key", // 150
  [TrinketType.FLAT_FILE]: "Flat File", // 151
  [TrinketType.TELESCOPE_LENS]: "Telescope Lens", // 152
  [TrinketType.MOMS_LOCK]: "Mom's Lock", // 153
  [TrinketType.DICE_BAG]: "Dice Bag", // 154
  [TrinketType.HOLY_CROWN]: "Holy Crown", // 155
  [TrinketType.MOTHERS_KISS]: "Mother's Kiss", // 156
  [TrinketType.TORN_CARD]: "Torn Card", // 157
  [TrinketType.TORN_POCKET]: "Torn Pocket", // 158
  [TrinketType.GILDED_KEY]: "Gilded Key", // 159
  [TrinketType.LUCKY_SACK]: "Lucky Sack", // 160
  [TrinketType.WICKED_CROWN]: "Wicked Crown", // 161
  [TrinketType.AZAZELS_STUMP]: "Azazel's Stump", // 162
  [TrinketType.DINGLE_BERRY]: "Dingle Berry", // 163
  [TrinketType.RING_CAP]: "Ring Cap", // 164
  [TrinketType.NUH_UH]: "Nuh Uh!", // 165
  [TrinketType.MODELING_CLAY]: "Modeling Clay", // 166
  [TrinketType.POLISHED_BONE]: "Polished Bone", // 167
  [TrinketType.HOLLOW_HEART]: "Hollow Heart", // 168
  [TrinketType.KIDS_DRAWING]: "Kid's Drawing", // 169
  [TrinketType.CRYSTAL_KEY]: "Crystal Key", // 170
  [TrinketType.KEEPERS_BARGAIN]: "Keeper's Bargain", // 171
  [TrinketType.CURSED_PENNY]: "Cursed Penny", // 172
  [TrinketType.YOUR_SOUL]: "Your Soul", // 173
  [TrinketType.NUMBER_MAGNET]: "Number Magnet", // 174
  [TrinketType.STRANGE_KEY]: "Strange Key", // 175
  [TrinketType.LIL_CLOT]: "Lil Clot", // 176
  [TrinketType.TEMPORARY_TATTOO]: "Temporary Tattoo", // 177
  [TrinketType.SWALLOWED_M80]: "Swallowed M80", // 178
  [TrinketType.RC_REMOTE]: "RC Remote", // 179
  [TrinketType.FOUND_SOUL]: "Found Soul", // 180
  [TrinketType.EXPANSION_PACK]: "Expansion Pack", // 181
  [TrinketType.BETHS_ESSENCE]: "Beth's Essence", // 182
  [TrinketType.TWINS]: "The Twins", // 183
  [TrinketType.ADOPTION_PAPERS]: "Adoption Papers", // 184
  [TrinketType.CRICKET_LEG]: "Cricket Leg", // 185
  [TrinketType.APOLLYONS_BEST_FRIEND]: "Apollyon's Best Friend", // 186
  [TrinketType.BROKEN_GLASSES]: "Broken Glasses", // 187
  [TrinketType.ICE_CUBE]: "Ice Cube", // 188
  [TrinketType.SIGIL_OF_BAPHOMET]: "Sigil of Baphomet", // 189
} as const satisfies Record<TrinketType, string>;
