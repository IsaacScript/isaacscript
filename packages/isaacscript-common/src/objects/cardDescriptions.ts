import { CardType } from "isaac-typescript-definitions";

export const DEFAULT_CARD_DESCRIPTION = "Unknown";

/** This is a temporary map due to missing features in the vanilla API. */
export const CARD_DESCRIPTIONS = {
  [CardType.NULL]: DEFAULT_CARD_DESCRIPTION, // 0
  [CardType.FOOL]: "Where journey begins", // 1
  [CardType.MAGICIAN]: "May you never miss your goal", // 2
  [CardType.HIGH_PRIESTESS]: "Mother is watching you", // 3
  [CardType.EMPRESS]: "May your rage bring power", // 4
  [CardType.EMPEROR]: "Challenge me!", // 5
  [CardType.HIEROPHANT]: "Two prayers for the lost", // 6
  [CardType.LOVERS]: "May you prosper and be in good health", // 7
  [CardType.CHARIOT]: "May nothing stand before you", // 8
  [CardType.JUSTICE]: "May your future become balanced", // 9
  [CardType.HERMIT]: "May you see what life has to offer", // 10
  [CardType.WHEEL_OF_FORTUNE]: "Spin the wheel of destiny", // 11
  [CardType.STRENGTH]: "May your power bring rage", // 12
  [CardType.HANGED_MAN]: "May you find enlightenment ", // 13
  [CardType.DEATH]: "Lay waste to all that oppose you ", // 14
  [CardType.TEMPERANCE]: "May you be pure in heart", // 15
  [CardType.DEVIL]: "Revel in the power of darkness", // 16
  [CardType.TOWER]: "Destruction brings creation", // 17
  [CardType.STARS]: "May you find what you desire ", // 18
  [CardType.MOON]: "May you find all you have lost", // 19
  [CardType.SUN]: "May the light heal and enlighten you", // 20
  [CardType.JUDGEMENT]: "Judge lest ye be judged", // 21
  [CardType.WORLD]: "Open your eyes and see", // 22
  [CardType.TWO_OF_CLUBS]: "Item multiplier", // 23
  [CardType.TWO_OF_DIAMONDS]: "Item multiplier", // 24
  [CardType.TWO_OF_SPADES]: "Item multiplier", // 25
  [CardType.TWO_OF_HEARTS]: "Item multiplier", // 26
  [CardType.ACE_OF_CLUBS]: "Convert all", // 27
  [CardType.ACE_OF_DIAMONDS]: "Convert all", // 28
  [CardType.ACE_OF_SPADES]: "Convert all", // 29
  [CardType.ACE_OF_HEARTS]: "Convert all", // 30
  [CardType.JOKER]: "???", // 31
  [CardType.RUNE_HAGALAZ]: "Destruction", // 32
  [CardType.RUNE_JERA]: "Abundance", // 33
  [CardType.RUNE_EHWAZ]: "Passage", // 34
  [CardType.RUNE_DAGAZ]: "Purity", // 35
  [CardType.RUNE_ANSUZ]: "Vision", // 36
  [CardType.RUNE_PERTHRO]: "Change", // 37
  [CardType.RUNE_BERKANO]: "Companionship", // 38
  [CardType.RUNE_ALGIZ]: "Resistance", // 39
  [CardType.RUNE_BLANK]: "???", // 40
  [CardType.RUNE_BLACK]: "Void", // 41
  [CardType.CHAOS]: "???", // 42
  [CardType.CREDIT]: "Charge it!", // 43
  [CardType.RULES]: "???", // 44
  [CardType.AGAINST_HUMANITY]: "Something stinks...", // 45
  [CardType.SUICIDE_KING]: "A true ending?", // 46
  [CardType.GET_OUT_OF_JAIL_FREE]: "Open Sesame", // 47
  [CardType.QUESTION_MARK]: "Double active", // 48
  [CardType.DICE_SHARD]: "D6 + D20", // 49
  [CardType.EMERGENCY_CONTACT]: "Help from above", // 50
  [CardType.HOLY]: "You feel protected", // 51
  [CardType.HUGE_GROWTH]: "Become immense!", // 52
  [CardType.ANCIENT_RECALL]: "Draw 3 cards", // 53
  [CardType.ERA_WALK]: "Savor the moment", // 54
  [CardType.RUNE_SHARD]: "It still glows faintly", // 55
  [CardType.REVERSE_FOOL]: "Let go and move on", // 56
  [CardType.REVERSE_MAGICIAN]: "May no harm come to you", // 57
  [CardType.REVERSE_HIGH_PRIESTESS]: "Run", // 58
  [CardType.REVERSE_EMPRESS]: "May your love bring protection", // 59
  [CardType.REVERSE_EMPEROR]: "May you find a worthy opponent", // 60
  [CardType.REVERSE_HIEROPHANT]: "Two prayers for the forgotten", // 61
  [CardType.REVERSE_LOVERS]: "May your heart shatter into pieces", // 62
  [CardType.REVERSE_CHARIOT]: "May nothing walk past you", // 63
  [CardType.REVERSE_JUSTICE]: "May your sins come back to torment you", // 64
  [CardType.REVERSE_HERMIT]: "May you see the value of all things in life", // 65
  [CardType.REVERSE_WHEEL_OF_FORTUNE]: "Throw the dice of fate", // 66
  [CardType.REVERSE_STRENGTH]: "May you break their resolve", // 67
  [CardType.REVERSE_HANGED_MAN]: "May your greed know no bounds", // 68
  [CardType.REVERSE_DEATH]: "May life spring forth from the fallen", // 69
  [CardType.REVERSE_TEMPERANCE]: "May your hunger be satiated", // 70
  [CardType.REVERSE_DEVIL]: "Bask in the light of your mercy", // 71
  [CardType.REVERSE_TOWER]: "Creation brings destruction", // 72
  [CardType.REVERSE_STARS]: "May your loss bring fortune", // 73
  [CardType.REVERSE_MOON]: "May you remember lost memories", // 74
  [CardType.REVERSE_SUN]: "May the darkness swallow all around you", // 75
  [CardType.REVERSE_JUDGEMENT]: "May you redeem those found wanting", // 76
  [CardType.REVERSE_WORLD]: "Step into the abyss", // 77
  [CardType.CRACKED_KEY]: "???", // 78
  [CardType.QUEEN_OF_HEARTS]: "<3", // 79
  [CardType.WILD]: "Again", // 80
  [CardType.SOUL_OF_ISAAC]: "Reroll... or not", // 81
  [CardType.SOUL_OF_MAGDALENE]: "Give me your love!", // 82
  [CardType.SOUL_OF_CAIN]: "Opens the unopenable", // 83
  [CardType.SOUL_OF_JUDAS]: "Right behind you", // 84
  [CardType.SOUL_OF_BLUE_BABY]: "Chemical warfare", // 85
  [CardType.SOUL_OF_EVE]: "Your very own murder", // 86
  [CardType.SOUL_OF_SAMSON]: "Slay a thousand", // 87
  [CardType.SOUL_OF_AZAZEL]: "Demon rage!", // 88
  [CardType.SOUL_OF_LAZARUS]: "Life after death", // 89
  [CardType.SOUL_OF_EDEN]: "Embrace chaos", // 90
  [CardType.SOUL_OF_LOST]: "Leave your body behind", // 91
  [CardType.SOUL_OF_LILITH]: "Motherhood", // 92
  [CardType.SOUL_OF_KEEPER]: "$$$", // 93
  [CardType.SOUL_OF_APOLLYON]: "Bringer of calamity", // 94
  [CardType.SOUL_OF_FORGOTTEN]: "Skeletal protector", // 95
  [CardType.SOUL_OF_BETHANY]: "Friends from beyond", // 96
  [CardType.SOUL_OF_JACOB]: "Bound by blood", // 97
} as const satisfies Record<CardType, string>;
