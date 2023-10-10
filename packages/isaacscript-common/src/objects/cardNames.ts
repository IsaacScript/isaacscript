import { CardType } from "isaac-typescript-definitions";

export const DEFAULT_CARD_NAME = "Unknown";

/** This is a temporary map due to missing features in the vanilla API. */
export const CARD_NAMES = {
  [CardType.NULL]: DEFAULT_CARD_NAME, // 0
  [CardType.FOOL]: "0 - The Fool", // 1
  [CardType.MAGICIAN]: "I - The Magician", // 2
  [CardType.HIGH_PRIESTESS]: "II - The High Priestess", // 3
  [CardType.EMPRESS]: "III - The Empress", // 4
  [CardType.EMPEROR]: "IV - The Emperor", // 5
  [CardType.HIEROPHANT]: "V - The Hierophant", // 6
  [CardType.LOVERS]: "VI - The Lovers", // 7
  [CardType.CHARIOT]: "VII - The Chariot", // 8
  [CardType.JUSTICE]: "VIII - Justice", // 9
  [CardType.HERMIT]: "IX - The Hermit", // 10
  [CardType.WHEEL_OF_FORTUNE]: "X - Wheel of Fortune", // 11
  [CardType.STRENGTH]: "XI - Strength", // 12
  [CardType.HANGED_MAN]: "XII - The Hanged Man", // 13
  [CardType.DEATH]: "XIII - Death", // 14
  [CardType.TEMPERANCE]: "XIV - Temperance", // 15
  [CardType.DEVIL]: "XV - The Devil", // 16
  [CardType.TOWER]: "XVI - The Tower", // 17
  [CardType.STARS]: "XVII - The Stars", // 18
  [CardType.MOON]: "XVIII - The Moon", // 19
  [CardType.SUN]: "XIX - The Sun", // 20
  [CardType.JUDGEMENT]: "XX - Judgement", // 21
  [CardType.WORLD]: "XXI - The World", // 22
  [CardType.TWO_OF_CLUBS]: "2 of Clubs", // 23
  [CardType.TWO_OF_DIAMONDS]: "2 of Diamonds", // 24
  [CardType.TWO_OF_SPADES]: "2 of Spades", // 25
  [CardType.TWO_OF_HEARTS]: "2 of Hearts", // 26
  [CardType.ACE_OF_CLUBS]: "Ace of Clubs", // 27
  [CardType.ACE_OF_DIAMONDS]: "Ace of Diamonds", // 28
  [CardType.ACE_OF_SPADES]: "Ace of Spades", // 29
  [CardType.ACE_OF_HEARTS]: "Ace of Hearts", // 30
  [CardType.JOKER]: "Joker", // 31
  [CardType.RUNE_HAGALAZ]: "Hagalaz", // 32
  [CardType.RUNE_JERA]: "Jera", // 33
  [CardType.RUNE_EHWAZ]: "Ehwaz", // 34
  [CardType.RUNE_DAGAZ]: "Dagaz", // 35
  [CardType.RUNE_ANSUZ]: "Ansuz", // 36
  [CardType.RUNE_PERTHRO]: "Perthro", // 37
  [CardType.RUNE_BERKANO]: "Berkano", // 38
  [CardType.RUNE_ALGIZ]: "Algiz", // 39
  [CardType.RUNE_BLANK]: "Blank Rune", // 40
  [CardType.RUNE_BLACK]: "Black Rune", // 41
  [CardType.CHAOS]: "Chaos Card", // 42
  [CardType.CREDIT]: "Credit Card", // 43
  [CardType.RULES]: "Rules Card", // 44
  [CardType.AGAINST_HUMANITY]: "A Card Against Humanity", // 45
  [CardType.SUICIDE_KING]: "Suicide King", // 46
  [CardType.GET_OUT_OF_JAIL_FREE]: "Get Out Of Jail Free Card", // 47
  [CardType.QUESTION_MARK]: "? Card", // 48
  [CardType.DICE_SHARD]: "Dice Shard", // 49
  [CardType.EMERGENCY_CONTACT]: "Emergency Contact", // 50
  [CardType.HOLY]: "Holy Card", // 51
  [CardType.HUGE_GROWTH]: "Huge Growth", // 52
  [CardType.ANCIENT_RECALL]: "Ancient Recall", // 53
  [CardType.ERA_WALK]: "Era Walk", // 54
  [CardType.RUNE_SHARD]: "Rune Shard", // 55
  [CardType.REVERSE_FOOL]: "0 - The Fool?", // 56
  [CardType.REVERSE_MAGICIAN]: "I - The Magician?", // 57
  [CardType.REVERSE_HIGH_PRIESTESS]: "II - The High Priestess?", // 58
  [CardType.REVERSE_EMPRESS]: "III - The Empress?", // 59
  [CardType.REVERSE_EMPEROR]: "IV - The Emperor?", // 60
  [CardType.REVERSE_HIEROPHANT]: "V - The Hierophant?", // 61
  [CardType.REVERSE_LOVERS]: "VI - The Lovers?", // 62
  [CardType.REVERSE_CHARIOT]: "VII - The Chariot?", // 63
  [CardType.REVERSE_JUSTICE]: "VIII - Justice?", // 64
  [CardType.REVERSE_HERMIT]: "IX - The Hermit?", // 65
  [CardType.REVERSE_WHEEL_OF_FORTUNE]: "X - Wheel of Fortune?", // 66
  [CardType.REVERSE_STRENGTH]: "XI - Strength?", // 67
  [CardType.REVERSE_HANGED_MAN]: "XII - The Hanged Man?", // 68
  [CardType.REVERSE_DEATH]: "XIII - Death?", // 69
  [CardType.REVERSE_TEMPERANCE]: "XIV - Temperance?", // 70
  [CardType.REVERSE_DEVIL]: "XV - The Devil?", // 71
  [CardType.REVERSE_TOWER]: "XVI - The Tower?", // 72
  [CardType.REVERSE_STARS]: "XVII - The Stars?", // 73
  [CardType.REVERSE_MOON]: "XVIII - The Moon?", // 74
  [CardType.REVERSE_SUN]: "XIX - The Sun?", // 75
  [CardType.REVERSE_JUDGEMENT]: "XX - Judgement?", // 76
  [CardType.REVERSE_WORLD]: "XXI - The World?", // 77
  [CardType.CRACKED_KEY]: "Cracked Key", // 78
  [CardType.QUEEN_OF_HEARTS]: "Queen of Hearts", // 79
  [CardType.WILD]: "Wild Card", // 80
  [CardType.SOUL_OF_ISAAC]: "Soul of Isaac", // 81
  [CardType.SOUL_OF_MAGDALENE]: "Soul of Magdalene", // 82
  [CardType.SOUL_OF_CAIN]: "Soul of Cain", // 83
  [CardType.SOUL_OF_JUDAS]: "Soul of Judas", // 84
  [CardType.SOUL_OF_BLUE_BABY]: "Soul of ???", // 85
  [CardType.SOUL_OF_EVE]: "Soul of Eve", // 86
  [CardType.SOUL_OF_SAMSON]: "Soul of Samson", // 87
  [CardType.SOUL_OF_AZAZEL]: "Soul of Azazel", // 88
  [CardType.SOUL_OF_LAZARUS]: "Soul of Lazarus", // 89
  [CardType.SOUL_OF_EDEN]: "Soul of Eden", // 90
  [CardType.SOUL_OF_LOST]: "Soul of the Lost", // 91
  [CardType.SOUL_OF_LILITH]: "Soul of Lilith", // 92
  [CardType.SOUL_OF_KEEPER]: "Soul of the Keeper", // 93
  [CardType.SOUL_OF_APOLLYON]: "Soul of Apollyon", // 94
  [CardType.SOUL_OF_FORGOTTEN]: "Soul of the Forgotten", // 95
  [CardType.SOUL_OF_BETHANY]: "Soul of Bethany", // 96
  [CardType.SOUL_OF_JACOB_AND_ESAU]: "Soul of Jacob and Esau", // 97
} as const satisfies Record<CardType, string>;
