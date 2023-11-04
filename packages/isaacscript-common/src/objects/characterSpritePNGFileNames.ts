// cspell:disable

import { PlayerType } from "isaac-typescript-definitions";

export const CHARACTER_SPRITE_PNG_FILE_NAMES = {
  // Possessor uses the same sprite as Isaac.
  [PlayerType.POSSESSOR]: "character_001_isaac.png", // 0
  [PlayerType.ISAAC]: "character_001_isaac.png", // 0
  [PlayerType.MAGDALENE]: "character_002_magdalene.png", // 1
  [PlayerType.CAIN]: "character_003_cain.png", // 2
  [PlayerType.JUDAS]: "character_004_judas.png", // 3
  [PlayerType.BLUE_BABY]: "character_006_bluebaby.png", // 4
  [PlayerType.EVE]: "character_005_eve.png", // 5
  [PlayerType.SAMSON]: "character_007_samson.png", // 6
  [PlayerType.AZAZEL]: "character_008_azazel.png", // 7
  [PlayerType.LAZARUS]: "character_009_lazarus.png", // 8
  [PlayerType.EDEN]: "character_009_eden.png", // 9
  [PlayerType.LOST]: "character_012_thelost.png", // 10
  [PlayerType.LAZARUS_2]: "character_010_lazarus2.png", // 11
  [PlayerType.DARK_JUDAS]: "character_013_blackjudas.png", // 12
  [PlayerType.LILITH]: "character_014_lilith.png", // 13
  [PlayerType.KEEPER]: "character_015_keeper.png", // 14
  [PlayerType.APOLLYON]: "character_016_apollyon.png", // 15
  [PlayerType.FORGOTTEN]: "character_017_theforgotten.png", // 16
  [PlayerType.SOUL]: "character_018_thesoul.png", // 17
  [PlayerType.BETHANY]: "character_001x_bethany.png", // 18
  [PlayerType.JACOB]: "character_002x_jacob.png", // 19
  [PlayerType.ESAU]: "character_003x_esau.png", // 20
  [PlayerType.ISAAC_B]: "character_001b_isaac.png", // 21
  [PlayerType.MAGDALENE_B]: "character_002b_magdalene.png", // 22
  [PlayerType.CAIN_B]: "character_003b_cain.png", // 23
  [PlayerType.JUDAS_B]: "character_004b_judas.png", // 24
  [PlayerType.BLUE_BABY_B]: "character_005b_bluebaby.png", // 25
  [PlayerType.EVE_B]: "character_006b_eve.png", // 26
  [PlayerType.SAMSON_B]: "character_007b_samson.png", // 27
  [PlayerType.AZAZEL_B]: "character_008b_azazel.png", // 28
  [PlayerType.LAZARUS_B]: "character_009b_lazarus.png", // 29
  [PlayerType.EDEN_B]: "character_009_eden.png", // 30
  [PlayerType.LOST_B]: "character_012b_thelost.png", // 31
  [PlayerType.LILITH_B]: "character_014b_lilith.png", // 32
  [PlayerType.KEEPER_B]: "character_015b_keeper.png", // 33
  [PlayerType.APOLLYON_B]: "character_016b_apollyon.png", // 34
  [PlayerType.FORGOTTEN_B]: "character_016b_theforgotten.png", // 35
  [PlayerType.BETHANY_B]: "character_018b_bethany.png", // 36
  [PlayerType.JACOB_B]: "character_019b_jacob.png", // 37
  [PlayerType.LAZARUS_2_B]: "character_009b_lazarus2.png", // 38
  [PlayerType.JACOB_2_B]: "character_019b_jacob2.png", // 39
  [PlayerType.SOUL_B]: "character_017b_thesoul.png", // 40
} as const satisfies Record<PlayerType, string>;
