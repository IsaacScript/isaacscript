// cspell:disable

import { PlayerType } from "isaac-typescript-definitions";

/** Used when rendering the "versusscreen.anm2" sprite. */
export const PLAYER_PORTRAIT_PNG_FILE_NAMES = {
  [PlayerType.POSSESSOR]: undefined, // -1
  [PlayerType.ISAAC]: "playerportrait_isaac.png", // 0
  [PlayerType.MAGDALENE]: "playerportrait_magdalene.png", // 1
  [PlayerType.CAIN]: "playerportrait_cain.png", // 2
  [PlayerType.JUDAS]: "playerportrait_judas.png", // 3
  [PlayerType.BLUE_BABY]: "playerportrait_bluebaby.png", // 4
  [PlayerType.EVE]: "playerportrait_eve.png", // 5
  [PlayerType.SAMSON]: "playerportrait_samson.png", // 6
  [PlayerType.AZAZEL]: "playerportrait_azazel.png", // 7
  [PlayerType.LAZARUS]: "playerportrait_lazarus.png", // 8
  [PlayerType.EDEN]: "playerportrait_eden.png", // 9
  [PlayerType.LOST]: "playerportrait_thelost.png", // 10
  [PlayerType.LAZARUS_2]: "playerportrait_lazarus2.png", // 11
  [PlayerType.DARK_JUDAS]: "playerportrait_darkjudas.png", // 12
  [PlayerType.LILITH]: "playerportrait_lilith.png", // 13
  [PlayerType.KEEPER]: "playerportrait_keeper.png", // 14
  [PlayerType.APOLLYON]: "playerportrait_apollyon.png", // 15
  [PlayerType.FORGOTTEN]: "playerportrait_theforgotten.png", // 16
  // The Soul the same name as The Forgotten.
  [PlayerType.SOUL]: "playerportrait_theforgotten.png", // 17
  [PlayerType.BETHANY]: "playerportrait_bethany.png", // 18
  [PlayerType.JACOB]: "playerportrait_jacob.png", // 19
  // Esau uses the same name as Jacob & Esau.
  [PlayerType.ESAU]: "playerportrait_jacob.png", // 20
  [PlayerType.ISAAC_B]: "playerportrait_isaac_b.png", // 21
  [PlayerType.MAGDALENE_B]: "playerportrait_magdalene_b.png", // 22
  [PlayerType.CAIN_B]: "playerportrait_cain_b.png", // 23
  [PlayerType.JUDAS_B]: "playerportrait_judas_b.png", // 24
  [PlayerType.BLUE_BABY_B]: "playerportrait_bluebaby_b.png", // 25
  [PlayerType.EVE_B]: "playerportrait_eve_b.png", // 26
  [PlayerType.SAMSON_B]: "playerportrait_samson_b.png", // 27
  [PlayerType.AZAZEL_B]: "playerportrait_azazel_b.png", // 28
  [PlayerType.LAZARUS_B]: "playerportrait_lazarus_b.png", // 29
  [PlayerType.EDEN_B]: "playerportrait_eden_b.png", // 30
  [PlayerType.LOST_B]: "playerportrait_thelost_b.png", // 31
  [PlayerType.LILITH_B]: "playerportrait_lilith_b.png", // 32
  [PlayerType.KEEPER_B]: "playerportrait_keeper_b.png", // 33
  [PlayerType.APOLLYON_B]: "playerportrait_apollyon_b.png", // 34
  [PlayerType.FORGOTTEN_B]: "playerportrait_theforgotten_b.png", // 35
  [PlayerType.BETHANY_B]: "playerportrait_bethany_b.png", // 36
  [PlayerType.JACOB_B]: "playerportrait_jacob_b.png", // 37
  [PlayerType.LAZARUS_2_B]: "playerportrait_lazarus_b_dead.png", // 38
  // Tainted Jacob in "Lost" form uses the same name as Tainted Jacob.
  [PlayerType.JACOB_2_B]: "playerportrait_jacob_b.png", // 39
  // Tainted The Soul uses the same name as Tainted Forgotten.
  [PlayerType.SOUL_B]: "playerportrait_theforgotten_b.png", // 40
} as const satisfies Record<PlayerType, string | undefined>;
