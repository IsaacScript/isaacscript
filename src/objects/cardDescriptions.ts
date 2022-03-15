export const DEFAULT_CARD_DESCRIPTION = "Unknown";

// Temporary map due to missing features in the vanilla API
export const CARD_DESCRIPTIONS: { readonly [key in Card]: string } = {
  [Card.CARD_RANDOM]: DEFAULT_CARD_DESCRIPTION, // -1
  [Card.CARD_NULL]: DEFAULT_CARD_DESCRIPTION, // 0
  [Card.CARD_FOOL]: "Where journey begins", // 1
  [Card.CARD_MAGICIAN]: "May you never miss your goal", // 2
  [Card.CARD_HIGH_PRIESTESS]: "Mother is watching you", // 3
  [Card.CARD_EMPRESS]: "May your rage bring power", // 4
  [Card.CARD_EMPEROR]: "Challenge me!", // 5
  [Card.CARD_HIEROPHANT]: "Two prayers for the lost", // 6
  [Card.CARD_LOVERS]: "May you prosper and be in good health", // 7
  [Card.CARD_CHARIOT]: "May nothing stand before you", // 8
  [Card.CARD_JUSTICE]: "May your future become balanced", // 9
  [Card.CARD_HERMIT]: "May you see what life has to offer", // 10
  [Card.CARD_WHEEL_OF_FORTUNE]: "Spin the wheel of destiny", // 11
  [Card.CARD_STRENGTH]: "May your power bring rage", // 12
  [Card.CARD_HANGED_MAN]: "May you find enlightenment ", // 13
  [Card.CARD_DEATH]: "Lay waste to all that oppose you ", // 14
  [Card.CARD_TEMPERANCE]: "May you be pure in heart", // 15
  [Card.CARD_DEVIL]: "Revel in the power of darkness", // 16
  [Card.CARD_TOWER]: "Destruction brings creation", // 17
  [Card.CARD_STARS]: "May you find what you desire ", // 18
  [Card.CARD_MOON]: "May you find all you have lost", // 19
  [Card.CARD_SUN]: "May the light heal and enlighten you", // 20
  [Card.CARD_JUDGEMENT]: "Judge lest ye be judged", // 21
  [Card.CARD_WORLD]: "Open your eyes and see", // 22
  [Card.CARD_CLUBS_2]: "Item multiplier", // 23
  [Card.CARD_DIAMONDS_2]: "Item multiplier", // 24
  [Card.CARD_SPADES_2]: "Item multiplier", // 25
  [Card.CARD_HEARTS_2]: "Item multiplier", // 26
  [Card.CARD_ACE_OF_CLUBS]: "Convert all", // 27
  [Card.CARD_ACE_OF_DIAMONDS]: "Convert all", // 28
  [Card.CARD_ACE_OF_SPADES]: "Convert all", // 29
  [Card.CARD_ACE_OF_HEARTS]: "Convert all", // 30
  [Card.CARD_JOKER]: "???", // 31
  [Card.RUNE_HAGALAZ]: "Destruction", // 32
  [Card.RUNE_JERA]: "Abundance", // 33
  [Card.RUNE_EHWAZ]: "Passage", // 34
  [Card.RUNE_DAGAZ]: "Purity", // 35
  [Card.RUNE_ANSUZ]: "Vision", // 36
  [Card.RUNE_PERTHRO]: "Change", // 37
  [Card.RUNE_BERKANO]: "Companionship", // 38
  [Card.RUNE_ALGIZ]: "Resistance", // 39
  [Card.RUNE_BLANK]: "???", // 40
  [Card.RUNE_BLACK]: "Void", // 41
  [Card.CARD_CHAOS]: "???", // 42
  [Card.CARD_CREDIT]: "Charge it!", // 43
  [Card.CARD_RULES]: "???", // 44
  [Card.CARD_HUMANITY]: "Something stinks...", // 45
  [Card.CARD_SUICIDE_KING]: "A true ending?", // 46
  [Card.CARD_GET_OUT_OF_JAIL]: "Open Sesame", // 47
  [Card.CARD_QUESTIONMARK]: "Double active", // 48
  [Card.CARD_DICE_SHARD]: "D6 + D20", // 49
  [Card.CARD_EMERGENCY_CONTACT]: "Help from above", // 50
  [Card.CARD_HOLY]: "You feel protected", // 51
  [Card.CARD_HUGE_GROWTH]: "Become immense!", // 52
  [Card.CARD_ANCIENT_RECALL]: "Draw 3 cards", // 53
  [Card.CARD_ERA_WALK]: "Savor the moment", // 54
  [Card.RUNE_SHARD]: "It still glows faintly", // 55
  [Card.CARD_REVERSE_FOOL]: "Let go and move on", // 56
  [Card.CARD_REVERSE_MAGICIAN]: "May no harm come to you", // 57
  [Card.CARD_REVERSE_HIGH_PRIESTESS]: "Run", // 58
  [Card.CARD_REVERSE_EMPRESS]: "May your love bring protection", // 59
  [Card.CARD_REVERSE_EMPEROR]: "May you find a worthy opponent", // 60
  [Card.CARD_REVERSE_HIEROPHANT]: "Two prayers for the forgotten", // 61
  [Card.CARD_REVERSE_LOVERS]: "May your heart shatter into pieces", // 62
  [Card.CARD_REVERSE_CHARIOT]: "May nothing walk past you", // 63
  [Card.CARD_REVERSE_JUSTICE]: "May your sins come back to torment you", // 64
  [Card.CARD_REVERSE_HERMIT]: "May you see the value of all things in life", // 65
  [Card.CARD_REVERSE_WHEEL_OF_FORTUNE]: "Throw the dice of fate", // 66
  [Card.CARD_REVERSE_STRENGTH]: "May you break their resolve", // 67
  [Card.CARD_REVERSE_HANGED_MAN]: "May your greed know no bounds", // 68
  [Card.CARD_REVERSE_DEATH]: "May life spring forth from the fallen", // 69
  [Card.CARD_REVERSE_TEMPERANCE]: "May your hunger be satiated", // 70
  [Card.CARD_REVERSE_DEVIL]: "Bask in the light of your mercy", // 71
  [Card.CARD_REVERSE_TOWER]: "Creation brings destruction", // 72
  [Card.CARD_REVERSE_STARS]: "May your loss bring fortune", // 73
  [Card.CARD_REVERSE_MOON]: "May you remember lost memories", // 74
  [Card.CARD_REVERSE_SUN]: "May the darkness swallow all around you", // 75
  [Card.CARD_REVERSE_JUDGEMENT]: "May you redeem those found wanting", // 76
  [Card.CARD_REVERSE_WORLD]: "Step into the abyss", // 77
  [Card.CARD_CRACKED_KEY]: "???", // 78
  [Card.CARD_QUEEN_OF_HEARTS]: "<3", // 79
  [Card.CARD_WILD]: "Again", // 80
  [Card.CARD_SOUL_ISAAC]: "Reroll... or not", // 81
  [Card.CARD_SOUL_MAGDALENE]: "Give me your love!", // 82
  [Card.CARD_SOUL_CAIN]: "Opens the unopenable", // 83
  [Card.CARD_SOUL_JUDAS]: "Right behind you", // 84
  [Card.CARD_SOUL_BLUEBABY]: "Chemical warfare", // 85
  [Card.CARD_SOUL_EVE]: "Your very own murder", // 86
  [Card.CARD_SOUL_SAMSON]: "Slay a thousand", // 87
  [Card.CARD_SOUL_AZAZEL]: "Demon rage!", // 88
  [Card.CARD_SOUL_LAZARUS]: "Life after death", // 89
  [Card.CARD_SOUL_EDEN]: "Embrace chaos", // 90
  [Card.CARD_SOUL_LOST]: "Leave your body behind", // 91
  [Card.CARD_SOUL_LILITH]: "Motherhood", // 92
  [Card.CARD_SOUL_KEEPER]: "$$$", // 93
  [Card.CARD_SOUL_APOLLYON]: "Bringer of calamity", // 94
  [Card.CARD_SOUL_FORGOTTEN]: "Skeletal protector", // 95
  [Card.CARD_SOUL_BETHANY]: "Friends from beyond", // 96
  [Card.CARD_SOUL_JACOB]: "Bound by blood", // 97
  [Card.NUM_CARDS]: DEFAULT_CARD_DESCRIPTION, // 98
};
