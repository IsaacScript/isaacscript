import { Card } from "isaac-typescript-definitions";

export const DEFAULT_CARD_DESCRIPTION = "Unknown";

// This is a temporary map due to missing features in the vanilla API.
export const CARD_DESCRIPTIONS: { readonly [key in Card]: string } = {
  [Card.NULL]: DEFAULT_CARD_DESCRIPTION, // 0
  [Card.FOOL]: "Where journey begins", // 1
  [Card.MAGICIAN]: "May you never miss your goal", // 2
  [Card.HIGH_PRIESTESS]: "Mother is watching you", // 3
  [Card.EMPRESS]: "May your rage bring power", // 4
  [Card.EMPEROR]: "Challenge me!", // 5
  [Card.HIEROPHANT]: "Two prayers for the lost", // 6
  [Card.LOVERS]: "May you prosper and be in good health", // 7
  [Card.CHARIOT]: "May nothing stand before you", // 8
  [Card.JUSTICE]: "May your future become balanced", // 9
  [Card.HERMIT]: "May you see what life has to offer", // 10
  [Card.WHEEL_OF_FORTUNE]: "Spin the wheel of destiny", // 11
  [Card.STRENGTH]: "May your power bring rage", // 12
  [Card.HANGED_MAN]: "May you find enlightenment ", // 13
  [Card.DEATH]: "Lay waste to all that oppose you ", // 14
  [Card.TEMPERANCE]: "May you be pure in heart", // 15
  [Card.DEVIL]: "Revel in the power of darkness", // 16
  [Card.TOWER]: "Destruction brings creation", // 17
  [Card.STARS]: "May you find what you desire ", // 18
  [Card.MOON]: "May you find all you have lost", // 19
  [Card.SUN]: "May the light heal and enlighten you", // 20
  [Card.JUDGEMENT]: "Judge lest ye be judged", // 21
  [Card.WORLD]: "Open your eyes and see", // 22
  [Card.CLUBS_2]: "Item multiplier", // 23
  [Card.DIAMONDS_2]: "Item multiplier", // 24
  [Card.SPADES_2]: "Item multiplier", // 25
  [Card.HEARTS_2]: "Item multiplier", // 26
  [Card.ACE_OF_CLUBS]: "Convert all", // 27
  [Card.ACE_OF_DIAMONDS]: "Convert all", // 28
  [Card.ACE_OF_SPADES]: "Convert all", // 29
  [Card.ACE_OF_HEARTS]: "Convert all", // 30
  [Card.JOKER]: "???", // 31
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
  [Card.CHAOS]: "???", // 42
  [Card.CREDIT]: "Charge it!", // 43
  [Card.RULES]: "???", // 44
  [Card.AGAINST_HUMANITY]: "Something stinks...", // 45
  [Card.SUICIDE_KING]: "A true ending?", // 46
  [Card.GET_OUT_OF_JAIL_FREE]: "Open Sesame", // 47
  [Card.QUESTION_MARK]: "Double active", // 48
  [Card.DICE_SHARD]: "D6 + D20", // 49
  [Card.EMERGENCY_CONTACT]: "Help from above", // 50
  [Card.HOLY]: "You feel protected", // 51
  [Card.HUGE_GROWTH]: "Become immense!", // 52
  [Card.ANCIENT_RECALL]: "Draw 3 cards", // 53
  [Card.ERA_WALK]: "Savor the moment", // 54
  [Card.RUNE_SHARD]: "It still glows faintly", // 55
  [Card.REVERSE_FOOL]: "Let go and move on", // 56
  [Card.REVERSE_MAGICIAN]: "May no harm come to you", // 57
  [Card.REVERSE_HIGH_PRIESTESS]: "Run", // 58
  [Card.REVERSE_EMPRESS]: "May your love bring protection", // 59
  [Card.REVERSE_EMPEROR]: "May you find a worthy opponent", // 60
  [Card.REVERSE_HIEROPHANT]: "Two prayers for the forgotten", // 61
  [Card.REVERSE_LOVERS]: "May your heart shatter into pieces", // 62
  [Card.REVERSE_CHARIOT]: "May nothing walk past you", // 63
  [Card.REVERSE_JUSTICE]: "May your sins come back to torment you", // 64
  [Card.REVERSE_HERMIT]: "May you see the value of all things in life", // 65
  [Card.REVERSE_WHEEL_OF_FORTUNE]: "Throw the dice of fate", // 66
  [Card.REVERSE_STRENGTH]: "May you break their resolve", // 67
  [Card.REVERSE_HANGED_MAN]: "May your greed know no bounds", // 68
  [Card.REVERSE_DEATH]: "May life spring forth from the fallen", // 69
  [Card.REVERSE_TEMPERANCE]: "May your hunger be satiated", // 70
  [Card.REVERSE_DEVIL]: "Bask in the light of your mercy", // 71
  [Card.REVERSE_TOWER]: "Creation brings destruction", // 72
  [Card.REVERSE_STARS]: "May your loss bring fortune", // 73
  [Card.REVERSE_MOON]: "May you remember lost memories", // 74
  [Card.REVERSE_SUN]: "May the darkness swallow all around you", // 75
  [Card.REVERSE_JUDGEMENT]: "May you redeem those found wanting", // 76
  [Card.REVERSE_WORLD]: "Step into the abyss", // 77
  [Card.CRACKED_KEY]: "???", // 78
  [Card.QUEEN_OF_HEARTS]: "<3", // 79
  [Card.WILD]: "Again", // 80
  [Card.SOUL_ISAAC]: "Reroll... or not", // 81
  [Card.SOUL_MAGDALENE]: "Give me your love!", // 82
  [Card.SOUL_CAIN]: "Opens the unopenable", // 83
  [Card.SOUL_JUDAS]: "Right behind you", // 84
  [Card.SOUL_BLUE_BABY]: "Chemical warfare", // 85
  [Card.SOUL_EVE]: "Your very own murder", // 86
  [Card.SOUL_SAMSON]: "Slay a thousand", // 87
  [Card.SOUL_AZAZEL]: "Demon rage!", // 88
  [Card.SOUL_LAZARUS]: "Life after death", // 89
  [Card.SOUL_EDEN]: "Embrace chaos", // 90
  [Card.SOUL_LOST]: "Leave your body behind", // 91
  [Card.SOUL_LILITH]: "Motherhood", // 92
  [Card.SOUL_KEEPER]: "$$$", // 93
  [Card.SOUL_APOLLYON]: "Bringer of calamity", // 94
  [Card.SOUL_FORGOTTEN]: "Skeletal protector", // 95
  [Card.SOUL_BETHANY]: "Friends from beyond", // 96
  [Card.SOUL_JACOB]: "Bound by blood", // 97
};
