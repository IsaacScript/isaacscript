/* cspell:disable */

import { TrinketType } from "isaac-typescript-definitions";

export const DEFAULT_TRINKET_DESCRIPTION = "Unknown";

/** Maps trinket types to the real English descriptions from the "stringtable.sta" file. */
export const TRINKET_DESCRIPTIONS = {
  [TrinketType.NULL]: DEFAULT_TRINKET_DESCRIPTION, // 0
  [TrinketType.SWALLOWED_PENNY]: "Gulp!", // 1
  [TrinketType.PETRIFIED_POOP]: "It feels lucky?", // 2
  [TrinketType.AAA_BATTERY]: "Trickle charge", // 3
  [TrinketType.BROKEN_REMOTE]: "It's broken", // 4
  [TrinketType.PURPLE_HEART]: "Challenge up", // 5
  [TrinketType.BROKEN_MAGNET]: "It kinda works", // 6
  [TrinketType.ROSARY_BEAD]: "Faith up", // 7
  [TrinketType.CARTRIDGE]: "I remember these", // 8
  [TrinketType.PULSE_WORM]: "Wub wub!", // 9
  [TrinketType.WIGGLE_WORM]: "Wiggle waggle!", // 10
  [TrinketType.RING_WORM]: "Woop woop!", // 11
  [TrinketType.FLAT_WORM]: "Blub blub!", // 12
  [TrinketType.STORE_CREDIT]: "YES!", // 13
  [TrinketType.CALLUS]: "Your feet feel stronger", // 14
  [TrinketType.LUCKY_ROCK]: "There's something inside it", // 15
  [TrinketType.MOMS_TOENAIL]: "???", // 16
  [TrinketType.BLACK_LIPSTICK]: "Evil up", // 17
  [TrinketType.BIBLE_TRACT]: "Faith up", // 18
  [TrinketType.PAPER_CLIP]: "Master of lockpicking", // 19
  [TrinketType.MONKEY_PAW]: "Wish granted", // 20
  [TrinketType.MYSTERIOUS_PAPER]: "???", // 21
  [TrinketType.DAEMONS_TAIL]: "Evil up", // 22
  [TrinketType.MISSING_POSTER]: "???", // 23
  [TrinketType.BUTT_PENNY]: "Wealth of gas", // 24
  [TrinketType.MYSTERIOUS_CANDY]: "Uh-oh!", // 25
  [TrinketType.HOOK_WORM]: "Zip zoop!", // 26
  [TrinketType.WHIP_WORM]: "Wooosh!", // 27
  [TrinketType.BROKEN_ANKH]: "Eternal life?", // 28
  [TrinketType.FISH_HEAD]: "It stinks", // 29
  [TrinketType.PINKY_EYE]: "Poison shots", // 30
  [TrinketType.PUSH_PIN]: "Piercing shots", // 31
  [TrinketType.LIBERTY_CAP]: "Touch fuzzy, get dizzy", // 32
  [TrinketType.UMBILICAL_CORD]: "Fetal protection", // 33
  [TrinketType.CHILDS_HEART]: "It calls out to its brothers", // 34
  [TrinketType.CURVED_HORN]: "DMG up", // 35
  [TrinketType.RUSTED_KEY]: "It feels lucky?", // 36
  [TrinketType.GOAT_HOOF]: "Speed up", // 37
  [TrinketType.MOMS_PEARL]: "It emanates purity ", // 38
  [TrinketType.CANCER]: "Yay, cancer!", // 39
  [TrinketType.RED_PATCH]: "Your rage grows", // 40
  [TrinketType.MATCH_STICK]: "Tastes like burning", // 41
  [TrinketType.LUCKY_TOE]: "Luck up!", // 42
  [TrinketType.CURSED_SKULL]: "Cursed?", // 43
  [TrinketType.SAFETY_CAP]: "Don't swallow it", // 44
  [TrinketType.ACE_OF_SPADES]: "Luck of the draw", // 45
  [TrinketType.ISAACS_FORK]: "Consume thy enemy", // 46
  // There is no `TrinketType` with a value of 47.
  [TrinketType.MISSING_PAGE]: "It glows with power", // 48
  [TrinketType.BLOODY_PENNY]: "Wealth of health", // 49
  [TrinketType.BURNT_PENNY]: "Wealth of chaos", // 50
  [TrinketType.FLAT_PENNY]: "Wealth of answers", // 51
  [TrinketType.COUNTERFEIT_PENNY]: "Wealth of wealth", // 52
  [TrinketType.TICK]: "Well, that's not coming off", // 53
  [TrinketType.ISAACS_HEAD]: "Dead friend", // 54
  [TrinketType.MAGGYS_FAITH]: "Faith's reward", // 55
  [TrinketType.JUDAS_TONGUE]: "Payment received ", // 56
  [TrinketType.BLUE_BABYS_SOUL]: "Imaginary friend", // 57
  [TrinketType.SAMSONS_LOCK]: "Your rage grows", // 58
  [TrinketType.CAINS_EYE]: "May you see your destination", // 59
  [TrinketType.EVES_BIRD_FOOT]: "Revenge from beyond", // 60
  [TrinketType.LEFT_HAND]: "The left-hand path reaps dark rewards", // 61
  [TrinketType.SHINY_ROCK]: "It shines for its brothers", // 62
  [TrinketType.SAFETY_SCISSORS]: "Fuse cutter", // 63
  [TrinketType.RAINBOW_WORM]: "Bleep bloop blop", // 64
  [TrinketType.TAPE_WORM]: "Floooooooooop!", // 65
  [TrinketType.LAZY_WORM]: "Pft", // 66
  [TrinketType.CRACKED_DICE]: "You feel cursed... kinda.", // 67
  [TrinketType.SUPER_MAGNET]: "It pulls", // 68
  [TrinketType.FADED_POLAROID]: "You feel faded", // 69
  [TrinketType.LOUSE]: "Itchy, tasty...", // 70
  [TrinketType.BOBS_BLADDER]: "Creepy bombs", // 71
  [TrinketType.WATCH_BATTERY]: "Lil charge", // 72
  [TrinketType.BLASTING_CAP]: "Pop! Pop!", // 73
  [TrinketType.STUD_FINDER]: "The ground below feels hollow...", // 74
  [TrinketType.ERROR]: "Effect not found?", // 75
  [TrinketType.POKER_CHIP]: "It's double down time!", // 76
  [TrinketType.BLISTER]: "Bounce back!", // 77
  [TrinketType.SECOND_HAND]: "Extended stat effect time!", // 78
  [TrinketType.ENDLESS_NAMELESS]: "I'm stuck in a loop...", // 79
  [TrinketType.BLACK_FEATHER]: "With darkness comes power", // 80
  [TrinketType.BLIND_RAGE]: "Blind to damage", // 81
  [TrinketType.GOLDEN_HORSE_SHOE]: "Feel lucky?", // 82
  [TrinketType.STORE_KEY]: "Stores are open", // 83
  [TrinketType.RIB_OF_GREED]: "Feels greedy", // 84
  [TrinketType.KARMA]: "Karma up", // 85
  [TrinketType.LIL_LARVA]: "The poop is moving...", // 86
  [TrinketType.MOMS_LOCKET]: "You feel her love", // 87
  [TrinketType.NO]: "Never again!", // 88
  [TrinketType.CHILD_LEASH]: "Keep your friends close...", // 89
  [TrinketType.BROWN_CAP]: "Fartoom!", // 90
  [TrinketType.MECONIUM]: "Eww", // 91
  [TrinketType.CRACKED_CROWN]: "Stat booster", // 92
  [TrinketType.USED_DIAPER]: "You stink", // 93
  [TrinketType.FISH_TAIL]: "It also stinks!", // 94
  [TrinketType.BLACK_TOOTH]: "It looks dead", // 95
  [TrinketType.OUROBOROS_WORM]: "Foop foop!", // 96
  [TrinketType.TONSIL]: "Sick...", // 97
  [TrinketType.NOSE_GOBLIN]: "Seems magic...", // 98
  [TrinketType.SUPER_BALL]: "Boing!", // 99
  [TrinketType.VIBRANT_BULB]: "It needs power", // 100
  [TrinketType.DIM_BULB]: "I think it's broken", // 101
  [TrinketType.FRAGMENTED_CARD]: "Double moon", // 102
  [TrinketType.EQUALITY]: "=", // 103
  [TrinketType.WISH_BONE]: "Make a wish", // 104
  [TrinketType.BAG_LUNCH]: "I wonder what it is", // 105
  [TrinketType.LOST_CORK]: "Uncorked", // 106
  [TrinketType.CROW_HEART]: "Drain me", // 107
  [TrinketType.WALNUT]: "That's a hard nut to crack!", // 108
  [TrinketType.DUCT_TAPE]: "Stuck!", // 109
  [TrinketType.SILVER_DOLLAR]: "Feels lucky...", // 110
  [TrinketType.BLOODY_CROWN]: "Drips with blood...", // 111
  [TrinketType.PAY_TO_WIN]: "...", // 112
  [TrinketType.LOCUST_OF_WRATH]: "I bring War", // 113
  [TrinketType.LOCUST_OF_PESTILENCE]: "I bring Pestilence", // 114
  [TrinketType.LOCUST_OF_FAMINE]: "I bring Famine", // 115
  [TrinketType.LOCUST_OF_DEATH]: "I bring Death", // 116
  [TrinketType.LOCUST_OF_CONQUEST]: "I bring Conquest", // 117
  [TrinketType.BAT_WING]: "They are growing...", // 118
  [TrinketType.STEM_CELL]: "Regen!", // 119
  [TrinketType.HAIRPIN]: "Danger charge", // 120
  [TrinketType.WOODEN_CROSS]: "My faith protects me", // 121
  [TrinketType.BUTTER]: "Can't hold it!", // 122
  [TrinketType.FILIGREE_FEATHERS]: "Angelic spoils", // 123
  [TrinketType.DOOR_STOP]: "Hold the door", // 124
  [TrinketType.EXTENSION_CORD]: "Charged friends", // 125
  [TrinketType.ROTTEN_PENNY]: "Wealth of flies", // 126
  [TrinketType.BABY_BENDER]: "Feed them magic!", // 127
  [TrinketType.FINGER_BONE]: "It looks brittle", // 128
  [TrinketType.JAW_BREAKER]: "Don't chew on it", // 129
  [TrinketType.CHEWED_PEN]: "It's leaking", // 130
  [TrinketType.BLESSED_PENNY]: "Wealth of purity", // 131
  [TrinketType.BROKEN_SYRINGE]: "Mystery medicine", // 132
  [TrinketType.SHORT_FUSE]: "Faster explosions", // 133
  [TrinketType.GIGANTE_BEAN]: "Mega farts", // 134
  [TrinketType.LIGHTER]: "Watch the world burn", // 135
  [TrinketType.BROKEN_PADLOCK]: "Bombs are key", // 136
  [TrinketType.MYOSOTIS]: "Forget me not...", // 137
  [TrinketType.M]: "t's broken9Reroll your dest       ", // 138
  [TrinketType.TEARDROP_CHARM]: "It feels lucky", // 139
  [TrinketType.APPLE_OF_SODOM]: "It feels empty", // 140
  [TrinketType.FORGOTTEN_LULLABY]: "Sing for your friends", // 141
  [TrinketType.BETHS_FAITH]: "My faith protects me", // 142
  [TrinketType.OLD_CAPACITOR]: "Voltage starving", // 143
  [TrinketType.BRAIN_WORM]: "Ding!", // 144
  [TrinketType.PERFECTION]: "Luck way up. Don't lose it!", // 145
  [TrinketType.DEVILS_CROWN]: "His special customer", // 146
  [TrinketType.CHARGED_PENNY]: "Wealth of power", // 147
  [TrinketType.FRIENDSHIP_NECKLACE]: "Gather round", // 148
  [TrinketType.PANIC_BUTTON]: "Push in case of emergency", // 149
  [TrinketType.BLUE_KEY]: "Look between the rooms", // 150
  [TrinketType.FLAT_FILE]: "No more spikes", // 151
  [TrinketType.TELESCOPE_LENS]: "Seek the stars", // 152
  [TrinketType.MOMS_LOCK]: "A piece of her love", // 153
  [TrinketType.DICE_BAG]: "Bonus roll", // 154
  [TrinketType.HOLY_CROWN]: "Walk the path of the saint", // 155
  [TrinketType.MOTHERS_KISS]: "HP up", // 156
  [TrinketType.TORN_CARD]: "Death awaits", // 157
  [TrinketType.TORN_POCKET]: "A hole in your pocket", // 158
  [TrinketType.GILDED_KEY]: "Less is more", // 159
  [TrinketType.LUCKY_SACK]: "Free goodies!", // 160
  [TrinketType.WICKED_CROWN]: "Walk the path of the wicked", // 161
  [TrinketType.AZAZELS_STUMP]: "Unleash your inner demon", // 162
  [TrinketType.DINGLE_BERRY]: "Oops!", // 163
  [TrinketType.RING_CAP]: "Twice the bang!", // 164
  [TrinketType.NUH_UH]: "Don't want!", // 165
  [TrinketType.MODELING_CLAY]: "???", // 166
  [TrinketType.POLISHED_BONE]: "Friends from beyond", // 167
  [TrinketType.HOLLOW_HEART]: "A brittle blessing", // 168
  [TrinketType.KIDS_DRAWING]: "Looks familiar...", // 169
  [TrinketType.CRYSTAL_KEY]: "Call to the other side", // 170
  [TrinketType.KEEPERS_BARGAIN]: "Money talks", // 171
  [TrinketType.CURSED_PENNY]: "Wealth of misery", // 172
  [TrinketType.YOUR_SOUL]: "Give it to me", // 173
  [TrinketType.NUMBER_MAGNET]: "6", // 174
  [TrinketType.STRANGE_KEY]: "What could it open?", // 175
  [TrinketType.LIL_CLOT]: "Mini friend", // 176
  [TrinketType.TEMPORARY_TATTOO]: "You feel braver", // 177
  [TrinketType.SWALLOWED_M80]: "Bang!", // 178
  [TrinketType.RC_REMOTE]: "Controllable buddies!", // 179
  [TrinketType.FOUND_SOUL]: "Finally!", // 180
  [TrinketType.EXPANSION_PACK]: "Fun extras", // 181
  [TrinketType.BETHS_ESSENCE]: "Virtue's reward", // 182
  [TrinketType.TWINS]: "I'm seeing double...", // 183
  [TrinketType.ADOPTION_PAPERS]: "Give them a home", // 184
  [TrinketType.CRICKET_LEG]: "Infested", // 185
  [TrinketType.APOLLYONS_BEST_FRIEND]: "Attack buddy", // 186
  [TrinketType.BROKEN_GLASSES]: "Double vision?", // 187
  [TrinketType.ICE_CUBE]: "Stay frosty", // 188
  [TrinketType.SIGIL_OF_BAPHOMET]: "Revel in death", // 189
} as const satisfies Record<TrinketType, string>;
