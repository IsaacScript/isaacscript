// cspell:disable

import { PlayerType } from "isaac-typescript-definitions";

/** Used when rendering the "versusscreen.anm2" sprite. */
export const PLAYER_NAME_PNG_FILE_NAMES = {
  [PlayerType.POSSESSOR]: undefined, // -1
  [PlayerType.ISAAC]: "playername_01_isaac.png", // 0
  [PlayerType.MAGDALENE]: "playername_02_magdalene.png", // 1
  [PlayerType.CAIN]: "playername_03_cain.png", // 2
  [PlayerType.JUDAS]: "playername_04_judas.png", // 3
  [PlayerType.BLUE_BABY]: "playername_06_bluebaby.png", // 4
  [PlayerType.EVE]: "playername_05_eve.png", // 5
  [PlayerType.SAMSON]: "playername_07_samson.png", // 6
  [PlayerType.AZAZEL]: "playername_08_azazel.png", // 7
  [PlayerType.LAZARUS]: "playername_10_lazarus.png", // 8
  [PlayerType.EDEN]: "playername_09_eden.png", // 9
  [PlayerType.LOST]: "playername_12_thelost.png", // 10
  // Lazarus 2 uses the same name as Lazarus 1.
  [PlayerType.LAZARUS_2]: "playername_10_lazarus.png", // 11
  // Dark Judas uses the same name as Judas.
  [PlayerType.DARK_JUDAS]: "playername_04_judas.png", // 12
  [PlayerType.LILITH]: "playername_13_lilith.png", // 13
  [PlayerType.KEEPER]: "playername_14_thekeeper.png", // 14
  [PlayerType.APOLLYON]: "playername_15_apollyon.png", // 15
  [PlayerType.FORGOTTEN]: "playername_16_theforgotten.png", // 16
  // The Soul the same name as The Forgotten.
  [PlayerType.SOUL]: "playername_16_theforgotten.png", // 17
  [PlayerType.BETHANY]: "playername_01x_bethany.png", // 18
  [PlayerType.JACOB]: "playername_02x_jacob_esau.png", // 19
  // Esau uses the same name as Jacob & Esau.
  [PlayerType.ESAU]: "playername_02x_jacob_esau.png", // 20
  [PlayerType.ISAAC_B]: "playername_01_isaac.png", // 21
  [PlayerType.MAGDALENE_B]: "playername_02_magdalene.png", // 22
  [PlayerType.CAIN_B]: "playername_03_cain.png", // 23
  [PlayerType.JUDAS_B]: "playername_04_judas.png", // 24
  [PlayerType.BLUE_BABY_B]: "playername_06_bluebaby.png", // 25
  [PlayerType.EVE_B]: "playername_05_eve.png", // 26
  [PlayerType.SAMSON_B]: "playername_07_samson.png", // 27
  [PlayerType.AZAZEL_B]: "playername_08_azazel.png", // 28
  [PlayerType.LAZARUS_B]: "playername_10_lazarus.png", // 29
  [PlayerType.EDEN_B]: "playername_09_eden.png", // 30
  [PlayerType.LOST_B]: "playername_12_thelost.png", // 31
  [PlayerType.LILITH_B]: "playername_13_lilith.png", // 32
  [PlayerType.KEEPER_B]: "playername_14_thekeeper.png", // 33
  [PlayerType.APOLLYON_B]: "playername_15_apollyon.png", // 34
  [PlayerType.FORGOTTEN_B]: "playername_16_theforgotten.png", // 35
  [PlayerType.BETHANY_B]: "playername_01x_bethany.png", // 36
  [PlayerType.JACOB_B]: "playername_02x_jacob.png", // 37
  // Dead Tainted Lazarus uses the same name as Tainted Lazarus.
  [PlayerType.LAZARUS_2_B]: "playername_10_lazarus.png", // 38
  // Tainted Jacob in "Lost" form uses the same name as Tainted Jacob.
  [PlayerType.JACOB_2_B]: "playername_02x_jacob.png", // 39
  // Tainted The Soul uses the same name as Tainted Forgotten.
  [PlayerType.SOUL_B]: "playername_16_theforgotten.png", // 40
} as const satisfies Record<PlayerType, string | undefined>;
